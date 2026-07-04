/* Winery Explorer — table / map / lineage views over WINERIES (data.js).
   Images are optional: IMG manifest (manifest.js) maps slug → {property, label};
   anything missing falls back to a placeholder. */

const IMG = window.IMG || {};
const $ = (sel) => document.querySelector(sel);

const state = {
  view: "table",
  valley: "All",
  query: "",
  sort: { key: "prestige", dir: -1 },
  grouped: false,
  expandedRegions: new Set(),
  mapWine: new Set(),
  mapKnown: new Set(),
  mapFocus: null,
};

const fmtPrice = (w) => `$${w.priceRange[0]}–$${w.priceRange[1]}`;
const propertyImg = (w) => (IMG[w.slug] && IMG[w.slug].property) || null;
const labelImg = (w) => (IMG[w.slug] && IMG[w.slug].label) || null;
const logoImg = (w) => (IMG[w.slug] && IMG[w.slug].logo) || null;
function monogram(w) {
  return w.name.replace(/^(The|Château|Chateau)\s+/i, "")
    .split(/\s+/).filter((x) => /[A-Za-z]/.test(x)).slice(0, 2)
    .map((x) => x[0].toUpperCase()).join("");
}

/* ── Prestige rating ──
   Editorial acclaim tier (ACCLAIM, 1–5) is the backbone; a Wine Spectator Top 100
   appearance adds a capped "current buzz" boost and a half-star. Icons stay on top;
   WS presence breaks ties within a tier. */
const ACCLAIM_MAP = (typeof ACCLAIM !== "undefined") ? ACCLAIM : {};
const KFX = (typeof KNOWN_FOR_EXTRA !== "undefined") ? KNOWN_FOR_EXTRA : {};

// Wine-type filter buckets, matched against each winery's wine names.
const WINE_TYPES = [
  { key: "Cabernet", re: /cabernet/i },
  { key: "Pinot Noir", re: /pinot noir/i },
  { key: "Chardonnay", re: /chardonnay/i },
  { key: "Zinfandel", re: /zinfandel/i },
  { key: "Sauvignon Blanc", re: /sauvignon blanc/i },
  { key: "Sparkling", re: /sparkling|\bbrut\b|blanc de (blancs|noirs)|méthode|champagne/i },
];
// "Known for" filter categories.
const KNOWN_FOR = [
  { key: "architecture", label: "Architecture" },
  { key: "history", label: "History & heritage" },
  { key: "gardens", label: "Gardens & grounds" },
  { key: "food-art", label: "Food & art" },
];

function enrichWineries() {
  WINERIES.forEach((w) => {
    // Prestige rating
    const a = ACCLAIM_MAP[w.slug] || 3;
    const apps = (window.WS_TOP100 || []).filter((e) => e.winerySlug === w.slug);
    let ws = 0;
    apps.forEach((e) => { ws += (101 - e.rank) * 0.15 + Math.max(0, e.score - 90); });
    ws = Math.min(ws, 14);
    let bonus = 0;
    if (w.storyTags.includes("judgment-of-paris")) bonus += 5;
    if (w.storyTags.includes("architecture")) bonus += 2;
    w._acclaim = a;
    w._wsCount = apps.length;
    w._prestige = Math.round((a * 20 + ws + bonus) * 10) / 10;
    w._stars = Math.min(5, a + (apps.length ? 0.5 : 0));

    // Wine types (from the famous-wines list)
    const wineText = w.wines.map((x) => x.name).join(" | ");
    w._wineTypes = new Set(WINE_TYPES.filter((t) => t.re.test(wineText)).map((t) => t.key));

    // Known-for tags: derive history + book architecture, then merge curated extras
    const kf = new Set();
    if (w.storyTags.includes("architecture")) kf.add("architecture");
    if (w.vibeTags.includes("Historic")
        || w.storyTags.some((t) => ["resurrected", "site-reuse", "judgment-of-paris"].includes(t))) kf.add("history");
    Object.keys(KFX).forEach((cat) => { if (KFX[cat].includes(w.slug)) kf.add(cat); });
    w._knownFor = kf;
  });
  // Prestige rank (1 = most prestigious) for the map's "top N" set
  [...WINERIES].sort((x, y) => y._prestige - x._prestige).forEach((w, i) => { w._rank = i + 1; });
}
enrichWineries();
const MAP_TOP_N = 25;

