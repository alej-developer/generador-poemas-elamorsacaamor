import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const TemplateRenderer = forwardRef(({ 
  text, 
  author, 
  styleTheme, 
  format, 
  showSafeZones,
  customFont,
  customColor,
  customSize,
  customBgColor
}, ref) => {
  // Formatos soportados
  const formatStyles = {
    'instagram_post': 'aspect-[4/5] w-full max-w-[450px]',
    'tiktok': 'aspect-[9/16] w-full max-w-[350px]',
    'instagram_story': 'aspect-[9/16] w-full max-w-[350px]'
  };

  const currentFormatStyle = formatStyles[format] || formatStyles['instagram_post'];

  // Temas Poéticos y de Arte
  const themes = {
    'dark_academia': {
      container: 'bg-[#1a1714] border-[8px] border-[#2a2520] p-8 md:p-12 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#d4af37] font-["Cormorant_Garamond"] text-[1.25rem] leading-[1.8] text-center z-10 font-normal',
      author: 'text-[#a68c30] font-["Cormorant_Garamond"] text-base italic mt-8 z-10',
      decorative: <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #d4af37 0%, transparent 60%)', mixBlendMode: 'overlay' }}></div>
    },
    'ethereal': {
      container: 'bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] p-8 md:p-12 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#e0e7ff] font-["Cormorant_Garamond"] text-[1.25rem] leading-[1.9] text-center z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]',
      author: 'text-[#818cf8] font-["Cormorant_Garamond"] text-base mt-8 z-10 tracking-[0.1em]',
      decorative: (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
        </>
      )
    },
    'vintage': {
      container: 'bg-[#eaddcf] p-8 md:p-12 flex flex-col justify-center items-start relative overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]',
      text: 'text-[#2a2826] font-["Special_Elite"] text-[1.125rem] leading-[2] text-left z-10 mix-blend-multiply whitespace-pre-wrap',
      author: 'text-[#2a2826] font-["Special_Elite"] text-sm mt-8 z-10 w-full text-right opacity-80',
      decorative: <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}></div>
    },
    'neon_romance': {
      container: 'bg-[#000000] p-8 md:p-12 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#ff71ce] font-["Great_Vibes"] text-[2rem] leading-[1.6] text-center z-10 drop-shadow-[0_0_15px_rgba(255,113,206,0.6)]',
      author: 'text-[#01cdfe] font-["Montserrat"] font-light text-xs mt-8 z-10 tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(1,205,254,0.6)]',
      decorative: <div className="absolute inset-0 bg-gradient-to-t from-[#ff71ce]/10 via-transparent to-[#01cdfe]/10"></div>
    },
    'minimalist': {
      container: 'bg-[#09090b] p-10 md:p-14 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#fafafa] font-["Montserrat"] font-light text-[1.125rem] leading-[2.2] text-center z-10 tracking-wide',
      author: 'text-[#a1a1aa] font-["Montserrat"] font-medium text-xs mt-10 z-10 tracking-[0.2em] uppercase',
      decorative: null
    },
    'renaissance': {
      container: 'bg-[#d8cbb8] p-10 md:p-14 flex flex-col justify-center items-center relative overflow-hidden shadow-[inset_0_0_80px_rgba(92,64,51,0.3)]',
      text: 'text-[#3e2723] font-["Cinzel"] text-[1.125rem] leading-[2] text-center z-10 mix-blend-multiply',
      author: 'text-[#5d4037] font-["Lora"] italic text-sm mt-8 z-10',
      decorative: (
        <>
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#5d4037] opacity-40"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#5d4037] opacity-40"></div>
        </>
      )
    },
    'impressionism': {
      container: 'bg-[#e0f2f1] p-10 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#004d40] font-["Lora"] text-[1.25rem] italic leading-[1.8] text-center z-10 drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]',
      author: 'text-[#00695c] font-["Caveat"] text-xl mt-6 z-10',
      decorative: (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#b2dfdb] rounded-full mix-blend-multiply filter blur-[40px] opacity-70"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-[#c8e6c9] rounded-full mix-blend-multiply filter blur-[40px] opacity-70"></div>
          <div className="absolute top-[30%] right-[10%] w-48 h-48 bg-[#ffcdd2] rounded-full mix-blend-multiply filter blur-[50px] opacity-40"></div>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/canvas.png")' }}></div>
        </>
      )
    },
    'surrealism': {
      container: 'bg-[#ffe0b2] p-10 flex flex-col justify-center items-center relative overflow-hidden',
      text: 'text-[#bf360c] font-["Playfair_Display"] text-[1.25rem] leading-[2] text-center z-10 transform -rotate-1 skew-x-2',
      author: 'text-[#d84315] font-["Montserrat"] font-bold text-xs mt-10 z-10 tracking-[0.4em] uppercase',
      decorative: (
        <>
          <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#ffb74d] to-transparent"></div>
          <div className="absolute top-[20%] right-[-10%] w-32 h-64 bg-[#ffcc80] rounded-[100%] rotate-45 filter blur-[20px] mix-blend-multiply opacity-60"></div>
          <div className="absolute bottom-[10%] left-[20%] w-48 h-12 bg-[#8d6e63] rounded-[100%] mix-blend-overlay filter blur-[10px] opacity-40 skew-x-12"></div>
        </>
      )
    }
  };

  const currentTheme = themes[styleTheme] || themes['dark_academia'];

  const formattedText = text.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line === '' ? <span className="block h-4"></span> : line}
      {line !== '' && <br />}
    </React.Fragment>
  ));

  const sizeMap = {
    'sm': '0.8em',
    'md': '1em',
    'lg': '1.3em',
    'xl': '1.6em'
  };

  const customTextStyles = {
    ...(customColor && customColor !== 'default' ? { color: customColor } : {}),
    ...(customFont && customFont !== 'default' ? { fontFamily: `"${customFont}", serif` } : {}),
    ...(customSize && customSize !== 'md' ? { fontSize: `calc(100% * ${parseFloat(sizeMap[customSize])})` } : {})
  };

  return (
    <div 
      ref={ref}
      className={cn(
        "relative flex mx-auto shadow-2xl transition-all duration-300",
        currentFormatStyle,
        currentTheme.container
      )}
      style={{
        minHeight: (format === 'tiktok' || format === 'instagram_story') ? '700px' : '560px',
        ...(customBgColor && customBgColor !== 'default' ? { backgroundColor: customBgColor } : {})
      }}
    >
      {currentTheme.decorative}
      
      <div className={cn("relative z-10 w-full flex flex-col h-full", 
        styleTheme === 'vintage' ? 'justify-center items-start' : 'justify-center items-center'
      )}>
        <div 
          className={cn("max-h-[85%] overflow-hidden", currentTheme.text)}
          style={{ ...customTextStyles, transition: 'all 0.3s ease' }}
        >
          {formattedText}
        </div>
        
        {author && (
          <p className={currentTheme.author}>
            {author}
          </p>
        )}
      </div>

      {/* TIKTOK SAFE ZONES OVERLAY */}
      {showSafeZones && format === 'tiktok' && (
        <div className="absolute inset-0 z-50 pointer-events-none border-[2px] border-red-500/50 flex flex-col justify-between">
          <div className="w-full h-[10%] bg-red-500/20 border-b border-red-500/50 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">Siguiendo / Para Ti</span>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="h-full w-[18%] bg-red-500/20 border-l border-red-500/50 flex items-center justify-center">
               <span className="text-white text-[10px] font-bold uppercase tracking-widest rotate-90 whitespace-nowrap drop-shadow-md">Iconos (Like, Guardar)</span>
            </div>
          </div>
          <div className="w-full h-[20%] bg-red-500/20 border-t border-red-500/50 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">Descripción y Audio</span>
          </div>
        </div>
      )}

      {/* INSTAGRAM STORY SAFE ZONES OVERLAY */}
      {showSafeZones && format === 'instagram_story' && (
        <div className="absolute inset-0 z-50 pointer-events-none border-[2px] border-blue-500/50 flex flex-col justify-between">
          <div className="w-full h-[12%] bg-blue-500/20 border-b border-blue-500/50 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">Barra Superior (Perfil)</span>
          </div>
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
