import { create } from 'zustand'

export const THEMES = {
  oceanic: { label: 'OCEANIC', accent: '#63b3ed', warm: '#90cdf4', border: 'rgba(99,179,237,0.28)' },
  desert:  { label: 'DESERT',  accent: '#f6ad55', warm: '#fbd38d', border: 'rgba(246,173,85,0.28)' },
  threat:  { label: 'THREAT',  accent: '#fc8181', warm: '#feb2b2', border: 'rgba(252,129,129,0.28)' },
  forest:  { label: 'FOREST',  accent: '#68d391', warm: '#9ae6b4', border: 'rgba(104,211,145,0.28)' },
  ghost:   { label: 'GHOST',   accent: '#b794f4', warm: '#d6bcfa', border: 'rgba(183,148,244,0.28)' },
}

export const useUIStore = create((set) => ({
  activeTheme:    'oceanic',
  hudVisible:     false,
  activeSection:  'intro',
  activeEra:      '',
  scrollProgress: 0,

  setTheme:          (t) => set((state) => state.activeTheme === t ? state : { activeTheme: t }),
  toggleHUD:         ()  => set((s) => ({ hudVisible: !s.hudVisible })),
  setActiveSection:  (s) => set((state) => state.activeSection === s ? state : { activeSection: s }),
  setActiveEra:      (e) => set((state) => state.activeEra === e ? state : { activeEra: e }),
  setScrollProgress: (p) => set((state) => state.scrollProgress === p ? state : { scrollProgress: p }),
}))
