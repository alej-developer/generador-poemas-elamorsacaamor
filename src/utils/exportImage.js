import { toPng } from 'html-to-image'

export async function exportAsImage(element, { fileName, width, height, fontSize }) {
  if (!element) return false

  if (document.fonts?.ready) {
    await document.fonts.ready
  }

  const clone = element.cloneNode(true)
  clone.querySelectorAll('[data-safe-zone]').forEach((node) => node.remove())
  clone.setAttribute('aria-hidden', 'true')
  Object.assign(clone.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: `${width}px`,
    height: `${height}px`,
    minHeight: '0',
    maxWidth: 'none',
    maxHeight: 'none',
    aspectRatio: 'auto',
    fontSize: `${fontSize}px`,
    margin: '0',
    transform: 'none',
    zIndex: '-1',
    pointerEvents: 'none',
  })

  document.body.appendChild(clone)

  try {
    const dataUrl = await toPng(clone, {
      cacheBust: true,
      pixelRatio: 1,
      width,
      height,
      canvasWidth: width,
      canvasHeight: height,
    })

    const link = document.createElement('a')
    link.download = `${fileName}.png`
    link.href = dataUrl
    link.click()
    return true
  } catch (error) {
    console.error('Error exportando imagen:', error)
    window.alert('No se pudo exportar la imagen. Inténtalo de nuevo.')
    return false
  } finally {
    clone.remove()
  }
}
