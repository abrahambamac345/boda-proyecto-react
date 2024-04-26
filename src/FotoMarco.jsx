import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';

function FotoMarco() {
  const location = useLocation();
  const url = new URLSearchParams(location.search).get('url');
  const marcoRef = useRef(null);

  const downloadWithFrame = () => {
    if (!url) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const marcoImage = new Image();
    marcoImage.src = '/ruta/al/marco/decorativo.jpg'; // Reemplaza esto con la ruta real de tu marco decorativo
    marcoImage.onload = () => {
      canvas.width = marcoImage.width;
      canvas.height = marcoImage.height;

      ctx.drawImage(marcoImage, 0, 0);

      const photoImage = new Image();
      photoImage.crossOrigin = 'anonymous'; // Permitir el acceso a la imagen desde el DOM
      photoImage.src = url;
      photoImage.onload = () => {
        ctx.drawImage(photoImage, 20, 20, canvas.width - 40, canvas.height - 40); // Posicionar y ajustar el tamaño de la foto dentro del marco

        // Convertir el canvas a una URL de Blob
        canvas.toBlob((blob) => {
          // Crear un enlace para descargar la imagen
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'foto_con_marco.jpg'; // Nombre del archivo a descargar
          document.body.appendChild(link); // Añadir el enlace al DOM
          link.click(); // Hacer clic en el enlace
          document.body.removeChild(link); // Eliminar el enlace del DOM después de la descarga
        }, 'image/jpeg');
      };
    };
  };

  return (
    <div>
      <h1 className='llos'>¡Aquí está tu foto con el marco!</h1>
      {url && (
        <div className="marco-decorativo" ref={marcoRef}>
          <img src={url} alt="Tu foto" className="foto-con-marco" />
          <button className="button-descargar" onClick={downloadWithFrame}>Descargar con Marco</button>
        </div>
      )}
    </div>
  );
}

export default FotoMarco;
