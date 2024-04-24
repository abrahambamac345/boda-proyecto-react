import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate en lugar de useHistory
import { storage } from './firebase-config';
import AOS from 'aos';
import fotografia from './assets/img/fotografia.png'

function Photos() {
  const navigate = useNavigate(); // Usamos useNavigate en lugar de useHistory

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handleOpenCamera = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', handleFileSelect, false);
    input.click();
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    const imageRef = storage.ref().child('images/' + file.name);

    try {
      await imageRef.put(file);
      const imageUrl = await imageRef.getDownloadURL();
      console.log('Imagen subida y URL:', imageUrl);

      navigate(`/TomarFotos?image=${encodeURIComponent(imageUrl)}`); // Usamos navigate en lugar de history.push
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
    <button className='tfotos'>Subir Fotos</button>
    <button className='tfotos'>Comentario</button>
    </div>
   </section>

  );
}

export default Photos;