// ── Corporate-group display (table) ──
const GN = (typeof GROUP_NOTES !== "undefined") ? GROUP_NOTES : {};
function groupColorClass(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return "gc" + (h % 8);
}
function groupCellHTML(w) {
  if (GN[w.group]) return `<span class="group-chip ${groupColorClass(w.group)}" title="${w.group}">${w.group}</span>`;
  const fam = w.group.replace(/^Independent\s*\(/, "").replace(/\)$/, "");
  return `<span class="indie" title="Independent — ${fam}">Independent</span>`;
}

// First sentence of a vibe, protecting common abbreviations (St. Helena, Mt. Veeder…).
function firstSentence(t) {
  const s = t.replace(/U\.S\.A\.|U\.S\.|Ph\.D\./g, (m) => m.replace(/\./g, ""))
             .replace(/\b(St|Mt|Ste|Dr|Mr|Mrs|Ms|Jr|Sr|No|Ave|Rd|Hwy|vs|etc|Inc|Co)\./g, "$1§");
  const m = s.match(/^[^.!?]*[.!?]/);
  return (m ? m[0] : s).split("§").join(".").trim();
}
// Popup description: a curated, name-free highlight where we have one, else the
// first sentence of the vibe.
const BLURBS = (typeof BLURB !== "undefined") ? BLURB : {};
function popupDesc(w) { return BLURBS[w.slug] || firstSentence(w.vibe); }
// Only the essential recognition badges for the map popup.
function popupBadges(w) {
  const b = [];
  if (w._wsCount) {
    const best = Math.min(...(window.WS_TOP100 || []).filter((e) => e.winerySlug === w.slug).map((e) => e.rank));
    b.push(`<span class="mb winner">🏆 Top 100 · #${best}</span>`);
  }
  if (w.storyTags.includes("judgment-of-paris")) b.push(`<span class="mb jop">🥇 Judgment of Paris</span>`);
  if (w.storyTags.includes("architecture")) b.push(`<span class="mb book">📖 New Architecture</span>`);
  return b.join("");
}

function starsHTML(n) {
  const pct = (n / 5) * 100;
  return `<span class="stars" title="Prestige ${n}/5" aria-label="${n} of 5">`
    + `<span class="stars-bg">★★★★★</span>`
    + `<span class="stars-fill" style="width:${pct}%">★★★★★</span></span>`;
}

