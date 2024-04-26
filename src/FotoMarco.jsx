import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function FotoMarco() {
  const location = useLocation();
  const url = new URLSearchParams(location.search).get('url');
  const [frameLoaded, setFrameLoaded] = useState(false);

  useEffect(() => {
    const frameImage = new Image();
    frameImage.src = '/ruta/al/marco/decorativo.jpg'; // Reemplaza esto con la ruta real de tu marco decorativo
    frameImage.onload = () => {
      setFrameLoaded(true);
    };
  }, []);

  const downloadWithFrame = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const frameImage = new Image();
    frameImage.src = '/ruta/al/marco/decorativo.jpg'; // Reemplaza esto con la ruta real de tu marco decorativo
    frameImage.onload = () => {
      canvas.width = frameImage.width;
      canvas.height = frameImage.height;

      ctx.drawImage(frameImage, 0, 0);
      
      const photoImage = new Image();
      photoImage.src = url;
      photoImage.onload = () => {
        const photoWidth = frameImage.width * 0.8; // Ajusta el tamaño de la foto en relación al marco
        const photoHeight = photoImage.height * (photoWidth / photoImage.width);
        const x = (canvas.width - photoWidth) / 2;
        const y = (canvas.height - photoHeight) / 2;
        
        ctx.drawImage(photoImage, x, y, photoWidth, photoHeight);
        
        canvas.toBlob((blob) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'foto_con_marco.jpg';
          link.click();
        }, 'image/jpeg');
      };
    };
  };

  
  return (
    <div>
      <h1>¡Aquí está tu foto con el marco!</h1>
      {frameLoaded && (
        <div className="marco-decorativo">
          <img src={url} alt="Tu foto" style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }} />
          <button className="button-descargar" onClick={downloadWithFrame}>Descargar con Marco</button>
        </div>
      )}
    </div>
  );
}

export default FotoMarco;
