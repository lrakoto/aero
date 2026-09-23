import { Suspense, lazy, useEffect } from 'react'
import { LazyMotion, MotionConfig, domAnimation, useReducedMotion } from 'framer-motion'
import { useUIStore, THEMES } from './store/uiStore'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import AmbientBackground from './components/AmbientBackground'
import EraProgress from './components/EraProgress'
import SourcesDrawer from './components/SourcesDrawer'
import Nav from './components/Nav'
import HUDOverlay from './components/HUDOverlay'
import Intro from './sections/Intro'
import Timeline from './sections/Timeline'
import { pickActiveChapter, scrollPercent } from './utils/activeChapter'
import './index.css'

const PursuitAircraft = lazy(() => import('./components/PursuitAircraft'))

export default function App() {
  const theme = useUIStore(state => state.activeTheme)
  const motionEnabled = useUIStore(state => state.motionEnabled)
  const pursuitEnabled = useUIStore(state => state.pursuitEnabled)
  const hudVisible = useUIStore(state => state.hudVisible)
  const sourcesVisible = useUIStore(state => state.sourcesVisible)
  const systemReduced = useReducedMotion()
  const reduced = Boolean(systemReduced || !motionEnabled)
  const paused = hudVisible || sourcesVisible
  useSmoothScroll(!reduced, paused)

  useEffect(() => {
    const colors = THEMES[theme]
    const style = document.documentElement.style
    style.setProperty('--accent', colors.accent)
    style.setProperty('--accent-2', colors.warm)
    style.setProperty('--border-accent', colors.border)
  }, [theme])
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'
    return () => { delete document.documentElement.dataset.motion }
  }, [reduced])
  useEffect(() => {
    const sections = [...document.querySelectorAll('[data-chapter]')]
    const main = document.querySelector('main')
    let frame
    const update = () => {
      frame = undefined
      const threshold = window.innerHeight * .38
      const current = pickActiveChapter(sections.map(section => ({ id: section.id, top: section.getBoundingClientRect().top })), threshold)
      const state = useUIStore.getState()
      state.setActiveSection(current.id)
      if (current.id !== 'intro') state.setActiveEra(current.id)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      state.setScrollProgress(scrollPercent(window.scrollY, maxScroll))
    }
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(main)
    schedule()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [])

  return <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion={reduced ? 'always' : 'user'}>
    <div className="app-shell">
      <a className="skip-link" href="#era-origins">Skip to the historical record</a>
      <AmbientBackground enabled={!reduced && !paused}/>
      <Suspense fallback={null}><PursuitAircraft enabled={!reduced && !paused && pursuitEnabled}/></Suspense>
      <Nav/>
      <HUDOverlay reduced={reduced} systemReduced={Boolean(systemReduced)}/>
      <EraProgress/>
      <SourcesDrawer/>
      <main><Intro reduced={reduced}/><Timeline reduced={reduced}/></main>
    </div>
  </MotionConfig></LazyMotion>
}