/* Normalize the ~33 raw AVA strings into ~15 canonical regions for grouping. */
function regionOf(w) {
  const a = w.ava;
  if (/carneros/i.test(a)) return "Carneros";
  if (/fort ross|sonoma coast/i.test(a)) return "Sonoma Coast";
  if (/green valley|russian river/i.test(a)) return "Russian River Valley";
  let r = a.split("/")[0].replace(/\s*\(.*/, "").trim();
  if (/diamond mountain/i.test(r)) r = "Calistoga";
  return r;
}

function filtered() {
  const q = state.query.trim().toLowerCase();
  return WINERIES.filter((w) => {
    if (state.valley !== "All" && w.valley !== state.valley) return false;
    if (!q) return true;
    const hay = [
      w.name, w.ava, w.vibe, w.owner, w.group, w.founder, w.funFact,
      w.vibeTags.join(" "),
      w.wines.map((x) => x.name + " " + x.why).join(" "),
      w.history.map((h) => h.t).join(" "),
      w.awards.join(" "),
    ].join(" ").toLowerCase();
    return hay.includes(q);
  });
}

function sorted(list) {
  const { key, dir } = state.sort;
  return [...list].sort((a, b) => {
    let va, vb;
    if (key === "name") { va = a.name; vb = b.name; return va.localeCompare(vb) * dir; }
    if (key === "group") {
      // corporate groups first, clustered by name; independents after; prestige within
      const ga = (GN[a.group] ? "0" : "1") + a.group;
      const gb = (GN[b.group] ? "0" : "1") + b.group;
      if (ga === gb) return b._prestige - a._prestige;
      return ga.localeCompare(gb) * dir;
    }
    if (key === "price") { va = a.priceRange[0]; vb = b.priceRange[0]; }
    else if (key === "prestige") { va = a._prestige; vb = b._prestige; }
    else { va = a[key]; vb = b[key]; }
    if (va === vb) return b._prestige - a._prestige; // stable secondary sort by prestige
    return (va - vb) * dir;
  });
}

/* ── Table view ── */
const NCOLS = 10;
function tableRow(w) {
  const img = propertyImg(w);
  const thumb = img
    ? `<img class="thumb" src="${img}" alt="" loading="lazy">`
    : `<span class="thumb placeholder">🍷</span>`;
  const badges = w.storyTags.map((t) => t === "architecture"
    ? `<span class="badge badge-arch" title="Featured in 'The New Architecture of Wine' (Hebert, 2019)">📖 New Architecture</span>`
    : `<span class="badge">${STORY_TAG_LABELS[t].label}</span>`).join("");
  return `<tr data-slug="${w.slug}">
    <td><div class="w-name">${thumb}<span><b>${w.name}</b><span class="ava">${w.ava}</span></span></div></td>
    <td class="prestige-cell">${starsHTML(w._stars)}</td>
    <td><span class="valley-tag ${w.valley}">${w.valley}</span></td>
    <td class="group-cell">${groupCellHTML(w)}</td>
    <td class="founded">${w.founded}</td>
    <td class="wines">${w.wines.map((x) => x.name).join(" · ")}</td>
    <td><span class="vibe-tags">${w.vibeTags.map((t) => `<span>${t}</span>`).join("")}</span></td>
    <td class="price">${fmtPrice(w)}</td>
    <td class="tours">${w.tours.startsWith("Yes") ? "✓ Tours"
      : /currently closed/i.test(w.tours) ? "✕ Closed"
      : /closed for renovation/i.test(w.tours) ? "△ Off-site"
      : "Tastings"}</td>
    <td>${badges || `<span style="color:var(--muted)">—</span>`}</td>
  </tr>`;
}

function renderTable() {
  const list = sorted(filtered());
  const arrow = (k) => state.sort.key === k ? `<span class="arrow">${state.sort.dir === 1 ? "▲" : "▼"}</span>` : "";
  const searching = !!state.query.trim();

  let body;
  if (!state.grouped) {
    body = `<tbody>${list.map(tableRow).join("") || `<tr><td colspan="${NCOLS}" class="empty-row">No wineries match.</td></tr>`}</tbody>`;
  } else {
    const groups = {};
    list.forEach((w) => { const r = regionOf(w); (groups[r] = groups[r] || []).push(w); });
    const ordered = Object.entries(groups)
      .map(([r, ws]) => ({ r, ws, lat: ws.reduce((a, w) => a + w.lat, 0) / ws.length }))
      .sort((a, b) => b.lat - a.lat); // north → south
    body = ordered.map(({ r, ws }) => {
      const open = searching || state.expandedRegions.has(r);
      const valleys = [...new Set(ws.map((w) => w.valley))]
        .map((v) => `<span class="valley-tag ${v}">${v}</span>`).join("");
      const head = `<tr class="region-head ${open ? "open" : ""}" data-region="${r}">
        <td colspan="${NCOLS}"><span class="caret">${open ? "▾" : "▸"}</span> <b>${r}</b> ${valleys}
        <span class="rcount">${ws.length} winer${ws.length > 1 ? "ies" : "y"}</span></td></tr>`;
      return `<tbody class="region">${head}${open ? ws.map(tableRow).join("") : ""}</tbody>`;
    }).join("") || `<tbody><tr><td colspan="${NCOLS}" class="empty-row">No wineries match.</td></tr></tbody>`;
  }

  $("#table-view").innerHTML = `
    <div class="table-controls">
      <span class="seg small">
        <button class="chip ${!state.grouped ? "active" : ""}" data-group="0">Flat list</button>
        <button class="chip ${state.grouped ? "active" : ""}" data-group="1">By region · N→S</button>
      </span>
      ${state.grouped && !searching ? `<button class="link-btn" id="toggle-all-regions">${state.expandedRegions.size ? "Collapse all" : "Expand all"}</button>` : ""}
    </div>
    <div class="table-wrap"><table>
    <thead><tr>
      <th class="sortable" data-sort="name">Winery ${arrow("name")}</th>
      <th class="sortable" data-sort="prestige">Prestige ${arrow("prestige")}</th>
      <th>Valley</th>
      <th class="sortable" data-sort="group">Group ${arrow("group")}</th>
      <th class="sortable" data-sort="founded">Founded ${arrow("founded")}</th>
      <th>Famous for</th>
      <th>Vibe</th>
      <th class="sortable" data-sort="price">Bottle $ ${arrow("price")}</th>
      <th>Visits</th>
      <th>Story</th>
    </tr></thead>
    ${body}
  </table></div>`;

  document.querySelectorAll("#table-view th.sortable").forEach((th) => {
    th.addEventListener("click", () => {
      const k = th.dataset.sort;
      if (state.sort.key === k) state.sort.dir *= -1;
      else state.sort = { key: k, dir: k === "prestige" ? -1 : 1 };
      renderTable();
    });
  });
  document.querySelectorAll("#table-view .chip[data-group]").forEach((b) => {
    b.addEventListener("click", () => { state.grouped = b.dataset.group === "1"; renderTable(); });
  });
  const toggleAll = $("#toggle-all-regions");
  if (toggleAll) toggleAll.addEventListener("click", () => {
    if (state.expandedRegions.size) state.expandedRegions.clear();
    else {
      const groups = new Set(filtered().map(regionOf));
      state.expandedRegions = groups;
    }
    renderTable();
  });
  document.querySelectorAll("#table-view .region-head").forEach((h) => {
    h.addEventListener("click", () => {
      const r = h.dataset.region;
      if (state.expandedRegions.has(r)) state.expandedRegions.delete(r);
      else state.expandedRegions.add(r);
      renderTable();
    });
  });
  document.querySelectorAll("#table-view tbody tr[data-slug]").forEach((tr) => {
    tr.addEventListener("click", () => openDrawer(tr.dataset.slug));
  });
  $(".count").textContent = `${list.length} of ${WINERIES.length} wineries`;
}

/* ── Map view ── */
let map, markerLayer;
const VALLEY_COLOR = { Napa: getComputedStyle(document.documentElement).getPropertyValue("--napa").trim() || "#8e2f45",
                       Sonoma: getComputedStyle(document.documentElement).getPropertyValue("--sonoma").trim() || "#3a7d44" };

function initMap() {
  if (map) return;
  map = L.map("map", { scrollWheelZoom: true }).setView([38.47, -122.62], 10);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 18,
  }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
}

