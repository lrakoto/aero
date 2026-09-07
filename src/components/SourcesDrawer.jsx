import { useUIStore } from '../store/uiStore'
import DisplayDialog from './DisplayDialog'

const SOURCES = [
  {
    label: 'LOCKHEED MARTIN // CORPORATE HISTORY',
    href: 'https://www.lockheedmartin.com/en-us/news/features/history.html',
  },
  {
    label: 'LOCKHEED MARTIN // 80 YEARS OF SKUNK WORKS',
    href: 'https://www.lockheedmartin.com/en-us/news/features/2023/80-years-of-skunk-works-innovation.html',
  },
  {
    label: 'SMITHSONIAN // EARHART LOCKHEED VEGA 5B',
    href: 'https://airandspace.si.edu/collection-objects/lockheed-vega-5b-amelia-earhart/nasm_A19670093000',
  },
  {
    label: 'CIA // THE U-2’S FIRST FLIGHT',
    href: 'https://www.cia.gov/stories/story/area-51-and-the-accidental-test-flight/',
  },
  {
    label: 'NASA // SR-71 BLACKBIRD',
    href: 'https://www.nasa.gov/image-article/sr-71-takeoff-with-afterburner/',
  },
  {
    label: 'LOCKHEED MARTIN // F-117 NIGHTHAWK',
    href: 'https://www.lockheedmartin.com/en-us/news/features/history/f-117.html',
  },
  {
    label: 'U.S. AIR FORCE // C-5M SUPER GALAXY',
    href: 'https://www.af.mil/About-Us/Fact-Sheets/Display/Article/1529718/c-5-abc-galaxy-and-c-5m-super-galaxy/',
  },
  {
    label: 'U.S. AIR FORCE // F-35A LIGHTNING II',
    href: 'https://www.af.mil/About-Us/Fact-Sheets/Display/Article/478441/f-35a-lightning-ii/',
  },
]

export default function SourcesDrawer() {
  const open = useUIStore(state => state.sourcesVisible)
  const setOpen = useUIStore(state => state.setSourcesVisible)
  return <DisplayDialog id="sources-dialog" open={open} onClose={() => setOpen(false)} eyebrow="AERO / REFERENCE ARCHIVE" title="Grounded in history">
    <p className="dialog-intro">Institutional references behind this selective historical record. Each milestone also links to a relevant source.</p>
    <ol className="reference-list">{SOURCES.map((source, index) => <li key={source.href}><span>0{index + 1}</span><a href={source.href} target="_blank" rel="noreferrer">{source.label.replace(' // ', ' · ')} <span aria-hidden="true">↗</span></a></li>)}</ol>
    <p className="reference-note">Independent educational visualization. Aircraft schematics are illustrative, not engineering drawings. Lockheed Martin names and marks belong to their respective owner.</p>
  </DisplayDialog>
}
