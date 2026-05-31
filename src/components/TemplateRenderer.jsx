import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper de clases
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TemplateRenderer = forwardRef(({ text, author, styleTheme, format }, ref) => {
  // Formatos soportados: 4:5 (post) y 9:16 (historias/reels)
  const formatStyles = {
    '4:5': 'aspect-[4/5] w-full max-w-[400px]',
    '9:16': 'aspect-[9/16] w-full max-w-[320px]',
    '1:1': 'aspect-square w-full max-w-[400px]'
  };

  const currentFormatStyle = formatStyles[format] || formatStyles['4:5'];

  // Temas visuales propuestos
  const themes = {
    'ethereal': {
      container: 'bg-gradient-to-br from-zinc-900 via-indigo-950 to-zinc-950 p-8 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-white font-serif text-2xl md:text-3xl leading-relaxed text-center z-10 font-light',
      author: 'text-indigo-200/70 font-sans tracking-[0.2em] text-xs uppercase mt-8 z-10',
      decorative: (
        <>
          <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"></div>
          <div className="absolute inset-4 border border-white/10 rounded-2xl z-0 backdrop-blur-[2px]"></div>
        </>
      )
    },
    'raw': {
      container: 'bg-[#f4f1ea] p-10 flex flex-col justify-center items-start border-[12px] border-white shadow-inner relative',
      text: 'text-zinc-800 font-mono text-xl md:text-2xl leading-[1.8] text-left font-medium tracking-tight whitespace-pre-wrap',
      author: 'text-zinc-500 font-mono text-sm mt-6 pt-4 border-t border-zinc-300 w-full text-right',
      decorative: (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dust.png")' }}></div>
      )
    },
    'cinematic': {
      container: 'bg-black p-0 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#f5f5f1] font-sans text-xl md:text-2xl leading-normal text-center drop-shadow-lg max-w-[80%] mx-auto',
      author: 'text-[#f5f5f1]/60 font-sans text-sm tracking-widest uppercase absolute bottom-12',
      decorative: (
        <>
          {/* Fondo simulando una escena de película oscura */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/40 to-black z-0"></div>
          {/* Barras de cine (letterbox) */}
          <div className="absolute top-0 w-full h-16 bg-black z-10"></div>
          <div className="absolute bottom-0 w-full h-16 bg-black z-10"></div>
        </>
      )
    }
  };

  const currentTheme = themes[styleTheme] || themes['ethereal'];

  // Para preservar los saltos de línea del poema
  const formattedText = text.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      <br />
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
        // Aseguramos un tamaño base grande para la exportación de alta calidad
        minHeight: format === '9:16' ? '800px' : '600px',
      }}
    >
      {currentTheme.decorative}
      
      <div className={cn("relative z-10 w-full flex flex-col h-full", 
        styleTheme === 'raw' ? 'justify-start mt-8' : 'justify-center items-center'
      )}>
        <p className={currentTheme.text}>
          {formattedText}
        </p>
        
        {author && (
          <p className={currentTheme.author}>
            {author}
          </p>
        )}
      </div>
    </div>
  );
});

TemplateRenderer.displayName = 'TemplateRenderer';

export default TemplateRenderer;
