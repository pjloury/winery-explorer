# Napa & Sonoma Winery Explorer

A self-contained web app covering 87 top wineries (50 Napa, 37 Sonoma): founding
dates, consolidation/resurrection histories, famous wines, vibe, addresses,
tours, bottle prices, awards — with property photos and wine-label images so you
can recognize the bottles.

## Run it

Just open `index.html` in a browser (internet needed for map tiles):

```sh
open index.html
```

## Views

- **Table** — sortable by **Prestige** (a 5-star rating blending an editorial acclaim
  tier with Wine Spectator Top 100 standing; the default sort), name, founded, or price;
  filter by valley; full-text search across wines, history, vibe, owners. Toggle
  **By region · N→S** to group wineries into collapsible AVA sections ordered
  north-to-south.
- **Map** — Leaflet map, markers colored by valley (burgundy = Napa, green = Sonoma);
  click a marker for a photo card, then the full story.
- **Lineage** — who owns whom (corporate families vs. the still-independent club),
  plus resurrections, reused historic spaces, Judgment of Paris connections, and
  the wineries featured in *The New Architecture of Wine* (Hebert, 2019).
- **Top Wines** — every Napa & Sonoma county wine on Wine Spectator's most recent
  Top 100 lists (2024 & 2025), ranked, each linking to its winery's full story.

Deep links: `index.html#map`, `index.html#lineage`, `index.html#awards`, or
`index.html#<slug>` (e.g. `#inglenook`) to open straight to a winery.

## Files

- `data.js` — the dataset (all facts, timelines, prices; some entries carry
  `architect`/`bookSection` for the architecture feature). Prices/fees are
  approximate as of mid-2026; verify before visiting.
- `awards.js` — Wine Spectator Top 100 (Napa/Sonoma) data for the Top Wines view.
- `images/property/` — winery photos (openly licensed; see `ATTRIBUTIONS.md`).
- `images/labels/` — flagship-wine label images for recognition (sources in
  `SOURCES.md`; official/retail bottle shots, personal-use only — don't republish).
- `manifest.js` — auto-generated image index. After adding/removing images run:
  `./build-manifest.sh`
