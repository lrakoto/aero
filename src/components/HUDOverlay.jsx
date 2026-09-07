import { useUIStore, THEMES } from '../store/uiStore'
import DisplayDialog from './DisplayDialog'
import CursorReticle from './CursorReticle'

function Preference({ name, label, detail, disabled = false }) {
  const value = useUIStore(state => state[name])
  const setPreference = useUIStore(state => state.setPreference)
  return <label className={`display-preference${disabled ? ' is-disabled' : ''}`}><span><strong>{label}</strong><small>{detail}</small></span><input type="checkbox" role="switch" checked={value} disabled={disabled} onChange={event => setPreference(name, event.target.checked)}/><span className="display-switch" aria-hidden="true"/></label>
}
export default function HUDOverlay({ reduced, systemReduced }) {
  const sourcesOpen = useUIStore(state => state.sourcesVisible)
  const open = useUIStore(state => state.hudVisible)
  const close = useUIStore(state => state.closeHUD)
  const theme = useUIStore(state => state.activeTheme)
  const setTheme = useUIStore(state => state.setTheme)
  const cursor = useUIStore(state => state.cursorEnabled)
  const progress = useUIStore(state => state.scrollProgress)
  const activeEra = useUIStore(state => state.activeEra)
  return <>
    {cursor && !reduced && !open && !sourcesOpen && <div className="cursor-reticle-layer" aria-hidden="true"><CursorReticle/></div>}
    <DisplayDialog id="hud-dialog" open={open} onClose={close} eyebrow="AERO / DISPLAY SYSTEMS" title="Your flight environment">
      <p className="dialog-intro">Tune the atmosphere. Your display preferences are remembered on this device.</p>
      <fieldset className="theme-fieldset"><legend>Visual theme</legend><div className="theme-options">{Object.entries(THEMES).map(([id, colors]) => <label key={id}><input type="radio" name="aero-theme" value={id} checked={theme === id} onChange={() => setTheme(id)}/><span className="theme-chip" style={{ '--swatch': colors.accent }}><i/>{colors.label}<span className="theme-check" aria-hidden="true">✓</span></span></label>)}</div></fieldset>
      <div className="display-preferences"><Preference name="motionEnabled" label="Ambient motion" detail={systemReduced ? 'Your system’s reduced-motion setting takes priority.' : 'Ocean currents and smooth chapter transitions.'} disabled={systemReduced}/><Preference name="pursuitEnabled" label="Companion aircraft" detail="Follows your pointer, then settles while you read." disabled={reduced}/><Preference name="cursorEnabled" label="Precision cursor" detail="An optional reticle for mouse and trackpad." disabled={reduced}/></div>
      <div className="hud-reading"><div><span className="technical-label">READING PROGRESS</span><strong>{progress}%</strong></div><progress value={progress} max="100" aria-label="Reading progress"/><span>{activeEra.replace('era-', '').replaceAll('-', ' ').toUpperCase()}</span></div>
      <button className="aero-button aero-button--primary hud-done" onClick={close}>Return to the record <span aria-hidden="true">↗</span></button>
    </DisplayDialog>
  </>
}
