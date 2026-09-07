import { useEffect, useRef } from 'react'

export default function DisplayDialog({ id, open, onClose, title, eyebrow, children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const dialog = ref.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = previousOverflow }
  }, [open])
  return <dialog id={id} ref={ref} className="display-dialog" aria-labelledby={`${id}-title`} onCancel={onClose} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="display-dialog__inner" data-lenis-prevent>
      <header><div><span className="technical-label">{eyebrow}</span><h2 id={`${id}-title`}>{title}</h2></div><button className="dialog-close" onClick={onClose} aria-label={`Close ${title}`}>×</button></header>
      {children}
    </div>
  </dialog>
}
