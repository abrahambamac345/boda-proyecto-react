 import jardin1 from './assets/img/2.png'
 import jardin2 from './assets/img/3.png'
 import jardin3 from './assets/img/4.png'
 import jardin4 from './assets/img/5.png'
 import anillo from './assets/img/anillos.png'
 import marco from './assets/img/dorado3.png'
 import marco1 from './assets/img/DORADO12.png'
 import marco2 from './assets/img/dorado5.png'
 import marco21 from './assets/img/DORADO21.png'
 import estrella from './assets/img/estrella.png'
 import boda from './assets/img/boda.png'
/*  import flores1 from './assets/img/6.png'
 import flores2 from './assets/img/7.png' */  
 import icono1 from './assets/img/a (1).png'
 import icono2 from './assets/img/a (2).png'
 import icono3 from './assets/img/a (3).png'
 import icono4 from './assets/img/a (4).png'
 import dym from './assets/img/letras.png' 
 import { Link } from 'react-router-dom';
 
function Main() {


  return (
    <>
    <main>
    <section className="jardin">
        <div className="slider-jardin">
            <ul>
                <li><img src={jardin1} alt="" /></li>
                <li><img src={jardin2} alt="" /></li>
                <li><img src={jardin3} alt="" /></li>
                <li><img src={jardin4} alt="" /></li>
            </ul>
        </div>
        <div className='boda' data-aos="zoom-out-down" data-aos-duration="1000">
          <img src={anillo} alt="" className='anillo'/>
          <div className='curva'>
            <img className='estrellas' src={estrella} alt="estrella"/>
            <h2 >NUESTRA BODA</h2>
            <img className='estrellas' src={estrella} alt="estrella"/>
          </div>
          <div className='nuestra'>
            <img src={boda} alt="" />
          </div>
          <h3 ></h3>
          <article className='dymboda'>
            <h1 className='d'>Danilo</h1>
            <div className='y'><article></article><h1>y</h1><article></article></div>
            <h1 className='m'>Marcela</h1>
          </article>
          <p className='mateo'>Queremos que seas parte de este momento tan especial en nuestras vidas...</p>
        </div>
    </section> 
    <section className='inv' id='inv'>
      <div className='invitacion 'data-aos="zoom-out-down"data-aos-duration="1000">
          <h1 className='invitado'>NUESTRA BODA</h1>
          <img src={dym} alt="Danilo y Marcela" className='dym' />
          <p className='frase1'>TENEMOS EL HONOR DE INVITARLOS A NUESTRA BODA EL PRÓXIMO</p>
        {/*   <p className='frase1'>Queremos que seas parte de este momento tan especial...</p> */}
          <div className='fecha'>
            <div className='dia-mes'>
            <article></article>
            <h1>SÁBADO</h1>
            <article></article>
            </div>
            <div className='dia'>
              <h1>27</h1>
            </div>
            <div className='dia-mes'>
            <article></article>
            <h1>ABRIL</h1>
            <article></article>
            </div>
          </div>
          <h3 className='lugar'>LUGAR: JARDÍN LAS ORQUIDEAS</h3>
          <p className='frase2'>CON LA BENDICION DE DIOS Y EN COMPAÑIA DE NUESTROS PADRES</p>
          <div className='padres'>
              <article>
                <h1>Daniel Cal</h1>
                <h1>Silda de León</h1>
              </article>
              <article>
                <h1>Rolando Nij</h1>
                <h1>Marta Flores</h1>
              </article>
          </div>
          <p className='frase3'>Como ya no son dos sino uno, que nadie separe lo que Dios ha unido. Mateo 19:6 </p>
      </div>
      <img src={marco} alt="" className='marco'/>
      <img src={marco1} alt="" className='marco1'/>
      <img src={marco21} alt="" className='marco21'/>
      <img src={marco2} alt="" className='marco2'/>
     {/*  <img src={flores1} alt="" className='flores1' />
      <img src={flores2} alt="" className='flores2' /> */}
    </section>
     <section className='opciones'>
      <div className='carda'>
        <h2><i className="fa-solid fa-gift"></i></h2>
        <h1>REGALOS</h1>
        <Link to="/signin">Ver lista</Link>
        
      </div>
      <div className='carda'>
        <h2><i className="fa-solid fa-location-dot"></i></h2>
        <h1>UBICACIÓN</h1>
        <a href="https://maps.app.goo.gl/Rqwz4C7SG7iaMt7z6">ver ubicación</a>
      </div>
      <div className='carda'>
        <h2><i className="fa-solid fa-camera-retro"></i></h2>
        <h3>COMPARTE FOTOS</h3>
        <a href="">ver lista</a>
      </div>
      <div className='carda'>
        <h2><i className="fa-solid fa-shirt"></i></h2>
        <h1>VESTIMENTA FORMAL</h1>
      </div>
    </section>
    <section className='cronograma'>
      <h1 className='text-crono'>Cronograma</h1>
      <div className='linea'>
        <article className='linea-principal'></article>
        <div className='cronograma-linea'>
          <div className='horario'>
              <img src={icono1} alt="imagen de un jardin"/>
              <article className='linea-vertical'>
              </article>
              <article className='text-h'>
                <h1>Bienvenida</h1>
                <h2>12:00horas</h2>
              </article>
          </div>
          <div className='horario'>
              <img src={icono2} alt="imagen de un jardin"/>
              <article className='linea-vertical'>
              </article>
             <article className='text-h'>
               <h1>Religiosa</h1>
               <h2>12:30horas</h2>
             </article>
          </div>
          <div className='horario'>
              <img src={icono3} alt="imagen de un jardin"/>
              <article className='linea-vertical'>
              </article>
              <article className='text-h'>
                <h1>Recepción</h1>
                <h2>14:30horas</h2>
              </article>
          </div>
          <div className='horario'>
              <img src={icono4} alt="imagen de un jardin"/>
              <article className='linea-vertical'>
              </article>
              <article className='text-h'>
                <h1>Banquete</h1>
                <h2>15:00horas</h2>
              </article>
          </div>
        </div>
      </div>
    </section>
    
    </main>
    <footer>
      <h2>¡Te Esperamos!</h2>
      <h1>Danilo y Marcela</h1>
      <p>DISECKO GT - web 2024</p>
    </footer>
    </>
  )
}

export default Main