// Which wineries land on the map: valley + search always apply. If any map
// filter is active we search ALL wineries that match; otherwise we show just the
// top N most prestigious.
function mapList() {
  if (state.mapFocus) {
    const w = WINERIES.find((x) => x.slug === state.mapFocus);
    return w ? [w] : [];
  }
  const base = filtered();
  const filtersActive = state.mapWine.size || state.mapKnown.size;
  return base.filter((w) => {
    if (state.mapWine.size && ![...state.mapWine].some((t) => w._wineTypes.has(t))) return false;
    if (state.mapKnown.size && ![...state.mapKnown].some((t) => w._knownFor.has(t))) return false;
    if (!filtersActive && w._rank > MAP_TOP_N) return false;
    return true;
  });
}

function markerIcon(w) {
  const logo = logoImg(w);
  const inner = logo
    ? `<img src="${logo}" alt="${w.name}">`
    : `<span class="mono">${monogram(w)}</span>`;
  return L.divIcon({
    className: "logo-marker",
    html: `<div class="lm ${w.valley}" title="${w.name}">${inner}</div>`,
    iconSize: [38, 38], iconAnchor: [19, 19], popupAnchor: [0, -20],
  });
}

function renderMap() {
  initMap();
  markerLayer.clearLayers();
  const list = mapList();
  let focusMarker = null;
  list.forEach((w) => {
    const m = L.marker([w.lat, w.lng], { icon: markerIcon(w), riseOnHover: true });
    const img = propertyImg(w);
    const badges = popupBadges(w);
    m.bindPopup(`<div class="popup-card">
        ${img ? `<img src="${img}" alt="${w.name}">` : ""}
        <b>${w.name}</b>
        <div class="meta">${starsHTML(w._stars)} · ${w.valley} · ${w.ava}<br>est. ${w.founded} · ${w.wines[0].name} · ${fmtPrice(w)}</div>
        <p class="pc-desc">${popupDesc(w)}</p>
        ${badges ? `<div class="pc-badges">${badges}</div>` : ""}
        <button onclick="openDrawer('${w.slug}')">Full story →</button>
      </div>`, { maxWidth: 288 });
    m.bindTooltip(w.name, { direction: "top", offset: [0, -20] });
    markerLayer.addLayer(m);
    if (state.mapFocus === w.slug) focusMarker = m;
  });
  if (state.mapFocus && focusMarker) {
    const w = list[0];
    map.setView([w.lat, w.lng], 13, { animate: false });
    focusMarker.openPopup();
  } else if (list.length) {
    map.fitBounds(L.latLngBounds(list.map((w) => [w.lat, w.lng])).pad(0.15));
  }
  renderMapFilters();
  renderMapIndex();
  const filtersActive = state.mapWine.size || state.mapKnown.size;
  $(".count").textContent = state.mapFocus ? "1 winery"
    : filtersActive ? `${list.length} match${list.length === 1 ? "" : "es"}`
    : `Top ${list.length} by prestige`;
}

