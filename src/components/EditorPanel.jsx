import { Layout, Palette, Scaling, Smartphone, Type } from 'lucide-react'
import {
  FONT_COLORS,
  FONT_FAMILIES,
  FORMATS,
  THEME_CHOICES,
  lineCount,
} from '../data/options'
import { cn, focusRing } from '../utils/cn'

function ColorSwatches({ label, value, onChange, colors }) {
  return (
    <fieldset className="mt-2 flex flex-col items-start gap-2">
      <legend className="text-[10px] uppercase tracking-widest text-zinc-500">{label}</legend>
      <div className="flex w-full flex-wrap items-center gap-2">
        {colors.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => onChange(color.id)}
            title={color.label}
            aria-label={color.label}
            aria-pressed={value === color.id}
            className={cn(
              'h-6 w-6 rounded-full transition-all hover:scale-110',
              color.swatch,
              focusRing,
              value === color.id
                ? 'scale-110 ring-2 ring-zinc-300 ring-offset-2 ring-offset-zinc-950'
                : '',
            )}
          />
        ))}
        <label className="relative h-6 w-6">
          <span className="sr-only">Elegir otro color para {label.toLowerCase()}</span>
          <input
            type="color"
            value={value.startsWith('#') ? value : '#f4efe6'}
            onChange={(event) => onChange(event.target.value)}
            className={cn(
              'h-6 w-6 cursor-pointer rounded-full border border-zinc-700 bg-transparent p-0',
              focusRing,
              value.startsWith('#') && !colors.some((color) => color.id === value)
                ? 'ring-2 ring-zinc-300 ring-offset-2 ring-offset-zinc-950'
                : '',
            )}
          />
        </label>
      </div>
    </fieldset>
  )
}

function Toggle({ checked, onChange, label, description }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-zinc-800 bg-zinc-900 p-3">
      <span className="flex items-center gap-3">
        <Smartphone size={16} className="text-zinc-400" aria-hidden="true" />
        <span>
          <span className="block font-sans text-xs font-medium text-zinc-300">{label}</span>
          <span className="mt-0.5 block font-sans text-[10px] text-zinc-500">{description}</span>
        </span>
      </span>
      <span className="relative inline-flex items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          aria-label={label}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="relative h-5 w-9 rounded-full bg-zinc-800 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-zinc-300 after:transition-all peer-checked:bg-zinc-500 peer-checked:after:translate-x-full peer-focus-visible:ring-2 peer-focus-visible:ring-amber-200/80" />
      </span>
    </label>
  )
}

