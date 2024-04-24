import React from 'react'
import fotografia from './assets/img/fotografia.png'

function photos() {
  return (
   <section className='compartir'>
    <h1 className='text-vesti' >"Se Parte de Nuestra Historia"</h1>
    <h2 className='text-fotos' >Comparte una fotografía o un comentario</h2>
    <div className='fotor'>
    <img src={fotografia} loading="lazy" alt="imagen de un jardin" className='fotografia'/>
    </div>
    <div className='boton-FSC'>
    <button className='tfotos'>Tomar Fotos</button>
    <button className='tfotos'>Subir Fotos</button>
    <button className='tfotos'>Comentario</button>
    </div>
   </section>
  )
}

export default photos