import React from 'react';
import { useLocation } from 'react-router-dom';
import { saveAs } from 'file-saver';

function FotoMarco() {
  const location = useLocation();
  const imageUrl = new URLSearchParams(location.search).get('url');

  const downloadPhoto = async () => {
    try {
      // Descargar la imagen utilizando FileSaver.js
      saveAs(imageUrl, 'nombre_de_la_imagen.png'); // Cambia 'nombre_de_la_imagen.png' por el nombre que desees para el archivo descargado
    } catch (error) {
      console.error('Error al descargar la foto:', error);
    }
  };

  return (
    <div>
      <h1 className='llos'>¡Aquí está tu foto!</h1>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Tu foto" className="foto-original" />
          <button className="button-descargar" onClick={downloadPhoto}>Descargar Foto</button>
        </div>
      )}
    </div>
  );
}

export default FotoMarco;
