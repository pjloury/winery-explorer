# Napa & Sonoma Winery Explorer

A self-contained web app covering 99 top wineries (62 Napa, 37 Sonoma): founding
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
  filter by valley; full-text search across wines, history, vibe, owners. A
  color-coded **Group** column shows each winery's corporate family (sortable, so
  same-group estates cluster) vs. the independents. Toggle **By region · N→S** to
  group wineries into collapsible AVA sections ordered north-to-south. Wineries in
  Heather Sandy Hebert's *The New Architecture of Wine* carry a 📖 New Architecture badge.
- **Map** — Leaflet map showing the **top 25 wineries by prestige** as circular logo
  markers (winery logo where available, a monogram otherwise), ringed by valley color
  (burgundy = Napa, green = Sonoma). Filter by **wine type** (Cabernet, Pinot Noir,
  Chardonnay, Zinfandel, Sauvignon Blanc, Sparkling) or by what a winery is **known for**
  (Architecture, History & heritage, Gardens & grounds, Food & art); applying any filter
  expands the map to *every* matching winery, not just the top 25. Click a marker for a
  photo card with a one-line description and key badges (Wine Spectator Top 100 rank,
  Judgment of Paris, New Architecture). A scrollable winery index on the right lets you
  tap any name to isolate that estate on the map and open its card.
- **Lineage** — who owns whom (corporate families vs. the still-independent club),
  plus resurrections, reused historic spaces, Judgment of Paris connections, and
  the wineries featured in *The New Architecture of Wine* (Hebert, 2019).
- **Top Wines** — every Napa & Sonoma county wine on Wine Spectator's most recent
  Top 100 lists (2024 & 2025), ranked, each linking to its winery's full story.
- **Itinerary** — describe a trip by voice or text ("Napa this Saturday, 3 wineries,
  we have a dog, back by 5pm") and get a routed, timed plan: only wineries open that
  day, ordered to minimize driving, with arrival/departure times, drive time between
  stops, estimated tasting-fee cost for your party, and badges for dog/kid policy and
  whether a reservation is required. Edit the parsed date/time/party size/valley/dog
  &kid needs directly and re-route without retyping. See **Setup** below for the two
  optional integrations that upgrade it beyond the zero-config defaults.

Deep links: `index.html#map`, `index.html#lineage`, `index.html#awards`,
`index.html#itinerary`, or `index.html#<slug>` (e.g. `#inglenook`) to open straight
to a winery.

## Setup (Itinerary tab)

The Itinerary tab works out of the box with **zero configuration** — voice input uses
the browser's built-in Web Speech API, prompt parsing falls back to a local rule-based
parser, and drive times fall back to a straight-line estimate. Two optional upgrades:

1. **Real LLM prompt parsing** (`api/parse-itinerary.js`, a Vercel serverless
   function) — set an `ANTHROPIC_API_KEY` environment variable on the Vercel project
   (dashboard → Settings → Environment Variables, or `vercel env add
   ANTHROPIC_API_KEY`). Without it the endpoint returns 501 and the client silently
   falls back to the local parser — the tab still works, just parses less flexibly.
2. **Real driving times** via Google's Distance Matrix (Maps JavaScript API) — put a
   browser API key, restricted by HTTP referrer to this site's domain(s) in Google
   Cloud Console, into `config.js` (`window.APP_CONFIG.googleMapsApiKey`). Leave it
   empty to use the built-in haversine-distance estimate instead.

`npm install` is only needed for Vercel to build `api/parse-itinerary.js` (it pulls in
`@anthropic-ai/sdk` from `package.json`); the rest of the site has no build step.

## Files

- `data.js` — the dataset (all facts, timelines, prices; some entries carry
  `architect`/`bookSection` for the architecture feature). Prices/fees are
  approximate as of mid-2026; verify before visiting. Each winery also carries
  `hours` (by day), `dogFriendly`/`kidFriendly` (`yes`/`no`/`outdoor-only`/`limited`
  + a note), and `reservationRequired` (`required`/`recommended`/`walk-in` + a note)
  for the Itinerary tab — researched estimates, not live data; verify before visiting.
- `awards.js` — Wine Spectator Top 100 (Napa/Sonoma) data for the Top Wines view.
- `itinerary.js` — the Itinerary tab: prompt parsing (LLM + local fallback), the
  route/scheduling engine (open-hours filtering, nearest-neighbor routing, drive-time
  lookup), and its UI.
- `api/parse-itinerary.js` — Vercel serverless function that turns a free-form trip
  request into structured JSON via the Claude API (tool use). See **Setup** above.
- `config.js` — public, committed config (currently just the optional Google Maps
  browser key — safe to commit since it's referrer-restricted, not a secret).
- `images/property/` — winery photos (openly licensed; see `ATTRIBUTIONS.md`).
- `images/labels/` — flagship-wine label images for recognition (sources in
  `SOURCES.md`; official/retail bottle shots, personal-use only — don't republish).
- `manifest.js` — auto-generated image index. After adding/removing images run:
  `./build-manifest.sh`
