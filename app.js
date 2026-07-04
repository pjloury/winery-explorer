/* Winery Explorer — table / map / lineage views over WINERIES (data.js).
   Images are optional: IMG manifest (manifest.js) maps slug → {property, label};
   anything missing falls back to a placeholder. */

const IMG = window.IMG || {};
const $ = (sel) => document.querySelector(sel);

const state = {
  view: "table",
  valley: "All",
  query: "",
  sort: { key: "founded", dir: 1 },
};

const fmtPrice = (w) => `$${w.priceRange[0]}–$${w.priceRange[1]}`;
const propertyImg = (w) => (IMG[w.slug] && IMG[w.slug].property) || null;
const labelImg = (w) => (IMG[w.slug] && IMG[w.slug].label) || null;

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
    if (key === "price") { va = a.priceRange[0]; vb = b.priceRange[0]; }
    else { va = a[key]; vb = b[key]; }
    return (va - vb) * dir;
  });
}

/* ── Table view ── */
function renderTable() {
  const list = sorted(filtered());
  const arrow = (k) => state.sort.key === k ? `<span class="arrow">${state.sort.dir === 1 ? "▲" : "▼"}</span>` : "";
  const rows = list.map((w) => {
    const img = propertyImg(w);
    const thumb = img
      ? `<img class="thumb" src="${img}" alt="" loading="lazy">`
      : `<span class="thumb placeholder">🍷</span>`;
    const badges = w.storyTags.map((t) => `<span class="badge">${STORY_TAG_LABELS[t].label}</span>`).join("");
    return `<tr data-slug="${w.slug}">
      <td><div class="w-name">${thumb}<span><b>${w.name}</b><span class="ava">${w.ava}</span></span></div></td>
      <td><span class="valley-tag ${w.valley}">${w.valley}</span></td>
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
  }).join("");

  $("#table-view").innerHTML = `<div class="table-wrap"><table>
    <thead><tr>
      <th class="sortable" data-sort="name">Winery ${arrow("name")}</th>
      <th>Valley</th>
      <th class="sortable" data-sort="founded">Founded ${arrow("founded")}</th>
      <th>Famous for</th>
      <th>Vibe</th>
      <th class="sortable" data-sort="price">Bottle $ ${arrow("price")}</th>
      <th>Visits</th>
      <th>Story</th>
    </tr></thead>
    <tbody>${rows || `<tr><td colspan="8" style="color:var(--muted);text-align:center;padding:32px">No wineries match.</td></tr>`}</tbody>
  </table></div>`;

  document.querySelectorAll("#table-view th.sortable").forEach((th) => {
    th.addEventListener("click", () => {
      const k = th.dataset.sort;
      if (state.sort.key === k) state.sort.dir *= -1;
      else state.sort = { key: k, dir: 1 };
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

function renderMap() {
  initMap();
  markerLayer.clearLayers();
  const list = filtered();
  list.forEach((w) => {
    const m = L.circleMarker([w.lat, w.lng], {
      radius: 9, color: "#fffdf9", weight: 2,
      fillColor: VALLEY_COLOR[w.valley], fillOpacity: 0.95,
    });
    const img = propertyImg(w);
    m.bindPopup(`<div class="popup-card">
        ${img ? `<img src="${img}" alt="${w.name}">` : ""}
        <b>${w.name}</b>
        <div class="meta">${w.valley} · ${w.ava} · est. ${w.founded}<br>${w.wines[0].name} · ${fmtPrice(w)}</div>
        <button onclick="openDrawer('${w.slug}')">Full story →</button>
      </div>`, { maxWidth: 260 });
    m.bindTooltip(w.name, { direction: "top", offset: [0, -8] });
    markerLayer.addLayer(m);
  });
  if (list.length) {
    map.fitBounds(L.latLngBounds(list.map((w) => [w.lat, w.lng])).pad(0.12));
  }
  $(".count").textContent = `${list.length} of ${WINERIES.length} wineries`;
}

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
    .filter(([tag]) => tag !== "consolidated")
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
    <div class="lineage-grid">${storyCards}</div>`;
  $(".count").textContent = `${WINERIES.length} wineries`;
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
    render();
  });
});
$("#search").addEventListener("input", (e) => { state.query = e.target.value; render(); });
$("#overlay").addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

// Deep links: #map, #lineage, or #<winery-slug>
const hash = location.hash.slice(1);
if (hash === "map" || hash === "lineage") {
  state.view = hash;
  document.querySelectorAll(".view-toggle button").forEach((b) =>
    b.classList.toggle("active", b.dataset.view === hash));
}
render();
if (hash && WINERIES.some((w) => w.slug === hash)) openDrawer(hash);
// The browser scrolls to a matching element id after load — undo that for view hashes.
if (hash) window.addEventListener("load", () => setTimeout(() => window.scrollTo(0, 0), 0));
