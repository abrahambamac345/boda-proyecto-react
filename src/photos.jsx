import React from 'react';
import { storage } from './firebase-config'; // Importar la instancia de Firebase Storage

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
    reader.onload = async (e) => {
      const imageFile = e.target.result;
      const storageRef = storage.ref(); // Obtener una referencia al Storage de Firebase
      const imageRef = storageRef.child('fotos/' + file.name); // Crear una referencia para la imagen en el Storage

      // Subir la imagen al Storage de Firebase
      try {
        await imageRef.putString(imageFile, 'data_url');
        const imageUrl = await imageRef.getDownloadURL();

        console.log('Imagen subida y URL:', imageUrl);

        // Redirigir a la página de TomarFotos
        window.location.href = '/TomarFotos';
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
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
