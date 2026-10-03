import { forwardRef } from 'react'
import { themes } from '../data/themes'
import { FORMATS, SIZE_SCALE, backgroundStyle } from '../data/options'
import { cn } from '../utils/cn'
import { publicUrl } from '../utils/publicUrl'

function formattedText(text) {
  return text.split('\n').map((line, index) => (
    <span key={index}>
      {line === '' ? <span className="block h-[0.85em]" /> : line}
      {line !== '' && <br />}
    </span>
  ))
}

function Atmosphere({ theme }) {
  const texture = theme.texture ? (
    <div
      className="absolute inset-0"
      style={{
        opacity: theme.textureOpacity ?? 0.4,
        backgroundImage: `url("${publicUrl(`textures/${theme.texture}.svg`)}")`,
      }}
    />
  ) : null

  return (
    <>
      {texture}
      {theme.atmosphere === 'gold-glow' && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #d4af37 0%, transparent 60%)',
            mixBlendMode: 'overlay',
          }}
        />
      )}
      {theme.atmosphere === 'ethereal' && (
        <>
          <div className="absolute -left-[20%] -top-[20%] h-[16em] w-[16em] rounded-full bg-indigo-500 opacity-40 mix-blend-screen blur-[100px]" />
          <div className="absolute -bottom-[10%] -right-[10%] h-[14em] w-[14em] rounded-full bg-violet-700 opacity-30 mix-blend-screen blur-[90px]" />
        </>
      )}
      {theme.atmosphere === 'neon' && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff71ce]/10 via-transparent to-[#01cdfe]/10" />
      )}
      {theme.atmosphere === 'impressionism' && (
        <>
          <div className="absolute -left-[10%] -top-[10%] h-[16em] w-[16em] rounded-full bg-[#b2dfdb] opacity-70 mix-blend-multiply blur-[40px]" />
          <div className="absolute -bottom-[10%] -right-[10%] h-[16em] w-[16em] rounded-full bg-[#c8e6c9] opacity-70 mix-blend-multiply blur-[40px]" />
          <div className="absolute right-[10%] top-[30%] h-[12em] w-[12em] rounded-full bg-[#ffcdd2] opacity-40 mix-blend-multiply blur-[50px]" />
        </>
      )}
      {theme.atmosphere === 'surrealism' && (
        <>
          <div className="absolute bottom-0 left-0 h-[40%] w-full bg-gradient-to-t from-[#ffb74d] to-transparent" />
          <div className="absolute right-[-10%] top-[20%] h-[16em] w-[8em] rotate-45 rounded-[100%] bg-[#ffcc80] opacity-60 mix-blend-multiply blur-[20px]" />
          <div className="absolute bottom-[10%] left-[20%] h-[3em] w-[12em] skew-x-12 rounded-[100%] bg-[#8d6e63] opacity-40 mix-blend-overlay blur-[10px]" />
        </>
      )}
      {theme.frame && (
        <>
          <div className="absolute left-[0.7em] top-[0.7em] h-[3em] w-[3em] border-l-2 border-t-2 border-[#5d4037] opacity-40" />
          <div className="absolute bottom-[0.7em] right-[0.7em] h-[3em] w-[3em] border-b-2 border-r-2 border-[#5d4037] opacity-40" />
        </>
      )}
    </>
  )
}

function BrandMark({ className }) {
  return (
    <div className={cn('pointer-events-none absolute inset-x-0 bottom-[0.7em] z-20 flex items-center justify-center gap-[0.4em] opacity-80', className)}>
      <img src={publicUrl('logo.svg')} alt="" className="h-[1.15em] w-[1.15em] rounded-[0.2em]" />
      <span className="font-['Cinzel'] text-[0.58em] uppercase tracking-[0.22em]">El Amor Saca Amor</span>
    </div>
  )
}

