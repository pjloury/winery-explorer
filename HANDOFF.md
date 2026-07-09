# Session handoff — Winery Explorer

## v3 COMPLETE (2026-07-09, session 3) — Gen-AI Itinerary Builder
Built a new **Itinerary** tab: voice/text trip requests → a routed, timed winery
itinerary. Key pieces:
- **Data enrichment**: all 99 wineries in `data.js` gained `hours` (by day),
  `hoursNote`, `dogFriendly`/`dogNote`, `kidFriendly`/`kidNote`, and
  `reservationRequired`/`reservationNote`, researched via 10 parallel web-research
  agents. Fields inferred rather than found from a published source are flagged
  `(inferred)` in the note text — spot-check before trusting for a real visit.
- **`itinerary.js`** (new): the route/scheduling engine — filters by open-hours for
  the chosen date/day, dog/kid requirements, and valley; orders stops via
  nearest-neighbor from a start point; simulates the day's clock (drive → wait-for-open
  → visit → drive…), trimming stops that don't fit; totals tasting-fee cost; flags
  reservation-required stops and anything dropped (closed, policy mismatch, out of
  time). Prompt parsing tries `/api/parse-itinerary` (Claude API, tool use) first and
  silently falls back to a local rule-based parser (`itinLocalParse`) if that 501s or
  errors — so the feature works with zero setup. Drive times try Google's
  `DistanceMatrixService` (needs `config.js`'s `googleMapsApiKey`) and fall back to a
  haversine + road-winding-factor estimate. Voice input is the browser's
  `SpeechRecognition` API, no backend needed.
  - Uses its own `iq`/`iqa` DOM-query helpers instead of `$` — app.js already declares
    a top-level `const $` in the shared classic-script global scope, so redeclaring it
    in itinerary.js would throw a `SyntaxError` and break the whole app. Any new
    top-level identifiers should keep the `itin`/`ITIN_` prefix convention to avoid
    colliding with app.js's globals (`state`, `map`, `IMG`, etc.).
- **`api/parse-itinerary.js`** (new): Vercel serverless function, calls
  `claude-opus-4-8` via `@anthropic-ai/sdk` with a forced tool call
  (`extract_trip`) for guaranteed structured JSON. Needs `ANTHROPIC_API_KEY` set as a
  Vercel env var — **not done by this session**, the user needs to add it (dashboard
  or `vercel env add`). Added a root `package.json` (`"type": "module"`, one
  dependency) purely so Vercel's build installs the SDK for this one function; the
  rest of the site remains build-step-free.
- **`config.js`** (new, committed): `window.APP_CONFIG.googleMapsApiKey`, empty by
  default. **Not set by this session** — the user needs to create a browser key in
  Google Cloud Console restricted by HTTP referrer to the deployed domain(s) and paste
  it in. Safe to commit (referrer-restricted browser keys are meant to be public,
  unlike the Anthropic key).
- app.js/index.html/style.css got minimal additive hooks: an "Itinerary" nav button,
  an `#itinerary-view` container, `views`/hash-routing arrays extended, and a render()
  dispatch line — no existing view's code was touched.
- Verified via headless Chromium (Playwright, already present in this environment) —
  local-parser pipeline end-to-end (prompt → criteria → routed plan with correct
  times/costs/badges), the manual edit-and-rebuild path, and a regression pass on
  Table/Map to confirm nothing broke. `node --check` clean on all new/changed `.js`.
  **Not verified**: the real LLM endpoint (no `ANTHROPIC_API_KEY` in this sandbox) or
  real Google Maps drive times (no key set) — both have working, tested fallback
  paths, but the "upgraded" paths should be smoke-tested once the user adds the keys.

### Next steps for the user
1. Add `ANTHROPIC_API_KEY` in Vercel project settings to enable real LLM prompt
   parsing (works without it, via the local parser).
2. Create a referrer-restricted Google Maps browser key and set it in `config.js` to
   enable real drive times (works without it, via the haversine estimate).
3. Spot-check a handful of the `(inferred)` hours/dog/kid/reservation fields in
   `data.js` before relying on the Itinerary tab for an actual visit.
4. Deploy: `npx vercel deploy --prod --yes` (per the v1 handoff note below, pushing to
   git does NOT auto-deploy this project).

---
## v2 COMPLETE (2026-07-03, session 2)
All the in-flight work below was finished and deployed:
- **87 wineries** total (50 Napa / 37 Sonoma). The 34 Wine Spectator Top 100 leaderboard wineries were researched and added as full entries (verified coords/ownership/prose); every leaderboard row now links into the explorer.
- **Coordinates + facts** for the 24 wineries added in session 1 were web-verified and corrected (18/24 coords changed; fixed owners for Progeny, Rams Gate→O'Neill, Kistler→Bill Price, MacRostie→Distinguished Vineyards, Donum→Warburg family; corrected several addresses).
- **`awards.js`** (WS Top 100 2024+2025 Napa/Sonoma) was independently fact-checked — all 42 entries confirmed real and accurately ranked/scored; no corrections needed.
- **GROUP_NOTES** gained: Terlato, Chanel (Wertheimer), E&J Gallo, Huneeus Vintners, Crimson, Roederer, AXA Millésimes, Distinguished Vineyards, O'Neill.
- **Images**: all 34 new wineries have label images; 14 have property photos (cult/allocation producers have no open-licensed estate photos — skips logged in ATTRIBUTIONS.md). Manifest rebuilt.
- Verified via headless-Chrome screenshots (table/map/lineage/awards + drawer) and `node --check`. README updated. Committed + deployed to prod.

---
## Original session-1 handoff (historical)

Resume point for the next Claude session. Read this fully before continuing.

## Deployed state (v1 — live and healthy)
- **Live site:** https://winery-explorer.vercel.app (Vercel CLI deploys only — pushing to git does NOT auto-deploy)
- **Repo:** https://github.com/pjloury/winery-explorer (gh CLI authed as pjloury; Vercel CLI authed, project linked in `.vercel/`)
- v1 = 29 wineries (15 Napa / 14 Sonoma), fact-checked coords/ownership, table + map + lineage views, property photos (`images/property/`), label images (`images/labels/`), `manifest.js` generated by `./build-manifest.sh`.

## Work in progress (committed but NOT deployed)
User asked for three things (all in flight):
1. **Add all Napa/Sonoma wineries from the book "The New Architecture of Wine" (Hebert, 2019).** Research confirmed the book's 25 wineries; 21 are Napa/Sonoma; only Joseph Phelps was already in the app. → 20 added.
2. **Ensure these are present:** V. Sattui, Inglenook ✓ (had), Far Niente ✓ (had), Round Pond, Clos du Val, Darioush. → 4 added.
3. **Wine Spectator Top 100 leaderboard** (most recent lists), Napa/Sonoma wines only, each row linking to its winery in the app — *and wineries appearing on the leaderboard should be added to the app if missing*.

### Already done in code
- `data.js`: 24 new entries written (total 53: 27 Napa / 26 Sonoma). New slugs:
  - Napa: quintessa, hall, cade, cuvaison, trinchero, davis-estates, melka-estates, progeny, stewart-cellars, hourglass, dana-estates, darioush, clos-du-val, round-pond, v-sattui
  - Sonoma: rams-gate, macrostie, occidental, hamel, donum, williams-selyem, kistler, medlock-ames, la-crema-saralee
  - Book wineries carry `architect`, `bookSection` fields + `"architecture"` storyTag; STORY_TAG_LABELS has an `architecture` entry; GROUP_NOTES gained PlumpJack Group and Trinchero Family Estates.
- `app.js`: Lineage view has a "New Architecture of Wine" section; drawer shows an Architecture cell; new `renderAwards()` leaderboard view reads `window.WS_TOP100` from `awards.js`.
- `index.html`: "Top Wines" tab + `awards.js` include; deep-link `#awards` supported.
- `style.css`: leaderboard styles (`.rank-badge`, `.winery-link`, etc.).
- `awards.js`: **placeholder — `window.WS_TOP100 = []`** awaiting real data.

### NOT yet done (the restart to-do list)
1. **Coordinates for the 24 new wineries are my rough estimates** — they need verification (the in-flight verify agent died with the old session). Relaunch a web-verification agent for the 24 new slugs returning JSON: `{slug, address, lat, lng, founded, currentOwner, openToPublic, tastingByApptOnly, tastingFee, notes}`. Facts I was least sure of: progeny (owner/founded), rams-gate (current owner 2026), kistler (Bill Price stake?), donum (Warburg ownership), davis-estates, hamel, cuvaison founding, melka/hourglass/occidental/progeny tasting addresses. Then apply corrections to data.js (same pattern as the v1 fact-check commit).
2. **Property photos for the 24 new slugs** → `images/property/<slug>.jpg` via fetch-place agents (openly licensed, skip rather than wrong image; append to ATTRIBUTIONS.md). Check `ls images/property/` first — the old agents may have saved some before dying.
3. **Label images for the 24 new slugs** → `images/labels/<slug>.{jpg,png}` (Commons → official site → retailer; append SOURCES.md). Flagship wines per slug: quintessa=Quintessa; hall=Kathryn Hall Cab; cade=Howell Mtn Cab; cuvaison=Estate Chardonnay; trinchero=Mario's Reserve Cab; davis-estates=Phase V Cab; melka-estates=Métisse; progeny=Reserve Cab; stewart-cellars=NOMAD To Kalon Cab; hourglass=Estate Cab; dana-estates=Lotus Vineyard Cab; darioush=Signature Cab; clos-du-val=SLD Estate Cab; round-pond=Rutherford Estate Cab; v-sattui=Morisoli Cab; rams-gate=Sonoma Coast Pinot; macrostie=Sonoma Coast Chard; occidental=Freestone-Occidental Pinot; hamel=Isthmus; donum=Carneros Estate Pinot; williams-selyem=RRV Pinot; kistler=Les Noisetiers Chard; medlock-ames=Bell Mountain Cab; la-crema-saralee=Saralee's Vineyard Chard.
4. **Wine Spectator Top 100 data** (agent also died): get 2025 (published Nov 2025) + 2024 lists from top100.winespectator.com, extract ONLY Napa/Sonoma county wines with {year, rank, winery, wine, vintage, score, price, county}; populate `awards.js` as `window.WS_TOP100 = [{year, rank, winery, winerySlug|null, wine, vintage, score, price, valley: "Napa"|"Sonoma"}]`. Then **add full data.js entries for any leaderboard wineries not yet in the app** (per user request #3), with photos/labels/verified coords like the others.
5. Run `./build-manifest.sh` after any image changes.
6. Verify: `node --check` data/app/awards; headless Chrome screenshots (`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot=... "file://$PWD/index.html#awards"` etc. — `#map`, `#lineage`, `#<slug>` deep links work); check the four views + one drawer with architecture cell.
7. Update README.md (mention Top Wines view + architecture data + new count), commit, push, deploy: `npx vercel deploy --prod --yes`.

## Facts worth keeping (verified this session — don't re-research)
- Book list (21 Napa/Sonoma, high confidence, from the book's own TOC via Google Books + independent reviews): the 20 added + Joseph Phelps. Excluded (outside our counties): Presqu'ile (Santa Maria), Law Estate & Saxum & Epoch (Paso Robles). No second edition exists.
- v1 fact-check corrections already applied & deployed: Antinori sole owner of Stag's Leap since 2023; SIMI tasting room closed since 2023, brand → The Wine Group (Jun 2025) → WarRoom Cellars (Nov 2025); Duckhorn estate closed for renovation Apr 2026–~Apr 2027 (tastings at Paraduxx); Mondavi Oakville reopened Apr 2026 ($200M reno), Constellation kept RMW/To Kalon in its 2025 divestiture; Sterling reopened Oct 2023; Far Niente majority-owned by GI Partners; Heitz salon walk-ins OK; Domaine Carneros 21+.
- Label images: personal-use sourcing (some from winery/retailer sites) — user was told and is fine with them on the public site.
- Palette: Napa #8e2f45 / Sonoma #3a7d44 (validated); CSS custom props in style.css, dark mode included.
