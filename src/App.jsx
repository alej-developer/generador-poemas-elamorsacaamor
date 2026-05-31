import { useState, useRef } from 'react'
import { Download, Layout, Palette, PenTool, Smartphone } from 'lucide-react'
import TemplateRenderer from './components/TemplateRenderer'
import { exportAsImage } from './utils/exportImage'

function App() {
  const [text, setText] = useState('El joven se puso a pensar, a pensar y a pensar...\n\nLuego movió la cabeza, se mordió los labios, bajo su\nmirada y dijo:\n\n-No. ¡Creo que no puedo hacerlo! ¡Y así le dijo NO a Dios!')
  const [author, setAuthor] = useState('#ArabiaDM')
  const [format, setFormat] = useState('instagram_post')
  const [theme, setTheme] = useState('dark_academia')
  const [isExporting, setIsExporting] = useState(false)
  const [showSafeZones, setShowSafeZones] = useState(false)
  
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
          className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 font-sans text-xs font-bold tracking-widest uppercase transition-all rounded-sm disabled:opacity-70 flex items-center gap-2"
        >
          {isExporting ? <span className="animate-pulse flex items-center gap-2">Exportando...</span> : <><Download size={16} /> Descargar</>}
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row w-full mx-auto z-10 relative overflow-hidden">
        
        {/* Panel de Herramientas Oscuro */}
        <aside className="w-full lg:w-[420px] p-6 flex flex-col gap-8 overflow-y-auto bg-zinc-950 border-r border-zinc-800">
          
          {/* El Poema */}
          <section className="flex flex-col gap-4">
            <div className="group">
              <label className="font-sans text-xs uppercase font-medium tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
                El Texto
              </label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-4 text-zinc-300 font-serif text-base leading-[1.6] focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors resize-none"
                placeholder="Escribe tu poema..."
              />
            </div>

            <div className="group">
              <label className="font-sans text-xs uppercase font-medium tracking-widest text-zinc-400 mb-2 block">La Firma</label>
              <input 
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-zinc-300 font-serif italic text-base focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors"
                placeholder="#ArabiaDM"
              />
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

            {/* Toggle de Safe Zones solo visible si es vertical */}
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

          {/* Estilos Poéticos */}
          <section className="flex flex-col gap-3 pt-6 border-t border-zinc-800">
            <label className="font-sans text-xs uppercase font-medium tracking-widest text-zinc-400 mb-1 flex items-center gap-2">
              <Palette size={14} /> Estética Poética
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'dark_academia', name: 'Dark Academia', desc: 'Serifa elegante, fondo profundo y oro.' },
                { id: 'ethereal', name: 'Romance Etéreo', desc: 'Nebulosa oscura, tonos índigo y brillo sutil.' },
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
            {/* Contenedor del post con padding para sombra */}
            <div className="p-4 md:p-8 flex items-center justify-center w-full h-full">
              <div className="transform transition-all duration-300 ease-in-out shadow-2xl ring-1 ring-white/10 mx-auto">
                <TemplateRenderer 
                  ref={templateRef}
                  text={text}
                  author={author}
                  format={format}
                  styleTheme={theme}
                  showSafeZones={showSafeZones}
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
