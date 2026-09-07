import { create } from 'zustand'

export const THEMES = {
  oceanic: { label: 'Oceanic', accent: '#7dc3f2', warm: '#b1dafa', border: 'rgba(125,195,242,.32)' },
  desert: { label: 'Desert', accent: '#f6bd79', warm: '#fbd8aa', border: 'rgba(246,189,121,.32)' },
  threat: { label: 'Threat', accent: '#f49e9e', warm: '#ffd0d0', border: 'rgba(244,158,158,.32)' },
  forest: { label: 'Forest', accent: '#88d6ac', warm: '#b7ecd0', border: 'rgba(136,214,172,.32)' },
  ghost: { label: 'Ghost', accent: '#c0aaef', warm: '#e0d4fa', border: 'rgba(192,170,239,.32)' },
}
const defaults = { activeTheme: 'oceanic', motionEnabled: true, pursuitEnabled: true, cursorEnabled: false }
function readPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem('aero-display-v1') || '{}')
    return Object.fromEntries(Object.entries(defaults).map(([key, value]) => [key,
      key === 'activeTheme' ? Object.hasOwn(THEMES, saved[key]) ? saved[key] : value : typeof saved[key] === 'boolean' ? saved[key] : value]))
  } catch { return defaults }
}
export const useUIStore = create(set => ({
  ...readPreferences(), hudVisible: false, sourcesVisible: false,
  activeSection: 'intro', activeEra: 'era-origins', scrollProgress: 0,
  setTheme: theme => { if (Object.hasOwn(THEMES, theme)) set({ activeTheme: theme }) },
  setPreference: (key, value) => { if (['motionEnabled', 'pursuitEnabled', 'cursorEnabled'].includes(key) && typeof value === 'boolean') set({ [key]: value }) },
  toggleHUD: () => set(state => ({ hudVisible: !state.hudVisible, sourcesVisible: false })),
  closeHUD: () => set({ hudVisible: false }),
  setSourcesVisible: value => set({ sourcesVisible: value, hudVisible: false }),
  setActiveSection: value => set(state => state.activeSection === value ? state : { activeSection: value }),
  setActiveEra: value => set(state => state.activeEra === value ? state : { activeEra: value }),
  setScrollProgress: value => set(state => state.scrollProgress === value ? state : { scrollProgress: value }),
}))
useUIStore.subscribe((state, previous) => {
  const keys = Object.keys(defaults)
  if (!keys.some(key => state[key] !== previous[key])) return
  try { localStorage.setItem('aero-display-v1', JSON.stringify(Object.fromEntries(keys.map(key => [key, state[key]])))) } catch { /* Preferences still work when storage is unavailable. */ }
})
