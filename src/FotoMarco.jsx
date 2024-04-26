import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import defaultImage from './assets/img/DORADO12.png'; // Importar la imagen predefinida

function FotoMarco() {
  const location = useLocation();
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [defaultImageUrl, setDefaultImageUrl] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const url = searchParams.get('url');
    if (url) {
      setUploadedImageUrl(url);
    }

    // Asignar la ruta de la imagen predefinida importada
    setDefaultImageUrl(defaultImage);
  }, [location.search]);

  const handleDownload = () => {
    if (!uploadedImageUrl) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const uploadedImage = new Image();
    uploadedImage.onload = () => {
      canvas.width = uploadedImage.width;
      canvas.height = uploadedImage.height;

      const defaultImage = new Image();
      defaultImage.onload = () => {
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(defaultImage, 0, 0, canvas.width, canvas.height);

        // Convertir el canvas a una URL de datos
        const dataURL = canvas.toDataURL('image/png');

        // Crear un enlace para abrir la imagen combinada en una nueva pestaña
        const link = document.createElement('a');
        link.href = dataURL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.download = 'foto_con_marco.png'; // Nombre del archivo a descargar

        // Simular un clic en el enlace para abrirlo en una nueva pestaña
        link.click();
      };
      defaultImage.src = defaultImageUrl;
    };
    uploadedImage.src = uploadedImageUrl;
  };

  return (
  <div>
      <div className='foto-marco-container'>
        <div className="image-container">
          {uploadedImageUrl && (
            <img src={uploadedImageUrl} alt="Foto cargada" className="default-image" />
          )}
          {defaultImageUrl && (
            <img src={defaultImageUrl} alt="Imagen predefinida" className="uploaded-image" />
          )}
        </div>
      </div>
     <div className='sss'>
         <h1 className='text-vesti'>Descarga un recuerdo!</h1>
           <button onClick={handleDownload} className='tfotos'>Descargar Foto con Marco</button>
     </div>
  </div>
  );
}

export default FotoMarco;