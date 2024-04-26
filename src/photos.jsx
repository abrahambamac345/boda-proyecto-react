import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fotografia from './assets/img/fotografia.png'

function Photos() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay una imagen cargada automáticamente al montar el componente
    if (uploadedImageUrl) {
      navigate(`/FotoMarco?url=${encodeURIComponent(uploadedImageUrl)}`);
    }
  }, [uploadedImageUrl, navigate]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    // Validar si el archivo es de tipo imagen
    if (!selectedFile.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (png o jpg)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setUploadedImageUrl(e.target.result);
    reader.readAsDataURL(selectedFile);
  };

  // Función para abrir el selector de archivos
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <section className='compartir'>
      <h1 className='text-vesti' >"Se Parte de Nuestra Historia"</h1> 
      <h2 className='text-fotos' >Comparte una fotografía o un comentario</h2> 
      <div className='fotor'> 
      <img src={fotografia} loading="lazy" alt="imagen de un jardin" className='fotografia'/>
      </div> 
      <div className='boton-FSC'> 
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }} // Ocultar el input
      />
      <button className='tfotos' onClick={openFilePicker}>Seleccionar Foto</button>
      <button className='tfotos'>Subir Fotos</button> 
      <button className='tfotos'>Comentario</button> 
      </div> 


     
    </section>
  );
}

export default Photos;
