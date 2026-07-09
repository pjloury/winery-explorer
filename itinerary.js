/* Itinerary Builder — voice/text trip requests turned into a scheduled winery route.
   Depends on WINERIES (data.js), ACCLAIM (data.js), and the IMG manifest (manifest.js).
   Degrades gracefully with no network/config: falls back to a local rule-based prompt
   parser (no ANTHROPIC_API_KEY needed) and a haversine drive-time estimate (no Google
   Maps key needed). */

const ITIN_DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const ITIN_DEFAULT_VISIT_MIN = 75;      // typical tasting-room dwell time
const ITIN_APPT_VISIT_MIN = 90;         // appointment-only / seated tastings run longer
const ITIN_MIN_STOP_GAP_MIN = 10;       // parking/walk-in buffer folded into every drive leg
const ITIN_MPH_WINE_COUNTRY = 24;       // rural two-lane roads, stop signs, tasting-room traffic
const ITIN_ROAD_WINDING_FACTOR = 1.4;   // straight-line distance -> approximate road distance
const ITIN_DEFAULT_START = "10:00";
const ITIN_DEFAULT_END = "17:00";

// Rough town centroids used as default start/end points when the user doesn't name one.
const ITIN_PLACES = {
  napa: { label: "Napa, CA", lat: 38.2975, lng: -122.2869 },
  "st. helena": { label: "St. Helena, CA", lat: 38.5052, lng: -122.4700 },
  "st helena": { label: "St. Helena, CA", lat: 38.5052, lng: -122.4700 },
  yountville: { label: "Yountville, CA", lat: 38.4016, lng: -122.3608 },
  oakville: { label: "Oakville, CA", lat: 38.4405, lng: -122.4092 },
  rutherford: { label: "Rutherford, CA", lat: 38.4610, lng: -122.4192 },
  calistoga: { label: "Calistoga, CA", lat: 38.5788, lng: -122.5797 },
  sonoma: { label: "Sonoma, CA", lat: 38.2919, lng: -122.4580 },
  healdsburg: { label: "Healdsburg, CA", lat: 38.6102, lng: -122.8694 },
  glen_ellen: { label: "Glen Ellen, CA", lat: 38.3660, lng: -122.5228 },
};
const ITIN_VALLEY_DEFAULT_START = { Napa: ITIN_PLACES.napa, Sonoma: ITIN_PLACES.sonoma };

const itinState = {
  transcript: "",
  listening: false,
  criteria: null,      // last parsed structured request
  plan: null,           // last built itinerary
  parsing: false,
  building: false,
  parseSource: null,    // "llm" | "local"
  error: null,
};

/* ── geo & time helpers ───────────────────────────────────────────── */
function itinHaversineMiles(a, b) {
  const R = 3958.8;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}
function itinEstimateDriveMinutes(a, b) {
  const miles = itinHaversineMiles(a, b) * ITIN_ROAD_WINDING_FACTOR;
  return Math.max(6, Math.round((miles / ITIN_MPH_WINE_COUNTRY) * 60));
}
function itinMinutesToClock(totalMin) {
  const h = Math.floor(totalMin / 60) % 24;
  const m = totalMin % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}
function itinClockToMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
}
function itinDayKey(dateStr) {
  // dateStr: "YYYY-MM-DD" (local, no timezone shift)
  const [y, m, d] = dateStr.split("-").map(Number);
  return ITIN_DAY_KEYS[new Date(y, m - 1, d).getDay()];
}

/* ── Google Distance Matrix (optional) with haversine fallback ──────
   Requires window.APP_CONFIG.googleMapsApiKey (see config.js). If unset,
   or the API errors/times out, every call transparently falls back to
   the estimate above so the feature works with zero setup. */
