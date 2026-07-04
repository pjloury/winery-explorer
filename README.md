# Napa & Sonoma Winery Explorer

A self-contained web app covering 29 top wineries (15 Napa, 14 Sonoma): founding
dates, consolidation/resurrection histories, famous wines, vibe, addresses,
tours, bottle prices, awards — with property photos and wine-label images so you
can recognize the bottles.

## Run it

Just open `index.html` in a browser (internet needed for map tiles):

```sh
open index.html
```

## Views

- **Table** — sortable by name / founded / price; filter by valley; full-text search
  across wines, history, vibe, owners.
- **Map** — Leaflet map, markers colored by valley (burgundy = Napa, green = Sonoma);
  click a marker for a photo card, then the full story.
- **Lineage** — who owns whom (corporate families vs. the still-independent club),
  plus resurrections, reused historic spaces, and Judgment of Paris connections.

Deep links: `index.html#map`, `index.html#lineage`, or `index.html#<slug>`
(e.g. `#inglenook`) to open straight to a winery.

## Files

- `data.js` — the dataset (all facts, timelines, prices). Prices/fees are
  approximate as of mid-2026; verify before visiting.
- `images/property/` — winery photos (openly licensed; see `ATTRIBUTIONS.md`).
- `images/labels/` — flagship-wine label images for recognition (sources in
  `SOURCES.md`; official/retail bottle shots, personal-use only — don't republish).
- `manifest.js` — auto-generated image index. After adding/removing images run:
  `./build-manifest.sh`
