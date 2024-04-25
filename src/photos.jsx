import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import fotografia from './assets/img/fotografia.png';

const storage = getStorage();

function Photos() {
  const [downloadURL, setDownloadURL] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    try {
      const storageRef = ref(storage, `uploads/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      console.log('Archivo subido con éxito');
      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);

      // Descargar automáticamente el archivo
      const link = document.createElement('a');
      link.href = url;
      link.download = selectedFile.name;
      link.click();
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  const handleTakePhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.addEventListener('change', handleFileChange, false);
    input.click();
  };

  const handleRecordVideo = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.capture = 'camcorder';
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
        <button className='tfotos' onClick={handleTakePhoto}>Tomar Foto</button>
        <button className='tfotos' onClick={handleRecordVideo}>Grabar Video</button>
        <button className='tfotos'>Subiendo...</button>
        <button className='tfotos' onClick={() => { if (downloadURL) { window.open(downloadURL); } }}>Descargar Foto</button>
        <button className='tfotos'>Comentario</button>
      </div>
    </section>
  );
}

export default Photos;
