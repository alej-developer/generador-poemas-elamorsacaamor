import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import Header from './components/Header'
import EditorPanel from './components/EditorPanel'
import TemplateRenderer from './components/TemplateRenderer'
import { FORMATS } from './data/options'
import { exportAsImage } from './utils/exportImage'
import { cn, focusRing } from './utils/cn'

const INITIAL_POEM = 'El joven se puso a pensar, a pensar y a pensar...\n\nLuego movió la cabeza, se mordió los labios, bajo su\nmirada y dijo:\n\n-No. ¡Creo que no puedo hacerlo! ¡Y así le dijo NO a Dios!'

export default function App() {
  const [text, setText] = useState(INITIAL_POEM)
  const [author, setAuthor] = useState('#ArabiaDM')
  const [format, setFormat] = useState('instagram_post')
  const [theme, setTheme] = useState('renaissance')
  const [isExporting, setIsExporting] = useState(false)
  const [showSafeZones, setShowSafeZones] = useState(false)
  const [customFont, setCustomFont] = useState('default')
  const [customColor, setCustomColor] = useState('default')
  const [customBgColor, setCustomBgColor] = useState('default')
  const [bgGradientIntensity, setBgGradientIntensity] = useState(0)
  const [customSize, setCustomSize] = useState('md')
  const [includeMark, setIncludeMark] = useState(true)
  const [overflow, setOverflow] = useState(false)
  const [mobileView, setMobileView] = useState('edit')

  const templateRef = useRef(null)
  const textRef = useRef(null)
  const reportOverflow = useCallback((value) => {
    setOverflow((current) => (current === value ? current : value))
  }, [])

  useLayoutEffect(() => {
    const element = textRef.current
    if (!element) return undefined

    const check = () => {
      reportOverflow(element.scrollHeight > element.clientHeight + 2)
    }

    check()
    const observer = new ResizeObserver(check)
    observer.observe(element)
    let cancelled = false
    document.fonts?.ready?.then(() => {
      if (!cancelled) check()
    })

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [
    text,
    author,
    format,
    theme,
    customSize,
    customFont,
    customColor,
    includeMark,
    mobileView,
    reportOverflow,
  ])

  const handleExport = async () => {
    const spec = FORMATS[format]
    setIsExporting(true)
    await new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    })

    try {
      await exportAsImage(templateRef.current, {
        fileName: `poema-${theme}-${Date.now()}`,
        width: spec.exportWidth,
        height: spec.exportHeight,
        fontSize: spec.exportFontSize,
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col selection:bg-indigo-500/30">
      <Header isExporting={isExporting} onExport={handleExport} />

      <div className="flex border-b border-zinc-800 bg-zinc-950 lg:hidden">
        {[
          ['edit', 'Editar'],
          ['preview', 'Ver obra'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={mobileView === id}
            onClick={() => setMobileView(id)}
            className={cn(
              'flex-1 py-3 font-sans text-xs uppercase tracking-[0.16em]',
              focusRing,
              mobileView === id ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <main className="relative z-10 mx-auto flex w-full flex-1 flex-col overflow-hidden lg:flex-row">
          <div className={cn('flex min-h-0 w-full flex-col lg:w-[420px] lg:shrink-0', mobileView === 'preview' && 'max-lg:hidden')}>
            <EditorPanel
              text={text}
              setText={setText}
              author={author}
              setAuthor={setAuthor}
              customFont={customFont}
              setCustomFont={setCustomFont}
              customColor={customColor}
              setCustomColor={setCustomColor}
              customBgColor={customBgColor}
              setCustomBgColor={setCustomBgColor}
              bgGradientIntensity={bgGradientIntensity}
              setBgGradientIntensity={setBgGradientIntensity}
              customSize={customSize}
              setCustomSize={setCustomSize}
              format={format}
              setFormat={setFormat}
              showSafeZones={showSafeZones}
              setShowSafeZones={setShowSafeZones}
              theme={theme}
              setTheme={setTheme}
              includeMark={includeMark}
              setIncludeMark={setIncludeMark}
              overflow={overflow}
            />
          </div>

        <section
          className={cn(
            'relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-900 p-4 lg:p-8',
            mobileView === 'edit' && 'max-lg:hidden',
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-900 opacity-50" />
          <div className="relative flex h-full w-full items-center justify-center overflow-auto">
            <div className="flex w-full max-w-[500px] items-center justify-center">
              <TemplateRenderer
                ref={templateRef}
                textRef={textRef}
                text={text}
                author={author}
                styleTheme={theme}
                format={format}
                showSafeZones={showSafeZones}
                customFont={customFont}
                customColor={customColor}
                customSize={customSize}
                customBgColor={customBgColor}
                bgGradientIntensity={bgGradientIntensity}
                includeMark={includeMark}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
