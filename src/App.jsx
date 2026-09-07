import { useEffect } from 'react'
import { MotionConfig, useReducedMotion } from 'framer-motion'
import { useUIStore, THEMES } from './store/uiStore'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import AmbientBackground from './components/AmbientBackground'
import PursuitAircraft from './components/PursuitAircraft'
import EraProgress from './components/EraProgress'
import SourcesDrawer from './components/SourcesDrawer'
import Nav from './components/Nav'
import HUDOverlay from './components/HUDOverlay'
import Intro from './sections/Intro'
import Timeline from './sections/Timeline'
import './index.css'

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
      const current = sections.filter(section => section.getBoundingClientRect().top <= threshold).at(-1) || sections[0]
      const state = useUIStore.getState()
      state.setActiveSection(current.id)
      if (current.id !== 'intro') state.setActiveEra(current.id)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      state.setScrollProgress(maxScroll > 0 ? Math.min(100, Math.round(window.scrollY / maxScroll * 100)) : 0)
    }
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(main)
    schedule()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [])

  return <MotionConfig reducedMotion={reduced ? 'always' : 'user'}>
    <div className="app-shell">
      <a className="skip-link" href="#era-origins">Skip to the historical record</a>
      <AmbientBackground enabled={!reduced && !paused}/>
      <PursuitAircraft enabled={!reduced && !paused && pursuitEnabled}/>
      <Nav/>
      <HUDOverlay reduced={reduced} systemReduced={Boolean(systemReduced)}/>
      <EraProgress/>
      <SourcesDrawer/>
      <main><Intro reduced={reduced}/><Timeline reduced={reduced}/></main>
    </div>
  </MotionConfig>
}
