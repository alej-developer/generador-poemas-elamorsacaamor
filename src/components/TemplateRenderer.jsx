import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TemplateRenderer = forwardRef(({ text, author, styleTheme, format, showSafeZones }, ref) => {
  // Formatos soportados
  const formatStyles = {
    'instagram_post': 'aspect-[4/5] w-full max-w-[450px]',
    'tiktok': 'aspect-[9/16] w-full max-w-[350px]',
    'instagram_story': 'aspect-[9/16] w-full max-w-[350px]'
  };

  const currentFormatStyle = formatStyles[format] || formatStyles['instagram_post'];

  // Temas Poéticos
  const themes = {
    'dark_academia': {
      container: 'bg-[#1a1714] border-[8px] border-[#2a2520] p-8 md:p-12 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#d4af37] font-["Cormorant_Garamond"] text-xl md:text-2xl leading-[1.8] text-center z-10 font-normal',
      author: 'text-[#a68c30] font-["Cormorant_Garamond"] text-base md:text-lg italic mt-8 z-10',
      decorative: (
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #d4af37 0%, transparent 60%)', mixBlendMode: 'overlay' }}></div>
      )
    },
    'ethereal': {
      container: 'bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] p-8 md:p-12 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#e0e7ff] font-["Cormorant_Garamond"] text-xl md:text-2xl leading-[1.9] text-center z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]',
      author: 'text-[#818cf8] font-["Cormorant_Garamond"] text-base md:text-lg mt-8 z-10 tracking-[0.1em]',
      decorative: (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
        </>
      )
    },
    'vintage': {
      container: 'bg-[#eaddcf] p-8 md:p-12 flex flex-col justify-center items-start relative overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]',
      text: 'text-[#2a2826] font-["Special_Elite"] text-lg md:text-xl leading-[2] text-left z-10 mix-blend-multiply whitespace-pre-wrap',
      author: 'text-[#2a2826] font-["Special_Elite"] text-sm md:text-base mt-8 z-10 w-full text-right opacity-80',
      decorative: (
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}></div>
      )
    },
    'neon_romance': {
      container: 'bg-[#000000] p-8 md:p-12 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#ff71ce] font-["Great_Vibes"] text-3xl md:text-4xl leading-[1.6] text-center z-10 drop-shadow-[0_0_15px_rgba(255,113,206,0.6)]',
      author: 'text-[#01cdfe] font-["Montserrat"] font-light text-xs md:text-sm mt-8 z-10 tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(1,205,254,0.6)]',
      decorative: (
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff71ce]/10 via-transparent to-[#01cdfe]/10"></div>
      )
    },
    'minimalist': {
      container: 'bg-[#09090b] p-10 md:p-14 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#fafafa] font-["Montserrat"] font-light text-lg md:text-xl leading-[2.2] text-center z-10 tracking-wide',
      author: 'text-[#a1a1aa] font-["Montserrat"] font-medium text-xs mt-10 z-10 tracking-[0.2em] uppercase',
      decorative: null
    }
  };

  const currentTheme = themes[styleTheme] || themes['dark_academia'];

  // Para preservar los saltos de línea del poema y arreglar el espaciado
  const formattedText = text.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line === '' ? <span className="block h-4"></span> : line}
      {line !== '' && <br />}
    </React.Fragment>
  ));

  return (
    <div 
      ref={ref}
      className={cn(
        "relative flex mx-auto shadow-2xl transition-all duration-300",
        currentFormatStyle,
        currentTheme.container
      )}
      style={{
        // Altura mínima reducida para evitar cortes y mejorar ajuste
        minHeight: (format === 'tiktok' || format === 'instagram_story') ? '700px' : '560px',
      }}
    >
      {currentTheme.decorative}
      
      <div className={cn("relative z-10 w-full flex flex-col h-full", 
        styleTheme === 'vintage' ? 'justify-center items-start' : 'justify-center items-center'
      )}>
        <p className={cn(currentTheme.text, "max-h-[85%] overflow-hidden")}>
          {formattedText}
        </p>
        
        {author && (
          <p className={currentTheme.author}>
            {author}
          </p>
        )}
      </div>

      {/* TIKTOK SAFE ZONES OVERLAY */}
      {showSafeZones && format === 'tiktok' && (
        <div className="absolute inset-0 z-50 pointer-events-none border-[2px] border-red-500/50 flex flex-col justify-between">
          {/* Top UI Zone */}
          <div className="w-full h-[10%] bg-red-500/20 border-b border-red-500/50 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">Siguiendo / Para Ti</span>
          </div>
          
          <div className="flex-1 flex justify-end">
            {/* Right UI Zone (Icons) */}
            <div className="h-full w-[18%] bg-red-500/20 border-l border-red-500/50 flex items-center justify-center">
               <span className="text-white text-[10px] font-bold uppercase tracking-widest rotate-90 whitespace-nowrap drop-shadow-md">Iconos (Like, Guardar)</span>
            </div>
          </div>

          {/* Bottom UI Zone (Caption) */}
          <div className="w-full h-[20%] bg-red-500/20 border-t border-red-500/50 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">Descripción y Audio</span>
          </div>
        </div>
      )}

      {/* INSTAGRAM STORY SAFE ZONES OVERLAY */}
      {showSafeZones && format === 'instagram_story' && (
        <div className="absolute inset-0 z-50 pointer-events-none border-[2px] border-blue-500/50 flex flex-col justify-between">
          {/* Top UI Zone */}
          <div className="w-full h-[12%] bg-blue-500/20 border-b border-blue-500/50 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">Barra Superior (Perfil)</span>
          </div>
          {/* Bottom UI Zone */}
          <div className="w-full h-[15%] bg-blue-500/20 border-t border-blue-500/50 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">Enviar Mensaje / Like</span>
          </div>
        </div>
      )}
    </div>
  );
});

TemplateRenderer.displayName = 'TemplateRenderer';

export default TemplateRenderer;