// Right-side scrollable index: tap a name to isolate that winery on the map.
function renderMapIndex() {
  const el = $("#map-index");
  if (!el) return;
  const items = filtered().slice().sort((a, b) => a.name.localeCompare(b.name));
  el.innerHTML = `
    <div class="mi-head">${state.mapFocus
      ? `<button class="link-btn" id="mi-clear">← Show all pins</button>`
      : `<span>${items.length} wineries · tap to locate</span>`}</div>
    <ul>${items.map((w) => `<li class="mi-item ${state.mapFocus === w.slug ? "active" : ""}" data-slug="${w.slug}">
      <span class="mi-dot ${w.valley}"></span><span class="mi-name">${w.name}</span></li>`).join("")}</ul>`;
  el.querySelectorAll(".mi-item").forEach((li) => li.addEventListener("click", () => {
    state.mapFocus = state.mapFocus === li.dataset.slug ? null : li.dataset.slug;
    renderMap();
  }));
  const clr = $("#mi-clear");
  if (clr) clr.addEventListener("click", () => { state.mapFocus = null; renderMap(); });
  const active = el.querySelector(".mi-item.active");
  if (active) active.scrollIntoView({ block: "nearest" });
}

function renderMapFilters() {
  const bar = $("#map-filters");
  if (!bar) return;
  const wineChips = WINE_TYPES.map((t) =>
    `<button class="fchip ${state.mapWine.has(t.key) ? "active" : ""}" data-wine="${t.key}">${t.key}</button>`).join("");
  const knownChips = KNOWN_FOR.map((t) =>
    `<button class="fchip ${state.mapKnown.has(t.key) ? "active" : ""}" data-known="${t.key}">${t.label}</button>`).join("");
  const active = state.mapWine.size || state.mapKnown.size;
  bar.innerHTML = `
    <div class="fgroup"><span class="flabel">Wine</span>${wineChips}</div>
    <div class="fgroup"><span class="flabel">Known for</span>${knownChips}</div>
    ${active ? `<button class="link-btn" id="map-clear">Clear · back to top ${MAP_TOP_N}</button>` : ""}`;
  bar.querySelectorAll("[data-wine]").forEach((b) => b.addEventListener("click", () => {
    state.mapFocus = null; toggleSet(state.mapWine, b.dataset.wine); renderMap();
  }));
  bar.querySelectorAll("[data-known]").forEach((b) => b.addEventListener("click", () => {
    state.mapFocus = null; toggleSet(state.mapKnown, b.dataset.known); renderMap();
  }));
  const clear = $("#map-clear");
  if (clear) clear.addEventListener("click", () => { state.mapFocus = null; state.mapWine.clear(); state.mapKnown.clear(); renderMap(); });
}
function toggleSet(set, key) { set.has(key) ? set.delete(key) : set.add(key); }

