import { useState, useRef } from 'react'
import { Download, Type, Layout, Palette } from 'lucide-react'
import TemplateRenderer from './components/TemplateRenderer'
import { exportAsImage } from './utils/exportImage'

function App() {
  const [text, setText] = useState('El joven se puso a pensar, a pensar y a pensar...\n\nLuego movió la cabeza, se mordió los labios, bajo su\nmirada y dijo:\n\n-No. ¡Creo que no puedo hacerlo! ¡Y así le dijo NO a Dios!')
  const [author, setAuthor] = useState('#ArabiaDM')
  const [format, setFormat] = useState('4:5')
  const [theme, setTheme] = useState('raw')
  
  const templateRef = useRef(null)

  const handleExport = () => {
    exportAsImage(templateRef.current, `poema-${new Date().getTime()}`)
  }

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col font-sans">
      <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-bold text-zinc-800">El Amor Saca Amor</h1>
          <p className="text-sm text-zinc-500">Generador de Plantillas</p>
        </div>
        <button 
          onClick={handleExport}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Download size={18} />
          Exportar Imagen
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto">
        {/* Panel de Controles */}
        <aside className="w-full lg:w-96 bg-white border-r border-zinc-200 p-6 flex flex-col gap-8 overflow-y-auto">
          
          {/* Contenido */}
          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-zinc-800 uppercase tracking-wider flex items-center gap-2">
              <Type size={16} /> Contenido
            </h2>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-600">Poema / Texto</label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full border border-zinc-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                placeholder="Escribe tu poema aquí..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-600">Firma / Autor</label>
              <input 
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border border-zinc-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </section>

          {/* Formato */}
          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-zinc-800 uppercase tracking-wider flex items-center gap-2">
              <Layout size={16} /> Formato
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: '4:5', label: 'Post (4:5)' },
                { id: '9:16', label: 'Reel / Story' },
                { id: '1:1', label: 'Cuadrado' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`p-3 rounded-md border text-sm font-medium transition-all ${
                    format === f.id 
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-700' 
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </section>

          {/* Estilo Visual */}
          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-zinc-800 uppercase tracking-wider flex items-center gap-2">
              <Palette size={16} /> Estilo Visual
            </h2>
            <div className="flex flex-col gap-2">
              {[
                { id: 'ethereal', name: 'Cristal Etéreo', desc: 'Oscuro, melancólico, elegante' },
                { id: 'raw', name: 'Textura Cruda', desc: 'Papel, máquina de escribir, íntimo' },
                { id: 'cinematic', name: 'Cinematográfico', desc: 'Subtítulos de película, minimalista' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3 rounded-md border text-left transition-all ${
                    theme === t.id 
                      ? 'bg-indigo-50 border-indigo-600' 
                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className={`font-medium ${theme === t.id ? 'text-indigo-700' : 'text-zinc-800'}`}>
                    {t.name}
                  </div>
                  <div className={`text-xs mt-1 ${theme === t.id ? 'text-indigo-500' : 'text-zinc-500'}`}>
                    {t.desc}
                  </div>
                </button>
              ))}
            </div>
          </section>

        </aside>

        {/* Vista Previa */}
        <section className="flex-1 bg-zinc-200/50 p-8 flex items-center justify-center overflow-auto">
          <div className="w-full max-w-2xl flex items-center justify-center">
            {/* Contenedor con zoom out visual para encajar en la pantalla si es muy grande */}
            <div className="transform scale-75 md:scale-90 lg:scale-100 transition-transform origin-center">
              <TemplateRenderer 
                ref={templateRef}
                text={text}
                author={author}
                format={format}
                styleTheme={theme}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
