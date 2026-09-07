import { useUIStore } from '../store/uiStore'

export default function Nav() {
  const hudVisible = useUIStore(state => state.hudVisible)
  const toggleHUD = useUIStore(state => state.toggleHUD)
  const setSourcesVisible = useUIStore(state => state.setSourcesVisible)
  const progress = useUIStore(state => state.scrollProgress)
  return <header className="aero-nav">
    <div className="aero-nav__inner">
      <a href="#intro" className="aero-wordmark" aria-label="Aero, back to introduction"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><polygon points="12,2 22,20 2,20" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v8" stroke="currentColor"/></svg><strong>AERO</strong><span>HISTORICAL RECORD</span></a>
      <nav aria-label="Primary navigation" className="aero-nav__links"><a href="#era-origins">The record</a><button onClick={() => setSourcesVisible(true)}>Sources <span aria-hidden="true">↗</span></button><button className="hud-trigger" onClick={toggleHUD} aria-haspopup="dialog" aria-expanded={hudVisible} aria-controls="hud-dialog"><span className="hud-status"/>HUD <span aria-hidden="true">+</span></button></nav>
    </div>
    <div className="nav-scroll-track" aria-hidden="true"><span style={{ transform: `scaleX(${progress / 100})` }}/></div>
  </header>
}
