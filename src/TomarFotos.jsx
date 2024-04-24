import React from 'react';
import { useLocation } from 'react-router-dom';

function TomarFotos() {
  const location = useLocation();
  const imageUrl = new URLSearchParams(location.search).get("image");

  return (
    <div>
      <h1>Tomar Fotos</h1>
      {imageUrl && <img src={imageUrl} alt="Imagen Tomada" />}
    </div>
  );
}

export default TomarFotos;
