export const ERA_DATA = {
  Origins: {
    index: 0,
    dateRange: '1912 – 1939',
    aircraft: 'LOCKHEED VEGA',
    tagline: 'Built in a circus tent. Flew into history.',
    description:
      'The Loughead brothers begin with nothing but ambition and a rented workshop. Within two decades, their aircraft carry the first woman across the Atlantic solo and set speed records on every continent.',
  },
  Wartime: {
    index: 1,
    dateRange: '1940 – 1945',
    aircraft: 'P-38 LIGHTNING',
    tagline: 'War compresses decades of innovation into years.',
    description:
      'The pressure of global conflict accelerates everything. Kelly Johnson establishes Skunk Works — a small, empowered team that will define rapid aerospace prototyping for the next century.',
  },
  'Cold War': {
    index: 2,
    dateRange: '1947 – 1972',
    aircraft: 'SR-71 BLACKBIRD',
    tagline: 'Faster than the missiles they send after you.',
    description:
      'The superpower standoff demands engineering at extremes. Spy planes that fly above the reach of weapons. Programs so classified they don\'t officially exist. The SR-71 outran every threat ever fired at it.',
  },
  'Stealth Era': {
    index: 3,
    dateRange: '1974 – 1991',
    aircraft: 'F-117 NIGHTHAWK',
    tagline: 'The best radar cross-section is no radar cross-section.',
    description:
      'A classified revolution in how aircraft are designed — radar signature first, aerodynamics second. The F-117 is so aerodynamically unstable it requires a fly-by-wire computer just to stay airborne.',
  },
  'Modern Era': {
    index: 4,
    dateRange: '1991 – Present',
    aircraft: 'F-35 LIGHTNING II',
    tagline: 'A fighter. A network node. A flying supercomputer.',
    description:
      'The convergence of stealth, supersonics, and software-defined systems. Designed to be the most capable — and the most connected — combat aircraft ever fielded.',
  },
}

