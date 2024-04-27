import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
     <nav className='navbar-photo'>
     <Link to="/" className='goback'><i className="fa-solid fa-tent-arrow-left-right"></i> Regresar</Link>
     </nav>
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
      <button className='tfotos' onClick={openFilePicker}>Tomar foto</button>
      <Link to="/Fotosvideos" className='tfotos'>Fotos y videos</Link>
      </div> 
      <hr />
      <div className='instrucciones'>
        <h1 className='text-vesti'>Instrucciones</h1>
        <p className='parrafos'>En esta sección encontrarás las instrucciones para compartir tus momentos especiales con nosotros.</p>
        <div className="accordion " id="accordionExample">
  <div className="accordion-item acord">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Tomar Foto - Marco Decorativo
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Presiona este botón para capturar los bellos momentos que has vivido en este día tan especial. Al hacerlo, se te pedirá acceso a tu cámara para que puedas tomar la foto. Una vez que hayas capturado ese bello momento, podrás acceder a los marcos conmemorativos de este día y descargar tu imagen con el marco que más te guste.
      </div>
    </div>
  </div>

  <div className="accordion-item acord">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Subir Fotos
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Este botón te permite compartir imágenes de manera masiva, permitiéndonos a ambos tener los mejores recuerdos juntos. ¡Comparte tus momentos más memorables con nosotros!
      </div>
    </div>
  </div>

  <div className="accordion-item acord">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Subir Videos
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Con este botón, podrás compartir videos de manera masiva para que tú y yo tengamos los mejores recuerdos juntos. ¡Comparte los momentos más especiales de este día en movimiento!
      </div>
    </div>
  </div>
        </div>
        <p className='parrafos py-4'>¡Disfruta de este día especial y comparte tus recuerdos con nosotros!</p>
      </div>
       <footer>
      <h2 >¡Gracias por estar!</h2>
      <h1 >Danilo y Marcela</h1>
      <p>DISECKO GT - web 2024</p>
    </footer>
    </section>
    
  );
}

export default Photos;