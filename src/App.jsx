import { useEffect } from 'react'
import { useUIStore } from './store/uiStore'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Nav from './components/Nav'
import HUDOverlay from './components/HUDOverlay'
import Intro from './sections/Intro'
import Timeline from './sections/Timeline'
import './index.css'

export default function App() {
  const { activeMode, setActiveSection } = useUIStore()
  useSmoothScroll()

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', activeMode)
  }, [activeMode])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
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
    <div style={{ background: 'var(--bg)', transition: 'background 0.6s ease' }}>
      <Nav />
      <HUDOverlay />
      <main>
        <Intro />
        <Timeline />
      </main>
    </div>
  )
}
