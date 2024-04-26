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
    if (!uploadedImageUrl) return; // Verificar si se ha cargado una imagen
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    const uploadedImage = new Image();
    uploadedImage.onload = () => {
      canvas.width = uploadedImage.width;
      canvas.height = uploadedImage.height;
  
      const defaultImage = new Image();
      defaultImage.onload = () => {
        // Dibujar la imagen del marco primero
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
  
        // Luego dibujar la imagen subida encima del marco
        ctx.drawImage(defaultImage, 0, 0, canvas.width, canvas.height);
  
        // Descargar la imagen combinada
        canvas.toBlob((blob) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'foto_con_marco.png'; // Nombre del archivo a descargar
          link.click();
        });
      };
      defaultImage.src = defaultImageUrl;
    };
    uploadedImage.src = uploadedImageUrl;
  };
  
  
  return (
    <div>
              <button onClick={handleDownload}>Descargar Foto con Marco</button>
      <h1>¡Agrega un marco a tu foto!</h1>
      {uploadedImageUrl && (
        <img src={uploadedImageUrl} alt="Foto cargada" />
      )}
      {defaultImageUrl && (
        <img src={defaultImageUrl} alt="Imagen predefinida" />
      )}

    </div>
  );
}

export default FotoMarco;
