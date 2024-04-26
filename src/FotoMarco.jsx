import React from 'react';
import { useLocation } from 'react-router-dom';

function FotoMarco() {
  const location = useLocation();
  const photoURL = location.state.photoURL;

  const handleDownloadWithFrame = () => {
    // Aquí puedes implementar la lógica para agregar un marco a la foto y luego descargarla
    // Por ahora, simplemente redirigiremos al usuario a la URL de la foto para descargarla
    window.open(photoURL);
  };

  return (
    <div>
      <h1>Foto con Marco</h1>
      <img src={photoURL} alt="Foto con marco" />
      <button onClick={handleDownloadWithFrame}>Descargar con Marco</button>
    </div>
  );
}

export default FotoMarco;
