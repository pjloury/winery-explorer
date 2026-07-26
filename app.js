/* Winery Explorer — table / map / lineage views over WINERIES (data.js).
   Images are optional: IMG manifest (manifest.js) maps slug → {property, label};
   anything missing falls back to a placeholder. */

const IMG = window.IMG || {};
const $ = (sel) => document.querySelector(sel);

const state = {
  view: "table",
  valleys: new Set(["Napa", "Sonoma"]),  // both on by default; unselect one to focus
  query: "",
  sort: { key: "prestige", dir: -1 },
  grouped: false,
  expandedRegions: new Set(),
  mapWine: new Set(),
  mapKnown: new Set(),
  mapAva: new Set(),
  mapAvaOpen: false,
  mapFocus: null,
  mapTopOnly: true,
  tableTopOnly: true,    // table/cards default to the Top 25, like the map
  tableTags: new Set(),
  cardFields: new Set(["ava", "founded", "price"]),
  filtersOpen: false,    // mobile: filter panel collapsed by default
  mapFiltersOpen: false,
  navOpen: false,
  searchOpen: false,
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
// (Book-featured wineries are marked with the 📖 tag / map badge instead of a star.)
function archStar() { return ""; }

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
  { key: "arch-modern", label: "📖 New Architecture" },
  { key: "arch-classic", label: "Classic architecture" },
  { key: "history", label: "History & heritage" },
  { key: "gardens", label: "Gardens & grounds" },
  { key: "food-art", label: "Food & art" },
];
// Quick "interesting subset" chips for the table view. Multiple active chips
// narrow (AND). Predicates rely on the enrichment fields set below.
const TABLE_CHIPS = [
  { key: "top25", label: "Top 25", test: (w) => w._rank <= MAP_TOP_N },
  { key: "prestige", label: "Prestigious", test: (w) => w._stars >= 4.5 },
  { key: "modern", label: "📖 New Architecture", test: (w) => w._knownFor.has("arch-modern") },
  { key: "classic", label: "Classic arch.", test: (w) => w._knownFor.has("arch-classic") },
  { key: "gardens", label: "Gardens", test: (w) => w._knownFor.has("gardens") },
  { key: "history", label: "Historic", test: (w) => w._knownFor.has("history") },
  { key: "jop", label: "Judgment of Paris", test: (w) => w.storyTags.includes("judgment-of-paris") },
];

