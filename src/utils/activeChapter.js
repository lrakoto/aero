// The active chapter is the last one whose top edge has crossed the threshold line.
export function pickActiveChapter(chapters, threshold) {
  return chapters.filter(chapter => chapter.top <= threshold).at(-1) || chapters[0]
}

export function scrollPercent(scrollY, maxScroll) {
  return maxScroll > 0 ? Math.min(100, Math.round(scrollY / maxScroll * 100)) : 0
}
