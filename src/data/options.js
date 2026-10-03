export const FONT_FAMILIES = [
  { id: 'default', label: 'Fuente del tema' },
  { id: 'Cormorant Garamond', label: 'Elegante (Garamond)' },
  { id: 'Playfair Display', label: 'Clásica (Playfair)' },
  { id: 'Cinzel', label: 'Antigua (Cinzel)' },
  { id: 'Great Vibes', label: 'Cursiva (Vibes)' },
  { id: 'Caveat', label: 'Manuscrita (Caveat)' },
  { id: 'Special Elite', label: 'Máquina (Elite)' },
  { id: 'Montserrat', label: 'Moderna (Montserrat)' },
]

export const FONT_COLORS = [
  { id: 'default', label: 'Por defecto', swatch: 'bg-gradient-to-r from-gray-400 to-gray-600' },
  { id: '#ffffff', label: 'Blanco puro', swatch: 'bg-white border border-gray-300' },
  { id: '#000000', label: 'Negro tinta', swatch: 'bg-black' },
  { id: '#09090b', label: 'Negro profundo', swatch: 'bg-[#09090b]' },
  { id: '#eaddcf', label: 'Papel crema', swatch: 'bg-[#eaddcf]' },
  { id: '#d4af37', label: 'Oro clásico', swatch: 'bg-[#d4af37]' },
  { id: '#ff71ce', label: 'Rosa neón', swatch: 'bg-[#ff71ce]' },
  { id: '#bf360c', label: 'Terracota', swatch: 'bg-[#bf360c]' },
  { id: '#0f172a', label: 'Azul noche', swatch: 'bg-[#0f172a]' },
]

export const SIZE_SCALE = {
  sm: 0.8,
  md: 1,
  lg: 1.3,
  xl: 1.6,
}

export const FORMATS = {
  instagram_post: {
    id: 'instagram_post',
    label: 'Post 4:5',
    sub: 'Instagram',
    previewClass: 'aspect-[4/5] w-full max-w-[450px]',
    minHeight: 560,
    exportWidth: 1080,
    exportHeight: 1350,
    exportFontSize: 38,
  },
  tiktok: {
    id: 'tiktok',
    label: 'TikTok 9:16',
    sub: 'Carrusel / video',
    previewClass: 'aspect-[9/16] w-full max-w-[350px]',
    minHeight: 700,
    exportWidth: 1080,
    exportHeight: 1920,
    exportFontSize: 49,
  },
  instagram_story: {
    id: 'instagram_story',
    label: 'Story 9:16',
    sub: 'Instagram',
    previewClass: 'aspect-[9/16] w-full max-w-[350px]',
    minHeight: 700,
    exportWidth: 1080,
    exportHeight: 1920,
    exportFontSize: 49,
  },
}

export const THEME_CHOICES = [
  { id: 'renaissance', name: 'El Renacimiento (Da Vinci)', desc: 'Papel pergamino, tonos sepia y tinta.' },
  { id: 'impressionism', name: 'El Impresionista (Monet)', desc: 'Luz suave, pasteles difuminados, óleo.' },
  { id: 'surrealism', name: 'El Surrealista (Dalí)', desc: 'Desierto cálido, tiempo distorsionado.' },
  { id: 'dark_academia', name: 'Dark Academia', desc: 'Serifa elegante, fondo profundo y oro.' },
  { id: 'ethereal', name: 'Romance Etéreo', desc: 'Nebulosa oscura, tonos índigo y brillo.' },
  { id: 'vintage', name: 'Máquina de Escribir', desc: 'Papel envejecido y fuente de máquina.' },
  { id: 'neon_romance', name: 'Neón Melancólico', desc: 'Letra cursiva brillante sobre negro absoluto.' },
  { id: 'minimalist', name: 'Minimalista', desc: 'Limpio, negro y fuente sans-serif fina.' },
]

export function backgroundStyle(color, intensity) {
  if (!color || color === 'default') return {}
  if (intensity > 0) {
    return {
      background: `linear-gradient(135deg, ${color} ${100 - intensity}%, #000000 100%)`,
    }
  }
  return { background: color }
}

export function lineCount(text) {
  if (!text) return 0
  return text.split('\n').length
}
