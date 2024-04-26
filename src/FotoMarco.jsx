import React from 'react';
import { useLocation } from 'react-router-dom';

function FotoMarco() {
  const location = useLocation();
  const url = new URLSearchParams(location.search).get('url');

  return (
    <div>
      <h1>¡Aquí está tu foto!</h1>
      {url && <img src={url} alt="Tu foto" />}
    </div>
  );
}

export default FotoMarco;
