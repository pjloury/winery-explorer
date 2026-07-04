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

  {
    slug: "quintessa", name: "Quintessa", valley: "Napa", ava: "Rutherford",
    founded: 1990, founder: "Agustin & Valeria Huneeus (Chilean wine dynasty)",
    address: "1601 Silverado Trail, Rutherford, CA 94573", lat: 38.4780, lng: -122.4170,
    website: "https://www.quintessa.com",
    owner: "Huneeus family (Quintessa/Huneeus Vintners)", group: "Independent (Huneeus family)",
    priceRange: [75, 300], tastingFee: "$150–$250, by appointment",
    tours: "Yes — estate drive and tastings in glass hilltop pavilions overlooking the vines",
    vibeTags: ["Modern", "Grand", "Intimate"],
    architect: "Walker Warner Architects", bookSection: "Grasses + Oaks, Glass + Steel",
    vibe: "A 280-acre biodynamic amphitheater of hills with a crescent of stone winery curved into the land — the cover star of 'The New Architecture of Wine.' Tastings happen in glass pavilions perched over the estate. Serene, sculptural, one-wine luxury.",
    wines: [
      { name: "Quintessa", why: "The single estate red blend — a Rutherford Bordeaux blend farmed biodynamically; one wine, one place." },
      { name: "Illumination", why: "The estate's Sauvignon Blanc counterpart." }
    ],
    history: [
      { y: 1989, t: "Valeria Huneeus discovers the untouched 280-acre Rutherford property; the family vows to make a single wine from it." },
      { y: 1990, t: "Agustin Huneeus — who ran Concha y Toro and Franciscan — plants the estate; first vintage 1994." },
      { y: 2002, t: "The crescent-shaped gravity-flow winery by Walker Warner opens, buried in the hillside to disappear into the land." },
      { y: 2017, t: "Glass tasting pavilions land on the oak knolls — the image that came to define new Napa architecture." }
    ],
    storyTags: ["architecture"],
    awards: ["Cover feature of 'The New Architecture of Wine' (2019)", "Consistent 95+ scores for the estate blend", "Certified organic & biodynamic"],
    funFact: "Agustin Huneeus insisted the winery be invisible from the valley floor — you can drive Silverado Trail and never know a world-class winery curves into that hill."
  },

  {
    slug: "hall", name: "HALL Wines", valley: "Napa", ava: "St. Helena",
    founded: 2003, founder: "Craig & Kathryn Walt Hall (she was U.S. Ambassador to Austria)",
    address: "401 St. Helena Hwy S, St. Helena, CA 94574", lat: 38.4900, lng: -122.4700,
    website: "https://www.hallwines.com",
    owner: "Craig & Kathryn Hall", group: "Independent (Hall family)",
    priceRange: [35, 350], tastingFee: "$60–$175",
    tours: "Yes — art-and-architecture tours through the glass winery, gardens, and contemporary art collection",
    vibeTags: ["Modern", "Showpiece"],
    architect: "Signum Architecture (glass winery, 2014)", bookSection: "Sustainability + Love of the Land",
    vibe: "Napa's contemporary-art winery: a giant chrome rabbit ('Bunny Foo Foo') leaping over the vines, a glass-walled winery wrapped around the 1885 Bergfeld ghost winery, and museum-grade art everywhere. Slick, fun, unapologetically new.",
    wines: [
      { name: "Kathryn Hall Cabernet Sauvignon", why: "The flagship — the 2010 vintage earned 100 points and put HALL among Napa's elite Cabs." },
      { name: "'Eleanor' & Napa Valley Cabernet", why: "The broader collection that made HALL a modern Cabernet powerhouse." }
    ],
    history: [
      { y: 1885, t: "The Bergfeld winery is built on the site — one of the St. Helena ghost wineries silenced by Prohibition." },
      { y: 2003, t: "Dallas financier Craig Hall and vintner-diplomat Kathryn Hall buy the property (their Rutherford estate came in 1995)." },
      { y: 2009, t: "HALL's Rutherford facility becomes California's first LEED Gold certified winery." },
      { y: 2014, t: "The glass tasting hall by Signum opens, wrapping the restored 1885 stone building — old bones, radically new skin." }
    ],
    storyTags: ["architecture", "site-reuse"],
    awards: ["100-point 2010 Kathryn Hall Cabernet", "First LEED Gold certified winery in California (Rutherford, 2009)", "Featured in 'The New Architecture of Wine'"],
    funFact: "'Bunny Foo Foo' — 35 feet of polished stainless steel — divides Napa purists and Instagram roughly down the middle, which is exactly what the Halls intended."
  },

  {
    slug: "cade", name: "CADE Estate Winery", valley: "Napa", ava: "Howell Mountain",
    founded: 2005, founder: "PlumpJack partners: Gordon Getty, Gavin Newsom & John Conover",
    address: "360 Howell Mountain Rd S, Angwin, CA 94508", lat: 38.5640, lng: -122.4420,
    website: "https://www.cadewinery.com",
    owner: "PlumpJack Group (Getty/Newsom/Conover)", group: "PlumpJack Group",
    priceRange: [60, 250], tastingFee: "$95–$150, by appointment",
    tours: "Yes — terrace tastings 1,800 feet up Howell Mountain with panoramic valley views",
    vibeTags: ["Modern", "Intimate"],
    architect: "Juancarlos Fernandez (credited in book to Lail Design Group)", bookSection: "Sustainability + Love of the Land",
    vibe: "A concrete, steel and glass eyrie on Howell Mountain, built organic and LEED Gold from day one. Mountain-air tastings with the whole valley at your feet — modern, mineral, a little exclusive.",
    wines: [
      { name: "CADE Howell Mountain Cabernet Sauvignon", why: "The estate flagship — powerful, structured mountain Cabernet." },
      { name: "CADE Estate Reserve", why: "The top barrel selection from the volcanic-ash slopes." }
    ],
    history: [
      { y: 1995, t: "The PlumpJack story starts with a Getty–Newsom wine shop in San Francisco, then PlumpJack Winery in Oakville (1997)." },
      { y: 2005, t: "The partners buy 54 acres on Howell Mountain for a ground-up sustainable estate." },
      { y: 2009, t: "CADE opens as Napa's first organically farmed, LEED Gold certified estate winery; sibling Odette follows in Stags Leap (2012)." }
    ],
    storyTags: ["architecture"],
    awards: ["Napa's first LEED Gold estate winery", "Featured in 'The New Architecture of Wine'"],
    funFact: "'CADE' is Shakespearean slang (via Henry VI) for a cask — fitting for a winery co-owned by a governor who started as a wine merchant."
  },

  {
    slug: "cuvaison", name: "Cuvaison Estate Wines", valley: "Napa", ava: "Los Carneros",
    founded: 1969, founder: "Silicon Valley engineers Thomas Cottrell & Thomas Parkhill",
    address: "1221 Duhig Rd, Napa, CA 94559", lat: 38.2550, lng: -122.3450,
    website: "https://www.cuvaison.com",
    owner: "Schmidheiny family (Switzerland), owners since 1979", group: "Independent (Schmidheiny family)",
    priceRange: [28, 90], tastingFee: "$40–$75",
    tours: "Yes — glass-box tasting room amid the estate vines; outdoor terraces",
    vibeTags: ["Modern", "Casual"],
    architect: "Gould Evans (Douglas Thornley)", bookSection: "Grasses + Oaks, Glass + Steel",
    vibe: "A minimalist glass-and-board-formed-concrete tasting pavilion floating in 400 acres of Carneros Chardonnay — quiet modernism, cool fog, no crowds. One of the valley's most underrated architectural stops.",
    wines: [
      { name: "Estate Chardonnay", why: "The Carneros signature — bright, estate-grown, long the house calling card." },
      { name: "Estate Pinot Noir", why: "Its red counterpart from the same fog-cooled blocks." }
    ],
    history: [
      { y: 1969, t: "Founded near Calistoga by two engineers at the dawn of modern Napa." },
      { y: 1979, t: "Switzerland's Schmidheiny family (industrialists) buys Cuvaison and, in 1980, plants 400 acres in then-unfashionable Carneros — a prescient cool-climate bet." },
      { y: 2009, t: "The Gould Evans tasting pavilion opens at the Carneros estate, later joined by expanded glass hospitality spaces." }
    ],
    storyTags: ["architecture"],
    awards: ["Featured in 'The New Architecture of Wine'", "Certified Napa Green estate"],
    funFact: "'Cuvaison' is the French term for the time wine spends on its skins during fermentation — a winemaking-nerd name from 1969 that still filters guests by curiosity."
  },

  {
    slug: "trinchero", name: "Trinchero Napa Valley", valley: "Napa", ava: "St. Helena",
    founded: 1948, founder: "The Trinchero family (Mario & Mary Trinchero, from NYC via Asti, Italy)",
    address: "3070 St. Helena Hwy N, St. Helena, CA 94574", lat: 38.5250, lng: -122.4780,
    website: "https://www.trincheronapavalley.com",
    owner: "Trinchero Family Estates (3rd/4th generation)", group: "Trinchero Family Estates",
    priceRange: [30, 175], tastingFee: "$45–$95",
    tours: "Yes — estate tastings in the BAR Architects-designed hospitality house and grounds",
    vibeTags: ["Modern", "Classic", "Family-run"],
    architect: "BAR Architects; interiors by Erin Martin Design", bookSection: "The New Agrarian",
    vibe: "The prestige face of the family that owns Sutter Home: a polished modern-agrarian estate with Erin Martin's theatrical interiors. The story — jug wine to White Zinfandel windfall to serious single-vineyard Cabernet — is peak American wine.",
    wines: [
      { name: "Mario's Reserve Cabernet Sauvignon", why: "The flagship named for the patriarch, from prime St. Helena and Rutherford vineyards." },
      { name: "Sutter Home White Zinfandel", why: "Made by the same family — the happy 1975 stuck-fermentation accident that became America's best-selling wine of the 1980s and bankrolled everything." }
    ],
    history: [
      { y: 1948, t: "The Trincheros leave New York and buy the shuttered Sutter Home winery in St. Helena." },
      { y: 1975, t: "Bob Trinchero's stuck Zinfandel fermentation creates sweet, pink 'White Zinfandel' — it becomes a national phenomenon and one of wine's great fortunes." },
      { y: 2007, t: "The family launches Trinchero Napa Valley, its luxury estate label, later opening the BAR-designed showcase estate; Trinchero Family Estates is now one of the largest family-owned wine companies in the world (Ménage à Trois, Napa Cellars, and dozens more)." }
    ],
    storyTags: ["architecture", "resurrected"],
    awards: ["Featured in 'The New Architecture of Wine'", "Trinchero Family Estates: ~4th largest family wine company in the U.S."],
    funFact: "White Zinfandel profits famously saved thousands of acres of old Zinfandel vines from being ripped out — the pink wine snobs mock preserved the old vines they now revere."
  },

  {
    slug: "davis-estates", name: "Davis Estates", valley: "Napa", ava: "Calistoga",
    founded: 2011, founder: "Mike & Sandy Davis (tech executive turned vintner)",
    address: "4060 Silverado Trail N, Calistoga, CA 94515", lat: 38.5900, lng: -122.5650,
    website: "https://www.davisestates.com",
    owner: "Mike & Sandy Davis", group: "Independent (Davis family)",
    priceRange: [60, 250], tastingFee: "$95–$200, by appointment",
    tours: "Yes — appointment-only tastings in the Backen barn and caves; Howard Backen personally designed the hospitality house",
    vibeTags: ["Modern", "Intimate", "Showpiece"],
    architect: "Backen & Gillam Architects (Howard Backen)", bookSection: "The New Agrarian",
    vibe: "Backen's modern-agrarian ideal: a glass-ended barn that opens completely to the vineyard, over caves stuffed with toys (a restored WWII-era Ford GPW among them). Intimate, no-expense-spared Calistoga hospitality.",
    wines: [
      { name: "Phase V Cabernet Sauvignon", why: "The flagship Cabernet, made with Philippe Melka consulting — a who's-who of modern Napa talent." },
      { name: "Zephyr & Estate Cabernets", why: "The tiered Calistoga estate reds." }
    ],
    history: [
      { y: 1900, t: "The property's winemaking roots go back over a century before falling silent." },
      { y: 2011, t: "Mike Davis, after a career in tech, buys the 155-acre property and rehabilitates the estate." },
      { y: 2016, t: "The Backen-designed winery, caves and hospitality barn open — a textbook of the 'new agrarian' style." }
    ],
    storyTags: ["architecture"],
    awards: ["Featured in 'The New Architecture of Wine'", "Melka-consulted Cabernets scoring mid-to-high 90s"],
    funFact: "Howard Backen — architect of Ram's Gate, Harlan, and half of modern Napa's aesthetic — considered the Davis barn one of the purest expressions of his open-to-the-land style."
  },

  {
    slug: "melka-estates", name: "Melka Estates", valley: "Napa", ava: "St. Helena",
    founded: 1996, founder: "Philippe Melka (Bordeaux-born star winemaker) & Cherie Melka",
    address: "St. Helena, CA (tasting by appointment)", lat: 38.5050, lng: -122.4700,
    website: "https://www.melkaestates.com",
    owner: "Philippe & Cherie Melka", group: "Independent (Melka family)",
    priceRange: [95, 400], tastingFee: "$150+, strictly by appointment",
    tours: "Private appointment-only tastings at the Signum-designed estate",
    vibeTags: ["Modern", "Intimate"],
    architect: "Signum Architecture (Juancarlos Fernandez)", bookSection: "The New Agrarian",
    vibe: "The personal label of Napa's most in-demand consulting winemaker — a small, precise, modern estate visit where the draw is the man's palate, not spectacle. For serious Cabernet pilgrims.",
    wines: [
      { name: "Métisse", why: "Melka's flagship Bordeaux blend — 'métisse' meaning mixed heritage, French technique on Napa fruit." },
      { name: "CJ Cabernet Sauvignon", why: "Named for children Chloé and Jérémie; the approachable entry to the Melka style." }
    ],
    history: [
      { y: 1991, t: "Trained at Haut-Brion and Dominus, geologist-turned-winemaker Philippe Melka lands in Napa." },
      { y: 1996, t: "The Melkas start their own tiny label while Philippe consults for a murderers' row of estates (Hundred Acre, Dana, Davis, Vineyard 29…)." },
      { y: 2016, t: "The Signum-designed winery and tasting spaces give the family label a permanent architectural home." }
    ],
    storyTags: ["architecture"],
    awards: ["Featured in 'The New Architecture of Wine'", "Philippe Melka: multiple 100-point wines as consultant; named among the world's top wine consultants"],
    funFact: "Melka studied geology before wine — clients say he reads a vineyard's dirt the way sommeliers read a label."
  },

  {
    slug: "progeny", name: "Progeny Winery", valley: "Napa", ava: "Mount Veeder",
    founded: 2007, founder: "The Baker family",
    address: "Mount Veeder, Napa, CA (by appointment)", lat: 38.3700, lng: -122.4000,
    website: "https://www.progenywinery.com",
    owner: "Baker family", group: "Independent (Baker family)",
    priceRange: [75, 225], tastingFee: "$100+, strictly by appointment",
    tours: "Private appointment-only visits to the glass pavilion on Mount Veeder",
    vibeTags: ["Modern", "Intimate"],
    architect: "Signum Architecture", bookSection: "Grasses + Oaks, Glass + Steel",
    vibe: "A glass jewel-box pavilion floating among oaks and grasses high on Mount Veeder — architecture reduced to a frame for the view. Tiny production, private visits, mountain quiet.",
    wines: [
      { name: "Progeny Reserve Cabernet Sauvignon", why: "Structured Mount Veeder mountain Cabernet — the estate's reason for being." }
    ],
    history: [
      { y: 2007, t: "The family establishes the Mount Veeder estate, naming it 'Progeny' for the generations it's meant to serve." },
      { y: 2015, t: "Signum's glass-and-steel tasting pavilion opens among the oaks — one of the purest 'grasses + oaks, glass + steel' statements in the book." }
    ],
    storyTags: ["architecture"],
    awards: ["Featured in 'The New Architecture of Wine'"],
    funFact: "Mount Veeder is Napa's coolest, steepest, most forested mountain AVA — its Cabs trade valley-floor plushness for alpine backbone."
  },

  {
    slug: "stewart-cellars", name: "Stewart Cellars", valley: "Napa", ava: "Yountville",
    founded: 2000, founder: "Michael Stewart (Texas tech entrepreneur); now daughter Caroline & family",
    address: "6752 Washington St, Yountville, CA 94599", lat: 38.4020, lng: -122.3600,
    website: "https://www.stewartcellars.com",
    owner: "Stewart family", group: "Independent (Stewart family)",
    priceRange: [45, 200], tastingFee: "$45–$125",
    tours: "Tasting complex in downtown Yountville — walk-in friendly courtyard, library tastings reservable",
    vibeTags: ["Modern", "Casual", "Family-run"],
    architect: "Arcanum Architecture (tasting complex, 2016)", bookSection: "Singular Voices",
    vibe: "A modern stone 'ruin' in downtown Yountville — three structures around a courtyard, meant to look like a Scottish abbey reclaimed with glass and steel. Serious To Kalon Cabernet in a strollable, unstuffy setting.",
    wines: [
      { name: "NOMAD Beckstoffer To Kalon Cabernet", why: "Sourced from the most famous Cabernet vineyard in America — collector juice under a family label." },
      { name: "Napa Valley Cabernet Sauvignon", why: "The house style: polished, dark, Yountville-smooth." }
    ],
    history: [
      { y: 2000, t: "Michael Stewart starts buying elite Beckstoffer fruit (To Kalon, Las Piedras) — a négociant path to the top." },
      { y: 2016, t: "The Arcanum-designed tasting complex opens on Washington Street, its hand-laid stone walls built to read as centuries old." }
    ],
    storyTags: ["architecture"],
    awards: ["Featured in 'The New Architecture of Wine'", "NOMAD To Kalon bottlings regularly 95+"],
    funFact: "The complex's stone was laid by masons to mimic a ruined kirk because the family loved Scotland's Melrose Abbey — new Napa cosplaying old Europe, gorgeously."
  },

  {
    slug: "hourglass", name: "Hourglass", valley: "Napa", ava: "Calistoga",
    founded: 1997, founder: "Jeff Smith (son of 1970s Napa retailer Ned Smith)",
    address: "1104 Adams St #103, St. Helena / estate on Silverado Trail, Calistoga", lat: 38.5750, lng: -122.5600,
    website: "https://www.hourglasswines.com",
    owner: "Jeff Smith & partners", group: "Independent (Smith family)",
    priceRange: [60, 250], tastingFee: "$125+, by appointment",
    tours: "Appointment-only tastings at the Blueline estate and Lundberg-designed cave",
    vibeTags: ["Modern", "Intimate"],
    architect: "Lundberg Design (Olle Lundberg)", bookSection: "Singular Voices",
    vibe: "Rock-and-roll cult Cabernet from two narrow valley pinch-points, aged in a raw, industrial-chic Lundberg cave with a steel-and-walnut tasting bar. Cool-kid Napa, no chateau required.",
    wines: [
      { name: "Hourglass Estate Cabernet Sauvignon", why: "From the original 4-acre site where the valley narrows to its 'hourglass' waist." },
      { name: "Blueline Estate Cabernet", why: "The second estate along Blueline creek; both are Tony Biagi-made collector wines." }
    ],
    history: [
      { y: 1976, t: "Ned Smith buys the little Calistoga property; son Jeff later realizes its zinfandel patch sits on perfect Cabernet dirt." },
      { y: 1997, t: "First Hourglass Cabernet — an instant cult item in the 90s Napa wave." },
      { y: 2012, t: "The Lundberg Design cave and tasting space open at Blueline — San Francisco industrial design transplanted into a hillside." }
    ],
    storyTags: ["architecture"],
    awards: ["Featured in 'The New Architecture of Wine'", "Perennial 94–97 point Cabernets"],
    funFact: "Olle Lundberg also designed for Slanted Door and Twitter HQ; the cave's tasting table was salvaged from a single 30-foot slab of California walnut."
  },

  {
    slug: "dana-estates", name: "Dana Estates", valley: "Napa", ava: "Rutherford",
    founded: 2005, founder: "Hi Sang Lee (Korean fine-wine importer, Nara Cellars)",
    address: "3155 St. Helena Hwy N, Rutherford, CA 94573", lat: 38.4700, lng: -122.4400,
    website: "https://www.danaestates.com",
    owner: "Hi Sang Lee family", group: "Independent (Lee family)",
    priceRange: [150, 600], tastingFee: "Largely private / allocation customers",
    tours: "Essentially private — visits reserved for allocation members; the estate rarely opens to the public",
    vibeTags: ["Modern", "Grand", "Intimate"],
    architect: "Backen & Gillam Architects (restoration + new winery)", bookSection: "History Reenvisioned",
    vibe: "A 1883 ghost winery resurrected into one of Napa's most exquisite private estates — hand-cut stone, water features, Zen restraint. You mostly meet Dana through the bottle; a visit is a unicorn.",
    wines: [
      { name: "Lotus Vineyard Cabernet Sauvignon", why: "The 2007 earned Robert Parker's 100 points — instant cult status." },
      { name: "Helms & Hershey Vineyard Cabernets", why: "The other single-vineyard jewels, all Melka-made." }
    ],
    history: [
      { y: 1883, t: "The original stone winery rises in Rutherford; Prohibition eventually silences it like so many others." },
      { y: 2005, t: "Hi Sang Lee — who built Korea's fine-wine market importing Bordeaux — buys the property to build his own first growth." },
      { y: 2010, t: "Backen & Gillam's restoration marries the 1883 stone to serene modern pavilions; Parker's 100-point score for the '07 Lotus arrives the same era." }
    ],
    storyTags: ["architecture", "resurrected", "site-reuse"],
    awards: ["100-point 2007 Lotus Vineyard Cabernet (Robert Parker)", "Featured in 'The New Architecture of Wine'"],
    funFact: "'Dana' is Sanskrit for 'the spirit of generosity' — ironic branding for one of the hardest tasting appointments in the valley."
  },

  {
    slug: "darioush", name: "Darioush", valley: "Napa", ava: "Napa Valley (Silverado Trail south)",
    founded: 1997, founder: "Darioush & Shahpar Khaledi (Iranian-American grocery magnate)",
    address: "4240 Silverado Trail, Napa, CA 94558", lat: 38.3450, lng: -122.2950,
    website: "https://www.darioush.com",
    owner: "Khaledi family", group: "Independent (Khaledi family)",
    priceRange: [48, 195], tastingFee: "$75–$250",
    tours: "Yes — signature tastings amid the columns; private Persian-inspired hospitality experiences",
    vibeTags: ["Grand", "Showpiece", "Modern"],
    vibe: "Sixteen freestanding travertine columns straight out of Persepolis announce the most audaciously personal building in Napa — a Persian palace of golden stone, fountains, and lavish hospitality. Maximalist and proud.",
    wines: [
      { name: "Darioush Signature Cabernet Sauvignon", why: "The estate flagship — plush, exotic, unmistakably labeled with the winged Persian motif." },
      { name: "Darius II", why: "The limited crown bottling named for the ancient king." }
    ],
    history: [
      { y: 1979, t: "Darioush Khaledi emigrates from Iran after the revolution; he builds L.A.'s K.V. Mart grocery empire from one store." },
      { y: 1997, t: "He buys land on the Silverado Trail to honor Shiraz — the Persian city of poets and, by name at least, of wine." },
      { y: 2004, t: "The visitor center opens: 12,000 square feet of Iranian-quarried travertine, its columns echoing Persepolis. Nothing in Napa looks remotely like it." }
    ],
    storyTags: [],
    awards: ["One of the most photographed winery buildings in America", "Signature Cabernet a fixture on luxury lists"],
    funFact: "The travertine was cut from the same Iranian quarries used for Persepolis itself, shipped block by block to California."
  },

  {
    slug: "clos-du-val", name: "Clos du Val", valley: "Napa", ava: "Stags Leap District",
    founded: 1972, founder: "John Goelet (American shipping heir) & Bordeaux winemaker Bernard Portet",
    address: "5330 Silverado Trail, Napa, CA 94558", lat: 38.3750, lng: -122.3050,
    website: "https://www.closduval.com",
    owner: "Goelet Wine Estates (3rd generation)", group: "Independent (Goelet family)",
    priceRange: [40, 200], tastingFee: "$60–$125",
    tours: "Yes — tastings at the Hirondelle House overlooking the estate; cabana experiences in summer",
    vibeTags: ["Classic", "Modern", "Intimate"],
    vibe: "French-accented Stags Leap classicism: a vine-draped winery, olive groves, and the airy modern Hirondelle House (2018) looking over the estate. One of Napa's quiet blue-chips — twice a Judgment of Paris story.",
    wines: [
      { name: "Estate Cabernet Sauvignon, Stags Leap District", why: "The Hirondelle Vineyard flagship — restrained, French-styled Napa Cab since 1972." },
      { name: "Three Graces", why: "The top Bordeaux blend, named for the label's dancing figures." }
    ],
    history: [
      { y: 1970, t: "John Goelet sends young Bordelais Bernard Portet on a two-year world search for perfect Cabernet land; he picks Stags Leap." },
      { y: 1976, t: "Clos du Val's very first vintage (1972) is chosen for the Judgment of Paris." },
      { y: 1986, t: "At the 10th-anniversary rematch, the 1972 Clos du Val places FIRST — proof California's win aged well." },
      { y: 2018, t: "Still Goelet-owned, the estate opens the glassy Hirondelle House hospitality home — quiet modernization without a sale." }
    ],
    storyTags: ["judgment-of-paris"],
    awards: ["Winner, 1986 Judgment of Paris 10th-anniversary rematch (1972 Cabernet)", "Original 1976 Judgment of Paris selection"],
    funFact: "'Hirondelle' means swallow — the birds that wheel over the vineyard each evening gave the estate vineyard and house their names."
  },

  {
    slug: "round-pond", name: "Round Pond Estate", valley: "Napa", ava: "Rutherford",
    founded: 2002, founder: "The MacDonnell family (Rutherford landowners since the 1980s)",
    address: "875 Rutherford Rd, Rutherford, CA 94573", lat: 38.4650, lng: -122.4150,
    website: "https://www.roundpond.com",
    owner: "MacDonnell family", group: "Independent (MacDonnell family)",
    priceRange: [40, 150], tastingFee: "$75–$185 (food-driven experiences)",
    tours: "Yes — winery tastings, garden-to-table experiences, and tours of the olive mill across the road",
    vibeTags: ["Casual", "Showpiece", "Family-run"],
    vibe: "The Rutherford estate that's as much about the table as the glass: terrace tastings over the vines, a serious olive-oil mill, gardens supplying the food program. Sunny, generous, epicurean.",
    wines: [
      { name: "Rutherford Estate Cabernet Sauvignon", why: "Classic 'Rutherford dust' Cabernet from the valley floor." },
      { name: "Kith & Kin Cabernet", why: "The friendly younger sibling; the estate olive oils are the other 'flagship.'" }
    ],
    history: [
      { y: 1983, t: "The MacDonnells begin farming in Rutherford, selling grapes to top houses." },
      { y: 2002, t: "The family starts bottling under its own name and builds the estate winery; the olive mill (one of few true mills in Napa) opens across the road." },
      { y: 2010, t: "Il Pranzo lunches and garden tastings make Round Pond a byword for Napa food-and-wine hospitality." }
    ],
    storyTags: [],
    awards: ["Estate olive oils among California's most awarded", "A top-rated Napa hospitality experience year after year"],
    funFact: "Round Pond is one of the few Napa wineries where the olive oil tasting is booked as hard as the Cabernet."
  },

  {
    slug: "v-sattui", name: "V. Sattui Winery", valley: "Napa", ava: "St. Helena",
    founded: 1885, founder: "Vittorio Sattui (Genoese immigrant, San Francisco); revived by great-grandson Dario Sattui",
    address: "1111 White Ln, St. Helena, CA 94574", lat: 38.4895, lng: -122.4735,
    website: "https://www.vsattui.com",
    owner: "Sattui family (Dario Sattui)", group: "Independent (Sattui family)",
    priceRange: [20, 95], tastingFee: "$30–$60; walk-ins welcome",
    tours: "Yes — plus the legendary deli, cheese shop, and two acres of picnic grounds; barrel cellar tastings",
    vibeTags: ["Casual", "Historic", "Family-run"],
    vibe: "Napa's great picnic institution: a stone winery with an artisan deli, crowds of happy day-trippers on the lawn, and wine sold nowhere else on earth. Zero pretension, maximum salami.",
    wines: [
      { name: "Morisoli Vineyard Cabernet Sauvignon", why: "The serious Rutherford single-vineyard star of a huge, direct-only lineup." },
      { name: "Madeira & Gamay Rouge", why: "Cult-followed oddballs that only exist because V. Sattui answers to no distributor." }
    ],
    history: [
      { y: 1885, t: "Vittorio Sattui opens his winery in San Francisco's Mission District, delivering wine by horse cart." },
      { y: 1920, t: "Prohibition closes the family business; it stays dormant for over half a century." },
      { y: 1976, t: "Great-grandson Dario Sattui — broke, sleeping in a van by some accounts — resurrects the name in St. Helena with a winery, deli and picnic ground; the direct-to-consumer model is revolutionary." },
      { y: 2007, t: "Dario's medieval obsession culminates in Castello di Amorosa, the 107-room Tuscan castle he built up-valley as a separate winery." }
    ],
    storyTags: ["resurrected"],
    awards: ["Routinely among the most-awarded wineries at California state & county fairs", "Sells 100% direct — no stores, no restaurants, since 1976"],
    funFact: "You cannot buy V. Sattui in any shop or restaurant anywhere — a deliberate choice since 1976 that made the picnic grounds a pilgrimage."
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
  },

  {
    slug: "rams-gate", name: "Ram's Gate Winery", valley: "Sonoma", ava: "Los Carneros (Sonoma side)",
    founded: 2011, founder: "Partners incl. Jeff O'Neill, on the old Roche winery site",
    address: "28700 Arnold Dr, Sonoma, CA 95476", lat: 38.2250, lng: -122.4550,
    website: "https://www.ramsgatewinery.com",
    owner: "Private partnership", group: "Independent (partnership)",
    priceRange: [45, 120], tastingFee: "$65–$150 (food pairings)",
    tours: "Yes — seated food-and-wine tastings around the open-hearth great room and terraces",
    vibeTags: ["Modern", "Showpiece"],
    architect: "Backen & Gillam Architects (Howard Backen)", bookSection: "The New Agrarian",
    vibe: "The gateway winery of wine country — first stop over the hill from San Francisco — built by Howard Backen as a weathered-wood compound that throws its walls open to Carneros wind and fog. Chef-driven tastings, big sky.",
    wines: [
      { name: "Sonoma Coast Pinot Noir", why: "Cool-climate single-vineyard Pinots are the house strength." },
      { name: "Estate Chardonnay & sparkling", why: "Carneros classics done in a polished modern register." }
    ],
    history: [
      { y: 1989, t: "The Roche family winery opens on this windswept hill at the Carneros gateway." },
      { y: 2011, t: "Ram's Gate rises on the site — Backen's barn-modern showpiece with a culinary program from day one." }
    ],
    storyTags: ["architecture", "site-reuse"],
    awards: ["Featured in 'The New Architecture of Wine'"],
    funFact: "The name nods to the rams of the old Carneros sheep ranches — 'carneros' is Spanish for rams."
  },

  {
    slug: "macrostie", name: "MacRostie Winery & Vineyards", valley: "Sonoma", ava: "Russian River Valley",
    founded: 1987, founder: "Steve MacRostie",
    address: "4605 Westside Rd, Healdsburg, CA 95448", lat: 38.5650, lng: -122.8850,
    website: "https://www.macrostiewinery.com",
    owner: "MacRostie family", group: "Independent (MacRostie family)",
    priceRange: [25, 68], tastingFee: "$40–$70",
    tours: "Yes — seated tastings in the glass Estate House with 360° vineyard views; walk-ins when space allows",
    vibeTags: ["Modern", "Casual"],
    architect: "Gould Evans (Douglas Thornley)", bookSection: "The New Agrarian",
    vibe: "A glass-walled hilltop pavilion on Westside Road where the building all but disappears into vines and sky — bright, friendly, Chardonnay-first hospitality without a hint of stuffiness.",
    wines: [
      { name: "Sonoma Coast Chardonnay", why: "The benchmark of Steve MacRostie's balanced, bright house style since 1987." },
      { name: "Wildcat Mountain Vineyard Chardonnay & Pinot", why: "From his own high, wind-blasted estate vineyard." }
    ],
    history: [
      { y: 1987, t: "Steve MacRostie, a Sonoma Chardonnay believer through the oaky-butter era, founds his label on restraint." },
      { y: 1998, t: "Plants Wildcat Mountain in the teeth of Petaluma Gap wind." },
      { y: 2015, t: "The Gould Evans Estate House opens — one of Sonoma's first truly contemporary tasting buildings." }
    ],
    storyTags: ["architecture"],
    awards: ["Featured in 'The New Architecture of Wine'"],
    funFact: "The Estate House deliberately has no 'front' — every side is glass, so the vineyard is the architecture."
  },

  {
    slug: "occidental", name: "Occidental Wines", valley: "Sonoma", ava: "Sonoma Coast (Freestone-Occidental)",
    founded: 2011, founder: "Steve Kistler (of Kistler Vineyards fame)",
    address: "Bodega Hwy, Freestone/Occidental, CA (by appointment)", lat: 38.3600, lng: -122.9500,
    website: "https://www.occidentalwines.com",
    owner: "Steve Kistler & daughters", group: "Independent (Kistler family)",
    priceRange: [70, 150], tastingFee: "By appointment only",
    tours: "Rare appointment-only visits at the coastal winery",
    vibeTags: ["Modern", "Intimate"],
    architect: "Nielsen:Schuh Architects", bookSection: "Grasses + Oaks, Glass + Steel",
    vibe: "Steve Kistler's second act: a quiet timber-and-glass winery in the fog belt a few miles from the Pacific, built solely for estate Pinot Noir. Monastic, coastal, hard to get into — the connoisseur's Sonoma.",
    wines: [
      { name: "Freestone-Occidental Pinot Noir", why: "The estate calling card — taut, cool-climate Pinot from the true Sonoma Coast." },
      { name: "SWK & Bodega Headlands Cuvées", why: "The top family-vineyard selections." }
    ],
    history: [
      { y: 2011, t: "After four decades defining California Chardonnay at Kistler, Steve Kistler goes all-in on coastal Pinot under the Occidental name." },
      { y: 2017, t: "The Nielsen:Schuh winery completes among redwoods and pasture — agriculture-modern, nearly invisible from the road." }
    ],
    storyTags: ["architecture"],
    awards: ["Featured in 'The New Architecture of Wine'", "Perennial 95+ critic scores for the estate Pinots"],
    funFact: "Kistler planted the vineyards with his own massale selections carried over from decades of favorite vines — a life's work re-rooted five miles from the ocean."
  },

  {
    slug: "hamel", name: "Hamel Family Wines", valley: "Sonoma", ava: "Sonoma Valley / Moon Mountain",
    founded: 2006, founder: "George Hamel Jr. & family",
    address: "15401 Sonoma Hwy, Sonoma, CA 95476", lat: 38.3150, lng: -122.4750,
    website: "https://www.hamelfamilywines.com",
    owner: "Hamel family", group: "Independent (Hamel family)",
    priceRange: [60, 250], tastingFee: "$95–$200, by appointment",
    tours: "Yes — seated estate tastings on the terrace and in the cave; biodynamically farmed estate",
    vibeTags: ["Modern", "Intimate", "Family-run"],
    architect: "Gould Evans", bookSection: "Sustainability + Love of the Land",
    vibe: "A low-slung modern estate of rammed earth, steel and glass gazing across Sonoma Valley — with serious biodynamic farming behind the style. Polished second-generation hospitality.",
    wines: [
      { name: "Isthmus", why: "The signature Sonoma Valley red blend." },
      { name: "Nuns Canyon Vineyard Cabernet & Zinfandel", why: "From their volcanic Moon Mountain estate vineyard." }
    ],
    history: [
      { y: 2006, t: "The Hamels buy their first Sonoma Valley vineyard land." },
      { y: 2014, t: "The Gould Evans estate winery opens; the family converts everything to certified biodynamic farming." }
    ],
    storyTags: ["architecture"],
    awards: ["Featured in 'The New Architecture of Wine'", "Demeter-certified biodynamic estate"],
    funFact: "The tasting terrace was oriented to frame the Mayacamas gap where afternoon light pours into Sonoma Valley — the architects designed around a time of day."
  },

  {
    slug: "donum", name: "The Donum Estate", valley: "Sonoma", ava: "Los Carneros (Sonoma side)",
    founded: 2001, founder: "Anne Moller-Racke (spun out of Buena Vista's Carneros estate)",
    address: "24500 Ramal Rd, Sonoma, CA 95476", lat: 38.2300, lng: -122.4200,
    website: "https://www.thedonumestate.com",
    owner: "Allan & Mei Warburg (Winside/Bestseller fashion fortune)", group: "Independent (Warburg family)",
    priceRange: [90, 200], tastingFee: "$150–$300, strictly by appointment",
    tours: "Yes — art-and-wine estate tours past 50+ monumental sculptures, ending in the Donum Home tasting pavilion",
    vibeTags: ["Modern", "Showpiece", "Intimate"],
    architect: "Matt Hollis Architects (Donum Home)", bookSection: "Singular Voices",
    vibe: "The world's largest accessible private sculpture collection — Ai Weiwei's zodiac heads, Louise Bourgeois, Anish Kapoor, Yayoi Kusama — scattered across 200 Carneros acres of Pinot. Wine-country visiting as art pilgrimage.",
    wines: [
      { name: "Carneros Estate Pinot Noir", why: "Single-block, low-yield Pinots that built the 'Donum = grand cru Carneros' reputation." },
      { name: "West Slope & Angel Camp Pinots", why: "The estate's other prized vineyards (Carneros & Anderson Valley)." }
    ],
    history: [
      { y: 2001, t: "When Buena Vista's corporate owner sells the brand, viticulturist Anne Moller-Racke keeps the great Carneros vineyard and founds Donum ('gift' in Latin) — a lineage link to California's oldest winery." },
      { y: 2011, t: "Danish entrepreneurs Allan & Mei Warburg acquire the estate and begin installing museum-scale sculpture among the vines." },
      { y: 2021, t: "The Donum Home tasting pavilion by Matt Hollis opens — glass, travertine and vineyard horizon." }
    ],
    storyTags: ["architecture"],
    awards: ["Featured in 'The New Architecture of Wine'", "50+ monumental works — among the world's great private sculpture parks"],
    funFact: "Donum's vineyard was Buena Vista's prized Carneros ranch — so the flashiest new estate in Sonoma is, by soil, a direct descendant of its oldest."
  },

  {
    slug: "williams-selyem", name: "Williams Selyem", valley: "Sonoma", ava: "Russian River Valley",
    founded: 1981, founder: "Burt Williams (pressman) & Ed Selyem (wine-shop clerk) — garage winemakers",
    address: "7227 Westside Rd, Healdsburg, CA 95448", lat: 38.5450, lng: -122.8700,
    website: "https://www.williamsselyem.com",
    owner: "John & Kathe Dyson (since 1998)", group: "Independent (Dyson family)",
    priceRange: [45, 165], tastingFee: "List members / by appointment",
    tours: "Appointment tastings, heavily favoring the famous mailing list",
    vibeTags: ["Classic", "Intimate"],
    architect: "Alex Ceppi / D.arc Group (estate winery, 2010s)", bookSection: "Singular Voices",
    vibe: "The original California cult Pinot — born in a garage, allocated by a decades-long waiting list. The curved, timber-vaulted estate winery on Westside Road finally gave the legend a home worthy of the fruit.",
    wines: [
      { name: "Rochioli Riverblock Pinot Noir", why: "The Rochioli-Williams Selyem axis defined Russian River Pinot greatness." },
      { name: "Westside Road Neighbors Pinot Noir", why: "A blend from the fabled Westside Road vineyards." }
    ],
    history: [
      { y: 1981, t: "Williams and Selyem start making Pinot in a Forestville garage under a gentleman's-agreement of total quality." },
      { y: 1987, t: "Their 1985 Rochioli Pinot wins the California State Fair sweepstakes — the garage wine beats everyone; the waiting list is born." },
      { y: 1998, t: "New York farmer-politician John Dyson buys the label, keeping the cult ethos while finally building an estate." },
      { y: 2011, t: "The D.arc Group gravity-flow winery opens — its laminated-timber vault inspired by an upturned boat hull." }
    ],
    storyTags: ["architecture", "consolidated"],
    awards: ["Featured in 'The New Architecture of Wine'", "The 1985 Rochioli Pinot: the wine that launched RRV Pinot mania"],
    funFact: "For years the 'winery' was a rented garage with a hand-painted sign reading 'Hacienda del Rio' — collectors now pay four figures for those early bottles."
  },

  {
    slug: "kistler", name: "Kistler Vineyards", valley: "Sonoma", ava: "Russian River Valley",
    founded: 1978, founder: "Steve Kistler & Mark Bixler",
    address: "Trenton Roadhouse, 4707 Trenton-Healdsburg Rd, Forestville, CA 95436", lat: 38.4950, lng: -122.8650,
    website: "https://www.kistlervineyards.com",
    owner: "Kistler family & Bill Price (Price Family Vineyards)", group: "Independent (Kistler/Price)",
    priceRange: [90, 200], tastingFee: "$150+, by appointment (allocation-list priority)",
    tours: "Appointment-only tastings at the Trenton Roadhouse",
    vibeTags: ["Classic", "Intimate"],
    architect: "Architectural Resources Group (Trenton Roadhouse)", bookSection: "History Reenvisioned",
    vibe: "California's most storied Chardonnay house, tasted in a lovingly restored century-old roadhouse — history re-envisioned rather than replaced. Hushed, allocation-list territory.",
    wines: [
      { name: "Les Noisetiers Chardonnay", why: "The 'entry' to a lineup that redefined single-vineyard California Chardonnay." },
      { name: "Kistler Vineyard & McCrea Chardonnays", why: "The single-vineyard legends, Burgundian in method, Sonoman in soul." }
    ],
    history: [
      { y: 1978, t: "Kistler and Bixler start with one goal: Burgundy-serious Chardonnay from Sonoma hillsides." },
      { y: 1990, t: "Through the 90s Kistler becomes the cult Chardonnay of America — one clone, native yeasts, no shortcuts." },
      { y: 2008, t: "Bill Price (Three Sticks, ex-TPG) takes a stake to steward succession; winemaker Jason Kesner later succeeds Steve." },
      { y: 2015, t: "The restored Trenton Roadhouse opens for the label's first real hospitality — a 1910s building given new life." }
    ],
    storyTags: ["architecture", "site-reuse"],
    awards: ["Featured in 'The New Architecture of Wine'", "Standard-setter for single-vineyard California Chardonnay"],
    funFact: "Kistler famously uses a single Chardonnay selection across all its vineyards — the differences you taste are pure dirt."
  },

  {
    slug: "medlock-ames", name: "Medlock Ames", valley: "Sonoma", ava: "Alexander Valley (Bell Mountain)",
    founded: 1998, founder: "Christopher Medlock James & Ames Morison (college friends)",
    address: "3487 Alexander Valley Rd, Healdsburg, CA 95448", lat: 38.6550, lng: -122.8200,
    website: "https://www.medlockames.com",
    owner: "Christopher James & Ames Morison", group: "Independent (James & Morison)",
    priceRange: [30, 95], tastingFee: "$40–$85",
    tours: "Yes — ranch tastings among gardens and oaks at Bell Mountain; the 1906 general-store tasting room pours in town",
    vibeTags: ["Casual", "Modern", "Family-run"],
    architect: "Wade Design Architects", bookSection: "History Reenvisioned",
    vibe: "A 338-acre organic ranch where more land is wild than planted — vegetable gardens, olive trees, chickens — plus a restored 1906 country store (with a speakeasy-style bar behind it). Farm-first Sonoma idealism.",
    wines: [
      { name: "Bell Mountain Cabernet Sauvignon", why: "Estate-grown organic Cab from red volcanic soils." },
      { name: "Bell Mountain Sauvignon Blanc", why: "The fresh, garden-party counterpart." }
    ],
    history: [
      { y: 1998, t: "Two friends — one finance, one farming — buy Bell Mountain ranch vowing to farm organically and leave most of it wild." },
      { y: 2012, t: "They restore the 1906 Alexander Valley general store as their tasting room, keeping the community post office boxes." },
      { y: 2020, t: "Wade Design's ranch hospitality buildings knit new architecture into the working farm." }
    ],
    storyTags: ["architecture", "site-reuse"],
    awards: ["Featured in 'The New Architecture of Wine'", "Certified organic farming; ranch conservation easements"],
    funFact: "Behind the general store's back door hides 'The Bar at Medlock Ames' — a locals' cocktail bar using the farm's garden produce, in what was the old barbershop."
  },

  {
    slug: "la-crema-saralee", name: "La Crema Estate at Saralee's Vineyard", valley: "Sonoma", ava: "Russian River Valley",
    founded: 1979, founder: "La Crema founded 1979; estate home is Richard's Grove & Saralee's Vineyard",
    address: "3575 Slusser Rd, Windsor, CA 95492", lat: 38.4850, lng: -122.7950,
    website: "https://www.lacrema.com",
    owner: "Jackson Family Wines (since 1993)", group: "Jackson Family Wines",
    priceRange: [25, 70], tastingFee: "$35–$65",
    tours: "Yes — tastings in the converted 1900s barn; vineyard views, bocce and lawn games",
    vibeTags: ["Casual", "Historic", "Showpiece"],
    architect: "BraytonHughes Design Studios (barn renovation)", bookSection: "History Reenvisioned",
    vibe: "A beloved 1900s hop-country barn — once the social heart of Saralee Kunde's famous vineyard — reborn as La Crema's estate home. Approachable Pinot and Chardonnay in genuinely historic agricultural bones.",
    wines: [
      { name: "Saralee's Vineyard Chardonnay", why: "From the estate's own storied Russian River vineyard." },
      { name: "Sonoma Coast Pinot Noir", why: "The bottling that made La Crema a national by-the-glass staple." }
    ],
    history: [
      { y: 1979, t: "La Crema Viñera founded in Petaluma as a Burgundian-method specialist." },
      { y: 1993, t: "A struggling La Crema is bought by Jess Jackson — becoming one of Jackson Family Wines' engines." },
      { y: 2016, t: "The renovated Saralee's Vineyard barn opens as the estate tasting home, preserving a Russian River landmark." }
    ],
    storyTags: ["architecture", "site-reuse", "consolidated"],
    awards: ["Featured in 'The New Architecture of Wine'"],
    funFact: "Saralee Kunde was such a legendary Sonoma host that the barn came with its own parade float storage — the estate kept her hospitality tradition, minus the float."
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
  "GI Partners (Far Niente Wine Estates)": "Private equity firm GI Partners took majority ownership of the Far Niente family of wineries (Far Niente, Nickel & Nickel, Dolce, EnRoute, Bella Union) in 2016, with the Nickel family retaining a stake.",
  "PlumpJack Group": "The Getty–Newsom hospitality group (yes, that Newsom — California's governor co-founded it as a wine shop in 1992) grew into PlumpJack, CADE and Odette wineries plus hotels and restaurants.",
  "Trinchero Family Estates": "The family that bought shuttered Sutter Home in 1948 and invented White Zinfandel in 1975 is now one of the world's largest family-owned wine companies (~50 brands); Trinchero Napa Valley is its luxury flagship."
};

const STORY_TAG_LABELS = {
  "resurrected": { label: "Resurrected", desc: "Wineries that died — to Prohibition, phylloxera, earthquake, or corporate neglect — and were brought back to life." },
  "site-reuse": { label: "Reused historic space", desc: "Wineries operating in (or restored around) the buildings, cellars and caves of an older winery." },
  "consolidated": { label: "Consolidated", desc: "Independents absorbed into corporate groups — the defining business story of modern Napa & Sonoma." },
  "judgment-of-paris": { label: "Judgment of Paris", desc: "Connected to the 1976 blind tasting in Paris where California beat France and changed wine forever." },
  "architecture": { label: "New Architecture", desc: "Featured in Heather Sandy Hebert's 'The New Architecture of Wine: 25 Spectacular California Wineries' (2019) — the definitive survey of wine country's contemporary design wave." }
};