/* ── Lineage view ── */
function renderLineage() {
  const bySlug = Object.fromEntries(WINERIES.map((w) => [w.slug, w]));
  const link = (w, sub) =>
    `<li><a onclick="openDrawer('${w.slug}')">${w.name}</a> <span class="valley-tag ${w.valley}" style="font-size:10.5px">${w.valley}</span>${sub ? `<span class="sub">${sub}</span>` : ""}</li>`;

  // Corporate families (groups with notes, i.e. non-independent)
  const groups = {};
  WINERIES.forEach((w) => {
    if (GROUP_NOTES[w.group]) (groups[w.group] = groups[w.group] || []).push(w);
  });
  const corpCards = Object.entries(groups)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([g, ws]) => `<div class="lineage-card">
      <h3>${g}</h3>
      <p class="note">${GROUP_NOTES[g]}</p>
      <ul>${ws.map((w) => link(w, `est. ${w.founded} · ${w.ava}`)).join("")}</ul>
    </div>`).join("");

  const independents = WINERIES.filter((w) => !GROUP_NOTES[w.group]);
  const indieCard = `<div class="lineage-card">
      <h3>Still independent</h3>
      <p class="note">Family- or founder-owned estates that have never been folded into a conglomerate — an increasingly rare club.</p>
      <ul>${independents.map((w) => link(w, w.group.replace("Independent (", "").replace(")", ""))).join("")}</ul>
    </div>`;

  // Story sections from tags
  const storyCards = Object.entries(STORY_TAG_LABELS)
    .filter(([tag]) => tag === "resurrected" || tag === "site-reuse" || tag === "judgment-of-paris")
    .map(([tag, info]) => {
      const ws = WINERIES.filter((w) => w.storyTags.includes(tag));
      if (!ws.length) return "";
      return `<div class="lineage-card">
        <h3>${info.label}</h3>
        <p class="note">${info.desc}</p>
        <ul>${ws.map((w) => {
          const key = w.history.find((h) => tag === "judgment-of-paris" ? /paris/i.test(h.t) : true);
          return link(w, key ? `${key.y} — ${key.t.slice(0, 90)}${key.t.length > 90 ? "…" : ""}` : "");
        }).join("")}</ul>
      </div>`;
    }).join("");

  $("#lineage").innerHTML = `
    <h2>Who owns whom</h2>
    <p class="section-desc">The defining business story of Napa & Sonoma: pioneering family estates absorbed by global drinks groups — while a stubborn handful stay independent. Click any winery for its full history.</p>
    <div class="lineage-grid">${corpCards}${indieCard}</div>
    <h2>Deaths, resurrections & reused bones</h2>
    <p class="section-desc">Phylloxera (1880s–90s), the 1906 earthquake, and Prohibition (1920–33) killed most first-generation wineries. The modern era has been one long act of resurrection — new money moving into old stone.</p>
    <div class="lineage-grid">${storyCards}</div>
    <h2>The New Architecture of Wine</h2>
    <p class="section-desc">${STORY_TAG_LABELS["architecture"].desc} All the book's Napa & Sonoma subjects are in this explorer (its other four — Presqu'ile, Law Estate, Saxum, Epoch — are in Santa Barbara and Paso Robles).</p>
    <div class="lineage-grid">${["Napa", "Sonoma"].map((v) => {
      const ws = WINERIES.filter((w) => w.architect && w.valley === v);
      return `<div class="lineage-card">
        <h3>${v === "Napa" ? "Napa Valley" : "Sonoma County"} chapters</h3>
        <p class="note">${ws.length} of the book's 25 wineries.</p>
        <ul>${ws.map((w) => link(w, `${w.architect}${w.bookSection ? " · “" + w.bookSection + "”" : ""}`)).join("")}</ul>
      </div>`;
    }).join("")}</div>`;
  $(".count").textContent = `${WINERIES.length} wineries`;
}

