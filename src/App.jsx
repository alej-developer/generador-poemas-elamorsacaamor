import { useState, useRef } from 'react'
import { Download, Feather, Layout, Palette, Sparkles } from 'lucide-react'
import TemplateRenderer from './components/TemplateRenderer'
import { exportAsImage } from './utils/exportImage'

function App() {
  const [text, setText] = useState('El joven se puso a pensar, a pensar y a pensar...\n\nLuego movió la cabeza, se mordió los labios, bajo su\nmirada y dijo:\n\n-No. ¡Creo que no puedo hacerlo! ¡Y así le dijo NO a Dios!')
  const [author, setAuthor] = useState('#ArabiaDM')
  const [format, setFormat] = useState('4:5')
  const [theme, setTheme] = useState('raw')
  const [isExporting, setIsExporting] = useState(false)
  
  const templateRef = useRef(null)

  const handleExport = async () => {
    setIsExporting(true)
    await exportAsImage(templateRef.current, `poema-${new Date().getTime()}`)
    setIsExporting(false)
  }

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[#d8cbb8] selection:text-[#2c2825]">
      
      {/* Header Nostálgico */}
      <header className="px-8 py-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3d3733] flex items-center justify-center shadow-lg">
            <Feather size={20} className="text-[#fdfaf5]" />
          </div>
          <div>
            <h1 className="text-2xl font-serif italic text-[#3d3733] leading-none">El Amor Saca Amor</h1>
            <p className="text-xs font-sans text-[#8a8175] uppercase tracking-[0.2em] mt-1">El Taller del Poeta</p>
          </div>
        </div>
        
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="group relative px-6 py-2.5 bg-[#3d3733] hover:bg-[#2c2825] text-[#fdfaf5] font-sans text-sm tracking-wider uppercase rounded-sm transition-all shadow-md hover:shadow-xl disabled:opacity-70 flex items-center gap-2 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isExporting ? <Sparkles size={16} className="animate-pulse" /> : <Download size={16} />}
            {isExporting ? 'Plasmando...' : 'Guardar Obra'}
          </span>
          <div className="absolute inset-0 bg-[#4a423e] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1800px] mx-auto z-10 relative">
        
        {/* Panel de Escritura (Izquierda) */}
        <aside className="w-full lg:w-[450px] p-8 flex flex-col gap-10 overflow-y-auto">
          
          <div className="space-y-2">
            <h2 className="font-serif text-3xl text-[#3d3733] italic">Tu musa,</h2>
            <p className="font-sans text-sm text-[#8a8175] leading-relaxed">
              Vierte tus sentimientos en el papel virtual. Selecciona un marco que abrace tus palabras.
            </p>
          </div>
          
          {/* Editor de Texto (Estilo Papel) */}
          <section className="flex flex-col gap-4 relative">
            <div className="absolute -left-4 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[#d4cfc5] to-transparent"></div>
            
            <div className="group">
              <label className="font-sans text-xs uppercase tracking-widest text-[#8a8175] mb-2 block flex items-center gap-2">
                <Feather size={12} /> El Verso
              </label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={10}
                className="w-full bg-transparent border-0 border-b-2 border-[#e6e1d6] p-2 text-[#3d3733] font-serif text-lg leading-[1.8] focus:ring-0 focus:border-[#8a8175] transition-colors resize-none placeholder:text-[#c4beb3] placeholder:italic"
                placeholder="Escribe lo que dicta el corazón..."
              />
            </div>

            <div className="group mt-2">
              <label className="font-sans text-xs uppercase tracking-widest text-[#8a8175] mb-2 block">La Firma</label>
              <input 
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-transparent border-0 border-b-2 border-[#e6e1d6] p-2 text-[#3d3733] font-serif italic text-lg focus:ring-0 focus:border-[#8a8175] transition-colors"
                placeholder="Tu seudónimo"
              />
            </div>
          </section>

          {/* Lienzo y Formato */}
          <section className="flex flex-col gap-6 mt-4">
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-[#8a8175] mb-3 flex items-center gap-2">
                <Layout size={12} /> El Lienzo
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: '4:5', label: 'Retrato', sub: 'Instagram' },
                  { id: '9:16', label: 'Historia', sub: 'Reel' },
                  { id: '1:1', label: 'Clásico', sub: 'Cuadro' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={`flex flex-col items-center justify-center p-3 border ${
                      format === f.id 
                        ? 'border-[#3d3733] bg-[#f0eae1] shadow-inner' 
                        : 'border-[#e6e1d6] bg-transparent hover:border-[#b5b0a5]'
                    } transition-all rounded-sm`}
                  >
                    <span className={`font-serif text-sm ${format === f.id ? 'text-[#3d3733]' : 'text-[#8a8175]'}`}>{f.label}</span>
                    <span className="font-sans text-[10px] text-[#a8a196] uppercase tracking-wider mt-1">{f.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-[#8a8175] mb-3 flex items-center gap-2">
                <Palette size={12} /> La Atmósfera
              </label>
              <div className="flex flex-col gap-3">
                {[
                  { id: 'raw', name: 'Máquina de Escribir', desc: 'Desnudo, crudo y nostálgico' },
                  { id: 'ethereal', name: 'Sueño de Cristal', desc: 'Profundo, melancólico y moderno' },
                  { id: 'cinematic', name: 'Escena de Cine', desc: 'Dramático, enfocado e intenso' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`text-left p-4 border relative overflow-hidden transition-all duration-300 ${
                      theme === t.id 
                        ? 'border-[#3d3733] bg-[#3d3733] text-[#fdfaf5] shadow-lg' 
                        : 'border-[#e6e1d6] bg-transparent hover:border-[#b5b0a5]'
                    }`}
                  >
                    <div className="relative z-10">
                      <div className={`font-serif text-lg ${theme === t.id ? 'text-[#fdfaf5]' : 'text-[#3d3733]'}`}>
                        {t.name}
                      </div>
                      <div className={`font-sans text-xs mt-1 italic ${theme === t.id ? 'text-[#d4cfc5]' : 'text-[#8a8175]'}`}>
                        {t.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

        </aside>

        {/* Zona de Revelado (Vista Previa) */}
        <section className="flex-1 flex items-center justify-center p-8 lg:p-12 relative">
          {/* Elementos decorativos del escritorio */}
          <div className="absolute inset-0 border-l border-[#e6e1d6] bg-[#f5f1e8]/50"></div>
          
          <div className="relative w-full max-w-3xl flex items-center justify-center">
            {/* Efecto de marco de fotos/cuadro en la vista previa */}
            <div className="relative p-2 bg-[#fdfaf5] shadow-2xl rounded-sm">
              <div className="absolute inset-0 border border-black/5 -m-2"></div>
              <div className="transform scale-75 md:scale-90 lg:scale-100 transition-all duration-500 origin-center ease-in-out">
                <TemplateRenderer 
                  ref={templateRef}
                  text={text}
                  author={author}
                  format={format}
                  styleTheme={theme}
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
