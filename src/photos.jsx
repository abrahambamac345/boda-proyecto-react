import React from 'react';
import { Link } from 'react-router-dom';
import fotografia from './assets/img/fotografia.png'
function Photos() {
  return (
    <section className='compartir'>
      <h1 className='text-vesti'>"Se Parte de Nuestra Historia"</h1>
      <h2 className='text-fotos'>Comparte una fotografía o un comentario</h2>
      <div className='fotor'>
    <img src={fotografia} loading="lazy" alt="imagen de un jardin" className='fotografia'/>
    </div>

      <div className='boton-FSC'>
        <Link to="/tomarfotos" className='tfotos'>Tomar Fotos</Link>
        <button className='tfotos'>Subir Fotos</button>
        <button className='tfotos'>Comentario</button>
      </div>
    </section>
  );
}

export default Photos;
