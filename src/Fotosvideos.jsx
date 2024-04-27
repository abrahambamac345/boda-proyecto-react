import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import fotografia from './assets/img/fotografias.png';

function Fotosvideos() {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);

    const storage = getStorage();
    const imageStorageRef = ref(storage, 'images');
    const videoStorageRef = ref(storage, 'videos');

    const promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileRef = file.type.startsWith('image') ? ref(imageStorageRef, file.name) : ref(videoStorageRef, file.name);
      promises.push(uploadBytes(fileRef, file));
    }

    try {
      await Promise.all(promises);
      Swal.fire('¡Éxito!', 'Los archivos se han subido exitosamente.', 'success');
    } catch (error) {
      console.error('Error al subir los archivos:', error);
      Swal.fire('Error', 'Ocurrió un error al subir los archivos. Por favor, inténtalo de nuevo.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='compartir'>
      <nav className='navbar-photo'>
        <Link to="/fotos" className='goback'><i className="fa-solid fa-tent-arrow-left-right"></i> Regresar</Link>
      </nav>
      <h1 className='text-vesti'>"Comparte los mejores momentos"</h1>
      <h2 className='text-fotos'>Puedes compartir fotos o videos</h2>
      <div className='fotor'>
        <img src={fotografia} loading="lazy" alt="imagen de un jardin" className='fotografia' />
      </div>
      <div className='boton-FSC'>
        <input
          type="file"
          accept="image/*, video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
        />
        <button className='tfotos' onClick={() => fileInputRef.current.click()}>
          {loading ? 'Cargando...' : '¡Subir Aquí!'}
        </button>
      </div>
      <div className='instrucciones'>
        <p className='parrafos'>¡Disfruta de este día especial y comparte tus recuerdos con nosotros!</p><br />
        {/* Resto del contenido del componente */}
      </div>
      <footer>
        <h2>¡Gracias por estar!</h2>
        <h1>Danilo y Marcela</h1>
        <p>DISECKO GT - web 2024</p>
      </footer>
    </section>
  );
}

export default Fotosvideos;
