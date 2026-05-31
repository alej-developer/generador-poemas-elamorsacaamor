import { toPng } from 'html-to-image';

export const exportAsImage = async (element, imageFileName) => {
  if (!element) return;
  
  try {
    const dataUrl = await toPng(element, { 
      cacheBust: true,
      pixelRatio: 2, // Para alta calidad
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
      }
    });
    
    const link = document.createElement('a');
    link.download = `${imageFileName}.png`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Error exportando imagen:', err);
    alert('Hubo un error al exportar la imagen.');
  }
};
