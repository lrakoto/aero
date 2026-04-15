import { create } from 'zustand'

export const useUIStore = create((set) => ({
  activeMode: 'default', // 'default' | 'speed' | 'stealth' | 'precision'
  hudVisible: false,
  activeSection: 'hero',

  setMode: (mode) => set({ activeMode: mode }),
  toggleHUD: () => set((state) => ({ hudVisible: !state.hudVisible })),
  setActiveSection: (section) => set({ activeSection: section }),
}))
