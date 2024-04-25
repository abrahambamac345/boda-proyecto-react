import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import fotografia from './assets/img/fotografia.png';

const storage = getStorage();

function photos() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Obtener el progreso de carga como un porcentaje
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Progreso de carga:', progress + '%');
        },
        (error) => {
          console.error('Error al cargar el archivo:', error);
        },
        () => {
          // Carga completada con éxito
          console.log('Archivo cargado con éxito');
        }
      );
    }
  };

  const handleOpenCamera = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*, video/*'; // Acepta tanto imágenes como videos
    input.addEventListener('change', handleFileChange, false);
    input.click();
  };

  return (
    <section className='compartir'>
      <h1 className='text-vesti' >"Se Parte de Nuestra Historia"</h1>
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

export default photos;
