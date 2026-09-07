import test from 'node:test'
import assert from 'node:assert/strict'

let revision = 0
async function loadStore(saved) {
  let persisted = saved
  let writes = 0
  globalThis.localStorage = {
    getItem: () => persisted,
    setItem: (_key, value) => { persisted = value; writes++ },
  }
  const { useUIStore } = await import(`../src/store/uiStore.js?test=${revision++}`)
  return { store: useUIStore, persisted: () => JSON.parse(persisted), writes: () => writes }
}

test('restores valid preferences and rejects malformed values', async () => {
  const { store } = await loadStore(JSON.stringify({ activeTheme: 'ghost', motionEnabled: false, cursorEnabled: 'false', hudVisible: true }))
  assert.equal(store.getState().activeTheme, 'ghost')
  assert.equal(store.getState().motionEnabled, false)
  assert.equal(store.getState().cursorEnabled, false)
  assert.equal(store.getState().hudVisible, false)
})

test('corrupt or unavailable storage does not prevent controls from working', async () => {
  const { store } = await loadStore('{broken')
  assert.equal(store.getState().activeTheme, 'oceanic')
  globalThis.localStorage.setItem = () => { throw new Error('Storage blocked') }
  store.getState().setTheme('desert')
  assert.equal(store.getState().activeTheme, 'desert')
  store.getState().setTheme('unknown')
  assert.equal(store.getState().activeTheme, 'desert')
})

test('persists only display preferences, without writes on scroll', async () => {
  const { store, writes, persisted } = await loadStore('{}')
  store.getState().setScrollProgress(40)
  store.getState().setActiveSection('era-cold-war')
  assert.equal(writes(), 0)
  store.getState().setPreference('pursuitEnabled', false)
  assert.equal(writes(), 1)
  assert.deepEqual(Object.keys(persisted()).sort(), ['activeTheme', 'cursorEnabled', 'motionEnabled', 'pursuitEnabled'])
  assert.equal(persisted().pursuitEnabled, false)
  store.getState().setPreference('hudVisible', true)
  assert.equal(store.getState().hudVisible, false)
})

test('the sources and display dialogs are mutually exclusive', async () => {
  const { store } = await loadStore('{}')
  store.getState().toggleHUD()
  store.getState().setSourcesVisible(true)
  assert.equal(store.getState().hudVisible, false)
  assert.equal(store.getState().sourcesVisible, true)
  store.getState().toggleHUD()
  assert.equal(store.getState().hudVisible, true)
  assert.equal(store.getState().sourcesVisible, false)
})