export const MILESTONES = [
  {
    year: 1912,
    era: 'Origins',
    title: 'Alco Hydro-Aeroplane Company',
    category: 'FOUNDING',
    description:
      'Allan and Malcolm Loughead found the Alco Hydro-Aeroplane Company in Santa Barbara, California — the seed of what will become one of the most consequential aerospace companies in history. Their first aircraft, the Model G seaplane, carries paying passengers over San Francisco Bay.',
    detail: 'The Loughead brothers (later Americanized to "Lockheed") represent a generation of self-taught aviation pioneers who built the industry from first principles.',
  },
  {
    year: 1926,
    era: 'Origins',
    title: 'Lockheed Aircraft Company',
    category: 'FOUNDING',
    description:
      'The Lockheed Aircraft Company is re-incorporated in Hollywood, California by Allan Loughead and engineer John Northrop. With $25,000 in capital, they begin work on a sleek wooden monoplane that will change the perception of what a civil aircraft can be.',
    detail: 'John Northrop\'s influence in this era is often overlooked — he later founded Northrop Aircraft, another pillar of the defense industry.',
  },
  {
    year: 1927,
    era: 'Origins',
    title: 'Vega — Speed Redefined',
    category: 'AVIATION',
    description:
      'The Lockheed Vega enters service, setting a new standard for civil aviation. Its streamlined spruce monocoque fuselage and cantilever wing are decades ahead of contemporaries. Record-breaking pilots gravitate to it immediately.',
    detail: 'The Vega\'s revolutionary construction — no external bracing, a smooth stressed-skin shell — directly influenced how aircraft would be built for the next 30 years.',
  },
  {
    year: 1932,
    era: 'Origins',
    title: 'Amelia Earhart — Solo Atlantic',
    category: 'AVIATION',
    description:
      'Amelia Earhart completes the first solo transatlantic flight by a woman, flying a Lockheed Vega 5B from Harbour Grace, Newfoundland to Culmore, Northern Ireland in 14 hours 56 minutes. The aircraft is now in the Smithsonian.',
    detail: 'Earhart\'s Vega 5B is painted bright red — an irony for a plane flown through fog and darkness across 2,000 miles of open ocean.',
  },
  {
    year: 1943,
    era: 'Wartime',
    title: 'Skunk Works — Division Founded',
    category: 'CORPORATE',
    description:
      'Kelly Johnson establishes the Advanced Development Projects division under strict secrecy inside a rented circus tent adjacent to a plastics factory in Burbank. The informal name "Skunk Works" — borrowed from a moonshine factory in the comic strip Li\'l Abner — sticks permanently.',
    detail: 'Kelly Johnson\'s "14 Rules" of management, written to govern Skunk Works, remain studied in business schools today: small teams, minimal bureaucracy, direct access to the program manager, fast iteration.',
  },
  {
    year: 1944,
    era: 'Wartime',
    title: 'P-80 Shooting Star',
    category: 'FIGHTER',
    description:
      'The XP-80 is designed, built, and test-flown in 143 days — a record that still defines rapid prototyping in aerospace. It becomes America\'s first operational jet fighter, producing 3,810 units and establishing the template for the jet age.',
    detail: 'The 143-day turnaround from contract to first flight is achieved with a team of just 23 engineers. Johnson\'s team worked in a single large room with no formal org chart.',
  },
  {
    year: 1954,
    era: 'Cold War',
    title: 'U-2 Dragon Lady',
    category: 'RECONNAISSANCE',
    description:
      'The U-2 makes its first flight, capable of sustained cruise above 70,000 feet — beyond the reach of Soviet interceptors and missiles of the era. It provides the CIA with unmatched photographic intelligence during the most dangerous years of the Cold War.',
    detail: 'The U-2 was designed in 8 months. Its glider-like 80ft wingspan and 15,000 ft/min climb rate are engineering contradictions — a spy plane that flies like a sailplane.',
  },
  {
    year: 1956,
    era: 'Cold War',
    title: 'F-104 Starfighter',
    category: 'FIGHTER',
    description:
      'The F-104 enters service as the world\'s first Mach 2-capable operational fighter. Its wing is so thin and sharp that ground crews required protective covers to avoid lacerations. Lockheed called it "the missile with a man in it."',
    detail: 'The F-104\'s wings are only 3.4 inches thick at the root. Engineers debated whether it was a fighter with wings or a rocket that happened to be piloted.',
  },
  {
    year: 1964,
    era: 'Cold War',
    title: 'SR-71 Blackbird — First Flight',
    category: 'RECONNAISSANCE',
    description:
      'The SR-71 Blackbird makes its first flight. It will go on to set every speed record for a manned air-breathing aircraft — records that still stand today. At Mach 3.2, the fuselage heats to over 300°C; the aircraft is assembled with room to expand. It leaks fuel on the ground.',
    detail: 'The SR-71 was so fast it outran every missile ever fired at it — over 1,000 attempts during operational service. The pilot\'s response to a launch was simply to accelerate.',
  },
  {
    year: 1968,
    era: 'Cold War',
    title: 'C-5 Galaxy — First Flight',
    category: 'TRANSPORT',
    description:
      'The C-5 Galaxy enters the world as the largest military transport aircraft ever built at the time. Its cargo hold can accommodate two M1 Abrams tanks side by side. It introduces kneeling landing gear that lowers the cargo floor to truck-bed height for loading.',
    detail: 'The C-5\'s nose cargo door was a first — it swings up entirely to allow straight-through loading. Combined with the rear door, vehicles can drive in one end and out the other.',
  },
  {
    year: 1977,
    era: 'Stealth Era',
    title: 'Have Blue — Stealth Demonstrator',
    category: 'STEALTH',
    description:
      'The Have Blue technology demonstrator makes its first flight — a classified program so secret it doesn\'t officially exist. Its faceted, angular surfaces are designed entirely around radar cross-section reduction rather than aerodynamic efficiency. It is genuinely invisible to radar.',
    detail: 'Have Blue was so aerodynamically unstable it required a fly-by-wire computer to keep it airborne. The software was more important than the airframe.',
  },
  {
    year: 1981,
    era: 'Stealth Era',
    title: 'F-117 Nighthawk',
    category: 'STEALTH',
    description:
      'The F-117 Nighthawk makes its first flight. The world\'s first operational stealth aircraft, it carries no radar of its own — emitting any radiation would defeat its purpose. It relies entirely on passive sensors and pre-planned routing. Publicly revealed only in 1988.',
    detail: 'The F-117\'s radar cross-section is approximately that of a large bird. Its faceted shape was dictated entirely by the limitations of 1970s computer modeling — rounder shapes are aerodynamically better but computationally intractable at the time.',
  },
  {
    year: 1991,
    era: 'Stealth Era',
    title: 'YF-22 Wins ATF Competition',
    category: 'FIGHTER',
    description:
      'The YF-22 defeats Northrop\'s YF-23 in the Advanced Tactical Fighter competition. It will become the F-22 Raptor — a fighter combining supercruise (sustained Mach 1.5+ without afterburner), supermaneuverability, advanced avionics, and low observability into a single airframe for the first time.',
    detail: 'Many analysts believe the YF-23 was technically superior. The YF-22 won on program management, cost projections, and a more conservative risk profile — a reminder that procurement is as much business as engineering.',
  },
  {
    year: 1995,
    era: 'Modern Era',
    title: 'Lockheed Martin Formed',
    category: 'CORPORATE',
    description:
      'Lockheed Corporation merges with Martin Marietta to form Lockheed Martin — the largest defense contractor in the world. The combined entity brings together Skunk Works stealth pedigree with Martin\'s satellite, space launch, and missile capabilities.',
    detail: 'The merger was driven by the post-Cold War "Last Supper" — a 1993 Pentagon meeting where DoD officials told defense CEOs to consolidate or lose contracts. The industry shrank from dozens of major players to essentially four.',
  },
  {
    year: 2006,
    era: 'Modern Era',
    title: 'F-35 Lightning II — First Flight',
    category: 'FIGHTER',
    description:
      'The F-35A makes its first flight, beginning the most ambitious — and most scrutinized — weapons program in history. Three variants share 80% of components: conventional takeoff (A), carrier (C), and short takeoff/vertical landing (B). It is designed to be a network node as much as a fighter.',
    detail: 'The F-35\'s helmet-mounted display projects sensor fusion from the aircraft\'s 360° sensor array, giving the pilot what is described as the ability to "look through" the airframe in any direction.',
  },
  {
    year: 2013,
    era: 'Modern Era',
    title: 'SR-72 — Hypersonic Successor Announced',
    category: 'RECONNAISSANCE',
    description:
      'Lockheed Martin\'s Skunk Works confirms development of the SR-72, an unmanned hypersonic reconnaissance and strike platform targeting Mach 6. Where the Blackbird outran missiles by being faster, the SR-72 aims to compress the decision timeline to the point where response becomes impossible.',
    detail: 'At Mach 6, the SR-72 would cross the continental United States in under 30 minutes. The engineering challenge shifts from materials science to thermal management — and to guidance systems capable of operating inside a plasma sheath.',
  },
]

export const ERAS = [...new Set(MILESTONES.map((m) => m.era))]

export const CATEGORY_COLORS = {
  FOUNDING:       { color: '#90cdf4', bg: 'rgba(144,205,244,0.08)' },
  AVIATION:       { color: '#68d391', bg: 'rgba(104,211,145,0.08)' },
  FIGHTER:        { color: '#fc8181', bg: 'rgba(252,129,129,0.08)' },
  RECONNAISSANCE: { color: '#63b3ed', bg: 'rgba(99,179,237,0.08)' },
  STEALTH:        { color: '#b794f4', bg: 'rgba(183,148,244,0.08)' },
  TRANSPORT:      { color: '#f6ad55', bg: 'rgba(246,173,85,0.08)' },
  CORPORATE:      { color: '#4a5568', bg: 'rgba(74,85,104,0.08)' },
}