let itinGoogleMapsLoading = null;
function itinLoadGoogleMaps() {
  const key = window.APP_CONFIG && window.APP_CONFIG.googleMapsApiKey;
  if (!key) return Promise.resolve(false);
  if (window.google && window.google.maps && window.google.maps.DistanceMatrixService) return Promise.resolve(true);
  if (itinGoogleMapsLoading) return itinGoogleMapsLoading;
  itinGoogleMapsLoading = new Promise((resolve) => {
    const cbName = "__itinGmapsReady";
    window[cbName] = () => resolve(true);
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&callback=${cbName}`;
    s.async = true;
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
    setTimeout(() => resolve(false), 6000); // don't block the UI forever if it stalls
  });
  return itinGoogleMapsLoading;
}
const itinDriveCache = new Map();
function itinCacheKey(a, b) { return `${a.lat.toFixed(4)},${a.lng.toFixed(4)}|${b.lat.toFixed(4)},${b.lng.toFixed(4)}`; }
async function itinDriveMinutes(a, b) {
  const key = itinCacheKey(a, b);
  if (itinDriveCache.has(key)) return itinDriveCache.get(key);
  const estimate = itinEstimateDriveMinutes(a, b);
  const ok = await itinLoadGoogleMaps().catch(() => false);
  if (!ok) { itinDriveCache.set(key, estimate); return estimate; }
  try {
    const svc = new google.maps.DistanceMatrixService();
    const result = await new Promise((resolve, reject) => {
      svc.getDistanceMatrix({
        origins: [{ lat: a.lat, lng: a.lng }],
        destinations: [{ lat: b.lat, lng: b.lng }],
        travelMode: google.maps.TravelMode.DRIVING,
      }, (res, status) => (status === "OK" ? resolve(res) : reject(status)));
    });
    const el = result.rows[0].elements[0];
    if (el.status !== "OK") throw new Error(el.status);
    const min = Math.round(el.duration.value / 60);
    itinDriveCache.set(key, min);
    return min;
  } catch {
    itinDriveCache.set(key, estimate);
    return estimate;
  }
}

/* ── winery-level checks ─────────────────────────────────────────── */
function itinHoursFor(w, dayKey) {
  if (!w.hours) return null;
  return w.hours[dayKey] || null;
}
function itinIsOpen(w, dayKey) {
  const h = itinHoursFor(w, dayKey);
  return !!h && h !== "closed";
}
function itinOpenWindow(w, dayKey) {
  const h = itinHoursFor(w, dayKey);
  if (!h || h === "closed" || h === "by appointment") return null;
  const [open, close] = h.split("-");
  if (!open || !close) return null;
  return { openMin: itinClockToMinutes(open), closeMin: itinClockToMinutes(close) };
}
function itinVisitMinutes(w) {
  return w.reservationRequired === "required" ? ITIN_APPT_VISIT_MIN : ITIN_DEFAULT_VISIT_MIN;
}
function itinDogOk(w, need) { return !need || w.dogFriendly === "yes" || w.dogFriendly === "outdoor-only"; }
function itinKidOk(w, need) { return !need || w.kidFriendly === "yes" || w.kidFriendly === "limited"; }
function itinPrestige(w) { return (typeof ACCLAIM !== "undefined" && ACCLAIM[w.slug]) || 3; }

/* ── rule-based fallback parser (used when the LLM endpoint is unavailable) ── */
function itinNextWeekday(base, targetDow) {
  const d = new Date(base);
  const diff = (targetDow - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d;
}
function itinLocalParse(text) {
  const t = text.toLowerCase();
  const today = new Date();
  let date = new Date(today);
  const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  if (/\btomorrow\b/.test(t)) date.setDate(date.getDate() + 1);
  else {
    const wd = weekdays.findIndex((w) => t.includes(w));
    if (wd >= 0) date = itinNextWeekday(today, wd);
    else {
      const m = t.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
      if (m) date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    }
  }
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const dogs = /\bdog|puppy|pups?\b/.test(t) && !/no dogs/.test(t);
  const kids = /\bkid|baby|babies|infant|toddler|child/.test(t) && !/no kids/.test(t);
  let valley = "Both";
  if (/\bnapa\b/.test(t) && !/\bsonoma\b/.test(t)) valley = "Napa";
  else if (/\bsonoma\b/.test(t) && !/\bnapa\b/.test(t)) valley = "Sonoma";

  const numMatch = t.match(/\b(\d)\s*(?:wineries|stops|tastings)\b/);
  const numStops = numMatch ? Math.min(6, Math.max(1, Number(numMatch[1]))) : 3;

  const partyMatch = t.match(/\b(\d+)\s*(?:people|guests|of us|adults)\b/);
  const partySize = partyMatch ? Number(partyMatch[1]) : 2;

  let startTime = ITIN_DEFAULT_START;
  const timeMatch = t.match(/\b(?:starting|start|from|at)\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/);
  if (timeMatch) {
    let h = Number(timeMatch[1]);
    const m = timeMatch[2] ? Number(timeMatch[2]) : 0;
    const ap = timeMatch[3];
    if (ap === "pm" && h < 12) h += 12;
    if (ap === "am" && h === 12) h = 0;
    startTime = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }

  const mustInclude = WINERIES.filter((w) => t.includes(w.name.toLowerCase())).map((w) => w.slug);

  const budgetMatch = t.match(/\$\s?(\d+)/);
  const budgetPerPerson = budgetMatch ? Number(budgetMatch[1]) : null;

  return {
    date: dateStr, startTime, endTime: ITIN_DEFAULT_END,
    valley, numStops, dogs, kids, partySize,
    mustInclude, exclude: [], budgetPerPerson,
    startLocation: null, notes: "",
  };
}

/* ── LLM-backed parser via /api/parse-itinerary, with local fallback ── */
async function itinParsePrompt(text) {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  try {
    const res = await fetch("/api/parse-itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text, today: todayStr }),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    itinState.parseSource = "llm";
    return itinNormalizeCriteria(data, todayStr);
  } catch (e) {
    console.warn("[itinerary] LLM parse unavailable, using local parser:", e.message || e);
    itinState.parseSource = "local";
    return itinLocalParse(text);
  }
}
function itinNormalizeCriteria(raw, todayStr) {
  const fallback = itinLocalParse("");
  return {
    date: raw.date || todayStr,
    startTime: raw.startTime || fallback.startTime,
    endTime: raw.endTime || fallback.endTime,
    valley: ["Napa", "Sonoma", "Both"].includes(raw.valley) ? raw.valley : "Both",
    numStops: Math.min(6, Math.max(1, Number(raw.numStops) || 3)),
    dogs: !!raw.dogs,
    kids: !!raw.kids,
    partySize: Number(raw.partySize) || 2,
    mustInclude: Array.isArray(raw.mustInclude) ? raw.mustInclude.filter((s) => WINERIES.some((w) => w.slug === s)) : [],
    exclude: Array.isArray(raw.exclude) ? raw.exclude : [],
    budgetPerPerson: raw.budgetPerPerson || null,
    startLocation: raw.startLocation || null,
    notes: raw.notes || "",
  };
}

/* ── route builder ───────────────────────────────────────────────── */
function itinResolveStart(criteria) {
  if (criteria.startLocation) {
    const key = String(criteria.startLocation).trim().toLowerCase();
    if (ITIN_PLACES[key]) return ITIN_PLACES[key];
  }
  if (criteria.valley !== "Both") return ITIN_VALLEY_DEFAULT_START[criteria.valley];
  return ITIN_PLACES.napa;
}
function itinTastingFeeMidpoint(w) {
  if (!w.tastingFee) return 0;
  const nums = String(w.tastingFee).match(/\d+/g);
  if (!nums || !nums.length) return 0;
  const vals = nums.map(Number);
  return vals.length > 1 ? (vals[0] + vals[1]) / 2 : vals[0];
}

async function itinBuildPlan(criteria) {
  const dayKey = itinDayKey(criteria.date);
  const exclude = new Set(criteria.exclude || []);
  const must = criteria.mustInclude || [];

  let pool = WINERIES.filter((w) => {
    if (exclude.has(w.slug)) return false;
    if (criteria.valley !== "Both" && w.valley !== criteria.valley) return false;
    if (!itinDogOk(w, criteria.dogs)) return false;
    if (!itinKidOk(w, criteria.kids)) return false;
    return true;
  });

  const skippedClosed = [];
  const skippedPolicy = WINERIES.filter((w) => must.includes(w.slug) && !pool.some((p) => p.slug === w.slug));

  const openPool = pool.filter((w) => {
    const open = itinIsOpen(w, dayKey);
    if (!open && must.includes(w.slug)) skippedClosed.push(w);
    return open;
  });

  const mustSet = new Set(must);
  let candidates = openPool.filter((w) => !mustSet.has(w.slug));
  candidates.sort((a, b) => itinPrestige(b) - itinPrestige(a));
  const mustWineries = openPool.filter((w) => mustSet.has(w.slug));

  // Greedy nearest-neighbor selection from the start point — naturally
  // produces a geographically coherent route instead of a random scatter.
  let cursor = itinResolveStart(criteria);
  const chosen = [...mustWineries];
  const remainingSlots = Math.max(0, criteria.numStops - chosen.length);
  const topTier = candidates.slice(0, Math.max(15, remainingSlots * 5)); // limit search to reasonably prestigious options
  const pickPool = topTier.slice();
  for (let i = 0; i < remainingSlots && pickPool.length; i++) {
    pickPool.sort((a, b) => itinHaversineMiles(cursor, a) - itinHaversineMiles(cursor, b));
    const next = pickPool.shift();
    chosen.push(next);
    cursor = next;
  }

  // Order the full chosen set (incl. must-includes) via nearest-neighbor from the start.
  const ordered = [];
  let loc = itinResolveStart(criteria);
  const unplaced = chosen.slice();
  while (unplaced.length) {
    unplaced.sort((a, b) => itinHaversineMiles(loc, a) - itinHaversineMiles(loc, b));
    const next = unplaced.shift();
    ordered.push(next);
    loc = next;
  }

  // Simulate the schedule, trimming stops that don't fit the time window.
  const stops = [];
  let clock = itinClockToMinutes(criteria.startTime);
  const endMin = itinClockToMinutes(criteria.endTime);
  let prevLoc = itinResolveStart(criteria);
  const trimmed = [];

  for (const w of ordered) {
    const driveMin = await itinDriveMinutes(prevLoc, w);
    let arrival = clock + driveMin + (stops.length ? ITIN_MIN_STOP_GAP_MIN : 0);
    const win = itinOpenWindow(w, dayKey);
    let hoursFlag = null;
    if (win) {
      if (arrival < win.openMin) { arrival = win.openMin; hoursFlag = "waited-for-open"; }
      if (arrival >= win.closeMin) { trimmed.push(w); continue; }
    } else if (itinHoursFor(w, dayKey) === "by appointment") {
      hoursFlag = "by-appointment";
    }
    const visitMin = itinVisitMinutes(w);
    let departure = arrival + visitMin;
    if (win && departure > win.closeMin) departure = win.closeMin;
    if (arrival > endMin) { trimmed.push(w); continue; }

    stops.push({
      winery: w,
      driveMinFromPrev: driveMin,
      arrival, departure,
      hoursFlag,
      costPerPerson: itinTastingFeeMidpoint(w),
    });
    clock = departure;
    prevLoc = w;
  }

  const totalCost = stops.reduce((sum, s) => sum + s.costPerPerson, 0) * criteria.partySize;
  const reservationsNeeded = stops.filter((s) => s.winery.reservationRequired === "required");

  return {
    criteria, dayKey, stops, trimmed, skippedClosed, skippedPolicy,
    totalCost, reservationsNeeded,
    startLabel: (ITIN_PLACES[(criteria.startLocation || "").toLowerCase()] || itinResolveStart(criteria)).label
      || (criteria.valley !== "Both" ? `${criteria.valley}, CA` : "Napa, CA"),
  };
}

/* ── UI ───────────────────────────────────────────────────────────
   Uses its own `iq`/`iqa` DOM helpers (not `$`) because app.js also
   declares a top-level `const $` in the same non-module global scope —
   redeclaring it here would throw a SyntaxError and break the whole app. */
const iq = (sel, root) => (root || document).querySelector(sel);
const iqa = (sel, root) => Array.from((root || document).querySelectorAll(sel));

function itinEsc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const ITIN_EXAMPLES = [
  "Napa this Saturday, 3 wineries, back by 5pm, we have a dog",
  "Sonoma tomorrow with a toddler, 2 stops, nothing too formal",
  "This Friday afternoon in Napa, 4 wineries, budget $200 a person",
  "Rutherford and Oakville Sunday, 3 stops, must include Opus One",
];

function itinSetStatus(msg, kind) {
  const el = document.getElementById("itin-status");
  if (!el) return;
  el.textContent = msg || "";
  el.className = "itin-status" + (kind ? " " + kind : "");
}

function itinMicSupported() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

function itinStartVoice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { itinSetStatus("Voice input isn't supported in this browser — type your request instead.", "warn"); return; }
  if (itinState.listening) return;
  const rec = new SR();
  rec.lang = "en-US";
  rec.interimResults = true;
  rec.continuous = false;
  itinState.listening = true;
  itinState._rec = rec;
  const micBtn = document.getElementById("itin-mic");
  if (micBtn) micBtn.classList.add("listening");
  itinSetStatus("Listening…", "info");
  rec.onresult = (e) => {
    let text = "";
    for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
    const promptEl = document.getElementById("itin-prompt");
    if (promptEl) promptEl.value = text;
    itinState.transcript = text;
  };
  rec.onerror = (e) => { itinSetStatus(`Voice input error: ${e.error || "unknown"}`, "warn"); };
  rec.onend = () => {
    itinState.listening = false;
    if (micBtn) micBtn.classList.remove("listening");
    itinSetStatus("");
  };
  try { rec.start(); } catch { itinState.listening = false; }
}
function itinStopVoice() { if (itinState._rec) { try { itinState._rec.stop(); } catch {} } }

async function itinRunPipeline(text) {
  if (!text || !text.trim()) { itinSetStatus("Describe your trip first — try one of the examples below.", "warn"); return; }
  itinState.parsing = true;
  itinRender();
  itinSetStatus("Reading your request…", "info");
  const criteria = await itinParsePrompt(text.trim());
  itinState.criteria = criteria;
  itinState.parsing = false;
  itinState.building = true;
  itinRender();
  itinSetStatus("Routing wineries…", "info");
  try {
    itinState.plan = await itinBuildPlan(criteria);
    itinState.error = null;
  } catch (e) {
    console.error(e);
    itinState.error = "Couldn't build an itinerary from that — try adjusting the details below.";
    itinState.plan = null;
  }
  itinState.building = false;
  itinSetStatus("");
  itinRender();
}

function itinReadCriteriaForm() {
  const base = itinState.criteria || itinLocalParse("");
  const val = (id) => { const el = document.getElementById(id); return el ? el.value : null; };
  const checked = (id) => { const el = document.getElementById(id); return el ? el.checked : false; };
  return {
    ...base,
    date: val("itin-f-date") || base.date,
    startTime: val("itin-f-start") || base.startTime,
    endTime: val("itin-f-end") || base.endTime,
    valley: val("itin-f-valley") || base.valley,
    dogs: checked("itin-f-dogs"),
    kids: checked("itin-f-kids"),
    partySize: Number(val("itin-f-party")) || base.partySize,
    numStops: Number(val("itin-f-stops")) || base.numStops,
    startLocation: val("itin-f-start-loc") || null,
  };
}

async function itinRebuild() {
  const criteria = itinReadCriteriaForm();
  itinState.criteria = criteria;
  itinState.building = true;
  itinRender();
  try {
    itinState.plan = await itinBuildPlan(criteria);
    itinState.error = null;
  } catch (e) {
    console.error(e);
    itinState.error = "Couldn't build an itinerary from that — try adjusting the details below.";
    itinState.plan = null;
  }
  itinState.building = false;
  itinRender();
}

/* ── markup builders ─────────────────────────────────────────────── */
function itinCriteriaFormHtml(c) {
  const valleyOpt = (v, label) => `<option value="${v}" ${c.valley === v ? "selected" : ""}>${label}</option>`;
  const placeOpt = (key) => `<option value="${key}" ${c.startLocation === key ? "selected" : ""}>${ITIN_PLACES[key].label}</option>`;
  return `
    <div class="itin-criteria-card">
      <div class="itin-crit-grid">
        <label>Date <input type="date" id="itin-f-date" value="${itinEsc(c.date)}"></label>
        <label>Start <input type="time" id="itin-f-start" value="${itinEsc(c.startTime)}"></label>
        <label>Back by <input type="time" id="itin-f-end" value="${itinEsc(c.endTime)}"></label>
        <label>Valley
          <select id="itin-f-valley">
            ${valleyOpt("Both", "Napa + Sonoma")}${valleyOpt("Napa", "Napa")}${valleyOpt("Sonoma", "Sonoma")}
          </select>
        </label>
        <label>Starting near
          <select id="itin-f-start-loc">
            <option value="">Auto (${itinEsc(c.valley === "Both" ? "Napa" : c.valley)})</option>
            ${Object.keys(ITIN_PLACES).map(placeOpt).join("")}
          </select>
        </label>
        <label># Stops <input type="number" id="itin-f-stops" min="1" max="6" value="${c.numStops}"></label>
        <label>Party size <input type="number" id="itin-f-party" min="1" max="20" value="${c.partySize}"></label>
        <label class="itin-check"><input type="checkbox" id="itin-f-dogs" ${c.dogs ? "checked" : ""}> Bringing a dog</label>
        <label class="itin-check"><input type="checkbox" id="itin-f-kids" ${c.kids ? "checked" : ""}> Bringing kids/baby</label>
      </div>
      ${c.mustInclude && c.mustInclude.length ? `<div class="itin-must">Must include: ${c.mustInclude.map((s) => { const w = WINERIES.find((x) => x.slug === s); return w ? itinEsc(w.name) : s; }).join(", ")}</div>` : ""}
      <button id="itin-update" class="btn-primary small">Update route</button>
    </div>`;
}

function itinBadge(label, cls) { return `<span class="itin-badge ${cls}">${label}</span>`; }
function itinDogBadge(w) {
  if (w.dogFriendly === "yes") return itinBadge("🐾 Dog-friendly", "ok");
  if (w.dogFriendly === "outdoor-only") return itinBadge("🐾 Dogs outdoors only", "warn");
  return itinBadge("🐾 No dogs", "no");
}
function itinKidBadge(w) {
  if (w.kidFriendly === "yes") return itinBadge("👶 Kid-friendly", "ok");
  if (w.kidFriendly === "limited") return itinBadge("👶 Limited for kids", "warn");
  return itinBadge("👶 21+ / no kids", "no");
}
function itinResBadge(w) {
  if (w.reservationRequired === "required") return itinBadge("📅 Reservation required", "warn");
  if (w.reservationRequired === "recommended") return itinBadge("📅 Reservation recommended", "info");
  return itinBadge("📅 Walk-ins OK", "ok");
}

function itinStopCardHtml(stop, idx) {
  const w = stop.winery;
  const notes = [];
  if (w.hoursNote) notes.push(w.hoursNote);
  if (w.reservationNote) notes.push(w.reservationNote);
  if (stop.hoursFlag === "waited-for-open") notes.push("Arrival adjusted — this stop doesn't open until later.");
  if (stop.hoursFlag === "by-appointment") notes.push("No fixed walk-in hours — confirm your appointment time directly.");
  return `
    <div class="itin-stop" data-slug="${w.slug}">
      <div class="itin-stop-num">${idx + 1}</div>
      <div class="itin-stop-body">
        <div class="itin-stop-head">
          <span class="valley-tag ${w.valley}">${w.valley}</span>
          <b class="itin-stop-name">${itinEsc(w.name)}</b>
          <span class="itin-stop-time">${itinMinutesToClock(stop.arrival)} – ${itinMinutesToClock(stop.departure)}</span>
        </div>
        <div class="itin-stop-drive">${idx === 0 ? "From your start point" : "From previous stop"}: ~${stop.driveMinFromPrev} min drive</div>
        <div class="itin-badges">${itinDogBadge(w)}${itinKidBadge(w)}${itinResBadge(w)}</div>
        <div class="itin-stop-meta">
          ${w.tastingFee ? `<span>${itinEsc(w.tastingFee)}</span>` : ""}
          ${w.website ? `<a href="${itinEsc(w.website)}" target="_blank" rel="noopener">Visit website ↗</a>` : ""}
        </div>
        ${notes.length ? `<div class="itin-stop-note">${notes.map(itinEsc).join(" · ")}</div>` : ""}
      </div>
    </div>`;
}

function itinWarningsHtml(plan) {
  const items = [];
  if (plan.skippedClosed.length) items.push(`Closed that day, so left out: ${plan.skippedClosed.map((w) => itinEsc(w.name)).join(", ")}.`);
  if (plan.skippedPolicy.length) items.push(`Didn't match your dog/kid requirements, so left out: ${plan.skippedPolicy.map((w) => itinEsc(w.name)).join(", ")}.`);
  if (plan.trimmed.length) items.push(`Trimmed to fit your time window: ${plan.trimmed.map((w) => itinEsc(w.name)).join(", ")}.`);
  if (!plan.stops.length) items.push("No open wineries matched these constraints — try widening the valley, date, or time window.");
  if (!items.length) return "";
  return `<div class="itin-warnings">${items.map((t) => `<div>⚠️ ${t}</div>`).join("")}</div>`;
}

function itinPlanHtml(plan) {
  if (!plan) return "";
  const totalDriveMin = plan.stops.reduce((s, x) => s + x.driveMinFromPrev, 0);
  const lastDeparture = plan.stops.length ? plan.stops[plan.stops.length - 1].departure : null;
  return `
    ${itinWarningsHtml(plan)}
    ${plan.stops.length ? `
    <div class="itin-summary-bar">
      <div><b>${plan.stops.length}</b> stop${plan.stops.length === 1 ? "" : "s"}</div>
      <div><b>~${totalDriveMin} min</b> total driving</div>
      <div><b>$${plan.totalCost.toFixed(0)}</b> est. tasting fees (${plan.criteria.partySize} ${plan.criteria.partySize === 1 ? "person" : "people"})</div>
      ${lastDeparture ? `<div>Done by <b>${itinMinutesToClock(lastDeparture)}</b></div>` : ""}
      ${plan.reservationsNeeded.length ? `<div class="itin-res-flag">📅 ${plan.reservationsNeeded.length} need${plan.reservationsNeeded.length === 1 ? "s" : ""} a booked reservation</div>` : ""}
    </div>
    <div class="itin-layout">
      <div class="itin-timeline">
        <div class="itin-stop itin-start">
          <div class="itin-stop-num">•</div>
          <div class="itin-stop-body"><b>${itinEsc(plan.startLabel)}</b><div class="itin-stop-drive">Depart ${itinMinutesToClock(itinClockToMinutes(plan.criteria.startTime))}</div></div>
        </div>
        ${plan.stops.map((s, i) => itinStopCardHtml(s, i)).join("")}
      </div>
      <div id="itin-route-map" class="itin-route-map"></div>
    </div>` : ""}
    <div class="itin-disclaimer">Hours, fees, and pet/kid policies are researched estimates — always confirm directly with the winery before you go. Drive times are ${window.APP_CONFIG && window.APP_CONFIG.googleMapsApiKey ? "from Google Maps" : "straight-line estimates"} and don't account for traffic.</div>`;
}

let itinMap = null;
function itinRenderRouteMap(plan) {
  const el = document.getElementById("itin-route-map");
  if (!el || !plan || !plan.stops.length || typeof L === "undefined") return;
  if (itinMap) { itinMap.remove(); itinMap = null; }
  itinMap = L.map(el, { scrollWheelZoom: false });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", { maxZoom: 18 }).addTo(itinMap);
  const start = itinResolveStart(plan.criteria);
  const pts = [[start.lat, start.lng], ...plan.stops.map((s) => [s.winery.lat, s.winery.lng])];
  const numberIcon = (n, color) => L.divIcon({
    className: "itin-map-pin",
    html: `<span style="background:${color}">${n}</span>`,
    iconSize: [26, 26], iconAnchor: [13, 13],
  });
  L.marker(pts[0], { icon: numberIcon("•", "#5c534d") }).addTo(itinMap).bindTooltip(plan.startLabel);
  plan.stops.forEach((s, i) => {
    const color = s.winery.valley === "Napa" ? "#8e2f45" : "#3a7d44";
    L.marker([s.winery.lat, s.winery.lng], { icon: numberIcon(i + 1, color) }).addTo(itinMap).bindTooltip(s.winery.name);
  });
  L.polyline(pts, { color: "#a87c1f", weight: 3, opacity: 0.8, dashArray: "6 6" }).addTo(itinMap);
  itinMap.fitBounds(L.latLngBounds(pts).pad(0.25));
  setTimeout(() => itinMap && itinMap.invalidateSize(), 60);
}

function itinRender() {
  const root = document.getElementById("itinerary");
  if (!root) return;
  const c = itinState.criteria;
  root.innerHTML = `
    <div class="itin-hero">
      <h2>Plan your day, out loud</h2>
      <p class="itin-sub">Describe the trip — who's coming, dogs, budget, must-visit wineries — and get a routed, timed itinerary that only includes places open that day.</p>
      <div class="itin-prompt-row">
        <textarea id="itin-prompt" rows="2" placeholder="e.g. Sonoma this Saturday, 3 wineries, we have a dog and a toddler, back by 5pm">${itinEsc(itinState.transcript)}</textarea>
        <div class="itin-prompt-actions">
          <button id="itin-mic" class="icon-btn ${itinState.listening ? "listening" : ""}" title="${itinMicSupported() ? "Voice input" : "Voice input not supported in this browser"}" ${itinMicSupported() ? "" : "disabled"}>🎤</button>
          <button id="itin-build" class="btn-primary" ${itinState.parsing || itinState.building ? "disabled" : ""}>${itinState.parsing ? "Reading…" : itinState.building ? "Routing…" : "Build itinerary"}</button>
        </div>
      </div>
      <div class="itin-examples">${ITIN_EXAMPLES.map((ex) => `<button class="itin-chip" data-ex="${itinEsc(ex)}">${itinEsc(ex)}</button>`).join("")}</div>
      <div id="itin-status" class="itin-status"></div>
    </div>
    ${c ? itinCriteriaFormHtml(c) : ""}
    ${itinState.error ? `<div class="itin-warnings"><div>⚠️ ${itinEsc(itinState.error)}</div></div>` : ""}
    <div id="itin-plan">${itinPlanHtml(itinState.plan)}</div>
  `;

  const promptEl = document.getElementById("itin-prompt");
  if (promptEl) promptEl.addEventListener("input", (e) => { itinState.transcript = e.target.value; });
  const micBtn = document.getElementById("itin-mic");
  if (micBtn) micBtn.addEventListener("click", () => (itinState.listening ? itinStopVoice() : itinStartVoice()));
  const buildBtn = document.getElementById("itin-build");
  if (buildBtn) buildBtn.addEventListener("click", () => itinRunPipeline(iq("#itin-prompt").value));
  iqa(".itin-chip").forEach((chip) => chip.addEventListener("click", () => {
    itinState.transcript = chip.dataset.ex;
    itinRunPipeline(chip.dataset.ex);
  }));
  const updateBtn = document.getElementById("itin-update");
  if (updateBtn) updateBtn.addEventListener("click", itinRebuild);

  if (itinState.plan && itinState.plan.stops.length) itinRenderRouteMap(itinState.plan);
}

window.itinItinerary = {
  state: itinState,
  parsePrompt: itinParsePrompt,
  buildPlan: itinBuildPlan,
  minutesToClock: itinMinutesToClock,
  render: itinRender,
};