/* ── Awards leaderboard (Wine Spectator Top 100) ── */
let awardYear = "All";
function renderAwards() {
  const data = (window.WS_TOP100 || []).filter((e) => {
    if (state.valley !== "All" && e.valley !== state.valley) return false;
    if (awardYear !== "All" && e.year !== awardYear) return false;
    const q = state.query.trim().toLowerCase();
    if (q && !(e.wine + " " + e.winery).toLowerCase().includes(q)) return false;
    return true;
  }).sort((a, b) => b.year - a.year || a.rank - b.rank);

  const years = [...new Set((window.WS_TOP100 || []).map((e) => e.year))].sort((a, b) => b - a);
  const yearChips = ["All", ...years].map((y) =>
    `<button class="chip ${awardYear === y ? "active" : ""}" data-year="${y}">${y === "All" ? "All years" : y}</button>`).join("");

  const rows = data.map((e) => {
    const w = WINERIES.find((x) => x.slug === e.winerySlug);
    const wineryCell = w
      ? `<a class="winery-link" onclick="openDrawer('${w.slug}')">${w.name} →</a>`
      : `<span style="color:var(--muted)">${e.winery}</span>`;
    return `<tr>
      <td class="rank"><span class="rank-badge ${e.rank <= 10 ? "top10" : ""}">#${e.rank}</span></td>
      <td class="year">${e.year}</td>
      <td class="wine-cell"><b>${e.wine}</b>${e.note ? `<span class="sub">${e.note}</span>` : ""}</td>
      <td class="founded">${e.vintage || "NV"}</td>
      <td class="score">${e.score}</td>
      <td class="price">${e.price || "—"}</td>
      <td><span class="valley-tag ${e.valley}">${e.valley}</span></td>
      <td>${wineryCell}</td>
    </tr>`;
  }).join("");

  $("#awards").innerHTML = `
    <div class="awards-head">
      <h2>Wine Spectator Top 100 — Napa & Sonoma wines</h2>
      <p class="section-desc">Every Napa and Sonoma county wine on Wine Spectator's most recent Top 100 lists, ranked. Click a winery to open its full story in the explorer.</p>
      <div class="seg">${yearChips}</div>
      ${years.filter((y) => awardYear === "All" || awardYear === y).map((y) =>
        window.WS_META && window.WS_META[y] ? `<p class="ws-meta"><b>${y}</b> — ${window.WS_META[y]}</p>` : "").join("")}
    </div>
    ${data.length ? `<div class="table-wrap"><table>
      <thead><tr><th>Rank</th><th>List</th><th>Wine</th><th>Vintage</th><th>Score</th><th>Price</th><th>Valley</th><th>Winery</th></tr></thead>
      <tbody>${rows}</tbody></table></div>`
      : `<p style="color:var(--muted)">No entries match the current filters.</p>`}`;

  document.querySelectorAll("#awards .chip[data-year]").forEach((c) => {
    c.addEventListener("click", () => {
      awardYear = c.dataset.year === "All" ? "All" : Number(c.dataset.year);
      renderAwards();
    });
  });
  $(".count").textContent = `${data.length} ranked wines`;
}

