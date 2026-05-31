import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TemplateRenderer = forwardRef(({ text, author, styleTheme, format, showSafeZones }, ref) => {
  // Formatos soportados
  const formatStyles = {
    '4:5': 'aspect-[4/5] w-full max-w-[450px]',
    '9:16': 'aspect-[9/16] w-full max-w-[350px]',
    '1:1': 'aspect-square w-full max-w-[450px]'
  };

  const currentFormatStyle = formatStyles[format] || formatStyles['4:5'];

  // Temas Artísticos
  const themes = {
    'miro': {
      container: 'bg-[#F2EFE9] p-10 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#1A1A1A] font-["Comfortaa"] text-xl md:text-2xl leading-[1.8] text-center z-10 font-bold',
      author: 'text-[#E63946] font-["Comfortaa"] text-sm mt-8 z-10 tracking-widest',
      decorative: (
        <>
          {/* Formas abstractas estilo Miró */}
          <div className="absolute top-[10%] left-[10%] w-24 h-24 bg-[#E63946] rounded-full mix-blend-multiply opacity-80"></div>
          <div className="absolute bottom-[20%] right-[5%] w-32 h-12 bg-[#1D3557] rounded-full rotate-45 mix-blend-multiply opacity-80"></div>
          <div className="absolute top-[40%] right-[15%] w-16 h-16 bg-[#F4A261] rotate-12 mix-blend-multiply opacity-80" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
          {/* Líneas asimétricas */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 10,50 Q 40,10 60,70 T 90,30" fill="none" stroke="#1A1A1A" strokeWidth="0.5" />
            <circle cx="85" cy="25" r="2" fill="#1A1A1A" />
            <circle cx="20" cy="80" r="3" fill="#1A1A1A" />
          </svg>
        </>
      )
    },
    'gris': {
      container: 'p-10 flex flex-col justify-center items-start relative overflow-hidden shadow-inner',
      // Fondo cubista generado con CSS
      background: {
        backgroundColor: '#C5C1B6',
        backgroundImage: `
          linear-gradient(45deg, rgba(85,75,65,0.2) 25%, transparent 25%, transparent 75%, rgba(85,75,65,0.2) 75%, rgba(85,75,65,0.2)),
          linear-gradient(45deg, rgba(85,75,65,0.2) 25%, transparent 25%, transparent 75%, rgba(85,75,65,0.2) 75%, rgba(85,75,65,0.2)),
          linear-gradient(-45deg, rgba(135,145,155,0.3) 50%, transparent 50%),
          linear-gradient(135deg, rgba(185,175,165,0.4) 30%, transparent 30%)
        `,
        backgroundSize: '100% 100%, 100% 100%, 200% 200%, 150% 150%',
        backgroundPosition: '0 0, 50px 50px, 0 0, 100% 100%'
      },
      text: 'text-[#2C2A28] font-["Oswald"] text-2xl md:text-3xl leading-[1.6] text-left font-light uppercase tracking-wide bg-[#F2F0EB]/90 p-6 shadow-md border-l-4 border-[#8B7355] z-10 backdrop-blur-sm',
      author: 'text-[#8B7355] font-["Oswald"] text-sm mt-4 tracking-[0.3em] uppercase w-full text-right z-10 bg-[#F2F0EB]/90 px-4 py-2 shadow-sm',
      decorative: null
    },
    'vangogh': {
      container: 'p-12 flex flex-col justify-center items-center relative overflow-hidden bg-[#0A192F]',
      text: 'text-[#F9F871] font-["Caveat"] text-3xl md:text-5xl leading-[1.4] text-center z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]',
      author: 'text-[#A8DADC] font-["Caveat"] text-2xl mt-8 z-10 opacity-90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]',
      decorative: (
        <>
          {/* Remolinos impresionistas */}
          <div className="absolute inset-0 opacity-40 mix-blend-color-dodge filter blur-[1px]" style={{
            backgroundImage: `radial-gradient(ellipse at top left, rgba(249, 248, 113, 0.4) 0%, transparent 40%),
                              radial-gradient(circle at 80% 30%, rgba(249, 248, 113, 0.6) 0%, rgba(0, 180, 216, 0.3) 30%, transparent 60%),
                              radial-gradient(circle at 20% 80%, rgba(0, 180, 216, 0.5) 0%, transparent 50%)`
          }}></div>
          {/* Trazos (pinceladas simuladas con SVG filter y ruido) */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.05 0.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </>
      )
    }
  };

  const currentTheme = themes[styleTheme] || themes['miro'];

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
        minHeight: format === '9:16' ? '800px' : '600px',
        ...currentTheme.background
      }}
    >
      {currentTheme.decorative}
      
      <div className={cn("relative z-10 w-full flex flex-col h-full", 
        styleTheme === 'gris' ? 'justify-center items-start' : 'justify-center items-center'
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

      {/* TIKTOK SAFE ZONES OVERLAY */}
      {showSafeZones && format === '9:16' && (
        <div className="absolute inset-0 z-50 pointer-events-none border-[4px] border-red-500/50 flex flex-col justify-between">
          {/* Top UI Zone */}
          <div className="w-full h-[15%] bg-red-500/20 border-b border-red-500/50 flex items-center justify-center">
            <span className="text-red-900 font-sans text-xs font-bold uppercase tracking-wider bg-white/80 px-2 py-1 rounded">No poner texto aquí</span>
          </div>
          
          <div className="flex-1 flex justify-end">
            {/* Right UI Zone (Icons) */}
            <div className="h-full w-[20%] bg-red-500/20 border-l border-red-500/50 flex items-center justify-center">
               <span className="text-red-900 font-sans text-xs font-bold uppercase tracking-wider bg-white/80 px-2 py-1 rounded rotate-90 whitespace-nowrap">Iconos (Likes)</span>
            </div>
          </div>

          {/* Bottom UI Zone (Caption) */}
          <div className="w-full h-[25%] bg-red-500/20 border-t border-red-500/50 flex items-center justify-center">
            <span className="text-red-900 font-sans text-xs font-bold uppercase tracking-wider bg-white/80 px-2 py-1 rounded">Descripción y Audio</span>
          </div>
        </div>
      )}
    </div>
  );
});

TemplateRenderer.displayName = 'TemplateRenderer';

export default TemplateRenderer;
