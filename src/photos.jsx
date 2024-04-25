import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import fotografia from './assets/img/fotografia.png';

const storage = getStorage();

function Photos() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No se ha seleccionado ningún archivo para subir');
      return;
    }

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      console.log('Subiendo archivo...');
      await uploadTask;
      console.log('Archivo subido con éxito');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  const handleOpenCamera = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*, video/*'; // Acepta tanto imágenes como videos
    input.capture = 'environment'; // Captura desde la cámara trasera del dispositivo si está disponible
    input.addEventListener('change', handleFileChange, false);
    input.click();
  };

  return (
    <section className='compartir'>
      <h1 className='text-vesti' >"Parte de Nuestra Historia"</h1>
      <h2 className='text-fotos' >Comparte una fotografía o un comentario</h2>
      <div className='fotor'>
        <img src={fotografia} loading="lazy" alt="imagen de un jardin" className='fotografia'/>
      </div>
      <div className='boton-FSC'>
        <button className='tfotos' onClick={handleOpenCamera}>Tomar Fotos o Grabar Video</button>
        <button className='tfotos' onClick={handleUpload}>Subir Archivo</button>
        <button className='tfotos'>Comentario</button>
      </div>
    </section>
  );
}

export default Photos;