export default function EditorPanel({
  text,
  setText,
  author,
  setAuthor,
  customFont,
  setCustomFont,
  customColor,
  setCustomColor,
  customBgColor,
  setCustomBgColor,
  bgGradientIntensity,
  setBgGradientIntensity,
  customSize,
  setCustomSize,
  format,
  setFormat,
  showSafeZones,
  setShowSafeZones,
  theme,
  setTheme,
  includeMark,
  setIncludeMark,
  overflow,
}) {
  const lines = lineCount(text)
  const vertical = format === 'tiktok' || format === 'instagram_story'

  return (
    <aside className="custom-scrollbar flex h-full w-full flex-col gap-8 overflow-y-auto border-r border-zinc-800 bg-zinc-950 p-6">
      <section className="flex flex-col gap-4">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label htmlFor="poema" className="font-sans text-xs font-medium uppercase tracking-widest text-zinc-400">
              El texto
            </label>
            <span className="font-sans text-[10px] uppercase tracking-widest text-zinc-500">
              {lines} {lines === 1 ? 'línea' : 'líneas'}
            </span>
          </div>
          <textarea
            id="poema"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={6}
            className={cn(
              'w-full resize-none rounded-md border border-zinc-800 bg-zinc-900 p-4 font-serif text-base leading-[1.6] text-zinc-300 transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600',
              focusRing,
            )}
            placeholder="Escribe tu poema..."
          />
          {overflow && (
            <p role="status" className="mt-2 font-sans text-xs text-amber-200/90">
              El texto no cabe en este formato. Acórtalo o reduce el tamaño de la letra.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="firma" className="sr-only">La firma</label>
          <input
            id="firma"
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className={cn(
              'w-full rounded-md border border-zinc-800 bg-zinc-900 p-3 font-serif text-base italic text-zinc-300 transition-colors focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600',
              focusRing,
            )}
            placeholder="La Firma (Ej: #ArabiaDM)"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-zinc-800 pt-6">
        <h2 className="flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-widest text-zinc-400">
          <Type size={14} aria-hidden="true" /> Ajustes de tipografía y color
        </h2>

        <div className="flex items-center gap-3">
          <Scaling size={14} className="text-zinc-500" aria-hidden="true" />
          <div className="grid flex-1 grid-cols-4 gap-1 rounded-md border border-zinc-800 bg-zinc-900 p-1" role="group" aria-label="Tamaño del texto">
            {['sm', 'md', 'lg', 'xl'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setCustomSize(size)}
                aria-pressed={customSize === size}
                className={cn(
                  'rounded py-1 font-sans text-xs',
                  focusRing,
                  customSize === size ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300',
                )}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Type size={14} className="text-zinc-500" aria-hidden="true" />
          <label htmlFor="fuente" className="sr-only">Fuente</label>
          <select
            id="fuente"
            value={customFont}
            onChange={(event) => setCustomFont(event.target.value)}
            className={cn(
              'flex-1 rounded-md border border-zinc-800 bg-zinc-900 p-2 text-xs text-zinc-300 outline-none focus:border-zinc-600',
              focusRing,
            )}
          >
            {FONT_FAMILIES.map((font) => (
              <option key={font.id} value={font.id}>{font.label}</option>
            ))}
          </select>
        </div>

        <ColorSwatches label="Color del texto" value={customColor} onChange={setCustomColor} colors={FONT_COLORS} />
        <ColorSwatches label="Color del fondo" value={customBgColor} onChange={setCustomBgColor} colors={FONT_COLORS} />

        {customBgColor !== 'default' && (
          <div className="mt-1 flex flex-col gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 p-3">
            <div className="flex w-full items-center justify-between">
              <label htmlFor="degradado" className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">
                Intensidad del degradado
              </label>
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300">{bgGradientIntensity}%</span>
            </div>
            <input
              id="degradado"
              type="range"
              min="0"
              max="100"
              value={bgGradientIntensity}
              onChange={(event) => setBgGradientIntensity(Number.parseInt(event.target.value, 10))}
              className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700 accent-indigo-500"
            />
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4 border-t border-zinc-800 pt-6">
        <h2 className="mb-1 flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-widest text-zinc-400">
          <Layout size={14} aria-hidden="true" /> Plataforma (formato)
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(FORMATS).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFormat(item.id)}
              aria-pressed={format === item.id}
              className={cn(
                'flex flex-col items-center justify-center rounded-md border p-3 transition-all',
                focusRing,
                format === item.id
                  ? 'border-zinc-500 bg-zinc-800 text-zinc-100'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700',
              )}
            >
              <span className="font-sans text-xs font-semibold">{item.label}</span>
              <span className="mt-1 font-sans text-[9px] uppercase tracking-wider opacity-70">{item.sub}</span>
            </button>
          ))}
        </div>

        {vertical && (
          <Toggle
            checked={showSafeZones}
            onChange={setShowSafeZones}
            label="Zonas seguras"
            description="Evita que los botones tapen tu texto"
          />
        )}

        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-zinc-800 bg-zinc-900 p-3">
          <span>
            <span className="block font-sans text-xs font-medium text-zinc-300">Incluir marca</span>
            <span className="mt-0.5 block font-sans text-[10px] text-zinc-500">Añade el logotipo en la imagen exportada</span>
          </span>
          <span className="relative inline-flex items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={includeMark}
              aria-label="Incluir marca"
              onChange={(event) => setIncludeMark(event.target.checked)}
            />
            <span className="relative h-5 w-9 rounded-full bg-zinc-800 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-zinc-300 after:transition-all peer-checked:bg-zinc-500 peer-checked:after:translate-x-full peer-focus-visible:ring-2 peer-focus-visible:ring-amber-200/80" />
          </span>
        </label>
      </section>

      <section className="flex flex-col gap-3 border-t border-zinc-800 pt-6">
        <h2 className="mb-1 flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-widest text-zinc-400">
          <Palette size={14} aria-hidden="true" /> Estética poética y arte
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {THEME_CHOICES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTheme(item.id)}
              aria-pressed={theme === item.id}
              className={cn(
                'rounded-md border p-3 text-left transition-all duration-200',
                focusRing,
                theme === item.id
                  ? 'border-zinc-500 bg-zinc-800 shadow-md'
                  : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50',
              )}
            >
              <span className={cn('block font-serif text-sm', theme === item.id ? 'text-zinc-100' : 'text-zinc-300')}>
                {item.name}
              </span>
              <span className={cn('mt-1 block font-sans text-[10px]', theme === item.id ? 'text-zinc-400' : 'text-zinc-500')}>
                {item.desc}
              </span>
            </button>
          ))}
        </div>
      </section>
    </aside>
  )
}