function enrichWineries() {
  WINERIES.forEach((w) => {
    const a = ACCLAIM_MAP[w.slug] || 3;
    const apps = (window.WS_TOP100 || []).filter((e) => e.winerySlug === w.slug);
    let ws = 0;
    apps.forEach((e) => { ws += (101 - e.rank) * 0.15 + Math.max(0, e.score - 90); });
    ws = Math.min(ws, 14);
    w._acclaim = a;
    w._wsCount = apps.length;
    w._stars = Math.min(5, a + (apps.length ? 0.5 : 0));

    // Wine types (from the famous-wines list)
    const wineText = w.wines.map((x) => x.name).join(" | ");
    w._wineTypes = new Set(WINE_TYPES.filter((t) => t.re.test(wineText)).map((t) => t.key));

    // Known-for tags: derive history + book architecture, then merge curated extras
    const kf = new Set();
    if (w.vibeTags.includes("Historic")
        || w.storyTags.some((t) => ["resurrected", "site-reuse", "judgment-of-paris"].includes(t))) kf.add("history");
    Object.keys(KFX).forEach((cat) => { if (KFX[cat].includes(w.slug)) kf.add(cat); });
    // "arch-modern" now means one thing: featured in "The New Architecture of Wine"
    // (the book). Drop any curated modern-arch that isn't actually in the book.
    if (w.storyTags.includes("architecture")) kf.add("arch-modern");
    else kf.delete("arch-modern");
    w._knownFor = kf;

    // Prestige: editorial acclaim tier is the backbone; then nudge up the wineries
    // with more award-winning wines, notable architecture, gardens, and real photos.
    let bonus = 0;
    if (w.storyTags.includes("judgment-of-paris")) bonus += 5;
    bonus += Math.min(apps.length, 4) * 1.5;              // more Wine Spectator Top-100 wines
    bonus += Math.min((w.awards || []).length, 3) * 0.8; // other awards & accolades
    if (kf.has("arch-modern") || kf.has("arch-classic")) bonus += 2.5; // notable architecture
    if (kf.has("gardens")) bonus += 2.5;                 // gardens & grounds
    if (kf.has("food-art")) bonus += 1;
    if (propertyImg(w)) bonus += 2;                      // has photography
    w._prestige = Math.round((a * 20 + ws + bonus) * 10) / 10;
  });
  // Prestige rank (1 = most prestigious) for the "top N" set
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
// Punchy one-line summary for the mobile card; falls back to the first vibe sentence.
const TAGLINES = (typeof TAGLINE !== "undefined") ? TAGLINE : (window.TAGLINE || {});
function taglineOf(w) { return TAGLINES[w.slug] || firstSentence(w.vibe); }
// Optional detail fields the reader can toggle onto the mobile cards.
const CARD_FIELDS = [
  { key: "ava", label: "AVA", get: (w) => w.ava },
  { key: "founded", label: "Founded", get: (w) => "est. " + w.founded },
  { key: "price", label: "Price", get: (w) => fmtPrice(w) },
  { key: "wines", label: "Wines", get: (w) => [...w._wineTypes].slice(0, 3).join(", ") || w.wines[0].name },
  { key: "vibe", label: "Vibe", get: (w) => w.vibeTags.join(", ") },
  { key: "group", label: "Group", get: (w) => (GN[w.group] ? w.group : "Independent") },
];
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
    if (!state.valleys.has(w.valley)) return false;
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
    if (key === "lat") { return a.lat === b.lat ? b._prestige - a._prestige : (b.lat - a.lat) * dir; } // dir=1 → north first
    if (key === "ava") { const c = a.ava.localeCompare(b.ava); return c ? c * dir : b._prestige - a._prestige; }
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
const NCOLS = 11;
function tableRow(w) {
  const img = propertyImg(w);
  const thumb = img
    ? `<img class="thumb" src="${img}" alt="" loading="lazy">`
    : `<span class="thumb placeholder">🍷</span>`;
  const badges = w.storyTags.map((t) => t === "architecture"
    ? `<span class="badge badge-arch" title="Featured in 'The New Architecture of Wine' (Hebert, 2019)">📖 New Architecture</span>`
    : `<span class="badge">${STORY_TAG_LABELS[t].label}</span>`).join("");
  return `<tr data-slug="${w.slug}">
    <td><div class="w-name">${thumb}<span><b>${w.name}${archStar(w)}</b></span></div></td>
    <td class="prestige-cell">${starsHTML(w._stars)}</td>
    <td><span class="valley-tag ${w.valley}">${w.valley}</span></td>
    <td class="ava-col">${w.ava}</td>
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

function applyTableChips(list) {
  if (!state.tableTags.size) return list;
  const tests = TABLE_CHIPS.filter((c) => state.tableTags.has(c.key));
  return list.filter((w) => tests.every((c) => c.test(w))); // active chips narrow (AND)
}

// Mobile: a tagline-forward card. Valley is a colored dot, prestige is stars, and
// the reader-chosen detail fields stack below — everything else lives in the drawer.
function wineCard(w) {
  const img = propertyImg(w);
  const thumb = img
    ? `<img class="wc-thumb" src="${img}" alt="" loading="lazy">`
    : `<span class="wc-thumb placeholder">🍷</span>`;
  const fields = CARD_FIELDS.filter((f) => state.cardFields.has(f.key))
    .map((f) => `<span class="wc-field">${f.get(w)}</span>`).join("");
  return `<article class="wcard" data-slug="${w.slug}">
    ${thumb}
    <div class="wc-body">
      <div class="wc-top">
        <span class="dot ${w.valley.toLowerCase()}" title="${w.valley}"></span>
        <b class="wc-name">${w.name}${archStar(w)}</b>
        <span class="wc-stars">${starsHTML(w._stars)}</span>
      </div>
      <p class="wc-tag">${taglineOf(w)}</p>
      ${fields ? `<div class="wc-meta">${fields}</div>` : ""}
    </div>
  </article>`;
}

const FUNNEL = `<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" style="vertical-align:-1px"><path d="M1 2h14l-5.3 6.2V13l-3.4 1.6V8.2z" fill="currentColor"/></svg>`;
const SORT_OPTS = [["prestige", "Rating"], ["name", "Name"], ["lat", "North → South"], ["founded", "Founded"], ["price", "Price"], ["ava", "AVA"]];

function renderTable() {
  let list = sorted(applyTableChips(filtered()));
  const arrow = (k) => state.sort.key === k ? `<span class="arrow">${state.sort.dir === 1 ? "▲" : "▼"}</span>` : "";
  const searching = !!state.query.trim();
  const mobile = isSmallScreen();
  // Default to the Top 25 (by prestige); an active quick-filter or search reveals every match.
  const tblFiltersActive = state.tableTags.size || searching;
  if (state.tableTopOnly && !tblFiltersActive) list = list.filter((w) => w._rank <= MAP_TOP_N);

  // Group the list once (north→south) for the region view; both layouts reuse it.
  const groupedOrdered = () => {
    const groups = {};
    list.forEach((w) => { const r = regionOf(w); (groups[r] = groups[r] || []).push(w); });
    return Object.entries(groups)
      .map(([r, ws]) => ({ r, ws, lat: ws.reduce((a, w) => a + w.lat, 0) / ws.length }))
      .sort((a, b) => b.lat - a.lat);
  };

  const showToggle = `<span class="seg small">
      <button class="chip ${state.tableTopOnly ? "active" : ""}" data-ttop="1">★ Top ${MAP_TOP_N}</button>
      <button class="chip ${!state.tableTopOnly ? "active" : ""}" data-ttop="0">All ${WINERIES.length}</button></span>`;
  const groupSeg = `<span class="seg small">
      <button class="chip ${!state.grouped ? "active" : ""}" data-group="0">Flat list</button>
      <button class="chip ${state.grouped ? "active" : ""}" data-group="1">By region</button></span>`;
  const expandAll = state.grouped && !searching
    ? `<button class="link-btn" id="toggle-all-regions">${state.expandedRegions.size ? "Collapse all" : "Expand all"}</button>` : "";
  const filterChips = `<div class="table-chips">
      <span class="flabel">Show only</span>
      ${TABLE_CHIPS.map((c) => `<button class="fchip ${state.tableTags.has(c.key) ? "active" : ""}" data-tag="${c.key}">${c.label}</button>`).join("")}
      ${state.tableTags.size ? `<button class="link-btn" id="table-clear">Clear</button>` : ""}
    </div>`;

  // Desktop control bar (sort happens via clickable column headers).
  const controls = `
    <div class="table-controls">${groupSeg}${showToggle}${expandAll}</div>
    ${filterChips}`;

  if (mobile) {
    // ── Card layout: compact bar (sort + filter icon), rest folds into a panel ──
    const activeCount = state.tableTags.size;
    const sortControl = `<label class="sort-select">Sort
        <select id="card-sort">${SORT_OPTS.map(([k, l]) => `<option value="${k}" ${state.sort.key === k ? "selected" : ""}>${l}</option>`).join("")}</select></label>
        <button class="fchip sort-dir" id="card-sort-dir" title="Reverse order">${state.sort.dir === 1 ? "▲" : "▼"}</button>`;
    const detailChips = `<div class="table-chips card-fields">
        <span class="flabel">Card details</span>
        ${CARD_FIELDS.map((f) => `<button class="fchip ${state.cardFields.has(f.key) ? "active" : ""}" data-field="${f.key}">${f.label}</button>`).join("")}
      </div>`;
    const panel = state.filtersOpen ? `<div class="filter-panel">
        <div class="fp-row"><span class="flabel">Show</span>${showToggle}</div>
        <div class="fp-row"><span class="flabel">Group</span>${groupSeg}${expandAll}</div>
        ${filterChips}
        ${detailChips}
      </div>` : "";
    const mobileControls = `
      <div class="table-controls">
        ${sortControl}
        <button class="fchip filter-toggle ${activeCount || state.filtersOpen ? "active" : ""}" id="filters-toggle" aria-expanded="${state.filtersOpen}">${FUNNEL} Filters${activeCount ? ` · ${activeCount}` : ""}</button>
      </div>${panel}`;
    let cards;
    if (!list.length) {
      cards = `<p class="empty-row">No wineries match.</p>`;
    } else if (!state.grouped) {
      cards = `<div class="card-list">${list.map(wineCard).join("")}</div>`;
    } else {
      cards = groupedOrdered().map(({ r, ws }) => {
        const open = searching || state.expandedRegions.has(r);
        const valleys = [...new Set(ws.map((w) => w.valley))].map((v) => `<span class="valley-tag ${v}">${v}</span>`).join("");
        return `<div class="card-region">
          <div class="region-head ${open ? "open" : ""}" data-region="${r}">
            <span class="caret">${open ? "▾" : "▸"}</span> <b>${r}</b> ${valleys}
            <span class="rcount">${ws.length}</span>
          </div>
          ${open ? `<div class="card-list">${ws.map(wineCard).join("")}</div>` : ""}
        </div>`;
      }).join("");
    }
    $("#table-view").innerHTML = mobileControls + cards;
    attachTableHandlers();
    $(".count").textContent = countText(list, tblFiltersActive);
    writeHash();
    return;
  }

  // ── Table layout (desktop) ──
  let body;
  if (!state.grouped) {
    body = `<tbody>${list.map(tableRow).join("") || `<tr><td colspan="${NCOLS}" class="empty-row">No wineries match.</td></tr>`}</tbody>`;
  } else {
    body = groupedOrdered().map(({ r, ws }) => {
      const open = searching || state.expandedRegions.has(r);
      const valleys = [...new Set(ws.map((w) => w.valley))]
        .map((v) => `<span class="valley-tag ${v}">${v}</span>`).join("");
      const head = `<tr class="region-head ${open ? "open" : ""}" data-region="${r}">
        <td colspan="${NCOLS}"><span class="caret">${open ? "▾" : "▸"}</span> <b>${r}</b> ${valleys}
        <span class="rcount">${ws.length} winer${ws.length > 1 ? "ies" : "y"}</span></td></tr>`;
      return `<tbody class="region">${head}${open ? ws.map(tableRow).join("") : ""}</tbody>`;
    }).join("") || `<tbody><tr><td colspan="${NCOLS}" class="empty-row">No wineries match.</td></tr></tbody>`;
  }

  $("#table-view").innerHTML = controls + `
    <div class="table-wrap"><table>
    <thead><tr>
      <th class="sortable" data-sort="name">Winery ${arrow("name")}</th>
      <th class="sortable" data-sort="prestige">Prestige ${arrow("prestige")}</th>
      <th>Valley</th>
      <th class="sortable" data-sort="ava">AVA ${arrow("ava")}</th>
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
  attachTableHandlers();
  $(".count").textContent = countText(list, tblFiltersActive);
  writeHash();
}

function countText(list, filtersActive) {
  return (state.tableTopOnly && !filtersActive)
    ? `Top ${list.length} of ${WINERIES.length}`
    : `${list.length} of ${WINERIES.length} wineries`;
}

function attachTableHandlers() {
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
  document.querySelectorAll("#table-view .chip[data-ttop]").forEach((b) => {
    b.addEventListener("click", () => { state.tableTopOnly = b.dataset.ttop === "1"; renderTable(); });
  });
  const filtersToggle = $("#filters-toggle");
  if (filtersToggle) filtersToggle.addEventListener("click", () => { state.filtersOpen = !state.filtersOpen; renderTable(); });
  document.querySelectorAll("#table-view .fchip[data-tag]").forEach((b) => {
    b.addEventListener("click", () => { toggleSet(state.tableTags, b.dataset.tag); renderTable(); });
  });
  const tableClear = $("#table-clear");
  if (tableClear) tableClear.addEventListener("click", () => { state.tableTags.clear(); renderTable(); });
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
  document.querySelectorAll("#table-view tbody tr[data-slug], #table-view .wcard[data-slug]").forEach((el) => {
    el.addEventListener("click", () => openDrawer(el.dataset.slug));
  });
  // Mobile card controls
  const cardSort = $("#card-sort");
  if (cardSort) cardSort.addEventListener("change", () => {
    const k = cardSort.value;
    state.sort = { key: k, dir: k === "prestige" ? -1 : 1 };
    renderTable();
  });
  const cardSortDir = $("#card-sort-dir");
  if (cardSortDir) cardSortDir.addEventListener("click", () => { state.sort.dir *= -1; renderTable(); });
  document.querySelectorAll("#table-view .fchip[data-field]").forEach((b) => {
    b.addEventListener("click", () => { toggleSet(state.cardFields, b.dataset.field); renderTable(); });
  });
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
  // District/AVA name labels sit in their own pane, below the pins and non-clickable.
  map.createPane("districts");
  map.getPane("districts").style.zIndex = 450;
  map.getPane("districts").style.pointerEvents = "none";
  addDistrictLabels();
  markerLayer = L.layerGroup().addTo(map);
  // Overlaps depend on zoom (pan preserves spacing), so re-lay-out after each zoom.
  map.on("zoomend", () => { separateMarkers(mapEntries); layoutDistrictLabels(); });
  // Re-center: clear any focus and re-fit the map to all shown pins.
  $("#map-recenter")?.addEventListener("click", () => { state.mapFocus = null; renderMap(); });
  // "Show my location": a live blue dot (Google-Maps style), toggled on/off.
  $("#map-locate")?.addEventListener("click", () => {
    if (userLocationWatchId != null) stopUserLocation(); else startUserLocation();
  });
  // Legend doubles as filters: click a category to toggle it.
  document.querySelectorAll(".map-legend .lg-item").forEach((el) => {
    const apply = () => {
      state.mapFocus = null;
      const k = el.dataset.lg;
      if (k === "top") state.mapTopOnly = !state.mapTopOnly;
      else toggleSet(state.mapKnown, k);
      renderMap();
    };
    el.addEventListener("click", apply);
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); apply(); } });
  });
}

// "Blue dot" current-location tracking (Google-Maps style): a live marker plus
// an accuracy-radius circle, kept in sync via watchPosition until toggled off.
let userLocationMarker = null, userLocationCircle = null, userLocationWatchId = null;
function stopUserLocation() {
  if (userLocationWatchId != null) { navigator.geolocation.clearWatch(userLocationWatchId); userLocationWatchId = null; }
  if (userLocationMarker) { userLocationMarker.remove(); userLocationMarker = null; }
  if (userLocationCircle) { userLocationCircle.remove(); userLocationCircle = null; }
  $("#map-locate")?.classList.remove("active", "locating");
}
function startUserLocation() {
  if (!navigator.geolocation) { alert("Geolocation isn't supported in this browser."); return; }
  const btn = $("#map-locate");
  btn?.classList.add("locating");
  userLocationWatchId = navigator.geolocation.watchPosition(
    (pos) => {
      if (!map) return;
      btn?.classList.remove("locating");
      btn?.classList.add("active");
      const latlng = [pos.coords.latitude, pos.coords.longitude];
      if (!userLocationMarker) {
        userLocationMarker = L.marker(latlng, {
          icon: L.divIcon({ className: "user-location-marker", html: '<span class="user-location-dot"></span>', iconSize: [16, 16], iconAnchor: [8, 8] }),
          zIndexOffset: 1000, keyboard: false, interactive: false,
        }).addTo(map);
        userLocationCircle = L.circle(latlng, { radius: pos.coords.accuracy, className: "user-location-accuracy", weight: 0, interactive: false }).addTo(map);
        map.setView(latlng, Math.max(map.getZoom(), 12));
      } else {
        userLocationMarker.setLatLng(latlng);
        userLocationCircle.setLatLng(latlng).setRadius(pos.coords.accuracy);
      }
    },
    (err) => {
      alert("Couldn't get your location: " + (err.message || "permission denied"));
      stopUserLocation();
    },
    { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
  );
}

// Reflect the active filters on the clickable legend.
function syncLegend() {
  document.querySelectorAll(".map-legend .lg-item").forEach((el) => {
    const k = el.dataset.lg;
    const on = k === "top" ? state.mapTopOnly : state.mapKnown.has(k);
    el.classList.toggle("lg-active", on);
  });
}

// Label each Napa/Sonoma district (AVA) at the centroid of its wineries.
let districtEntries = [];
function addDistrictLabels() {
  const groups = {};
  WINERIES.forEach((w) => { const r = regionOf(w); (groups[r] = groups[r] || []).push(w); });
  Object.entries(groups).forEach(([r, ws]) => {
    if (ws.length < 2 || r === "Napa Valley") return; // skip lone wineries & the generic catch-all
    const lat = ws.reduce((a, w) => a + w.lat, 0) / ws.length;
    const lng = ws.reduce((a, w) => a + w.lng, 0) / ws.length;
    const m = L.marker([lat, lng], {
      pane: "districts", interactive: false, keyboard: false,
      icon: L.divIcon({ className: "district-label", html: `<span>${r}</span>`, iconSize: [0, 0] }),
    }).addTo(map);
    districtEntries.push({ marker: m, latlng: L.latLng(lat, lng), name: r, count: ws.length });
  });
}
// Scale label font with zoom; hide labels that would overlap (larger AVAs take priority).
function layoutDistrictLabels() {
  if (!map || !districtEntries.length) return;
  const zoom = map.getZoom();
  const fs = Math.max(9, Math.min(15, Math.round(9 + (zoom - 9) * 2)));
  const boxes = districtEntries.map((e) => {
    const p = map.latLngToLayerPoint(e.latlng);
    return { e, x: p.x, y: p.y, w: e.name.length * fs * 0.62 + 6, h: fs + 6 };
  });
  const order = boxes.map((_, i) => i).sort((a, b) => boxes[b].e.count - boxes[a].e.count);
  const shown = [];
  order.forEach((i) => {
    const b = boxes[i], el = b.e.marker._icon;
    if (!el) return;
    const clash = shown.some((s) => Math.abs(s.x - b.x) < (s.w + b.w) / 2 && Math.abs(s.y - b.y) < (s.h + b.h) / 2 + 3);
    if (clash) { el.style.display = "none"; }
    else { el.style.display = ""; const sp = el.querySelector("span"); if (sp) sp.style.fontSize = fs + "px"; shown.push(b); }
  });
}

// Nudge overlapping pins apart in screen space (keeping them near their true spot)
// so large markers stay legible and none is obscured.
let mapEntries = [];
function separateMarkers(entries) {
  if (!map || !entries || entries.length < 2 || state.mapFocus) return;
  const MIN = pinSize() + 8;   // min center-to-center px (pin size + gap)
  const MAXD = pinSize() + 22; // cap how far a pin may drift from its true location
  const pts = entries.map((e) => map.latLngToLayerPoint(e.latlng));
  const orig = pts.map((p) => p.clone());
  for (let iter = 0; iter < 140; iter++) {
    let moved = false;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        let dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y;
        let d = Math.sqrt(dx * dx + dy * dy);
        if (d === 0) { dx = 0; dy = 1; d = 1; }
        if (d < MIN) {
          const push = (MIN - d) / 2, ux = dx / d, uy = dy / d;
          pts[i].x -= ux * push; pts[i].y -= uy * push;
          pts[j].x += ux * push; pts[j].y += uy * push;
          moved = true;
        }
      }
    }
    if (!moved) break;
  }
  entries.forEach((e, i) => {
    let dx = pts[i].x - orig[i].x, dy = pts[i].y - orig[i].y;
    const dd = Math.sqrt(dx * dx + dy * dy);
    if (dd > MAXD) { dx = dx / dd * MAXD; dy = dy / dd * MAXD; }
    if (e.marker._icon) L.DomUtil.setPosition(e.marker._icon, L.point(orig[i].x + dx, orig[i].y + dy));
    // The marker latlng is unchanged, but the icon was nudged (dx,dy); shift the
    // popup by the same amount so its tail points at the pin, not the raw coord.
    const pop = e.marker.getPopup();
    if (pop) { pop.options.offset = L.point(dx, dy); if (pop.isOpen()) pop.update(); }
  });
}

// Which wineries land on the map: valley + search always apply. If any map
// filter is active we search ALL wineries that match; otherwise we show just the
// top N most prestigious.
// The wineries currently in scope on the map: valley + search + wine/known-for
// filters; top-N by prestige when no filter is active. (Ignores single-winery focus.)
function mapCandidates() {
  const filtersActive = state.mapWine.size || state.mapKnown.size || state.mapAva.size;
  return filtered().filter((w) => {
    if (state.mapWine.size && ![...state.mapWine].some((t) => w._wineTypes.has(t))) return false;
    if (state.mapKnown.size && ![...state.mapKnown].some((t) => w._knownFor.has(t))) return false;
    if (state.mapAva.size && !state.mapAva.has(regionOf(w))) return false;
    // the Top-25 cap applies only to the unfiltered view; filters always reveal every match
    if (state.mapTopOnly && !filtersActive && w._rank > MAP_TOP_N) return false;
    return true;
  });
}
// Distinct AVA/districts (normalized via regionOf, matching the map labels).
// Scoped to the currently selected valley chip(s) — an AVA belongs to exactly
// one valley, so listing every region regardless of valley let you pick a
// Sonoma AVA while only "Napa" was active and silently get zero pins.
function avaOptions() {
  const inScope = WINERIES.filter((w) => state.valleys.has(w.valley));
  return [...new Set(inScope.map(regionOf))].sort((a, b) => a.localeCompare(b));
}
// Drop any selected AVA filters that fall out of scope when the valley
// selection changes, so a stale filter doesn't keep the map silently empty.
function pruneMapAva() {
  if (!state.mapAva.size) return;
  const valid = new Set(avaOptions());
  [...state.mapAva].forEach((r) => { if (!valid.has(r)) state.mapAva.delete(r); });
}
function mapList() {
  // Desktop isolates to the focused pin; phones keep every pin (focus just pans
  // + shows the overlay preview card, preserving geographic context).
  if (state.mapFocus && !isSmallScreen()) {
    const w = WINERIES.find((x) => x.slug === state.mapFocus);
    return w ? [w] : [];
  }
  return mapCandidates();
}

function isSmallScreen() { return window.innerWidth <= 560; }
function pinSize() { return isSmallScreen() ? 34 : 60; }
function markerIcon(w) {
  const SZ = pinSize();
  const logo = logoImg(w);
  // On small screens drop the (illegible-when-tiny) logo — use a compact monogram
  // so the color ring + ★/✿ symbols carry the meaning.
  const inner = (logo && !isSmallScreen())
    ? `<img src="${logo}" alt="${w.name}">`
    : `<span class="mono" style="font-size:${Math.round(SZ * 0.4)}px">${monogram(w)}</span>`;
  // gold outer ring = Top 25; sienna border = classic architecture; ✿ badge =
  // gardens; 📖 badge = featured in The New Architecture of Wine.
  const arch = w._knownFor.has("arch-classic") ? "classic" : "";
  const top = w._rank <= MAP_TOP_N ? "top" : "";
  const garden = w._knownFor.has("gardens")
    ? `<span class="pin-badge pin-garden" title="Known for gardens & grounds">✿</span>` : "";
  const book = w._knownFor.has("arch-modern")
    ? `<span class="pin-badge pin-book" title="Featured in ‘The New Architecture of Wine’">📖</span>` : "";
  return L.divIcon({
    className: "logo-marker",
    html: `<div class="lm ${arch} ${top}" style="width:${SZ}px;height:${SZ}px" title="${w.name}">${inner}</div>${garden}${book}`,
    iconSize: [SZ, SZ], iconAnchor: [SZ / 2, SZ / 2], popupAnchor: [0, -(SZ / 2 + 3)],
  });
}

function renderMap() {
  initMap();
  // Leaflet must know the container's real size before fitBounds, or every pin
  // lands off-screen (looks like "no pins"). This bites when the map is first
  // shown from a hidden tab or before layout settles.
  map.invalidateSize(false);
  markerLayer.clearLayers();
  const list = mapList();
  let focusMarker = null;
  mapEntries = [];
  const mobile = isSmallScreen();
  list.forEach((w) => {
    const m = L.marker([w.lat, w.lng], { icon: markerIcon(w), riseOnHover: true });
    if (mobile) {
      // Phones: a tap focuses the winery into the bottom detail card — no popup
      // obscuring the (now dominant) map.
      m.on("click", () => { state.mapFocus = w.slug; renderMap(); });
    } else {
      const img = propertyImg(w);
      const badges = popupBadges(w);
      m.bindPopup(`<div class="popup-card">
          ${img ? `<img src="${img}" alt="${w.name}">` : ""}
          <b>${w.name}${archStar(w)}</b>
          <div class="meta">${starsHTML(w._stars)} · ${w.valley} · ${w.ava}<br>est. ${w.founded} · ${w.wines[0].name} · ${fmtPrice(w)}</div>
          <p class="pc-desc">${popupDesc(w)}</p>
          ${badges ? `<div class="pc-badges">${badges}</div>` : ""}
          <button onclick="openDrawer('${w.slug}')">Full story →</button>
        </div>`, { maxWidth: 288 });
      // Hover opens the popup; leaving the pin closes it so it never lingers and
      // blocks the map. A short grace period lets the cursor cross into the popup
      // (to reach the "Full story" button) without it vanishing.
      let closeT = null;
      const cancelClose = () => { if (closeT) { clearTimeout(closeT); closeT = null; } };
      const scheduleClose = () => { cancelClose(); closeT = setTimeout(() => m.closePopup(), 220); };
      m.on("mouseover", () => { cancelClose(); m.openPopup(); });
      m.on("mouseout", scheduleClose);
      m.on("popupopen", (e) => {
        const el = e.popup.getElement();
        if (!el) return;
        el.addEventListener("mouseenter", cancelClose);
        el.addEventListener("mouseleave", scheduleClose);
      });
    }
    markerLayer.addLayer(m);
    mapEntries.push({ marker: m, latlng: L.latLng(w.lat, w.lng) });
    if (state.mapFocus === w.slug) focusMarker = m;
  });
  if (state.mapFocus && focusMarker) {
    const fw = WINERIES.find((x) => x.slug === state.mapFocus);
    if (mobile) {
      // Center on the pin at a context-preserving zoom, offset up ~90px so the
      // pin sits above the bottom-sheet card. Baked into one setView so swiping
      // to an adjacent winery always recenters on it (two animations would fight).
      const Z = 11;
      const target = map.unproject(map.project([fw.lat, fw.lng], Z).add([0, 90]), Z);
      map.setView(target, Z, { animate: true });
    } else {
      map.setView([fw.lat, fw.lng], 13, { animate: false });
      focusMarker.openPopup();
    }
  } else if (list.length) {
    map.fitBounds(L.latLngBounds(list.map((w) => [w.lat, w.lng])).pad(0.15), { animate: false });
    separateMarkers(mapEntries);
  }
  // No pins at all (usually an AVA/wine/known-for combo with no overlap): say so,
  // instead of leaving the map looking frozen/broken with no explanation.
  const emptyEl = $("#map-empty");
  if (emptyEl) {
    emptyEl.classList.toggle("show", !list.length);
    if (!list.length) {
      emptyEl.innerHTML = `<span>No wineries match your filters.</span><button class="link-btn" id="map-empty-clear">Clear filters</button>`;
      $("#map-empty-clear")?.addEventListener("click", () => {
        state.mapFocus = null; state.mapWine.clear(); state.mapKnown.clear(); state.mapAva.clear();
        renderMap();
      });
    }
  }
  layoutDistrictLabels();
  renderMapFilters();
  syncLegend();
  renderMapFocusCard();
  renderMapIndex();
  // Phones show the count inside the "Show · N" label instead (saves a line).
  $(".count").textContent = isSmallScreen() ? "" : (state.mapFocus ? "1 winery" : `${list.length} winer${list.length === 1 ? "y" : "ies"} shown`);
  writeHash();
}

// The wineries in the same order as the index list — used to step the preview
// card left/right to adjacent pins.
function mapFocusOrder() {
  return mapCandidates().slice().sort((a, b) => a.name.localeCompare(b.name)).map((w) => w.slug);
}
function focusAdjacent(dir) {
  const order = mapFocusOrder();
  if (!order.length) return;
  let i = order.indexOf(state.mapFocus);
  if (i === -1) i = 0;
  state.mapFocus = order[(i + dir + order.length) % order.length]; // wraps around
  renderMap();
}

// Phones: a preview card that slides up over the map when a pin is tapped.
// Tap/swipe-up → full detail drawer; swipe ← → (or the chevrons) steps to the
// adjacent winery; "‹ Map" zooms back out.
function renderMapFocusCard() {
  const el = $("#map-focus-card");
  if (!el) return;
  const w = state.mapFocus ? WINERIES.find((x) => x.slug === state.mapFocus) : null;
  if (!w) { el.innerHTML = ""; el.classList.remove("show"); return; }
  const img = propertyImg(w);
  const thumb = img
    ? `<img class="mfc-thumb" src="${img}" alt="">`
    : `<span class="mfc-thumb placeholder">🍷</span>`;
  el.innerHTML = `
    <div class="mfc-handle"></div>
    <button class="mfc-back" id="mfc-back" aria-label="Back to map">‹ Map</button>
    <button class="mfc-nav mfc-prev" id="mfc-prev" aria-label="Previous winery">‹</button>
    <button class="mfc-nav mfc-next" id="mfc-next" aria-label="Next winery">›</button>
    <div class="mfc-preview" id="mfc-open" role="button" tabindex="0">
      ${thumb}
      <div class="mfc-info">
        <b class="mfc-name">${w.name}${archStar(w)}</b>
        <div class="mfc-meta">${starsHTML(w._stars)} · ${w.valley} · ${w.ava}</div>
        <div class="mfc-sub">est. ${w.founded} · ${w.wines[0].name} · ${fmtPrice(w)}</div>
        <span class="mfc-hint">Tap for the full story · swipe ↔ to browse</span>
      </div>
    </div>`;
  el.classList.add("show");
  const back = () => { state.mapFocus = null; renderMap(); };
  const open = () => openDrawer(w.slug);
  $("#mfc-back").addEventListener("click", (e) => { e.stopPropagation(); back(); });
  $("#mfc-prev").addEventListener("click", (e) => { e.stopPropagation(); focusAdjacent(-1); });
  $("#mfc-next").addEventListener("click", (e) => { e.stopPropagation(); focusAdjacent(1); });
  $("#mfc-open").addEventListener("click", open);
  // Swipe up → open the drawer; swipe left/right → previous/next adjacent winery.
  let sx = null, sy = null;
  el.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  el.addEventListener("touchend", (e) => {
    if (sx == null) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    sx = sy = null;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 40) focusAdjacent(dx < 0 ? 1 : -1); // swipe left → next, right → prev
    } else if (dy < -40) {
      open();          // swipe up → full detail
    } else if (dy > 40) {
      scrollToTop();   // swipe down → back to the top / expanded header
    }
  }, { passive: true });
}

// Smoothly return to the top of the page, re-revealing the expanded header.
function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

// Right-side scrollable index: tap a name to isolate that winery on the map.
function renderMapIndex() {
  const el = $("#map-index");
  if (!el) return;
  const items = mapCandidates().slice().sort((a, b) => a.name.localeCompare(b.name));
  el.innerHTML = `
    <div class="mi-head">${state.mapFocus
      ? `<button class="link-btn" id="mi-clear">← Show all pins</button>`
      : `<span>${items.length} winer${items.length === 1 ? "y" : "ies"} shown · tap to locate</span>`}</div>
    <ul>${items.map((w) => `<li class="mi-item ${state.mapFocus === w.slug ? "active" : ""}" data-slug="${w.slug}">
      <span class="mi-dot ${w.valley}"></span><span class="mi-name">${w.name}${archStar(w)}</span></li>`).join("")}</ul>`;
  el.querySelectorAll(".mi-item").forEach((li) => li.addEventListener("click", () => {
    state.mapFocus = state.mapFocus === li.dataset.slug ? null : li.dataset.slug;
    renderMap();
  }));
  const clr = $("#mi-clear");
  if (clr) clr.addEventListener("click", () => { state.mapFocus = null; renderMap(); });
  // Desktop scrolls the active row into its own list pane; on mobile the list is
  // part of the page flow, so skip it (else focusing/browsing yanks the page away
  // from the preview card).
  const active = el.querySelector(".mi-item.active");
  if (active && !isSmallScreen()) active.scrollIntoView({ block: "nearest" });
  // Mobile: a downward drag anywhere on the index (header or body) snaps the page
  // back to the top, re-revealing the expanded header.
  if (isSmallScreen()) {
    let iy = null;
    el.addEventListener("touchstart", (e) => { iy = e.touches[0].clientY; }, { passive: true });
    el.addEventListener("touchend", (e) => {
      if (iy == null) return;
      const dy = e.changedTouches[0].clientY - iy;
      iy = null;
      if (dy > 60) scrollToTop();
    }, { passive: true });
  }
}

function renderMapFilters() {
  const bar = $("#map-filters");
  if (!bar) return;
  const wineChips = WINE_TYPES.map((t) =>
    `<button class="fchip ${state.mapWine.has(t.key) ? "active" : ""}" data-wine="${t.key}">${t.key}</button>`).join("");
  const knownChips = KNOWN_FOR.map((t) =>
    `<button class="fchip ${state.mapKnown.has(t.key) ? "active" : ""}" data-known="${t.key}">${t.label}</button>`).join("");
  const active = state.mapWine.size || state.mapKnown.size || state.mapAva.size;
  const avaMenu = avaOptions().map((r) =>
    `<label class="ava-opt"><input type="checkbox" data-ava="${r}" ${state.mapAva.has(r) ? "checked" : ""}>${r}</label>`).join("");
  const avaGroup = `<span class="fgroup"><span class="flabel">AVA</span>`
    + `<details class="ava-picker" ${state.mapAvaOpen ? "open" : ""}>`
    + `<summary class="fchip ${state.mapAva.size ? "active" : ""}">${state.mapAva.size ? `AVA · ${state.mapAva.size}` : "Any AVA"} ▾</summary>`
    + `<div class="ava-menu">${avaMenu}${state.mapAva.size ? `<button class="link-btn" id="ava-clear">Clear regions</button>` : ""}</div>`
    + `</details></span>`;
  // On phones fold the shown-count into the label (Show · N) so we can drop the
  // separate "N wineries shown" line and give the map more room.
  const shownCount = mapCandidates().length;
  const showLabel = isSmallScreen() ? `Show · ${shownCount}` : "Show";
  const showChips = `<span class="fgroup"><span class="flabel">${showLabel}</span>`
    + `<button class="fchip ${state.mapTopOnly ? "active" : ""}" data-top="1">★ Top ${MAP_TOP_N}</button>`
    + `<button class="fchip ${!state.mapTopOnly ? "active" : ""}" data-top="0">All ${WINERIES.length}</button></span>`;
  const groupsHTML = `
    <span class="fgroup"><span class="flabel">Wine</span>${wineChips}</span>
    <span class="fgroup"><span class="flabel">Known for</span>${knownChips}</span>
    ${avaGroup}
    ${active ? `<button class="link-btn" id="map-clear">Clear filters</button>` : ""}`;
  if (isSmallScreen()) {
    // Keep only Show visible; fold Wine/Known-for/AVA behind a filter icon.
    const count = state.mapWine.size + state.mapKnown.size + state.mapAva.size;
    bar.innerHTML = showChips
      + `<button class="fchip filter-toggle ${count || state.mapFiltersOpen ? "active" : ""}" id="map-filters-toggle" aria-expanded="${state.mapFiltersOpen}">${FUNNEL} Filters${count ? ` · ${count}` : ""}</button>`
      + (state.mapFiltersOpen ? `<div class="map-filter-panel">${groupsHTML}</div>` : "");
  } else {
    bar.innerHTML = showChips + groupsHTML;
  }
  const mapFiltersToggle = $("#map-filters-toggle");
  if (mapFiltersToggle) mapFiltersToggle.addEventListener("click", () => { state.mapFiltersOpen = !state.mapFiltersOpen; renderMap(); });
  bar.querySelectorAll("[data-top]").forEach((b) => b.addEventListener("click", () => {
    state.mapFocus = null; state.mapTopOnly = b.dataset.top === "1"; renderMap();
  }));
  bar.querySelectorAll("[data-wine]").forEach((b) => b.addEventListener("click", () => {
    state.mapFocus = null; toggleSet(state.mapWine, b.dataset.wine); renderMap();
  }));
  bar.querySelectorAll("[data-known]").forEach((b) => b.addEventListener("click", () => {
    state.mapFocus = null; toggleSet(state.mapKnown, b.dataset.known); renderMap();
  }));
  // AVA multi-picker: keep the panel open across selections by remembering its state.
  const picker = bar.querySelector(".ava-picker");
  if (picker) picker.addEventListener("toggle", () => { state.mapAvaOpen = picker.open; });
  bar.querySelectorAll("[data-ava]").forEach((cb) => cb.addEventListener("change", () => {
    state.mapFocus = null; state.mapAvaOpen = true; toggleSet(state.mapAva, cb.dataset.ava); renderMap();
  }));
  const avaClear = $("#ava-clear");
  if (avaClear) avaClear.addEventListener("click", () => { state.mapFocus = null; state.mapAva.clear(); renderMap(); });
  const clear = $("#map-clear");
  if (clear) clear.addEventListener("click", () => { state.mapFocus = null; state.mapWine.clear(); state.mapKnown.clear(); state.mapAva.clear(); renderMap(); });
}
function toggleSet(set, key) { set.has(key) ? set.delete(key) : set.add(key); }

/* ── Lineage view ── */
function renderLineage() {
  const bySlug = Object.fromEntries(WINERIES.map((w) => [w.slug, w]));
  const link = (w, sub) =>
    `<li><a onclick="openDrawer('${w.slug}')">${w.name}</a> <span class="valley-tag ${w.valley}" style="font-size:10.5px">${w.valley}</span>${sub ? `<span class="sub">${sub}</span>` : ""}</li>`;

  // Corporate families = any group that isn't flagged "Independent". Every member
  // is listed so each lineage is exhaustive; groups we haven't written a note for
  // yet still appear, with their wineries listed by name (no per-winery detail).
  const isIndependent = (w) => /^independent\b/i.test((w.group || "").trim());
  const groups = {};
  WINERIES.forEach((w) => { if (!isIndependent(w)) (groups[w.group] = groups[w.group] || []).push(w); });
  const corpCards = Object.entries(groups)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([g, ws]) => {
      const note = GROUP_NOTES[g];
      return `<div class="lineage-card">
      <h3>${g}</h3>
      ${note ? `<p class="note">${note}</p>` : ""}
      <ul>${ws.map((w) => link(w, note ? `est. ${w.founded} · ${w.ava}` : "")).join("")}</ul>
    </div>`;
    }).join("");

  const independents = WINERIES.filter(isIndependent);
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
let awardColor = new Set(["red", "white"]);
// Classify a Wine Spectator entry as red or white (sparkling & whites count as white).
function wineColor(name) {
  const t = name.toLowerCase();
  if (/white blend|chardonnay|sauvignon blanc|chenin|viognier|\bbrut\b|blanc de|sparkling|riesling|gew|s[eé]millon|pinot gris|pinot grigio|albari|\bwhite\b|marsanne|roussanne|ros[eé]/.test(t)) return "white";
  return "red";
}
function renderAwards() {
  const data = (window.WS_TOP100 || []).filter((e) => {
    if (!state.valleys.has(e.valley)) return false;
    if (awardYear !== "All" && e.year !== awardYear) return false;
    if (!awardColor.has(wineColor(e.wine))) return false;
    const q = state.query.trim().toLowerCase();
    if (q && !(e.wine + " " + e.winery).toLowerCase().includes(q)) return false;
    return true;
  }).sort((a, b) => b.year - a.year || a.rank - b.rank);

  const years = [...new Set((window.WS_TOP100 || []).map((e) => e.year))].sort((a, b) => b - a);
  const yearChips = ["All", ...years].map((y) =>
    `<button class="chip ${awardYear === y ? "active" : ""}" data-year="${y}">${y === "All" ? "All years" : y}</button>`).join("");
  const colorChips = [["red", "Reds"], ["white", "Whites"]].map(([c, lbl]) =>
    `<button class="chip ${awardColor.has(c) ? "active" : ""}" data-color="${c}">${lbl}</button>`).join("");

  const rows = data.map((e) => {
    const w = WINERIES.find((x) => x.slug === e.winerySlug);
    const wineryCell = w
      ? `<span class="winery-link">${w.name}${archStar(w)}</span>`
      : `<span style="color:var(--muted)">${e.winery}</span>`;
    return `<tr class="${w ? "award-row" : ""}"${w ? ` data-slug="${w.slug}"` : ""}>
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
      <p class="section-desc">Members of Wine Spectator's Global Top 100.</p>
      <div class="seg">${yearChips} <span class="seg-sep"></span> ${colorChips}</div>
      ${(() => {
        const metas = years.filter((y) => awardYear === "All" || awardYear === y)
          .filter((y) => window.WS_META && window.WS_META[y]);
        return metas.length ? `<details class="ws-overall">
          <summary>Overall Wine of the Year winners</summary>
          <div class="ws-overall-body">${metas.map((y) => `<p class="ws-meta"><b>${y}</b> — ${window.WS_META[y]}</p>`).join("")}</div>
        </details>` : "";
      })()}
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
  document.querySelectorAll("#awards .chip[data-color]").forEach((c) => {
    c.addEventListener("click", () => {
      const col = c.dataset.color;
      if (awardColor.has(col)) { if (awardColor.size > 1) awardColor.delete(col); } // keep at least one on
      else awardColor.add(col);
      renderAwards();
    });
  });
  document.querySelectorAll("#awards tbody tr[data-slug]").forEach((tr) => {
    tr.addEventListener("click", () => openDrawer(tr.dataset.slug));
  });
  // Show the count in the "Top Wines (N)" tab label rather than as its own line.
  const tab = document.querySelector('.view-toggle button[data-view="awards"]');
  if (tab) tab.textContent = `Top Wines (${data.length})`;
  $(".count").textContent = "";
}

/* ── Detail drawer ── */
function openDrawer(slug) {
  const w = WINERIES.find((x) => x.slug === slug);
  if (!w) return;
  const img = propertyImg(w);
  const lbl = labelImg(w);
  const gmaps = `https://maps.google.com/?q=${encodeURIComponent(w.name + " " + w.address)}`;

  $("#drawer").innerHTML = `
    <button class="drawer-close" onclick="closeDrawer()" aria-label="Back"><span class="dc-back">‹ Back</span><span class="dc-x">✕</span></button>
    ${img ? `<img class="hero" src="${img}" alt="${w.name}">` : `<div class="hero hero-map" id="hero-map"></div>`}
    <div class="drawer-body">
      <span class="valley-tag ${w.valley}">${w.valley} · ${w.ava}</span>
      <h2>${w.name}${archStar(w)}</h2>
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
  if (!img) initHeroMap(w);
}
// When a winery has no photo, the drawer hero becomes a small locator map with its pin.
let heroMap = null;
function initHeroMap(w) {
  if (heroMap) { heroMap.remove(); heroMap = null; }
  const el = document.getElementById("hero-map");
  if (!el || typeof L === "undefined") return;
  heroMap = L.map(el, {
    zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false,
    doubleClickZoom: false, boxZoom: false, keyboard: false, touchZoom: false, tap: false,
  });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", { maxZoom: 18 }).addTo(heroMap);
  heroMap.setView([w.lat, w.lng], 13);
  L.marker([w.lat, w.lng], { icon: markerIcon(w) }).addTo(heroMap);
  setTimeout(() => { if (heroMap) heroMap.invalidateSize(); }, 60);
}
function closeDrawer() {
  $("#overlay").classList.remove("open");
  $("#drawer").classList.remove("open");
  if (heroMap) { heroMap.remove(); heroMap = null; }
}
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;

/* ── View switching & filters ── */
function render() {
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  $(`#${state.view}-view`)?.classList.add("active");
  // The awards tab carries its count ("Top Wines (N)"); reset it off that view.
  if (state.view !== "awards") {
    const at = document.querySelector('.view-toggle button[data-view="awards"]');
    if (at) at.textContent = "Top Wines";
  }
  if (state.view === "table") renderTable();
  if (state.view === "map") {
    $("#map-view").classList.add("active"); renderMap();
    // Once layout settles, re-measure and re-fit so pins never end up off-screen.
    requestAnimationFrame(() => {
      if (!map) return;
      map.invalidateSize(false);
      if (!state.mapFocus && mapEntries.length) {
        map.fitBounds(L.latLngBounds(mapEntries.map((e) => e.latlng)).pad(0.15), { animate: false });
        separateMarkers(mapEntries);
      }
    });
  }
  if (state.view === "itinerary") { $("#itinerary-view").classList.add("active"); window.itinItinerary && window.itinItinerary.render(); }
  if (state.view === "awards") renderAwards();
  if (state.view === "lineage") { $("#lineage-view").classList.add("active"); renderLineage(); }
  writeHash();
}

const controlsEl = document.querySelector(".controls");
document.querySelectorAll(".view-toggle button").forEach((b) => {
  b.addEventListener("click", () => {
    state.view = b.dataset.view;
    state.navOpen = false; controlsEl.classList.remove("nav-open");
    $("#nav-toggle").setAttribute("aria-expanded", "false");
    syncControls();
    render();
  });
});
document.querySelectorAll(".chip[data-valley]").forEach((c) => {
  c.addEventListener("click", () => {
    const v = c.dataset.valley;
    // both on by default; unselecting one focuses the other. Never allow empty.
    if (state.valleys.has(v)) { if (state.valleys.size > 1) state.valleys.delete(v); }
    else state.valleys.add(v);
    state.mapFocus = null;
    pruneMapAva();
    syncControls();
    render();
  });
});
$("#nav-toggle").addEventListener("click", () => {
  state.navOpen = !state.navOpen;
  controlsEl.classList.toggle("nav-open", state.navOpen);
  $("#nav-toggle").setAttribute("aria-expanded", String(state.navOpen));
});
$("#search-toggle").addEventListener("click", () => {
  state.searchOpen = !state.searchOpen;
  controlsEl.classList.toggle("search-open", state.searchOpen);
  $("#search-toggle").setAttribute("aria-expanded", String(state.searchOpen));
  if (state.searchOpen) $("#search").focus();
});
$("#search").addEventListener("input", (e) => { state.query = e.target.value; state.mapFocus = null; render(); });
$("#overlay").addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

/* ── URL state: persist view + filters across refresh ──────────────────────
   The hash holds a compact query string (e.g. #v=map&valley=Napa&wine=Cabernet).
   Legacy single-token deep links (#map, #lineage, #awards, #<slug>) still work. */
let pendingDrawer = null;
let applyingHash = false;

function encodeState() {
  const p = new URLSearchParams();
  if (state.view !== "table") p.set("v", state.view);
  if (state.valleys.size === 1) p.set("valley", [...state.valleys][0]); // both = default, omit
  if (state.query.trim()) p.set("q", state.query.trim());
  if (state.grouped) p.set("grp", "1");
  if (!(state.sort.key === "prestige" && state.sort.dir === -1)) p.set("sort", `${state.sort.key}:${state.sort.dir}`);
  if (state.mapWine.size) p.set("wine", [...state.mapWine].join(","));
  if (state.mapKnown.size) p.set("known", [...state.mapKnown].join(","));
  if (state.mapAva.size) p.set("ava", [...state.mapAva].join("~"));
  if (state.tableTags.size) p.set("tags", [...state.tableTags].join(","));
  if (!state.mapTopOnly) p.set("all", "1");
  if (!state.tableTopOnly) p.set("tall", "1");
  if (state.mapFocus) p.set("focus", state.mapFocus);
  return p.toString();
}
function writeHash() {
  if (applyingHash) return; // don't rewrite while restoring from the hash
  const s = encodeState();
  history.replaceState(null, "", location.pathname + location.search + (s ? "#" + s : ""));
}
function applyHash() {
  // reset persisted state to defaults, then layer on whatever the hash specifies
  state.view = "table"; state.valleys = new Set(["Napa", "Sonoma"]); state.query = "";
  state.grouped = false; state.sort = { key: "prestige", dir: -1 };
  state.mapWine = new Set(); state.mapKnown = new Set(); state.mapAva = new Set();
  state.tableTags = new Set(); state.mapFocus = null;
  state.mapTopOnly = true; state.tableTopOnly = true;
  pendingDrawer = null;
  const raw = location.hash.slice(1);
  if (!raw) return;
  if (!raw.includes("=")) { // legacy deep link
    if (["map", "lineage", "awards", "table", "itinerary"].includes(raw)) state.view = raw;
    else if (WINERIES.some((w) => w.slug === raw)) pendingDrawer = raw;
    return;
  }
  const p = new URLSearchParams(raw);
  const views = ["table", "map", "awards", "lineage", "itinerary"];
  if (views.includes(p.get("v"))) state.view = p.get("v");
  if (["Napa", "Sonoma"].includes(p.get("valley"))) state.valleys = new Set([p.get("valley")]);
  if (p.has("q")) state.query = p.get("q") || "";
  if (p.get("grp") === "1") state.grouped = true;
  const sort = p.get("sort");
  if (sort) { const [k, d] = sort.split(":"); if (k) state.sort = { key: k, dir: Number(d) === 1 ? 1 : -1 }; }
  if (p.get("wine")) state.mapWine = new Set(p.get("wine").split(",").filter(Boolean));
  if (p.get("known")) state.mapKnown = new Set(p.get("known").split(",").filter(Boolean));
  if (p.get("ava")) state.mapAva = new Set(p.get("ava").split("~").filter(Boolean));
  if (p.get("tags")) state.tableTags = new Set(p.get("tags").split(",").filter(Boolean));
  if (p.get("all") === "1") state.mapTopOnly = false;
  if (p.get("tall") === "1") state.tableTopOnly = false;
  const focus = p.get("focus");
  if (focus && WINERIES.some((w) => w.slug === focus)) state.mapFocus = focus;
}
function syncControls() {
  document.querySelectorAll(".view-toggle button").forEach((b) => b.classList.toggle("active", b.dataset.view === state.view));
  document.querySelectorAll(".chip[data-valley]").forEach((c) => c.classList.toggle("active", state.valleys.has(c.dataset.valley)));
  $("#search").value = state.query;
  const ham = $("#nav-toggle");
  if (ham) ham.textContent = state.view === "map" ? "☰ Map" : state.view === "awards" ? "☰ Top Wines" : state.view === "lineage" ? "☰ Lineage" : state.view === "itinerary" ? "☰ Itinerary" : "☰ Table";
}
function restoreFromHash() {
  applyingHash = true;
  applyHash();
  pruneMapAva(); // a shared/stale link could restore an AVA that doesn't match its valley
  syncControls();
  render();
  applyingHash = false;
  writeHash(); // normalize legacy hashes to the canonical form
}

restoreFromHash();
if (pendingDrawer) openDrawer(pendingDrawer);
// Respond to manual URL edits / shared links (our own replaceState doesn't fire this).
window.addEventListener("hashchange", () => { restoreFromHash(); });
// The browser tries to scroll to a matching element id on load — undo that.
window.addEventListener("load", () => setTimeout(() => window.scrollTo(0, 0), 0));
// Re-render when crossing the phone/desktop breakpoint (table ⇄ card layout).
let _wasSmall = isSmallScreen(), _resizeT = null;
window.addEventListener("resize", () => {
  clearTimeout(_resizeT);
  _resizeT = setTimeout(() => {
    const small = isSmallScreen();
    if (small !== _wasSmall) {
      _wasSmall = small;
      if (state.view === "table") renderTable();
      if (state.view === "map" && map) renderMap();
    }
  }, 180);
});
