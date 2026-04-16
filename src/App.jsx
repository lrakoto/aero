import { useEffect } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useUIStore, THEMES } from './store/uiStore'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Nav from './components/Nav'
import HUDOverlay from './components/HUDOverlay'
import Intro from './sections/Intro'
import Timeline from './sections/Timeline'
import './index.css'

export default function App() {
  const { activeTheme, setActiveSection, setScrollProgress } = useUIStore()
  useSmoothScroll()

  // Apply theme CSS variables whenever the theme changes
  useEffect(() => {
    const t = THEMES[activeTheme]
    const r = document.documentElement.style
    r.setProperty('--accent',        t.accent)
    r.setProperty('--accent-2',      t.warm)
    r.setProperty('--border-accent', t.border)
  }, [activeTheme])

  // Track overall page scroll progress for the HUD mission panel
  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setScrollProgress(Math.round(v * 100))
  })

  // Section tracking for HUD
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], div[id^="era-"]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <div style={{ background: 'var(--bg)' }}>
      <Nav />
      <HUDOverlay />
      <main>
        <Intro />
        <Timeline />
      </main>
    </div>
  )
}