/* ── Detail drawer ── */
function openDrawer(slug) {
  const w = WINERIES.find((x) => x.slug === slug);
  if (!w) return;
  const img = propertyImg(w);
  const lbl = labelImg(w);
  const gmaps = `https://maps.google.com/?q=${encodeURIComponent(w.name + " " + w.address)}`;

  $("#drawer").innerHTML = `
    <button class="drawer-close" onclick="closeDrawer()" aria-label="Close">✕</button>
    ${img ? `<img class="hero" src="${img}" alt="${w.name}">` : `<div class="hero placeholder">${w.name}</div>`}
    <div class="drawer-body">
      <span class="valley-tag ${w.valley}">${w.valley} · ${w.ava}</span>
      <h2>${w.name}</h2>
      <div class="est">Est. <b>${w.founded}</b> — ${w.founder}</div>
      <div class="story-badges">${w.storyTags.map((t) => `<span class="badge">${STORY_TAG_LABELS[t].label}</span>`).join("")}</div>
      <p class="vibe-line">${w.vibe}</p>

      <div class="meta-grid">
        <div class="cell"><label>Vibe</label><div>${w.vibeTags.join(" · ")}</div></div>
        <div class="cell"><label>Bottle prices</label><div>${fmtPrice(w)} <span style="color:var(--muted)">(approx.)</span></div></div>
        <div class="cell"><label>Tasting fee</label><div>${w.tastingFee}</div></div>
        <div class="cell"><label>Current owner</label><div>${w.owner}</div></div>
        ${w.architect ? `<div class="cell wide"><label>Architecture</label><div>${w.architect}${w.bookSection ? ` — “${w.bookSection}” chapter of <i>The New Architecture of Wine</i>` : ""}</div></div>` : ""}
        <div class="cell wide"><label>Tours & visits</label><div>${w.tours}</div></div>
        <div class="cell wide"><label>Address</label><div><a href="${gmaps}" target="_blank" rel="noopener">${w.address}</a></div></div>
        <div class="cell wide"><label>Website</label><div><a href="${w.website}" target="_blank" rel="noopener">${w.website.replace("https://www.", "")}</a></div></div>
      </div>

      <h3>Most famous wines</h3>
      <div class="label-row">
        ${lbl ? `<img class="label-img" src="${lbl}" alt="${w.name} label — for recognition">` : ""}
        <ul class="wine-list">${w.wines.map((x) => `<li><b>${x.name}</b><p>${x.why}</p></li>`).join("")}</ul>
      </div>

      <h3>History & lineage</h3>
      <ul class="timeline">${w.history.map((h) => `<li><span class="y">${h.y}</span><span class="t">${h.t}</span></li>`).join("")}</ul>

      <h3>Awards & claims to fame</h3>
      <ul class="award-list">${w.awards.map((a) => `<li>${a}</li>`).join("")}</ul>

      <h3>Worth knowing</h3>
      <div class="funfact">${w.funFact}</div>
    </div>`;
  $("#overlay").classList.add("open");
  $("#drawer").classList.add("open");
  $("#drawer").scrollTop = 0;
}
function closeDrawer() {
  $("#overlay").classList.remove("open");
  $("#drawer").classList.remove("open");
}
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;

/* ── View switching & filters ── */
function render() {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  $(`#${state.view}-view`)?.classList.add("active");
  if (state.view === "table") renderTable();
  if (state.view === "map") { $("#map-view").classList.add("active"); renderMap(); map.invalidateSize(); }
  if (state.view === "awards") renderAwards();
  if (state.view === "lineage") { $("#lineage-view").classList.add("active"); renderLineage(); }
}

document.querySelectorAll(".view-toggle button").forEach((b) => {
  b.addEventListener("click", () => {
    document.querySelectorAll(".view-toggle button").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    state.view = b.dataset.view;
    render();
  });
});
document.querySelectorAll(".chip[data-valley]").forEach((c) => {
  c.addEventListener("click", () => {
    document.querySelectorAll(".chip[data-valley]").forEach((x) => x.classList.remove("active"));
    c.classList.add("active");
    state.valley = c.dataset.valley;
    state.mapFocus = null;
    render();
  });
});
$("#search").addEventListener("input", (e) => { state.query = e.target.value; state.mapFocus = null; render(); });
$("#overlay").addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

// Deep links: #map, #lineage, or #<winery-slug>
const hash = location.hash.slice(1);
if (hash === "map" || hash === "lineage" || hash === "awards") {
  state.view = hash;
  document.querySelectorAll(".view-toggle button").forEach((b) =>
    b.classList.toggle("active", b.dataset.view === hash));
}
render();
if (hash && WINERIES.some((w) => w.slug === hash)) openDrawer(hash);
// The browser scrolls to a matching element id after load — undo that for view hashes.
if (hash) window.addEventListener("load", () => setTimeout(() => window.scrollTo(0, 0), 0));
