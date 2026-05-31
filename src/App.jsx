import { useState, useRef } from 'react'
import { Download, Layout, Palette, PenTool, Smartphone } from 'lucide-react'
import TemplateRenderer from './components/TemplateRenderer'
import { exportAsImage } from './utils/exportImage'

function App() {
  const [text, setText] = useState('El joven se puso a pensar, a pensar y a pensar...\n\nLuego movió la cabeza, se mordió los labios, bajo su\nmirada y dijo:\n\n-No. ¡Creo que no puedo hacerlo! ¡Y así le dijo NO a Dios!')
  const [author, setAuthor] = useState('#ArabiaDM')
  const [format, setFormat] = useState('4:5')
  const [theme, setTheme] = useState('miro')
  const [isExporting, setIsExporting] = useState(false)
  const [showSafeZones, setShowSafeZones] = useState(false)
  
  const templateRef = useRef(null)

  const handleExport = async () => {
    // Si las zonas seguras están activas, las desactivamos un momento para la exportación
    const wasSafeZoneActive = showSafeZones;
    if (wasSafeZoneActive) setShowSafeZones(false);
    
    setIsExporting(true);
    
    // Pequeño timeout para asegurar que React quite el overlay de safe zones antes de tomar la foto
    setTimeout(async () => {
      await exportAsImage(templateRef.current, `poema-${theme}-${new Date().getTime()}`);
      setIsExporting(false);
      if (wasSafeZoneActive) setShowSafeZones(true);
    }, 100);
  }

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[#E63946]/30">
      
      {/* Header Artístico */}
      <header className="px-8 py-5 flex items-center justify-between z-10 relative bg-[#1A1A1A] border-b-4 border-[#E63946]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded bg-gradient-to-br from-[#E63946] via-[#F4A261] to-[#2A9D8F] flex items-center justify-center shadow-lg transform -rotate-3">
            <PenTool size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-serif text-white tracking-wide">El Amor Saca Amor</h1>
            <p className="text-xs font-sans text-[#F4A261] uppercase tracking-[0.3em] mt-1 font-bold">El Taller del Pintor</p>
          </div>
        </div>
        
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="px-6 py-3 bg-[#E63946] hover:bg-[#D62828] text-white font-sans text-sm font-bold tracking-wider uppercase transition-all shadow-[4px_4px_0_0_#F4A261] hover:shadow-[2px_2px_0_0_#F4A261] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-70 flex items-center gap-2"
        >
          {isExporting ? <span className="animate-pulse flex items-center gap-2"><PenTool size={18}/> Pintando...</span> : <><Download size={18} /> Exportar Obra</>}
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1800px] mx-auto z-10 relative">
        
        {/* Panel de Herramientas (Paleta) */}
        <aside className="w-full lg:w-[450px] p-8 flex flex-col gap-10 overflow-y-auto bg-white/80 backdrop-blur-md border-r-2 border-[#1A1A1A]/10 shadow-xl">
          
          <div className="space-y-2 border-l-4 border-[#2A9D8F] pl-4">
            <h2 className="font-serif text-3xl text-[#1A1A1A] font-bold">Tu Lienzo</h2>
            <p className="font-sans text-sm text-[#555] leading-relaxed">
              Plasma tus versos. Elige una corriente artística y adapta el formato para que tu poesía fluya por el mundo.
            </p>
          </div>
          
          {/* El Poema */}
          <section className="flex flex-col gap-4">
            <div className="group">
              <label className="font-sans text-xs uppercase font-bold tracking-widest text-[#1A1A1A] mb-2 block flex items-center gap-2">
                <PenTool size={14} className="text-[#E63946]" /> Los Versos
              </label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full bg-[#F2EFE9] border-2 border-[#1A1A1A] p-4 text-[#1A1A1A] font-serif text-lg leading-[1.6] focus:ring-0 focus:border-[#E63946] transition-colors resize-none shadow-[4px_4px_0_0_rgba(26,26,26,0.1)]"
                placeholder="La inspiración llega trabajando..."
              />
            </div>

            <div className="group mt-2">
              <label className="font-sans text-xs uppercase font-bold tracking-widest text-[#1A1A1A] mb-2 block">El Autor</label>
              <input 
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#F2EFE9] border-2 border-[#1A1A1A] p-3 text-[#1A1A1A] font-serif italic text-lg focus:ring-0 focus:border-[#E63946] transition-colors"
                placeholder="Firma tu obra"
              />
            </div>
          </section>

          {/* Formato y TikTok */}
          <section className="flex flex-col gap-6 pt-6 border-t-2 border-dashed border-[#1A1A1A]/20">
            <div>
              <label className="font-sans text-xs uppercase font-bold tracking-widest text-[#1A1A1A] mb-3 flex items-center gap-2">
                <Layout size={14} className="text-[#2A9D8F]" /> Formato de Galería
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '4:5', label: 'Post', sub: 'Instagram' },
                  { id: '9:16', label: 'Vertical', sub: 'TikTok / Reel' },
                  { id: '1:1', label: 'Cuadro', sub: 'Clásico' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`flex flex-col items-center justify-center py-3 border-2 ${
                      format === f.id 
                        ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#1A1A1A] font-bold' 
                        : 'border-[#1A1A1A]/20 bg-transparent text-[#555] hover:border-[#1A1A1A]/50'
                    } transition-all`}
                  >
                    <span className="font-sans text-sm">{f.label}</span>
                    <span className="font-sans text-[10px] uppercase mt-1 opacity-70">{f.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle de Safe Zones solo visible si es 9:16 */}
            {format === '9:16' && (
              <div className="p-4 bg-[#E63946]/10 border border-[#E63946]/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone size={20} className="text-[#E63946]" />
                  <div>
                    <h3 className="font-sans font-bold text-sm text-[#1A1A1A]">Zonas Seguras TikTok</h3>
                    <p className="font-sans text-[10px] text-[#555]">Muestra dónde van los botones</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={showSafeZones} onChange={(e) => setShowSafeZones(e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E63946]"></div>
                </label>
              </div>
            )}
          </section>

          {/* Estilo Visual / Movimiento Artístico */}
          <section className="flex flex-col gap-4 pt-6 border-t-2 border-dashed border-[#1A1A1A]/20">
            <label className="font-sans text-xs uppercase font-bold tracking-widest text-[#1A1A1A] mb-1 flex items-center gap-2">
              <Palette size={14} className="text-[#F4A261]" /> Movimiento Artístico
            </label>
            <div className="flex flex-col gap-3">
              {[
                { id: 'miro', name: 'El Surrealista', desc: 'Colores puros, formas abstractas flotantes. (Miró)', border: 'border-[#E63946]' },
                { id: 'gris', name: 'El Cubista', desc: 'Geometría, estructuras y grises texturizados. (Juan Gris)', border: 'border-[#8B7355]' },
                { id: 'vangogh', name: 'El Noche Estrellada', desc: 'Remolinos vivos, intensidad, azul profundo. (Van Gogh)', border: 'border-[#F9F871]' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`text-left p-4 border-2 relative overflow-hidden transition-all duration-200 ${
                    theme === t.id 
                      ? `${t.border} bg-[#1A1A1A] text-white shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]` 
                      : 'border-[#1A1A1A]/20 bg-transparent hover:bg-black/5'
                  }`}
                >
                  <div className="relative z-10 flex flex-col">
                    <span className={`font-serif text-xl font-bold ${theme === t.id ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {t.name}
                    </span>
                    <span className={`font-sans text-xs mt-1 ${theme === t.id ? 'text-gray-300' : 'text-[#555]'}`}>
                      {t.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

        </aside>

        {/* Zona de Revelado (Vista Previa) */}
        <section className="flex-1 flex items-center justify-center p-4 lg:p-12 relative bg-[#d9d5ce] overflow-hidden">
          {/* Textura de fondo del estudio */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          
          <div className="relative w-full max-w-3xl flex items-center justify-center">
            {/* Caballete virtual */}
            <div className="relative p-3 bg-white shadow-2xl">
              <div className="absolute -inset-2 bg-gradient-to-br from-black/5 to-black/20 -z-10 blur-sm"></div>
              <div className="transform scale-75 md:scale-90 lg:scale-100 transition-all duration-500 origin-center ease-in-out">
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
