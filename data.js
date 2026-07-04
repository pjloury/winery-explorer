// Winery Explorer dataset — Napa Valley & Sonoma County
// priceRange = typical current-release bottle prices in USD [min, max] (approximate).
// tastingFee and tour info are approximate and change often — check the website before visiting.
// history entries marked with tags feed the Lineage view:
//   'resurrected'  — winery died (Prohibition, phylloxera, corporate neglect) and was brought back
//   'consolidated' — absorbed into a corporate group
//   'site-reuse'   — occupies / restored the buildings of an older winery
//   'judgment-of-paris' — connected to the 1976 Paris Tasting

const WINERIES = [

  // ───────────────────────── NAPA VALLEY ─────────────────────────
  {
    slug: "inglenook", name: "Inglenook", valley: "Napa", ava: "Rutherford",
    founded: 1879, founder: "Gustave Niebaum, Finnish sea captain & fur trader",
    address: "1991 St. Helena Hwy, Rutherford, CA 94573", lat: 38.4549, lng: -122.4305,
    website: "https://www.inglenook.com",
    owner: "Francis Ford & Eleanor Coppola family", group: "Independent (Coppola family)",
    priceRange: [60, 300], tastingFee: "$95–$175, by appointment",
    tours: "Yes — Heritage tastings and chateau/cave experiences, reservation required",
    vibeTags: ["Grand", "Historic", "Classic"],
    vibe: "The most romantic estate in Napa: a vine-draped 1880s stone chateau at the end of a long courtyard, restored with movie money and run like a Bordeaux first growth. Formal but warm; the Centennial Museum inside covers both wine and film history.",
    wines: [
      { name: "Rubicon", why: "The flagship Bordeaux blend from the estate's historic Cabernet blocks — one of Napa's original 'cult' wines, now made under Château Margaux's former estate director Philippe Bascaules." },
      { name: "Cask Cabernet", why: "A 100% Cabernet homage to the legendary mid-century 'Cask' bottlings of the John Daniel era." },
      { name: "Blancaneaux", why: "A Rhône-style white blend (Marsanne/Roussanne/Viognier) rare for Rutherford." }
    ],
    history: [
      { y: 1879, t: "Captain Gustave Niebaum, made rich by the Alaska fur trade, founds Inglenook and vows to make wine rivaling Europe's best." },
      { y: 1889, t: "Inglenook wins gold at the Paris World's Fair — early proof Napa could compete with France." },
      { y: 1939, t: "Grand-nephew John Daniel Jr. takes over; his 1941 Inglenook Cabernet becomes one of the most celebrated American wines ever made." },
      { y: 1964, t: "Daniel sells to United Vintners; Heublein follows in 1969 and dilutes 'Inglenook' into a supermarket jug-wine brand — the cautionary tale of Napa consolidation." },
      { y: 1975, t: "Francis Ford Coppola, flush with Godfather earnings, buys the Niebaum home and back vineyards; farms them as Niebaum-Coppola." },
      { y: 1995, t: "Coppola buys the chateau and front vineyard from Heublein, reuniting the original estate for the first time since 1964." },
      { y: 2011, t: "Coppola buys the Inglenook trademark itself (from The Wine Group) and restores the historic name — the resurrection is complete." }
    ],
    storyTags: ["resurrected", "site-reuse"],
    awards: ["Gold medal, 1889 Paris World's Fair", "1941 Inglenook Cabernet routinely cited among the greatest American wines of the 20th century", "Rubicon vintages regularly score 95+ from major critics"],
    funFact: "Coppola deliberately bought back the estate piece by piece over 36 years; he has said reuniting Inglenook mattered more to him than any film."
  },

  {
    slug: "charles-krug", name: "Charles Krug Winery", valley: "Napa", ava: "St. Helena",
    founded: 1861, founder: "Charles Krug, Prussian immigrant",
    address: "2800 Main St, St. Helena, CA 94574", lat: 38.5175, lng: -122.4803,
    website: "https://www.charleskrug.com",
    owner: "Peter Mondavi Jr. family (4th generation)", group: "Independent (Peter Mondavi family)",
    priceRange: [30, 200], tastingFee: "$45–$95",
    tours: "Yes — tastings daily on the Redwood Cellar grounds; reserve for library experiences",
    vibeTags: ["Historic", "Classic", "Family-run"],
    vibe: "Napa's oldest winery, anchored by the restored 1872 Redwood Cellar barn and a big lawn made for picnics and 'Tastings on the Lawn.' Feels like living history without the stuffiness.",
    wines: [
      { name: "Vintage Selection Cabernet Sauvignon", why: "The family's top Cabernet since 1944 — one of Napa's longest-running reserve programs." },
      { name: "Generations", why: "Bordeaux blend honoring four generations of Mondavis at Krug." }
    ],
    history: [
      { y: 1861, t: "Charles Krug founds Napa Valley's first commercial winery; he'd made the valley's first recorded commercial wine with a cider press in 1858." },
      { y: 1943, t: "Italian immigrants Cesare & Rosa Mondavi buy the moribund estate for $75,000 and rebuild it with sons Robert and Peter." },
      { y: 1965, t: "A legendary fistfight between brothers Robert and Peter splits the family; Robert leaves to found his own winery in Oakville." },
      { y: 1976, t: "Robert wins a bitter lawsuit over his share, but Peter Mondavi Sr. keeps Krug and runs it until his death at 101 in 2016." },
      { y: 2016, t: "Peter Jr. and Marc Mondavi carry on — Krug remains one of the few historic Napa estates never absorbed by a corporation." }
    ],
    storyTags: ["resurrected"],
    awards: ["California Historical Landmark #563", "Pioneered vintage-dated varietal labeling and glass-lined tanks in Napa"],
    funFact: "The Mondavi brothers' 1965 fistfight — reportedly over a mink coat Robert bought his wife for a White House dinner — indirectly created the modern Napa wine industry."
  },

  {
    slug: "beringer", name: "Beringer Vineyards", valley: "Napa", ava: "St. Helena",
    founded: 1876, founder: "Jacob & Frederick Beringer, from Mainz, Germany",
    address: "2000 Main St, St. Helena, CA 94574", lat: 38.5102, lng: -122.4799,
    website: "https://www.beringer.com",
    owner: "Treasury Wine Estates (Australia)", group: "Treasury Wine Estates",
    priceRange: [15, 200], tastingFee: "$40–$85",
    tours: "Yes — the classic Napa tour: Rhine House, hand-dug tunnels, gardens; walk-ins for some tastings",
    vibeTags: ["Grand", "Historic", "Classic"],
    vibe: "Old-money Victorian grandeur: the 1884 Rhine House mansion with its stained glass, century-old trees, and tunnels hand-dug into the hillside. The birthplace of Napa wine tourism — polished, popular, and unapologetically classic.",
    wines: [
      { name: "Private Reserve Cabernet Sauvignon", why: "Ed Sbragia's benchmark mountain-fruit Cabernet — the 1986 was Wine Spectator's #1 Wine of the Year." },
      { name: "Private Reserve Chardonnay", why: "The white counterpart — Beringer is the only winery to have both a red and a white ranked #1 by Wine Spectator." }
    ],
    history: [
      { y: 1876, t: "The Beringer brothers found the winery; Chinese laborers hand-dig 1,200 feet of aging tunnels into the Spring Mountain hillside." },
      { y: 1920, t: "Beringer survives Prohibition by making sacramental wine — making it Napa's oldest continuously operating winery." },
      { y: 1934, t: "First Napa winery to open public tours after Repeal — effectively inventing Napa wine tourism." },
      { y: 1971, t: "Nestlé buys Beringer, beginning its corporate era; Texas Pacific Group follows in 1996." },
      { y: 2000, t: "Australia's Foster's merges it into Beringer Blass; the wine division spins off as Treasury Wine Estates in 2011, which owns it today." }
    ],
    storyTags: ["consolidated"],
    awards: ["1986 Private Reserve Cabernet — Wine Spectator Wine of the Year (1990)", "1994 Private Reserve Chardonnay — Wine Spectator Wine of the Year (1996)", "National Register of Historic Places (Rhine House)"],
    funFact: "Frederick Beringer's Rhine House was built to one-up his brother's home across the lawn — sibling rivalry rendered in stained glass and slate."
  },

  {
    slug: "robert-mondavi", name: "Robert Mondavi Winery", valley: "Napa", ava: "Oakville",
    founded: 1966, founder: "Robert Mondavi, after the family split at Charles Krug",
    address: "7801 St. Helena Hwy, Oakville, CA 94562", lat: 38.4391, lng: -122.4087,
    website: "https://www.robertmondaviwinery.com",
    owner: "Constellation Brands", group: "Constellation Brands",
    priceRange: [30, 250], tastingFee: "$50–$150",
    tours: "Yes — the signature 'To Kalon' tour is a classic Napa first-timer experience",
    vibeTags: ["Grand", "Classic", "Showpiece"],
    vibe: "The mission-style archway and tower framing vineyard and mountains is the single most iconic image in American wine. Equal parts winery, art gallery, and monument to the man who sold the world on Napa. Reopened in April 2026 after a $200M+ multi-year renovation.",
    wines: [
      { name: "To Kalon Reserve Cabernet Sauvignon", why: "From the To Kalon vineyard, first planted in 1868 — arguably America's single most famous Cabernet vineyard." },
      { name: "Fumé Blanc", why: "Mondavi invented the name in 1968, rebranding unloved Sauvignon Blanc into a category that swept the country." }
    ],
    history: [
      { y: 1966, t: "Robert Mondavi, exiled from Charles Krug after the family feud, builds the first major new Napa winery since Prohibition at age 52." },
      { y: 1968, t: "Coins 'Fumé Blanc' — a masterstroke of marketing that rehabilitates Sauvignon Blanc in America." },
      { y: 1979, t: "Partners with Baron Philippe de Rothschild of Château Mouton to create Opus One next door." },
      { y: 1993, t: "First major U.S. winery to go public on NASDAQ." },
      { y: 2004, t: "After boardroom turmoil, Constellation Brands buys the company for roughly $1.3 billion — the biggest consolidation event in Napa history. Robert dies in 2008 at 94." },
      { y: 2026, t: "The Oakville estate reopens in April after a $200M+ renovation; in its 2025 divestiture Constellation sold off mainstream brands but pointedly kept Mondavi and To Kalon." }
    ],
    storyTags: ["consolidated"],
    awards: ["Robert Mondavi: Decanter Man of the Year 1989", "To Kalon Reserve Cabs routinely 95–100 points", "Summer concert series running since 1969"],
    funFact: "Mondavi evangelized wine as part of gracious living decades before it was fashionable — he put a Beaulieu rival's wine on his own table when his was outshone, telling staff 'we'll learn from it.'"
  },

  {
    slug: "opus-one", name: "Opus One", valley: "Napa", ava: "Oakville",
    founded: 1979, founder: "Joint venture: Robert Mondavi × Baron Philippe de Rothschild (Château Mouton Rothschild)",
    address: "7900 St. Helena Hwy, Oakville, CA 94562", lat: 38.4413, lng: -122.4,
    website: "https://www.opusonewinery.com",
    owner: "50/50: Constellation Brands & Baron Philippe de Rothschild SA", group: "Constellation Brands",
    priceRange: [175, 500], tastingFee: "$100–$300+, strictly by appointment",
    tours: "Yes — appointment-only tastings on the rooftop terrace overlooking Oakville",
    vibeTags: ["Modern", "Grand", "Intimate"],
    vibe: "A hushed, temple-like limestone crescent half-buried in the Oakville benchland — part Bond villain lair, part Bordeaux château. One wine, poured in Riedel on a rooftop with a 360° vineyard view. The most 'special occasion' stop in the valley.",
    wines: [
      { name: "Opus One", why: "The Franco-American Bordeaux blend that created the luxury category for California wine; first vintage (1979) debuted at $50 — then the most expensive California wine ever released." },
      { name: "Overture", why: "The non-vintage second wine — the only other label made here." }
    ],
    history: [
      { y: 1979, t: "Mondavi and the Baron sketch the partnership in Hawaii in 1978; the first joint vintage is made in Mondavi's cellar in 1979." },
      { y: 1984, t: "Vintages 1979 & 1980 released together; a case of the 1979 had already fetched $24,000 at the 1981 Napa auction — the highest price ever for a California wine at the time." },
      { y: 1991, t: "The Scott Johnson-designed winery opens — its sunken crescent shape meant to marry Old World and New." },
      { y: 2004, t: "Constellation inherits Mondavi's half in the buyout; the Rothschilds keep theirs, and Opus One runs independently of both parents." }
    ],
    storyTags: ["consolidated"],
    awards: ["Consistent 95–100 point scores across critics", "Poured at state dinners; among the most recognized wine labels on earth"],
    funFact: "The label's twin silhouettes are Mondavi and the Baron; 'Opus One' was the Baron's pick — a composer's first masterwork."
  },

  {
    slug: "stags-leap", name: "Stag's Leap Wine Cellars", valley: "Napa", ava: "Stags Leap District",
    founded: 1970, founder: "Warren Winiarski, former University of Chicago lecturer",
    address: "5766 Silverado Trail, Napa, CA 94558", lat: 38.3993, lng: -122.3255,
    website: "https://www.stagsleapwinecellars.com",
    owner: "Marchesi Antinori (Italy) — sole owner since 2023", group: "Marchesi Antinori",
    priceRange: [60, 350], tastingFee: "$75–$225",
    tours: "Yes — FAY Outlook & Visitor Center tastings with palisades views; cave tours by appointment",
    vibeTags: ["Classic", "Modern", "Intimate"],
    vibe: "History-making wine in a serene setting under the Stags Leap palisades. The glassy FAY Outlook visitor center is modern, but the mood is reverent — this is where American wine beat France.",
    wines: [
      { name: "S.L.V. Cabernet Sauvignon", why: "The vineyard whose 1973 vintage — from three-year-old vines — won the 1976 Judgment of Paris over Mouton and Haut-Brion." },
      { name: "CASK 23", why: "The flagship blend of S.L.V. and FAY fruit, one of Napa's original prestige Cabernets." }
    ],
    history: [
      { y: 1970, t: "Winiarski, who left academia after a life-changing bottle, buys a prune orchard next to Nathan Fay's vineyard and plants Cabernet." },
      { y: 1976, t: "At the 'Judgment of Paris' blind tasting, French judges rank his 1973 S.L.V. Cabernet first over Bordeaux's best — the result that put Napa on the world map." },
      { y: 2007, t: "Winiarski sells for $185 million to a partnership of Washington's Ste. Michelle and Italy's Antinori family — old-world money buying the wine that beat it." },
      { y: 2023, t: "The Antinori family — 26 generations of Tuscan winemaking — buys out Ste. Michelle's 85% to become sole owner: the winery that beat Europe is now fully European-owned." }
    ],
    storyTags: ["consolidated", "judgment-of-paris"],
    awards: ["Winner, 1976 Judgment of Paris (reds)", "A bottle of the 1973 S.L.V. is in the Smithsonian's National Museum of American History"],
    funFact: "Don't confuse it with Stags' Leap Winery (apostrophe after the s) across the district — the two fought a trademark lawsuit and settled by both keeping their apostrophes."
  },

  {
    slug: "chateau-montelena", name: "Chateau Montelena", valley: "Napa", ava: "Calistoga",
    founded: 1882, founder: "Alfred L. Tubbs, San Francisco rope merchant & state senator",
    address: "1429 Tubbs Ln, Calistoga, CA 94515", lat: 38.6032, lng: -122.5989,
    website: "https://www.montelena.com",
    owner: "Barrett family (Bo Barrett)", group: "Independent (Barrett family)",
    priceRange: [75, 225], tastingFee: "$60–$125",
    tours: "Yes — estate tastings; the stone castle and Jade Lake gardens are open to visitors by reservation",
    vibeTags: ["Historic", "Classic", "Intimate"],
    vibe: "A stone castle at the foot of Mount St. Helena with Chinese lake gardens (Jade Lake, complete with red pavilions) built by a previous owner in the 1950s. Unpretentious, deeply rooted, and proud of its underdog history — the anti-showpiece.",
    wines: [
      { name: "Chardonnay", why: "The 1973 vintage won the whites at the 1976 Judgment of Paris; the style — bright, mineral, restrained — hasn't chased fashion since." },
      { name: "Montelena Estate Cabernet Sauvignon", why: "A famously long-lived Calistoga Cabernet that collectors treat like Bordeaux." }
    ],
    history: [
      { y: 1882, t: "Tubbs builds his stone chateau with 12-foot-thick walls; phylloxera and Prohibition eventually silence it." },
      { y: 1958, t: "Yort and Jeanie Frank, a Chinese-American couple, buy the derelict property as a retirement home and dig the beautiful Jade Lake gardens." },
      { y: 1972, t: "Attorney Jim Barrett leads a partnership to revive winemaking, hiring a Croatian immigrant named Mike Grgich." },
      { y: 1976, t: "Their second-ever Chardonnay (1973) beats the best of Burgundy at the Judgment of Paris; Time magazine breaks the story." },
      { y: 2008, t: "A sale to Cos d'Estournel's owner collapses in the financial crisis — a lucky break that kept Montelena in Barrett hands." }
    ],
    storyTags: ["resurrected", "site-reuse", "judgment-of-paris"],
    awards: ["Winner, 1976 Judgment of Paris (whites)", "Bottle of the 1973 Chardonnay in the Smithsonian", "The 2008 film 'Bottle Shock' dramatizes the story"],
    funFact: "When the Paris results came in, Jim Barrett cabled home: 'Stunned the French.' His son Bo, then a cellar rat, became the longtime winemaker and married Heidi Barrett of Screaming Eagle fame."
  },

  {
    slug: "schramsberg", name: "Schramsberg Vineyards", valley: "Napa", ava: "Diamond Mountain / Calistoga",
    founded: 1862, founder: "Jacob Schram, German immigrant barber",
    address: "1400 Schramsberg Rd, Calistoga, CA 94515", lat: 38.5502, lng: -122.538,
    website: "https://www.schramsberg.com",
    owner: "Davies family (Hugh Davies, 2nd generation of the revival)", group: "Independent (Davies family)",
    priceRange: [45, 155], tastingFee: "$95–$150 (includes cave tour)",
    tours: "Yes — every visit includes the candlelit 19th-century caves; appointment only",
    vibeTags: ["Historic", "Intimate", "Classic"],
    vibe: "Two miles of candlelit caves dug in the 1870s, stacked floor-to-ceiling with two million aging bottles of sparkling wine. Hidden up a forest road on Diamond Mountain — the most atmospheric tour in Napa.",
    wines: [
      { name: "Blanc de Blancs", why: "America's first commercial Chardonnay-based sparkler (1965) — the wine Nixon poured for the 1972 'Toast to Peace' in Beijing." },
      { name: "J. Schram", why: "The prestige cuvée, named for the founder — Schramsberg's answer to Dom Pérignon." }
    ],
    history: [
      { y: 1862, t: "Barber Jacob Schram builds Napa's first hillside winery; Chinese laborers dig the caves through the 1870s–80s." },
      { y: 1880, t: "Robert Louis Stevenson visits and immortalizes Schramsberg in 'The Silverado Squatters.'" },
      { y: 1920, t: "Prohibition kills the estate; it sits essentially abandoned for four decades." },
      { y: 1965, t: "Jack and Jamie Davies buy the ghost winery and stake everything on méthode traditionnelle sparkling wine — a resurrection that creates California's benchmark bubbly." },
      { y: 1972, t: "President Nixon serves the 1969 Blanc de Blancs at the historic Beijing banquet with Zhou Enlai; Schramsberg has been poured at official state occasions by every administration since." }
    ],
    storyTags: ["resurrected", "site-reuse"],
    awards: ["Served at U.S. state functions under 10+ presidents", "California Historical Landmark #561", "J. Schram and Blanc de Blancs regularly top American sparkling wine lists"],
    funFact: "The Davies' first harvest was so small they bought Riesling grapes with a handshake and crushed them the day escrow closed — in a winery with no roof."
  },

  {
    slug: "caymus", name: "Caymus Vineyards", valley: "Napa", ava: "Rutherford",
    founded: 1972, founder: "Charlie, Lorna & Chuck Wagner — farming Rutherford since 1906",
    address: "8700 Conn Creek Rd, Rutherford, CA 94573", lat: 38.466, lng: -122.3933,
    website: "https://www.caymus.com",
    owner: "Wagner family (Chuck Wagner & children)", group: "Independent (Wagner family)",
    priceRange: [55, 250], tastingFee: "$75–$100, seated, by appointment",
    tours: "Tastings only (seated, relaxed); no formal production tour",
    vibeTags: ["Casual", "Classic", "Family-run"],
    vibe: "Deliberately unflashy — a low ranch-style compound where the point is what's in the glass. Seated tastings feel like visiting a prosperous farm family, which is exactly what the Wagners are.",
    wines: [
      { name: "Special Selection Cabernet Sauvignon", why: "The only wine ever named Wine Spectator's #1 Wine of the Year twice (1984 and 1990 vintages)." },
      { name: "Caymus Napa Valley Cabernet", why: "Plush, dark, crowd-pleasing — probably the most recognized premium Napa Cab on American restaurant lists." }
    ],
    history: [
      { y: 1906, t: "The Wagner family begins farming in Rutherford; grandfather Carl made wine pre-Prohibition." },
      { y: 1972, t: "Charlie Wagner and son Chuck crush the first Caymus vintage in a converted barn." },
      { y: 1989, t: "The 1984 Special Selection is Wine Spectator's Wine of the Year; the 1990 vintage repeats the feat in 1994 — still a unique double." },
      { y: 2000, t: "The family builds a mini-empire on its own terms: Conundrum, Mer Soleil, Belle Glos, Emmolo, and Caymus-Suisun — all still family-owned amid Napa's corporate wave." }
    ],
    storyTags: [],
    awards: ["Wine Spectator Wine of the Year — twice (unique)", "Chuck Wagner: among the most influential American winemakers of his generation"],
    funFact: "'Caymus' comes from Rancho Caymus, the Mexican land grant covering Rutherford — itself named for the native Wappo people the Spanish called 'Caymus.'"
  },

  {
    slug: "far-niente", name: "Far Niente", valley: "Napa", ava: "Oakville",
    founded: 1885, founder: "John Benson, Forty-Niner (uncle of painter Winslow Homer)",
    address: "1350 Acacia Dr, Oakville, CA 94562", lat: 38.4257, lng: -122.4032,
    website: "https://www.farniente.com",
    owner: "Far Niente Wine Estates — GI Partners (majority) with the Nickel family & management", group: "GI Partners (Far Niente Wine Estates)",
    priceRange: [75, 300], tastingFee: "$125–$200, by appointment",
    tours: "Yes — estate tour with the 1885 stone winery, caves, azalea gardens, and the classic-car collection",
    vibeTags: ["Grand", "Historic", "Showpiece"],
    vibe: "'Dolce far niente' — the sweetness of doing nothing. Thirteen acres of azaleas and gardens around a resurrected 1885 stone winery, with Gil Nickel's vintage race cars in the barn. Manicured, appointment-only elegance.",
    wines: [
      { name: "Estate Chardonnay", why: "The benchmark for the no-malolactic, oak-restrained Napa Chardonnay style — same recipe since 1979." },
      { name: "Oakville Estate Cabernet Sauvignon", why: "Polished, cellar-worthy Oakville Cab." },
      { name: "Dolce", why: "Made by the sibling winery next door — the only U.S. estate devoted entirely to a single botrytized late-harvest wine, modeled on Château d'Yquem." }
    ],
    history: [
      { y: 1885, t: "John Benson builds a gravity-flow stone winery designed by Hamden McIntyre (architect of Inglenook's chateau)." },
      { y: 1919, t: "Prohibition shutters the winery; it sits abandoned for 60 years, 'Far Niente' carved in stone above the door." },
      { y: 1979, t: "Oklahoma nurseryman Gil Nickel buys the ruin and spends three years restoring it — then digs the first modern wine caves in North America (1980)." },
      { y: 2000, t: "Sibling brands grow around it: Nickel & Nickel (single-vineyard, 1997), Dolce, EnRoute, Bella Union — a family of wineries rather than an acquisition target." }
    ],
    storyTags: ["resurrected", "site-reuse"],
    awards: ["National Register of Historic Places", "Chardonnay and Cab fixtures on top-restaurant lists for 40 years"],
    funFact: "Gil Nickel raced vintage sports cars seriously; his motto for restoring the winery came from the stone lintel he uncovered: if you're going to do nothing, do it sweetly."
  },

  {
    slug: "duckhorn", name: "Duckhorn Vineyards", valley: "Napa", ava: "St. Helena",
    founded: 1976, founder: "Dan & Margaret Duckhorn",
    address: "1000 Lodi Ln, St. Helena, CA 94574", lat: 38.5285, lng: -122.4889,
    website: "https://www.duckhorn.com",
    owner: "The Duckhorn Portfolio, owned by Butterfly Equity (private equity, since 2024)", group: "Duckhorn Portfolio (Butterfly Equity)",
    priceRange: [35, 165], tastingFee: "$60–$125",
    tours: "Estate closed for renovation April 2026 – ~April 2027; tastings meanwhile at The Duckhorn Collection at Paraduxx (7257 Silverado Trail, Napa), by reservation",
    vibeTags: ["Classic", "Showpiece"],
    vibe: "A picture-perfect farmhouse with a wraparound veranda — genteel, garden-club Napa. The house that Merlot built, and proud of it.",
    wines: [
      { name: "Three Palms Vineyard Merlot", why: "The wine that made American Merlot respectable — the 2014 vintage was Wine Spectator's 2017 Wine of the Year." },
      { name: "Duckhorn Napa Valley Merlot", why: "The flagship that kept the faith through the 'Sideways' Merlot crash." }
    ],
    history: [
      { y: 1976, t: "The Duckhorns bet on Merlot as a standalone variety when nearly everyone else treated it as blending filler." },
      { y: 1978, t: "First Three Palms Merlot — from a stony Calistoga vineyard once owned by 19th-century socialite Lillie Hitchcock Coit (of Coit Tower fame)." },
      { y: 2016, t: "The company becomes a consolidator itself: Decoy, Goldeneye, Paraduxx, Migration, Canvasback, then Kosta Browne (2018) and Sonoma-Cutrer (2024)." },
      { y: 2021, t: "IPO on the NYSE as The Duckhorn Portfolio (ticker: NAPA)." },
      { y: 2024, t: "Taken private by Butterfly Equity for about $2 billion — a full circle from two founders and one variety." }
    ],
    storyTags: ["consolidated"],
    awards: ["2014 Three Palms Merlot — Wine Spectator Wine of the Year 2017", "Widely credited with creating the premium American Merlot category"],
    funFact: "The three palms of the vineyard's name still stand — planted at Lillie Coit's 1870s country retreat, where she scandalized society by hosting firemen's banquets."
  },

  {
    slug: "heitz", name: "Heitz Cellar", valley: "Napa", ava: "St. Helena",
    founded: 1961, founder: "Joe & Alice Heitz",
    address: "436 St. Helena Hwy S, St. Helena, CA 94574", lat: 38.4907, lng: -122.4509,
    website: "https://www.heitzcellar.com",
    owner: "Gaylon Lawrence Jr. (Lawrence Wine Estates, since 2018)", group: "Lawrence Wine Estates",
    priceRange: [65, 350], tastingFee: "$75–$150",
    tours: "Yes — The Salon at Heitz Cellar is open daily (walk-ins as space allows); estate 'Home Ranch' experiences by appointment",
    vibeTags: ["Classic", "Historic", "Intimate"],
    vibe: "Quiet, collector-focused, organically farmed. Heitz never chased fashion — same understated label since the 60s, wines released only when ready. The 1898 stone cellar keeps it grounded in old Napa.",
    wines: [
      { name: "Martha's Vineyard Cabernet Sauvignon", why: "Napa's first vineyard-designated Cabernet (1966), famous for its eucalyptus-mint signature; the 1974 is one of California's legendary bottles." },
      { name: "Trailside Vineyard Cabernet", why: "The Rutherford counterpart — dustier, more structured." }
    ],
    history: [
      { y: 1961, t: "Joe Heitz, a Fresno State enology instructor, starts with eight acres of Grignolino south of St. Helena." },
      { y: 1964, t: "The Heitzes buy a Taplin Road ranch with an 1898 stone cellar built by Swiss-Italian winemaker Anton Rossi — old bones for a new house." },
      { y: 1966, t: "First Martha's Vineyard bottling (named for owner Martha May) — America's first vineyard-designate Cabernet, a radical idea at the time." },
      { y: 2018, t: "After 57 years of family ownership, the Heitz family sells to Arkansas farming billionaire Gaylon Lawrence Jr., whose Lawrence Wine Estates goes on to acquire Stony Hill, Burgess, and more — a new-generation consolidator built on old names." }
    ],
    storyTags: ["consolidated", "site-reuse"],
    awards: ["1974 Martha's Vineyard: multiple retrospective 100-point scores; regularly named among the greatest California wines ever", "Certified organic farming across the estate"],
    funFact: "The mint note in Martha's Vineyard is popularly credited to the eucalyptus trees ringing the vineyard — the Heitz family neither confirmed nor denied, happy to let the mystery sell."
  },

  {
    slug: "sterling", name: "Sterling Vineyards", valley: "Napa", ava: "Calistoga",
    founded: 1964, founder: "Peter Newton, British paper-company executive",
    address: "1111 Dunaweal Ln, Calistoga, CA 94515", lat: 38.5684, lng: -122.5553,
    website: "https://www.sterlingvineyards.com",
    owner: "Treasury Wine Estates", group: "Treasury Wine Estates",
    priceRange: [25, 125], tastingFee: "$65–$95 (includes aerial tram)",
    tours: "Yes — arrive by aerial gondola; self-guided elevated walkways through the winery",
    vibeTags: ["Modern", "Showpiece"],
    vibe: "A blinding-white Greek-island monastery on a 300-foot knoll, reached only by aerial tram. Pure spectacle with panoramic valley views — the theme-park-ride of Napa wineries, in the best way.",
    wines: [
      { name: "Sterling Napa Valley Cabernet Sauvignon", why: "The estate flagship; the Reserve and Platinum bottlings are the collector tier." },
      { name: "Winery Lake Pinot Noir", why: "From the famous Carneros vineyard the brand has long drawn on." }
    ],
    history: [
      { y: 1964, t: "Peter Newton founds Sterling; the hilltop winery, inspired by the Greek island of Mykonos, opens in 1973 with its signature gondola." },
      { y: 1969, t: "Winemaker Ric Forman helps pioneer Napa Merlot as a varietal here." },
      { y: 1977, t: "Coca-Cola buys Sterling — an early example of big-consumer-brand money entering Napa; Seagram follows in 1983, then Diageo, then Treasury Wine Estates in 2016." },
      { y: 2020, t: "The Glass Fire badly damages the property; after a three-year restoration it reopens in October 2023 with a new, larger gondola." }
    ],
    storyTags: ["consolidated", "resurrected"],
    awards: ["The church bells in the tower came from St. Dunstan's-in-the-East, a London church destroyed in the Blitz — they still ring on the half hour"],
    funFact: "Peter Newton later founded Newton Vineyard on Spring Mountain; his Sterling sale to Coca-Cola made him one of Napa's first big-exit founders."
  },

  {
    slug: "domaine-carneros", name: "Domaine Carneros", valley: "Napa", ava: "Los Carneros",
    founded: 1987, founder: "Champagne Taittinger (Claude Taittinger) with Kobrand",
    address: "1240 Duhig Rd, Napa, CA 94559", lat: 38.2555, lng: -122.3514,
    website: "https://www.domainecarneros.com",
    owner: "Champagne Taittinger & partners", group: "Independent (Taittinger)",
    priceRange: [40, 140], tastingFee: "$45–$90 (table service)",
    tours: "Yes — château terrace table-service tastings, reservations required; 21+ only (no children)",
    vibeTags: ["Grand", "Showpiece", "Classic"],
    vibe: "A Louis XV-style château rising improbably from Carneros sheep country, modeled on Taittinger's Château de la Marquetterie in Champagne. Bubbles and caviar on the terrace at golden hour — maximum occasion-energy per dollar in the valley.",
    wines: [
      { name: "Le Rêve Blanc de Blancs", why: "The tête de cuvée — frequently called America's finest sparkling wine." },
      { name: "Estate Brut Cuvée", why: "The signature carneros-grown méthode traditionnelle bottling." }
    ],
    history: [
      { y: 1987, t: "Taittinger builds its American outpost in cool, foggy Carneros — part of the 1980s wave of Champagne houses planting flags in California (alongside Mumm, Moët's Chandon, and Roederer)." },
      { y: 1987, t: "Eileen Crane, a pioneering female winemaker-CEO, founds the program and runs it for 33 vintages." },
      { y: 2020, t: "Remains Taittinger-anchored and independent — one of the few French-owned estates never to change hands." }
    ],
    storyTags: [],
    awards: ["Le Rêve: perennial best-US-sparkling accolades", "Certified organic estate vineyards"],
    funFact: "The château's grand staircase was copied so faithfully from the Champagne original that Taittinger family members say visiting feels like coming home — with better weather."
  },

  {
    slug: "joseph-phelps", name: "Joseph Phelps Vineyards", valley: "Napa", ava: "St. Helena (Spring Valley)",
    founded: 1973, founder: "Joseph Phelps, Colorado construction magnate",
    address: "200 Taplin Rd, St. Helena, CA 94574", lat: 38.5021, lng: -122.4295,
    website: "https://www.josephphelps.com",
    owner: "LVMH (Moët Hennessy Louis Vuitton, since 2022)", group: "LVMH",
    priceRange: [75, 375], tastingFee: "$95–$200",
    tours: "Yes — terrace tastings overlooking Spring Valley; by appointment",
    vibeTags: ["Modern", "Grand", "Intimate"],
    vibe: "A monumental redwood barn — built from reclaimed bridge timbers by Phelps's own construction company — looking down a private valley of vines and oaks. Hushed, architectural, deeply comfortable.",
    wines: [
      { name: "Insignia", why: "California's first proprietary Bordeaux-style blend (1974); the 2002 vintage was Wine Spectator's 2005 Wine of the Year." },
      { name: "Backus Vineyard Cabernet", why: "The powerful Oakville single-vineyard counterpart." }
    ],
    history: [
      { y: 1973, t: "Phelps, whose firm was building other people's wineries (including Souverain), buys a 600-acre cattle ranch and builds his own." },
      { y: 1974, t: "Creates Insignia — blending across varieties under a proprietary name, unheard-of in California — and also bottles America's first varietal Syrah." },
      { y: 2015, t: "Joe Phelps dies; the family runs it until 2022." },
      { y: 2022, t: "LVMH acquires the winery — the luxury conglomerate's biggest Napa move, placing Insignia alongside Dom Pérignon and Château d'Yquem in its portfolio." }
    ],
    storyTags: ["consolidated"],
    awards: ["Insignia 2002 — Wine Spectator Wine of the Year 2005", "Insignia has landed in Wine Spectator's Top 10 more than a dozen times"],
    funFact: "Phelps's construction crews built Chateau Souverain (now the Coppola winery in Sonoma) while his own barn was going up — his fingerprints are on both valleys."
  },

  // ───────────────────────── SONOMA COUNTY ─────────────────────────
  {
    slug: "buena-vista", name: "Buena Vista Winery", valley: "Sonoma", ava: "Sonoma Valley",
    founded: 1857, founder: "'Count' Agoston Haraszthy, Hungarian adventurer",
    address: "18000 Old Winery Rd, Sonoma, CA 95476", lat: 38.2995, lng: -122.4226,
    website: "https://www.buenavistawinery.com",
    owner: "Boisset Collection (Jean-Charles Boisset, France)", group: "Boisset Collection",
    priceRange: [30, 120], tastingFee: "$30–$75",
    tours: "Yes — historic tours of the 1857/1862 stone cellars, some led by a costumed 'Count' reenactor",
    vibeTags: ["Historic", "Showpiece", "Casual"],
    vibe: "California's oldest premium winery, restored as a theatrical time capsule: stone Press House, museum of antique tools, and a flamboyant French owner who resurrected the founder as a character. History played loud and fun.",
    wines: [
      { name: "The Count", why: "A lush red blend named for Haraszthy — the crowd favorite." },
      { name: "Private Reserve Pinot Noir", why: "The serious side of the modern revival." }
    ],
    history: [
      { y: 1857, t: "Haraszthy — self-styled count, former sheriff of San Diego, Gold Rush schemer — founds California's first great commercial winery and digs its stone cellars." },
      { y: 1861, t: "Tours Europe and ships home some 100,000 vine cuttings of 350+ varieties, earning his title 'Father of California Viticulture.'" },
      { y: 1869, t: "Broke and restless, he decamps to Nicaragua and reportedly dies crossing an alligator-infested river. The winery declines; phylloxera devastates the vineyards; the 1906 earthquake wrecks the cellars." },
      { y: 1943, t: "War correspondent Frank Bartholomew buys the ruins at auction (reportedly sight mostly unseen) and revives the brand." },
      { y: 2011, t: "Jean-Charles Boisset buys Buena Vista and pours money into seismic restoration of the 1862 Champagne Cellars — the estate's third resurrection." }
    ],
    storyTags: ["resurrected", "site-reuse", "consolidated"],
    awards: ["California Historical Landmark #392", "Founding site of California's premium wine industry"],
    funFact: "Haraszthy's sons married General Vallejo's daughters in a double wedding — merging California's Mexican past and wine future in one ceremony."
  },

  {
    slug: "gundlach-bundschu", name: "Gundlach Bundschu", valley: "Sonoma", ava: "Sonoma Valley",
    founded: 1858, founder: "Jacob Gundlach (Bavaria) & Charles Bundschu",
    address: "2000 Denmark St, Sonoma, CA 95476", lat: 38.2747, lng: -122.4252,
    website: "https://www.gunbun.com",
    owner: "Bundschu family — 6th generation", group: "Independent (Bundschu family)",
    priceRange: [30, 95], tastingFee: "$40–$60",
    tours: "Yes — cave tours, Pinzgauer vineyard excursions in an old Swiss army truck, courtyard tastings",
    vibeTags: ["Historic", "Casual", "Family-run"],
    vibe: "America's oldest continuously family-owned winery, run with an indie-rock sensibility — they host the Huichica music festival and drive visitors around in a vintage military 4×4. Historic bones, zero stuffiness. Locals call it 'Gun Bun.'",
    wines: [
      { name: "Gewürztraminer", why: "A dry, snappy signature the family has grown since the 19th century — an oddball classic." },
      { name: "Vintage Reserve Cabernet", why: "The top red from the historic Rhinefarm estate." }
    ],
    history: [
      { y: 1858, t: "Jacob Gundlach founds Rhinefarm; son-in-law Charles Bundschu joins and the firm becomes a San Francisco wine powerhouse." },
      { y: 1906, t: "The earthquake and fire destroy their entire San Francisco headquarters and a million gallons of wine — the family retreats to the ranch." },
      { y: 1920, t: "Prohibition ends winemaking; the family survives for 50 years by selling grapes to others." },
      { y: 1973, t: "Jim Bundschu restarts the winery in the old stone barn — a family resurrection rather than a corporate one." }
    ],
    storyTags: ["resurrected", "site-reuse"],
    awards: ["Oldest continuously family-owned winery in the U.S. (Bonded Winery No. 64)", "Huichica Festival: wine country's coolest small music festival"],
    funFact: "Their pre-Prohibition San Francisco brand 'Bacchus' was famous enough that the 1906 fire's destruction of their vaults made national news."
  },

  {
    slug: "korbel", name: "Korbel Champagne Cellars", valley: "Sonoma", ava: "Russian River Valley",
    founded: 1882, founder: "Francis, Anton & Joseph Korbel, Czech immigrant brothers",
    address: "13250 River Rd, Guerneville, CA 95446", lat: 38.5086, lng: -122.9652,
    website: "https://www.korbel.com",
    owner: "Heck family (since 1954)", group: "Independent (Heck family)",
    priceRange: [14, 45], tastingFee: "Inexpensive; historic tours traditionally free/cheap",
    tours: "Yes — one of the best free-to-cheap history tours in wine country, plus rose garden tours in season",
    vibeTags: ["Historic", "Casual", "Family-run"],
    vibe: "An ivy-covered 1886 brick winery under redwoods on the Russian River, complete with a brandy tower built around a chimney. Zero pretension: this is the sparkling wine of American weddings and New Year's, made where the founders once logged redwoods.",
    wines: [
      { name: "Korbel Brut", why: "America's best-selling méthode champenoise sparkler — the default celebration bottle for generations." },
      { name: "Korbel Natural", why: "The drier house style; a longtime White House inauguration pour." }
    ],
    history: [
      { y: 1882, t: "The Korbel brothers — refugees from Austro-Hungarian Bohemia who first ran a cigar-box lumber business — plant vines in their logged-over redwood land." },
      { y: 1954, t: "Sold to the Heck brothers, champagne makers from Alsace stock; the Heck family still owns it." },
      { y: 1985, t: "Korbel is grandfathered the right to say 'California Champagne' on its label — a term newer producers may not use." }
    ],
    storyTags: [],
    awards: ["Poured at multiple U.S. presidential inaugurations", "One of the oldest continuously operating sparkling houses in America"],
    funFact: "Francis Korbel fled Bohemia hidden in a coffin (family lore) after revolutionary activity — and ended up naming his American paradise after nothing grander than himself."
  },

  {
    slug: "sebastiani", name: "Sebastiani Vineyards & Winery", valley: "Sonoma", ava: "Sonoma Valley",
    founded: 1904, founder: "Samuele Sebastiani, Tuscan immigrant stonemason",
    address: "389 Fourth St E, Sonoma, CA 95476", lat: 38.2934, lng: -122.4493,
    website: "https://www.sebastiani.com",
    owner: "Foley Family Wines (since 2008)", group: "Foley Family Wines",
    priceRange: [20, 130], tastingFee: "$25–$50",
    tours: "Yes — historic winery tours; tasting room steps from Sonoma Plaza",
    vibeTags: ["Historic", "Casual", "Classic"],
    vibe: "A stone winery a short walk from Sonoma Plaza, full of hand-carved cask heads and immigrant-made-good history. Approachable town winery rather than destination estate.",
    wines: [
      { name: "Cherryblock Cabernet Sauvignon", why: "From a tiny heritage block beside the winery — the collector bottling." },
      { name: "Sonoma County Chardonnay & Cabernet", why: "Reliable everyday classics that made the name famous." }
    ],
    history: [
      { y: 1904, t: "Samuele Sebastiani, who hauled cobblestones from Sonoma quarries to pave San Francisco streets, buys his first tank and crusher." },
      { y: 1920, t: "Survives Prohibition on sacramental and medicinal wine — one of the only Sonoma wineries to keep operating straight through." },
      { y: 1980, t: "Under August Sebastiani it becomes one of America's largest family wineries; a bitter 1986 family ouster (mother Sylvia fires son Sam) becomes wine-country legend." },
      { y: 2008, t: "The family sells the winery and brand to Bill Foley's growing empire — Foley Family Wines — which also holds Chateau St. Jean, Ferrari-Carano, Chalk Hill, and more." },
      { y: 2021, t: "Foley ends production at the historic Sonoma facility (the tasting room stays open) and has since sought to redevelop parts of the property — a consolidation story still being written." }
    ],
    storyTags: ["consolidated"],
    awards: ["One of very few wineries operating continuously through Prohibition", "Cherryblock: cult Sonoma Cabernet"],
    funFact: "Samuele also built much of the town: the Sebastiani Theatre on the Plaza, workers' housing, even a roller rink — a one-man company town in miniature."
  },

  {
    slug: "ridge-lytton-springs", name: "Ridge Vineyards — Lytton Springs", valley: "Sonoma", ava: "Dry Creek Valley",
    founded: 1962, founder: "Ridge founded 1962 (Santa Cruz Mts); Lytton Springs vines planted c. 1901",
    address: "650 Lytton Springs Rd, Healdsburg, CA 95448", lat: 38.6597, lng: -122.8854,
    website: "https://www.ridgewine.com",
    owner: "Otsuka Pharmaceutical (Japan) — famously hands-off since 1986", group: "Otsuka (hands-off)",
    priceRange: [30, 75], tastingFee: "$30–$60",
    tours: "Yes — tastings overlooking the old vines; vineyard walks seasonally",
    vibeTags: ["Modern", "Casual", "Classic"],
    vibe: "A solar-powered winery built of straw bales and vineyard clay rising out of gnarled 120-year-old Zinfandel vines. Ridge's ethos — 'pre-industrial winemaking, transparently labeled' — makes this the thinking drinker's stop in Dry Creek.",
    wines: [
      { name: "Lytton Springs", why: "The benchmark old-vine Zinfandel field blend (with Petite Sirah & Carignane) — same vineyard since the wine's 1972 debut." },
      { name: "Geyserville", why: "Its sibling from Alexander Valley old vines — the two are wine-geek reference points." }
    ],
    history: [
      { y: 1901, t: "The heart of the Lytton Springs vineyard is planted — vines still producing today." },
      { y: 1962, t: "Stanford Research Institute scientists found Ridge at Monte Bello in the Santa Cruz Mountains; Paul Draper joins 1969." },
      { y: 1972, t: "Ridge makes its first Lytton Springs Zinfandel from purchased fruit; it buys the vineyard outright in 1991." },
      { y: 1976, t: "Ridge's 1971 Monte Bello Cabernet places fifth at the Judgment of Paris — then wins the 30th-anniversary rematch outright in 2006." },
      { y: 1995, t: "Builds the eco-pioneering straw-bale winery among the vines." }
    ],
    storyTags: ["judgment-of-paris"],
    awards: ["Winner, 2006 Judgment of Paris 30th-anniversary retasting (Monte Bello)", "Paul Draper: Decanter Man of the Year 2000", "Ingredient labeling pioneer"],
    funFact: "Ridge lists ingredients on its back labels — nearly unique in wine — as a quiet argument that great wine needs almost nothing added."
  },

  {
    slug: "jordan", name: "Jordan Vineyard & Winery", valley: "Sonoma", ava: "Alexander Valley",
    founded: 1972, founder: "Tom & Sally Jordan, Denver oil family",
    address: "1474 Alexander Valley Rd, Healdsburg, CA 95448", lat: 38.6558, lng: -122.8441,
    website: "https://www.jordanwinery.com",
    owner: "John Jordan (2nd generation)", group: "Independent (Jordan family)",
    priceRange: [45, 90], tastingFee: "$75–$150 (food-paired experiences)",
    tours: "Yes — château tours with a serious culinary program; estate hikes to hilltop vista points",
    vibeTags: ["Grand", "Classic", "Showpiece"],
    vibe: "A French country château built in the 70s to make Sonoma feel like Bordeaux, with a chef on staff since day one. Makes exactly two wines and does them with white-tablecloth hospitality — old-school in the most gracious way.",
    wines: [
      { name: "Alexander Valley Cabernet Sauvignon", why: "Food-friendly, restrained, age-worthy — a restaurant-list stalwart since the 1976 debut vintage." },
      { name: "Russian River Valley Chardonnay", why: "The only other wine they make." }
    ],
    history: [
      { y: 1972, t: "The Jordans, Francophiles who fell for Bordeaux, buy Alexander Valley prune orchards over Napa land — a contrarian bet on Sonoma." },
      { y: 1976, t: "The château crushes its first Cabernet with André Tchelistcheff consulting; the winery is built around a professional kitchen — food-and-wine pairing before it was a cliché." },
      { y: 2005, t: "Son John Jordan takes over; the estate stays family-owned and just-two-wines focused while neighbors multiply SKUs." }
    ],
    storyTags: [],
    awards: ["Perennial top-requested Cabernet on U.S. restaurant wine lists", "Estate hospitality regularly ranked among wine country's best"],
    funFact: "Jordan's chef program predates the American food-wine revolution — Tom Jordan hired a French-trained chef in 1976, reasoning no Bordeaux château would be caught without one."
  },

  {
    slug: "kendall-jackson", name: "Kendall-Jackson Wine Estate & Gardens", valley: "Sonoma", ava: "Russian River Valley (Fulton)",
    founded: 1982, founder: "Jess Jackson, San Francisco land-use lawyer",
    address: "5007 Fulton Rd, Santa Rosa, CA 95403", lat: 38.5068, lng: -122.7728,
    website: "https://www.kj.com",
    owner: "Jackson Family Wines (Barbara Banke, chairman)", group: "Jackson Family Wines",
    priceRange: [12, 120], tastingFee: "$25–$75 (garden & food pairings)",
    tours: "Yes — culinary garden tours are the highlight; wine-and-food pairing menus",
    vibeTags: ["Showpiece", "Casual", "Modern"],
    vibe: "A château-style hospitality estate wrapped in four acres of spectacular culinary gardens — the annual Heirloom Tomato Festival is a Sonoma institution. Big-brand polish with a genuine farm-to-glass streak.",
    wines: [
      { name: "Vintner's Reserve Chardonnay", why: "America's best-selling Chardonnay for over 30 straight years — the bottle that taught the country to drink Chardonnay." },
      { name: "Jackson Estate & Stature tiers", why: "The mountain-vineyard serious side of the house." }
    ],
    history: [
      { y: 1974, t: "Lawyer Jess Jackson buys an 80-acre pear-and-walnut ranch in Lakeport as a family retreat." },
      { y: 1982, t: "A stuck fermentation leaves his first Chardonnay slightly sweet; consumers adore it. Vintner's Reserve is born and becomes a phenomenon." },
      { y: 1988, t: "Jackson begins assembling an empire on mountain vineyards: Freemark Abbey, Matanzas Creek, Arrowood, Stonestreet, La Crema, Byron, Cambria, plus estates in Bordeaux, Tuscany and Australia — Jackson Family Wines becomes one of the largest family-owned wine companies on earth." },
      { y: 2011, t: "Jess dies; wife Barbara Banke drives global expansion (including Burgundy and Oregon) while keeping it private and family-owned." }
    ],
    storyTags: ["consolidated"],
    awards: ["Vintner's Reserve Chardonnay: #1 selling Chardonnay in America 30+ years running", "Jess Jackson: Thoroughbred racing Hall of Fame owner (Curlin, Rachel Alexandra)"],
    funFact: "Jackson won a landmark lawsuit against E&J Gallo over a lookalike 'Turning Leaf' label — the grape-leaf case went to the 9th Circuit and became marketing-law legend."
  },

  {
    slug: "chateau-st-jean", name: "Chateau St. Jean", valley: "Sonoma", ava: "Sonoma Valley (Kenwood)",
    founded: 1973, founder: "The Merzoian brothers (named for sister-in-law Jean Sheffield)",
    address: "8555 Sonoma Hwy, Kenwood, CA 95452", lat: 38.427, lng: -122.5469,
    website: "https://www.chateaustjean.com",
    owner: "Foley Family Wines (since 2021)", group: "Foley Family Wines",
    priceRange: [15, 100], tastingFee: "$25–$60",
    tours: "Yes — gardens and grounds made for picnics; reserve tastings in the 1920s château",
    vibeTags: ["Classic", "Showpiece", "Casual"],
    vibe: "A 1920s country villa under Sugarloaf Ridge with formal gardens, a turreted folly, and Sonoma Valley's prettiest picnic lawn. Genteel and easygoing.",
    wines: [
      { name: "Cinq Cépages Cabernet Sauvignon", why: "A five-variety Bordeaux blend; the 1996 vintage was Wine Spectator's 1999 Wine of the Year — the first Sonoma wine to top the list." },
      { name: "Robert Young Vineyard Chardonnay", why: "A pioneer of California single-vineyard Chardonnay under founding winemaker Richard Arrowood." }
    ],
    history: [
      { y: 1973, t: "Founded around the 1920s Goff family summer estate; Richard Arrowood's vineyard-designated whites quickly make its reputation." },
      { y: 1984, t: "Japan's Suntory buys the estate — early international money in Sonoma." },
      { y: 1996, t: "Sold into what becomes Beringer Blass / Foster's / Treasury Wine Estates — a two-decade ride through global drinks conglomerates." },
      { y: 2021, t: "Bill Foley adds it to Foley Family Wines, reuniting it under the same roof as Sebastiani, Ferrari-Carano and Chalk Hill." }
    ],
    storyTags: ["consolidated", "site-reuse"],
    awards: ["1996 Cinq Cépages — Wine Spectator Wine of the Year 1999 (first for Sonoma)"],
    funFact: "The 'St.' in the name is a joke — Jean Sheffield wasn't a saint; the founders canonized her anyway."
  },

  {
    slug: "iron-horse", name: "Iron Horse Vineyards", valley: "Sonoma", ava: "Green Valley of Russian River Valley",
    founded: 1976, founder: "Audrey & Barry Sterling with Forrest Tancer",
    address: "9786 Ross Station Rd, Sebastopol, CA 95472", lat: 38.4561, lng: -122.8987,
    website: "https://www.ironhorsevineyards.com",
    owner: "Sterling family (Joy Sterling, CEO)", group: "Independent (Sterling family)",
    priceRange: [45, 125], tastingFee: "$35–$60",
    tours: "Yes — outdoor tastings at a rustic bar with knockout views; Sunday oyster pairings in season",
    vibeTags: ["Casual", "Intimate", "Family-run"],
    vibe: "Bubbles poured at an open-air redwood plank bar on a hilltop, with Mount St. Helena floating over the fog. Rubber-boots glamour: presidents drink this sparkling wine, but you taste it standing in a working farmyard.",
    wines: [
      { name: "Russian Cuvée", why: "Created for the Reagan–Gorbachev summits — slightly richer dosage 'to toast the end of the Cold War.'" },
      { name: "Wedding Cuvée", why: "The romantic flagship, blanc de noirs from estate Pinot." }
    ],
    history: [
      { y: 1976, t: "International lawyer Barry Sterling and wife Audrey — who had hunted for a European-style estate from Bordeaux to here — buy the foggy Green Valley ranch, named for the railroad stop that once served it." },
      { y: 1985, t: "Poured at the Reagan–Gorbachev Geneva summit; Iron Horse sparkling goes on to be served at White House events across five+ administrations." },
      { y: 2000, t: "Second generation (Joy and Laurence) leads; still wholly family-owned, still estate-only." }
    ],
    storyTags: [],
    awards: ["Served at U.S.–Soviet summit toasts and White House state occasions", "Green Valley pioneer for cool-climate sparkling"],
    funFact: "Their annual Earth Day and National Geographic partnership cuvées fund ocean conservation — a winery that pairs bubbles with causes."
  },

  {
    slug: "hanzell", name: "Hanzell Vineyards", valley: "Sonoma", ava: "Sonoma Valley (Moon Mountain foothills)",
    founded: 1953, founder: "James D. Zellerbach, paper magnate & U.S. Ambassador to Italy",
    address: "18596 Lomita Ave, Sonoma, CA 95476", lat: 38.3111, lng: -122.463,
    website: "https://www.hanzell.com",
    owner: "de Brye family (since 1975)", group: "Independent (de Brye family)",
    priceRange: [45, 145], tastingFee: "$95–$125, appointment only",
    tours: "Yes — small-group estate tours; among the most intimate serious visits in Sonoma",
    vibeTags: ["Intimate", "Classic", "Historic"],
    vibe: "A tiny Burgundian temple in the hills above Sonoma town — the winery facade is modeled on Clos de Vougeot. Quiet, scholarly, appointment-only; the pilgrimage site for California Chardonnay history.",
    wines: [
      { name: "Chardonnay", why: "From the oldest continuously producing Chardonnay vines in North America (the 1953 'Ambassador's' block) — the wine that introduced French oak to California." },
      { name: "Pinot Noir", why: "Equally historic plantings; Burgundian long before it was a movement." }
    ],
    history: [
      { y: 1953, t: "Zellerbach, besotted with Burgundy from his ambassadorship, plants Chardonnay and Pinot on his Sonoma retreat and names it for wife Hana + Zellerbach." },
      { y: 1957, t: "Winemaker Brad Webb ages the wine in French oak barrels — a California first — and pioneers induced malolactic fermentation and inert-gas handling; modern California Chardonnay starts here." },
      { y: 1975, t: "After Zellerbach's death the estate passes to the de Brye family, who have kept it small and true for 50 years." }
    ],
    storyTags: [],
    awards: ["Oldest continuously producing Chardonnay & Pinot Noir vines in North America", "Credited with introducing French oak barrels to California winemaking"],
    funFact: "Zellerbach never sold a bottle commercially in his lifetime plan — the project was a rich man's love letter to Burgundy that accidentally changed American wine."
  },

  {
    slug: "simi", name: "Simi Winery", valley: "Sonoma", ava: "Alexander Valley (Healdsburg)",
    founded: 1876, founder: "Giuseppe & Pietro Simi, Tuscan brothers",
    address: "16275 Healdsburg Ave, Healdsburg, CA 95448", lat: 38.6405, lng: -122.8737,
    website: "https://www.simiwinery.com",
    owner: "WarRoom Cellars (brand, since Nov 2025); The Wine Group (winery property)", group: "The Wine Group / WarRoom Cellars",
    priceRange: [18, 75], tastingFee: "Tasting room closed since 2023",
    tours: "Currently closed to visitors — the historic tasting room shut in 2023 and hasn't reopened; the stone cellars are still worth knowing from the outside",
    vibeTags: ["Historic", "Casual", "Classic"],
    vibe: "Hand-laid 1890 stone cellars right on the old Redwood Highway, with a redwood-shaded courtyard. Easygoing and rich in one of wine's great women-in-wine stories.",
    wines: [
      { name: "Alexander Valley Cabernet Sauvignon", why: "The modern flagship; the Landslide Vineyard bottling is the step-up." },
      { name: "Sonoma County Chardonnay", why: "The reliable house classic." }
    ],
    history: [
      { y: 1876, t: "The Simi brothers begin making wine in San Francisco from Sonoma grapes; they build the Healdsburg stone cellars in 1890 and name the winery 'Montepulciano' for home." },
      { y: 1904, t: "Both brothers die within weeks; Giuseppe's 18-year-old daughter Isabelle takes over — and runs the winery for 66 years." },
      { y: 1920, t: "Isabelle keeps Simi alive through Prohibition, then reopens in 1934 with a tasting room built from a 25,000-gallon redwood tank beside the highway — one of California's first tasting rooms." },
      { y: 1970, t: "Isabelle finally sells at 84; after Russell Green and a Moët-Hennessy period (where Zelma Long's winemaking made it famous again), Constellation acquires it in 1999." },
      { y: 2025, t: "Corporate hot potato: Constellation divests SIMI to The Wine Group (June), which sells the brand on to WarRoom Cellars (November) while keeping the Healdsburg facility. The tasting room, closed since 2023, remains dark." }
    ],
    storyTags: ["consolidated", "resurrected"],
    awards: ["One of California's oldest continuously used stone cellars", "Isabelle Simi: pioneering woman winery owner-operator, 1904–1970"],
    funFact: "Isabelle flagged down motorists on the new Redwood Highway from her wine-tank tasting room — drive-up wine tourism, invented 1934."
  },

  {
    slug: "rodney-strong", name: "Rodney Strong Vineyards", valley: "Sonoma", ava: "Russian River Valley (Healdsburg)",
    founded: 1959, founder: "Rodney Strong, Broadway dancer turned winemaker",
    address: "11455 Old Redwood Hwy, Healdsburg, CA 95448", lat: 38.5747, lng: -122.842,
    website: "https://www.rodneystrong.com",
    owner: "Klein family (California farming family, since 1989)", group: "Independent (Klein family)",
    priceRange: [17, 120], tastingFee: "$25–$60",
    tours: "Yes — self-guided viewing walkways over the cellar; summer concerts on the green",
    vibeTags: ["Modern", "Casual", "Classic"],
    vibe: "A striking 1970 concrete winery-in-the-round — mid-century modern in the vines — with a big lawn famous for its summer concert series. Comfortable, unfussy Healdsburg standby.",
    wines: [
      { name: "Symmetry Meritage", why: "The flagship red blend from Alexander Valley." },
      { name: "Alexander's Crown Cabernet", why: "Sonoma County's first single-vineyard Cabernet (1974)." }
    ],
    history: [
      { y: 1959, t: "Rod Strong — who danced on Broadway and in Paris — starts blending wine in Tiburon, then builds toward estate winemaking in Sonoma." },
      { y: 1970, t: "Builds the dramatic cross-shaped winery (architect Craig Roland) at the center of his vineyards." },
      { y: 1974, t: "Plants Russian River Valley's pioneering Pinot Noir and bottles Sonoma's first single-vineyard Cab, Alexander's Crown." },
      { y: 1989, t: "The Klein farming family buys the winery, investing in sustainability (first carbon-neutral winery in Sonoma County, 2009) while keeping it family-run." }
    ],
    storyTags: ["consolidated"],
    awards: ["First carbon-neutral winery in Sonoma County (2009)", "Alexander's Crown: Sonoma's first vineyard-designated Cabernet"],
    funFact: "Rod Strong is likely the only person to have performed at the Lido in Paris and pioneered a Russian River Pinot vineyard — second act done right."
  },

  {
    slug: "coppola-geyserville", name: "Francis Ford Coppola Winery", valley: "Sonoma", ava: "Alexander Valley (Geyserville)",
    founded: 2010, founder: "Francis Ford Coppola — in the 1973 Chateau Souverain building",
    address: "300 Via Archimedes, Geyserville, CA 95441", lat: 38.6795, lng: -122.8878,
    website: "https://www.thefamilycoppola.com",
    owner: "Delicato Family Wines (majority, since 2021)", group: "Delicato Family Wines",
    priceRange: [12, 95], tastingFee: "$25–$45; pool day passes in summer",
    tours: "Yes — plus a swimming pool, bocce, restaurant, and a museum of movie memorabilia",
    vibeTags: ["Showpiece", "Casual", "Modern"],
    vibe: "A 'wine wonderland': resort pool with cabanas, Godfather memorabilia (Don Corleone's desk, the Tucker car, Coppola's Oscars), restaurants, bocce — a family amusement park that happens to make wine, in a landmark 1973 winery building.",
    wines: [
      { name: "Director's Cut", why: "The step-up Sonoma tier with the film-strip label." },
      { name: "Diamond Collection Claret", why: "The black-label, gold-netted Cab — one of the most recognizable bottles on grocery shelves." }
    ],
    history: [
      { y: 1973, t: "The building opens as Chateau Souverain, its twin-towered design by architect John Marsh Davis inspired by Sonoma's hop kilns." },
      { y: 2006, t: "Coppola buys the property (Souverain's brand moves elsewhere) — a marquee example of new money reanimating an older winery's shell." },
      { y: 2010, t: "Reopens as Francis Ford Coppola Winery, deliberately family-focused: 'a park for all ages' rather than a temple of tasting." },
      { y: 2021, t: "Delicato Family Wines takes a majority stake in Coppola's wine business — folding a director's empire into one of America's biggest family wine companies." }
    ],
    storyTags: ["consolidated", "site-reuse"],
    awards: ["The building itself: a celebrated piece of 1970s wine-country architecture", "Coppola's five Oscars are displayed in the lobby"],
    funFact: "Coppola modeled the pool-and-pavilion concept on Copenhagen's Tivoli Gardens — he wanted a winery his grandchildren would beg to visit."
  },

  {
    slug: "ferrari-carano", name: "Ferrari-Carano Vineyards & Winery", valley: "Sonoma", ava: "Dry Creek Valley",
    founded: 1981, founder: "Don & Rhonda Carano, Reno hoteliers (El Dorado casino)",
    address: "8761 Dry Creek Rd, Healdsburg, CA 95448", lat: 38.6966, lng: -122.9677,
    website: "https://www.ferrari-carano.com",
    owner: "Foley Family Wines (since 2020)", group: "Foley Family Wines",
    priceRange: [16, 65], tastingFee: "$25–$60",
    tours: "Yes — Villa Fiore tastings; the five acres of gardens (10,000 tulips each spring) are the draw",
    vibeTags: ["Showpiece", "Grand", "Casual"],
    vibe: "An Italianate villa ('Villa Fiore') with wine country's most photographed gardens — tulip season is a pilgrimage. Polished hospitality at approachable prices.",
    wines: [
      { name: "Fumé Blanc", why: "A best-selling benchmark of the fresh California Sauvignon Blanc style." },
      { name: "Trésor", why: "The Bordeaux-blend flagship from the reserve cellar." }
    ],
    history: [
      { y: 1981, t: "The Caranos, who ran Reno's El Dorado hotel-casino, buy Dry Creek land after wine-buying trips for their restaurants kept leading them here." },
      { y: 1997, t: "Villa Fiore opens — gardens designed as a destination from day one." },
      { y: 2020, t: "After Don's death, Rhonda sells to Bill Foley — another jewel into Foley Family Wines' Sonoma collection." }
    ],
    storyTags: ["consolidated"],
    awards: ["Gardens routinely named among America's best winery grounds", "Fumé Blanc: perennial by-the-glass bestseller nationally"],
    funFact: "The Caranos ran their winery like a great casino resort: obsessive hospitality, spectacle, and a signature drink — it worked."
  }
];

