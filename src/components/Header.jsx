import { Download } from 'lucide-react'
import { cn, focusRing } from '../utils/cn'
import { publicUrl } from '../utils/publicUrl'

export default function Header({ isExporting, onExport }) {
  return (
    <header className="relative z-10 flex items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-900 px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <img
          src={publicUrl('logo.svg')}
          alt=""
          width="40"
          height="40"
          className="h-10 w-10 shrink-0 rounded-md"
        />
        <div className="min-w-0">
          <h1 className="truncate text-lg tracking-wide text-zinc-100 sm:text-xl">El Amor Saca Amor</h1>
          <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-400">Generador poético</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onExport}
        disabled={isExporting}
        className={cn(
          "btn-el-grito z-20 flex shrink-0 items-center gap-2 px-4 py-2 font-['Caveat'] text-xl tracking-wide disabled:opacity-70 sm:gap-3 sm:px-8 sm:py-3 sm:text-2xl",
          focusRing,
        )}
      >
        {isExporting ? (
          <span className="animate-pulse">Distorsionando...</span>
        ) : (
          <>
            <Download size={22} /> Exportar Obra
          </>
        )}
      </button>
    </header>
  )
}
