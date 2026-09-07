export const AIRCRAFT_NOTES = {
  Origins: { model: 'VEGA', source: 'https://airandspace.si.edu/collection-objects/lockheed-vega-5b-amelia-earhart/nasm_A19670093000', notes: [
    { part: 'airframe', label: 'Spruce monocoque', x: 50, y: 35, text: 'A smooth wooden shell carried the fuselage loads. The Vega’s streamlined construction helped reduce drag without a forest of external supports.' },
    { part: 'wing', label: 'Cantilever wing', x: 74, y: 49, text: 'The wing supported itself without external bracing. A cleaner shape gave record-setting pilots an efficient platform for long-distance flights.' },
  ] },
  Wartime: { model: 'P-38', source: 'https://www.nationalmuseum.af.mil/Visit/Museum-Exhibits/Fact-Sheets/Display/Article/196280/lockheed-p-38l-lightning/', notes: [
    { part: 'engines', label: 'Twin Allison engines', x: 28, y: 45, text: 'Two Allison V-1710 engines occupied separate booms. Turbo-supercharging helped maintain power at altitude, giving the Lightning its distinctive layout and high-altitude capability.' },
    { part: 'cockpit', label: 'Central nacelle', x: 50, y: 43, text: 'The pilot and nose-mounted armament occupied a central nacelle between the engines. The connecting wing and tailplane tied the twin-boom arrangement together.' },
  ] },
  'Cold War': { model: 'SR-71', source: 'https://www.nasa.gov/image-article/sr-71-takeoff-with-afterburner/', notes: [
    { part: 'airframe', label: 'Titanium airframe', x: 50, y: 25, text: 'Sustained high-speed flight creates intense aerodynamic heating. Titanium helped the Blackbird’s structure endure temperatures beyond the practical limits of conventional aluminum airframes.' },
    { part: 'engines', label: 'J58 propulsion', x: 75, y: 55, text: 'The Blackbird’s inlets and J58 engines formed an integrated propulsion system. Inlet spikes managed the incoming air before it reached the engines at supersonic speed.' },
  ] },
  'Stealth Era': { model: 'F-117', source: 'https://www.nationalmuseum.af.mil/Visit/Museum-Exhibits/Fact-Sheets/Display/Article/198056/lockheed-f-117a-nighthawk/', notes: [
    { part: 'airframe', label: 'Faceted surfaces', x: 33, y: 57, text: 'The angular surfaces redirect radar energy away from its source. Low observability makes detection more difficult; it does not make an aircraft invisible.' },
    { part: 'exhaust', label: 'Shielded exhaust', x: 50, y: 79, text: 'The exhaust arrangement helps manage the aircraft’s infrared signature. Shape, materials, and propulsion integration all contribute to its reduced observability.' },
  ] },
  'Modern Era': { model: 'F-35', source: 'https://www.af.mil/About-Us/Fact-Sheets/Display/Article/478441/f-35a-lightning-ii/', notes: [
    { part: 'cockpit', label: 'Sensor fusion', x: 50, y: 23, text: 'Sensor fusion combines information from multiple systems into a coordinated picture for the pilot. The helmet-mounted display makes that information available throughout the pilot’s field of view.' },
    { part: 'wing', label: 'Trapezoidal wing', x: 75, y: 58, text: 'The F-35A’s swept, trapezoidal wings are distinct from its aft horizontal stabilizers and canted vertical tails. The carrier-based F-35C uses a larger wing; this study shows the conventional-takeoff A variant.' },
  ] },
}
