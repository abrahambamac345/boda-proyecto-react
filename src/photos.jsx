import React from 'react';
import { Link } from 'react-router-dom';

function Photos() {
  const handleOpenCamera = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Para que abra la cámara trasera en dispositivos móviles
    input.addEventListener('change', handleFileSelect, false);
    input.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      localStorage.setItem('tomarfotos', e.target.result);
      window.location.href = '/TomarFotos';
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className='compartir'>
      <h1 className='text-vesti'>"Se Parte de Nuestra Historia"</h1>
      <h2 className='text-fotos'>Comparte una fotografía o un comentario</h2>
      <div className='boton-FSC'>
        <button onClick={handleOpenCamera} className='tfotos'>Tomar Fotos</button>
        <button className='tfotos'>Subir Fotos</button>
        <button className='tfotos'>Comentario</button>
      </div>
    </section>
  );
}

export default Photos;