function TikTokZones() {
  return (
    <div data-safe-zone className="pointer-events-none absolute inset-0 z-50 flex flex-col justify-between border-2 border-red-500/50">
      <div className="flex h-[10%] w-full items-center justify-center border-b border-red-500/50 bg-red-500/20">
        <span className="text-[0.62em] font-bold uppercase tracking-widest text-white drop-shadow-md">Siguiendo / Para Ti</span>
      </div>
      <div className="flex flex-1 justify-end">
        <div className="flex h-full w-[18%] items-center justify-center border-l border-red-500/50 bg-red-500/20">
          <span className="rotate-90 whitespace-nowrap text-[0.62em] font-bold uppercase tracking-widest text-white drop-shadow-md">Iconos (Like, Guardar)</span>
        </div>
      </div>
      <div className="flex h-[20%] w-full items-center justify-center border-t border-red-500/50 bg-red-500/20">
        <span className="text-[0.62em] font-bold uppercase tracking-widest text-white drop-shadow-md">Descripción y audio</span>
      </div>
    </div>
  )
}

function StoryZones() {
  return (
    <div data-safe-zone className="pointer-events-none absolute inset-0 z-50 flex flex-col justify-between border-2 border-blue-500/50">
      <div className="flex h-[12%] w-full items-center justify-center border-b border-blue-500/50 bg-blue-500/20">
        <span className="text-[0.62em] font-bold uppercase tracking-widest text-white drop-shadow-md">Barra superior (perfil)</span>
      </div>
      <div className="flex h-[15%] w-full items-center justify-center border-t border-blue-500/50 bg-blue-500/20">
        <span className="text-[0.62em] font-bold uppercase tracking-widest text-white drop-shadow-md">Enviar mensaje / Like</span>
      </div>
    </div>
  )
}

const TemplateRenderer = forwardRef(function TemplateRenderer({
  text,
  author,
  styleTheme,
  format,
  showSafeZones,
  customFont,
  customColor,
  customSize,
  customBgColor,
  bgGradientIntensity,
  includeMark,
  textRef,
}, ref) {
  const theme = themes[styleTheme] || themes.dark_academia
  const spec = FORMATS[format] || FORMATS.instagram_post
  const sizeScale = SIZE_SCALE[customSize] ?? 1
  const sharedType = {
    ...(customColor && customColor !== 'default' ? { color: customColor } : {}),
    ...(customFont && customFont !== 'default' ? { fontFamily: `"${customFont}", serif` } : {}),
  }

  return (
    <div
      ref={ref}
      data-canvas="preview"
      className={cn(
        'relative mx-auto flex overflow-hidden p-[2.5em] shadow-2xl transition-all duration-300',
        spec.previewClass,
        theme.container,
      )}
      style={{
        minHeight: spec.minHeight,
        fontSize: '16px',
        ...(theme.insetShadow
          ? { boxShadow: `${theme.insetShadow}, 0 25px 50px -12px rgb(0 0 0 / 0.25)` }
          : {}),
        ...backgroundStyle(customBgColor, bgGradientIntensity),
      }}
    >
      <Atmosphere theme={theme} />

      <div
        className={cn(
          'relative z-10 flex h-full w-full flex-col',
          theme.align === 'start' ? 'items-start justify-center' : 'items-center justify-center',
          includeMark && 'pb-[1.8em]',
        )}
      >
        <div
          ref={textRef}
          className={cn('max-h-[78%] overflow-hidden', theme.text)}
          style={{ ...sharedType, fontSize: `${theme.textEm * sizeScale}em` }}
        >
          {formattedText(text)}
        </div>

        {author && (
          <p className={cn('z-10 mt-[1.15em]', theme.author)} style={{ ...sharedType, fontSize: `${theme.authorEm}em` }}>
            {author}
          </p>
        )}
      </div>

      {includeMark && <BrandMark className={theme.mark} />}
      {showSafeZones && format === 'tiktok' && <TikTokZones />}
      {showSafeZones && format === 'instagram_story' && <StoryZones />}
    </div>
  )
})

export default TemplateRenderer
