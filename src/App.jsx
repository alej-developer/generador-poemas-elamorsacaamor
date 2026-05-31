import { useState, useRef } from 'react'
import { Download, Layout, Palette, PenTool, Smartphone, Type, Droplets, Scaling } from 'lucide-react'
import TemplateRenderer from './components/TemplateRenderer'
import { exportAsImage } from './utils/exportImage'

function App() {
  const [text, setText] = useState('El joven se puso a pensar, a pensar y a pensar...\n\nLuego movió la cabeza, se mordió los labios, bajo su\nmirada y dijo:\n\n-No. ¡Creo que no puedo hacerlo! ¡Y así le dijo NO a Dios!')
  const [author, setAuthor] = useState('#ArabiaDM')
  const [format, setFormat] = useState('instagram_post')
  const [theme, setTheme] = useState('renaissance')
  const [isExporting, setIsExporting] = useState(false)
  const [showSafeZones, setShowSafeZones] = useState(false)
  
  // Custom Typography states
  const [customFont, setCustomFont] = useState('default')
  const [customColor, setCustomColor] = useState('default')
  const [customBgColor, setCustomBgColor] = useState('default')
  const [customSize, setCustomSize] = useState('md')

  const templateRef = useRef(null)

  const handleExport = async () => {
    const wasSafeZoneActive = showSafeZones;
    if (wasSafeZoneActive) setShowSafeZones(false);
    
    setIsExporting(true);
    
    setTimeout(async () => {
      await exportAsImage(templateRef.current, `poema-${theme}-${new Date().getTime()}`);
      setIsExporting(false);
      if (wasSafeZoneActive) setShowSafeZones(true);
    }, 100);
  }

  // Opciones de configuración
  const fontFamilies = [
    { id: 'default', label: 'Fuente del Tema' },
    { id: 'Cormorant Garamond', label: 'Elegante (Garamond)' },
    { id: 'Playfair Display', label: 'Clásica (Playfair)' },
    { id: 'Cinzel', label: 'Antigua (Cinzel)' },
    { id: 'Great Vibes', label: 'Cursiva (Vibes)' },
    { id: 'Caveat', label: 'Manuscrita (Caveat)' },
    { id: 'Special Elite', label: 'Máquina (Elite)' },
    { id: 'Montserrat', label: 'Moderna (Montserrat)' },
  ];

  const fontColors = [
    { id: 'default', label: 'Por Defecto', bg: 'bg-gradient-to-r from-gray-400 to-gray-600' },
    { id: '#ffffff', label: 'Blanco Puro', bg: 'bg-white border border-gray-300' },
    { id: '#000000', label: 'Negro Tinta', bg: 'bg-black' },
    { id: '#09090b', label: 'Negro Profundo', bg: 'bg-[#09090b]' },
    { id: '#eaddcf', label: 'Papel Crema', bg: 'bg-[#eaddcf]' },
    { id: '#d4af37', label: 'Oro Clásico', bg: 'bg-[#d4af37]' },
    { id: '#ff71ce', label: 'Rosa Neón', bg: 'bg-[#ff71ce]' },
    { id: '#bf360c', label: 'Terracota', bg: 'bg-[#bf360c]' },
    { id: '#0f172a', label: 'Azul Noche', bg: 'bg-[#0f172a]' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-indigo-500/30">
      
      {/* Header Oscuro */}
      <header className="px-6 py-4 flex items-center justify-between z-10 relative bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <PenTool size={20} className="text-zinc-300" />
          </div>
          <div>
            <h1 className="text-xl font-serif text-zinc-100 tracking-wide">El Amor Saca Amor</h1>
            <p className="text-[10px] font-sans text-zinc-400 uppercase tracking-[0.2em] mt-1">Generador Poético</p>
          </div>
        </div>
        
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="btn-el-grito px-8 py-3 font-['Caveat'] text-2xl tracking-wide disabled:opacity-70 flex items-center gap-3 z-20"
        >
          {isExporting ? <span className="animate-pulse flex items-center gap-2">Distorsionando...</span> : <><Download size={22} /> Exportar Obra</>}
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row w-full mx-auto z-10 relative overflow-hidden">
        
        {/* Panel de Herramientas Oscuro */}
        <aside className="w-full lg:w-[420px] p-6 flex flex-col gap-8 overflow-y-auto bg-zinc-950 border-r border-zinc-800 custom-scrollbar">
          
          {/* El Poema */}
          <section className="flex flex-col gap-4">
            <div className="group">
              <label className="font-sans text-xs uppercase font-medium tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
                El Texto
              </label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-4 text-zinc-300 font-serif text-base leading-[1.6] focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors resize-none"
                placeholder="Escribe tu poema..."
              />
            </div>
            <div className="group">
              <input 
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-zinc-300 font-serif italic text-base focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors"
                placeholder="La Firma (Ej: #ArabiaDM)"
              />
            </div>
          </section>

          {/* NUEVO: Personalización del Texto */}
          <section className="flex flex-col gap-4 pt-6 border-t border-zinc-800">
            <h3 className="font-sans text-xs uppercase font-medium tracking-widest text-zinc-400 flex items-center gap-2">
              <Type size={14} /> Ajustes de Tipografía y Color
            </h3>
            
            {/* Tamaño */}
            <div className="flex items-center gap-3">
              <Scaling size={14} className="text-zinc-500" />
              <div className="flex-1 grid grid-cols-4 gap-1 bg-zinc-900 p-1 rounded-md border border-zinc-800">
                {['sm', 'md', 'lg', 'xl'].map(s => (
                  <button 
                    key={s}
                    onClick={() => setCustomSize(s)}
                    className={`py-1 text-xs font-sans rounded ${customSize === s ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Fuente */}
            <div className="flex items-center gap-3">
              <Type size={14} className="text-zinc-500" />
              <select 
                value={customFont}
                onChange={(e) => setCustomFont(e.target.value)}
                className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-md p-2 outline-none focus:border-zinc-600"
              >
                {fontFamilies.map(f => (
                  <option key={f.id} value={f.id}>{f.label}</option>
                ))}
              </select>
            </div>

            {/* Color de Texto */}
            <div className="flex items-start flex-col gap-2 mt-2">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Color del Texto</label>
              <div className="w-full flex gap-2 flex-wrap">
                {fontColors.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCustomColor(c.id)}
                    title={c.label}
                    className={`w-6 h-6 rounded-full ${c.bg} transition-all ${customColor === c.id ? 'ring-2 ring-zinc-300 ring-offset-2 ring-offset-zinc-950 scale-110' : 'hover:scale-110'}`}
                  />
                ))}
              </div>
            </div>

            {/* Color de Fondo */}
            <div className="flex items-start flex-col gap-2 mt-2">
              <label className="text-[10px] text-zinc-500 uppercase tracking-widest">Color del Fondo</label>
              <div className="w-full flex gap-2 flex-wrap">
                {fontColors.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCustomBgColor(c.id)}
                    title={c.label}
                    className={`w-6 h-6 rounded-full ${c.bg} transition-all ${customBgColor === c.id ? 'ring-2 ring-zinc-300 ring-offset-2 ring-offset-zinc-950 scale-110' : 'hover:scale-110'}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Formato y Plataforma */}
          <section className="flex flex-col gap-4 pt-6 border-t border-zinc-800">
            <div>
              <label className="font-sans text-xs uppercase font-medium tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
                <Layout size={14} /> Plataforma (Formato)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'instagram_post', label: 'Post 4:5', sub: 'Instagram' },
                  { id: 'tiktok', label: 'TikTok 9:16', sub: 'Carrusel / Video' },
                  { id: 'instagram_story', label: 'Story 9:16', sub: 'Instagram' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-md border ${
                      format === f.id 
                        ? 'border-zinc-500 bg-zinc-800 text-zinc-100' 
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                    } transition-all`}
                  >
                    <span className="font-sans text-xs font-semibold">{f.label}</span>
                    <span className="font-sans text-[9px] uppercase mt-1 opacity-70 tracking-wider">{f.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {(format === 'tiktok' || format === 'instagram_story') && (
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone size={16} className="text-zinc-400" />
                  <div>
                    <h3 className="font-sans font-medium text-xs text-zinc-300">Zonas Seguras</h3>
                    <p className="font-sans text-[10px] text-zinc-500 mt-0.5">Evita que los botones tapen tu texto</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={showSafeZones} onChange={(e) => setShowSafeZones(e.target.checked)} />
                  <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-zinc-500"></div>
                </label>
              </div>
            )}
          </section>

          {/* Estilos Poéticos y Obras de Arte */}
          <section className="flex flex-col gap-3 pt-6 border-t border-zinc-800">
            <label className="font-sans text-xs uppercase font-medium tracking-widest text-zinc-400 mb-1 flex items-center gap-2">
              <Palette size={14} /> Estética Poética & Arte
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'renaissance', name: 'El Renacimiento (Da Vinci)', desc: 'Papel pergamino, tonos sepia y tinta.' },
                { id: 'impressionism', name: 'El Impresionista (Monet)', desc: 'Luz suave, pasteles difuminados, óleo.' },
                { id: 'surrealism', name: 'El Surrealista (Dalí)', desc: 'Desierto cálido, tiempo distorsionado.' },
                { id: 'dark_academia', name: 'Dark Academia', desc: 'Serifa elegante, fondo profundo y oro.' },
                { id: 'ethereal', name: 'Romance Etéreo', desc: 'Nebulosa oscura, tonos índigo y brillo.' },
                { id: 'vintage', name: 'Máquina de Escribir', desc: 'Papel envejecido y fuente de máquina.' },
                { id: 'neon_romance', name: 'Neón Melancólico', desc: 'Letra cursiva brillante sobre negro absoluto.' },
                { id: 'minimalist', name: 'Minimalista', desc: 'Limpio, negro y fuente sans-serif fina.' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`text-left p-3 rounded-md border transition-all duration-200 ${
                    theme === t.id 
                      ? 'border-zinc-500 bg-zinc-800 shadow-md' 
                      : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className={`font-serif text-sm ${theme === t.id ? 'text-zinc-100' : 'text-zinc-300'}`}>
                      {t.name}
                    </span>
                    <span className={`font-sans text-[10px] mt-1 ${theme === t.id ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {t.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

        </aside>

        {/* Zona de Revelado (Vista Previa) */}
        <section className="flex-1 flex items-center justify-center p-4 lg:p-8 relative bg-zinc-900 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-900 opacity-50"></div>
          
          <div className="relative w-full h-full flex items-center justify-center overflow-auto">
            <div className="p-4 md:p-8 flex items-center justify-center w-full h-full">
              <div className="transform transition-all duration-300 ease-in-out shadow-2xl ring-1 ring-white/10 mx-auto">
                <TemplateRenderer 
                  ref={templateRef}
                  text={text}
                  author={author}
                  format={format}
                  styleTheme={theme}
                  showSafeZones={showSafeZones}
                  customFont={customFont}
                  customColor={customColor}
                  customSize={customSize}
                />
              </div>
            </div>
          </div>
        </section>
        
      </main>
    </div>
  )
}

export default App
