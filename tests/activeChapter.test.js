import test from 'node:test'
import assert from 'node:assert/strict'
import { pickActiveChapter, scrollPercent } from '../src/utils/activeChapter.js'

const chapters = [
  { id: 'intro', top: -900 },
  { id: 'era-origins', top: -200 },
  { id: 'era-wartime', top: 300 },
  { id: 'era-cold-war', top: 1400 },
]

test('picks the last chapter whose top has crossed the threshold', () => {
  assert.equal(pickActiveChapter(chapters, 380).id, 'era-wartime')
  assert.equal(pickActiveChapter(chapters, 250).id, 'era-origins')
})

test('falls back to the first chapter before any has crossed', () => {
  const unscrolled = chapters.map(chapter => ({ ...chapter, top: chapter.top + 2000 }))
  assert.equal(pickActiveChapter(unscrolled, 380).id, 'intro')
})

test('scroll progress is a clamped whole percentage', () => {
  assert.equal(scrollPercent(0, 1000), 0)
  assert.equal(scrollPercent(333, 1000), 33)
  assert.equal(scrollPercent(1200, 1000), 100)
  assert.equal(scrollPercent(50, 0), 0)
})
