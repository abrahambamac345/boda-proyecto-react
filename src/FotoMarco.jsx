import React from 'react';
import { useLocation } from 'react-router-dom';

function FotoMarco() {
  const location = useLocation();
  const url = new URLSearchParams(location.search).get('url');

  const downloadPhoto = () => {
    if (!url) return;

    // Crear un enlace temporal para descargar la imagen
    const link = document.createElement('a');
    link.href = url;
    link.download = 'foto_original.jpg'; // Nombre del archivo a descargar

    // Simular un clic en el enlace para iniciar la descarga
    link.click();
  };

  return (
    <div>
      <h1 className='llos'>¡Aquí está tu foto!</h1>
      {url && (
        <div>
          <img src={url} alt="Tu foto" className="foto-original" />
          <button className="button-descargar" onClick={downloadPhoto}>Descargar Foto</button>
        </div>
      )}
    </div>
  );
}

export default FotoMarco;
