import { useEffect } from 'react'
import { useUIStore } from './store/uiStore'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Nav from './components/Nav'
import HUDOverlay from './components/HUDOverlay'
import Hero from './sections/Hero'
import Speed from './sections/Speed'
import Stealth from './sections/Stealth'
import Precision from './sections/Precision'
import Future from './sections/Future'
import './index.css'

export default function App() {
  const { activeMode, setActiveSection } = useUIStore()
  useSmoothScroll()

  // Sync data-mode attribute for CSS variable switching
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', activeMode)
  }, [activeMode])

  // Intersection-based section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <div style={{ background: 'var(--bg)', transition: 'background 0.6s ease' }}>
      <Nav />
      <HUDOverlay />
      <main>
        <Hero />
        <Speed />
        <Stealth />
        <Precision />
        <Future />
      </main>
    </div>
  )
}
