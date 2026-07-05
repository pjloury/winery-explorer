# Ideas (not yet built)

Specs for features we've discussed but deliberately haven't implemented yet.
Each entry should be detailed enough to hand to a fresh session and start
building without re-deriving the design.

---

## Featured Winery — full-screen takeover

**One-liner:** A hands-off, full-screen "spotlight" view that takes over the
whole browser window to tell one winery's complete story — no clicking
required to consume it.

### Motivation

The existing views (Table, Map, Lineage, Top Wines) are all *browsing* modes —
built for comparing, filtering, and scanning many wineries at once. There's no
mode built for going deep on **one** winery: sitting back and actually
absorbing its history, wines, architecture, and vibe the way a magazine
profile or a documentary segment would present it. Featured Winery is that
mode — closer to a slideshow/kiosk experience than a reference table.

### Initial scope: the Top 25 ∩ New Architecture subset

Rather than build this for all 88 wineries on day one, launch with the
intersection of:

1. **Top 25 by prestige** (`w._rank <= 25`, the same set the Map view treats
   as "top wineries") — i.e., the estates already established as the most
   noteworthy in the app, and
2. **Featured in *The New Architecture of Wine*** (Hebert, 2019) —
   `w.storyTags.includes("architecture")`, which already carries `architect`
   and `bookSection` fields for a richer story.

This subset is small, distinctive, and already has the extra `architect` /
`bookSection` data needed for a good architecture-focused narrative beat —
it's the natural place to prove out the format before expanding it.

**As of this writing, that intersection is exactly 3 wineries:**

| Rank | Slug | Winery | Valley | Architect | Book chapter |
|---|---|---|---|---|---|
| 3 | `williams-selyem` | Williams Selyem | Sonoma | Alex Ceppi / D.arc Group | "Singular Voices" |
| 4 | `kistler` | Kistler Vineyards | Sonoma | Architectural Resources Group (Trenton Roadhouse) | "History Reenvisioned" |
| 6 | `joseph-phelps` | Joseph Phelps Vineyards | Napa | BCV Architecture + Interiors | "History Reenvisioned" |

(Ranks are computed by the existing `_prestige` formula in `app.js`; re-run
that computation before building, since prestige shifts as WS Top 100 data /
`ACCLAIM` values change year to year.)

**Expansion path (later, not now):**
- Phase 2: all 25 top-prestige wineries, architecture-featured or not.
- Phase 3: any of the 88 wineries, reachable via deep link even if not in the
  curated rotation (e.g. share a link to one estate's spotlight).

### Interaction model — "you don't have to click anywhere"

- Entering the mode is one click (or a deep link); once inside, the story
  plays itself.
- The view auto-advances through a fixed sequence of full-bleed "slides" for
  the current winery (see Layout below), each shown for a set dwell time
  (~6–10s for text-light slides, longer for timeline/history slides that need
  reading time — scale dwell time to content length rather than a flat
  timer).
- After the last slide for a winery, auto-advance to the **next** winery in
  the featured rotation (loops back to the first after the last). This is
  what makes it a true "takeover" — left alone, it cycles through the whole
  curated set indefinitely, like a lobby display.
- Optional, not required, controls for anyone who *does* want to interact:
  - Tap/click anywhere → pause auto-advance and reveal minimal prev/next
    arrows + a progress dots indicator.
  - `Esc` or a small close (×) affordance in a corner → exit back to
    whichever view was active before.
  - Keyboard: ←/→ to step slides, ↑/↓ or a swipe to jump winery-to-winery,
    space to pause/resume autoplay.
- Ambient motion (slow Ken-Burns zoom/pan on hero photos, gentle
  cross-fades between slides) so it feels alive even though nothing requires
  input — reinforces "just watch this."

### Layout — per-winery slide sequence

Full viewport, header/nav/filters hidden entirely (true takeover, not a
modal over the existing chrome). Suggested slide order, all built from data
already in `data.js`:

1. **Hero** — full-bleed property photo (`images/property/<slug>.jpg`),
   winery name, valley + AVA, founded year, one-line vibe hook.
2. **Architecture** — *only for book-featured estates*: architect name,
   book chapter title, a pull-quote-style excerpt of `vibe`/history framed
   around the building itself, plus the 📖 New Architecture badge treatment
   already used elsewhere in the app.
3. **Story / timeline** — the `history[]` array rendered as a vertical or
   horizontal timeline, one beat revealed at a time or all at once with the
   slide dwelling longer.
4. **The wines** — `wines[]` with label images (`images/labels/<slug>.*`),
   each wine's `why` copy.
5. **Visiting** — `address`, `tastingFee`, `tours`, `priceRange`, `owner` /
   `group` — practical, so this view isn't purely aspirational.
6. **Fun fact / awards** — `funFact` and `awards[]` as a closing beat before
   advancing to the next winery.

Skip any slide whose backing data is missing or thin (e.g. no property
photo) rather than showing an empty/placeholder slide.

### Entry points

- New nav button next to Table / Map / Top Wines / Lineage — e.g.
  **"Featured"** — that jumps straight into autoplay starting from a random
  (or rotating-by-day) winery in the curated set.
- Deep link: `index.html#featured` → autoplay the curated rotation;
  `index.html#featured/<slug>` → open directly on that winery (pauses
  autoplay-between-wineries but still auto-advances its own slides, or stays
  static — TBD, lean toward static/paused so a shared link doesn't wander
  away from the winery someone specifically shared).
- Consider a subtle "Feature this winery ▶" affordance on the existing
  winery drawer (used by Table/Map/Lineage today) so browsing naturally
  funnels into the immersive mode.

### Data / asset gaps to check before building

- Hero-quality property photos: confirm `williams-selyem`, `kistler`, and
  `joseph-phelps` all have high-res `images/property/<slug>.jpg` — the
  full-screen hero slide will expose any low-res or missing images much more
  than the existing card-sized usage does.
- Label images for each winery's featured wines — same resolution concern.
  Check `manifest.js` / `images/labels/` coverage for all wines listed in
  each of the 3 wineries' `wines[]` arrays, not just the flagship.
  For "History Reenvisioned" and "Singular Voices" chapters,
  double check the `bookSection` / `architect` prose is enough to build a
  real architecture slide — may want 1–2 sentences added per estate ONLY on
  that specific topic if the current `vibe`/`history` text doesn't
  cover the building itself.

### Technical notes

- New `state.view = "featured"` following the existing pattern
  (`renderTable`, `renderMap`, `renderAwards`, `renderLineage` in `app.js`);
  add a `#featured-view` container in `index.html` and a `renderFeatured()`
  function.
- Needs its own autoplay timer state (current winery index, current slide
  index, paused flag) — not modeled by the existing `state` object today.
- Should hide/override the persistent `<header>` controls (view toggle,
  valley filter, search) while active, unlike the other four views which all
  share that chrome — this is the one view that's a genuine full-screen
  takeover rather than a panel within the existing layout.
- Reuse `IMG[w.slug]` (property/label/logo) and existing per-winery fields
  as-is; no new data.js schema needed for the initial 3-winery scope beyond
  what `architect`/`bookSection`/`storyTags` already provide.

### Explicitly out of scope for now

- Do not implement this yet — this file is the spec only.
- Sound/narration, video, or externally-hosted media.
- Any wineries outside the Top-25 ∩ New-Architecture intersection, until the
  format is validated on this small set.
