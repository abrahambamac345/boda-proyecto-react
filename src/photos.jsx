// photos.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from './firebase-config';

import fotografia from './assets/img/fotografia.png';

function Photos() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleOpenCamera = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', handleFileSelect, false);
    input.click();
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Selecciona una imagen primero.');
      return;
    }
  
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${file.name}`);
  
    try {
      console.log('Subiendo imagen...');
      await imageRef.put(file);
      console.log('Imagen subida con éxito.');
  
      const imageUrl = await imageRef.getDownloadURL();
      console.log('URL de la imagen:', imageUrl);
  
      // Redirigir a TomarFoto.jsx
      navigate(`/TomarFoto?image=${encodeURIComponent(imageUrl)}`);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  return (
    <section className='compartir'>
    <h1 className='text-vesti' >"Se Parte de Nuestra Historia"</h1>
    <h2 className='text-fotos' >Comparte una fotografía o un comentario</h2>
    <div className='fotor'>
      <img src={fotografia} loading="lazy" alt="imagen de un jardin" className='fotografia'/>
    </div>
    <div className='boton-FSC'>
      <button className='tfotos' onClick={handleOpenCamera}>Tomar Fotos</button>
      <button className='tfotos' onClick={handleUpload}>Subir Fotos</button>
      <button className='tfotos'>Comentario</button>
    </div>
  </section>
  );
}

export default Photos;