// Corporate family notes for the Lineage view
const GROUP_NOTES = {
  "Treasury Wine Estates": "Australian drinks giant (spun off from Foster's beer, 2011). Its Napa trophies came via the Beringer Blass acquisition chain.",
  "Constellation Brands": "U.S. beverage conglomerate (Corona, Modelo). Bought Robert Mondavi in 2004 — the deal that symbolized corporate Napa. In its 2025 premium-focus shake-up it divested mainstream brands (including SIMI) but kept Robert Mondavi Winery, To Kalon, and its half of Opus One.",
  "The Wine Group / WarRoom Cellars": "The 2025 endgame of brand consolidation: Constellation offloaded SIMI to The Wine Group, which flipped the brand to WarRoom Cellars months later while keeping the Healdsburg winery — a 149-year-old name traded twice in one year.",
  "Foley Family Wines": "Bill Foley (title-insurance billionaire, owns the Vegas Golden Knights) has quietly assembled one of Sonoma's biggest collections: Sebastiani, Chateau St. Jean, Ferrari-Carano, Chalk Hill, Roth and more.",
  "Jackson Family Wines": "Built by lawyer Jess Jackson from one accidental off-dry Chardonnay into a global family-owned empire (Freemark Abbey, Matanzas Creek, La Crema, Stonestreet…).",
  "Boisset Collection": "Burgundy's Boisset family; Jean-Charles Boisset (married to Gina Gallo) restores historic properties with theatrical flair — Buena Vista, Raymond, DeLoach.",
  "Duckhorn Portfolio (Butterfly Equity)": "Duckhorn grew from Merlot specialist to acquirer (Kosta Browne, Sonoma-Cutrer), IPO'd in 2021, then was taken private by Butterfly Equity in 2024.",
  "Lawrence Wine Estates": "Gaylon Lawrence Jr. (Arkansas agribusiness) is the newest big consolidator of historic Napa names: Heitz, Stony Hill, Burgess.",
  "Marchesi Antinori": "Italy's 600-year-old Antinori family co-bought Stag's Leap Wine Cellars with Ste. Michelle in 2007, then took sole ownership in 2023 — the Judgment of Paris winner is now fully Italian-owned.",
  "LVMH": "The world's biggest luxury group added Joseph Phelps (2022) to a stable holding Dom Pérignon, Krug, Château d'Yquem, Newton and Chandon.",
  "Delicato Family Wines": "One of America's largest family wine companies; took majority control of Francis Ford Coppola's wine brands in 2021.",
  "Otsuka (hands-off)": "Japan's Otsuka Pharmaceutical has majority-owned Ridge since 1986 and is wine's favorite example of a benevolent, invisible corporate parent.",
  "GI Partners (Far Niente Wine Estates)": "Private equity firm GI Partners took majority ownership of the Far Niente family of wineries (Far Niente, Nickel & Nickel, Dolce, EnRoute, Bella Union) in 2016, with the Nickel family retaining a stake."
};

const STORY_TAG_LABELS = {
  "resurrected": { label: "Resurrected", desc: "Wineries that died — to Prohibition, phylloxera, earthquake, or corporate neglect — and were brought back to life." },
  "site-reuse": { label: "Reused historic space", desc: "Wineries operating in (or restored around) the buildings, cellars and caves of an older winery." },
  "consolidated": { label: "Consolidated", desc: "Independents absorbed into corporate groups — the defining business story of modern Napa & Sonoma." },
  "judgment-of-paris": { label: "Judgment of Paris", desc: "Connected to the 1976 blind tasting in Paris where California beat France and changed wine forever." }
};
