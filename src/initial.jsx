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
 import icono1 from './assets/img/a (1).png'
 import icono2 from './assets/img/a (2).png'
 import icono3 from './assets/img/a (3).png'
 import icono4 from './assets/img/a (4).png'
 import dym from './assets/img/letras.png' 
 import vestimentas from './assets/img/vestimenta.png'
 import { Link } from 'react-router-dom';
 import Swal from 'sweetalert2';
 import AOS from 'aos';
import 'aos/dist/aos.css';
function Main() {
  AOS.init();
  const showLocationOptions = () => {
    Swal.fire({
      html:'<h1 class="iconos"><i class="fa-solid fa-map-location-dot"></i><h1/>',
      title: 'Selecciona la aplicación para dirigirte ala ubicación' ,
      customClass: {
        title: 'my-swal-title'
      },
      showCancelButton: true,
      confirmButtonText: '<i class="fa-regular fa-map"></i> Google Maps',
      cancelButtonText: '<i class="fa-brands fa-waze"></i> Waze Maps',
      showCloseButton: false, // Esto ocultará el botón de cerrar
      allowOutsideClick: true, // Esto permitirá cerrar la alerta al hacer clic fuera
    }).then((result) => {
      if (result.isConfirmed) {
        window.open("https://maps.app.goo.gl/Rqwz4C7SG7iaMt7z6", "_blank");
      } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
        window.open("https://waze.com/ul?ll=lat,long&navigate=yes", "_blank"); // Reemplaza lat,long con las coordenadas reales
      }
    });
  };
  

  return (
    <>
    <main>
    <section className="jardin">
        <div className="slider-jardin">
            <ul>
                <li><img src={jardin1} loading="lazy" alt="" /></li>
                <li><img src={jardin2} loading="lazy" alt="" /></li>
                <li><img src={jardin3} loading="lazy" alt="" /></li>
                <li><img src={jardin4} loading="lazy" alt="" /></li>
            </ul>
        </div>
        <div className='boda' data-aos="zoom-out-down" data-aos-duration="1000">
          <img src={anillo} alt="" className='anillo'/>
          <div className='curva'>
            <img className='estrellas'  src={estrella} alt="estrella"/>
            <h2 data-aos="fade-up">NUESTRA BODA</h2>
            <img className='estrellas' src={estrella} alt="estrella"/>
          </div>
          <div className='nuestra'>
            <img src={boda} loading="lazy" alt="" />
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
          <p className='frase2'>CON LA BENDICIÓN DE DIOS Y EN COMPAÑIA DE NUESTROS PADRES</p>
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
      <img src={marco} loading="lazy" alt="" className='marco' data-aos="fade-up"/>
      <img src={marco1} loading="lazy" alt="" className='marco1' data-aos="fade-up"/>
      <img src={marco21} loading="lazy" alt="" className='marco21'data-aos="fade-up"/>
      <img src={marco2} loading="lazy" alt="" className='marco2'data-aos="fade-up"/>
    </section>
     <section className='opciones'>
      <div className='carda'data-aos="fade-up" >
        <h2><i className="fa-solid fa-gift"></i></h2>
        <h1>REGALOS</h1>
        <Link to="/signin">Ver lista</Link>
      </div>
      <div className='carda' data-aos="fade-up">
      <h2><i className="fa-solid fa-location-dot"></i></h2>
      <h1>UBICACIÓN</h1>
      {/* Usa el evento onClick para llamar a la función de ubicación */}
      <button onClick={showLocationOptions} className='ubicacion'>Ubicación</button>
</div>
      <div className='carda' data-aos="fade-up">
        <h2><i className="fa-solid fa-clipboard-user"></i></h2>
        <h3>CONFIRMAR ASISTENCIA</h3>
        <a href="https://wa.me/56924780">Confirmar</a>
      </div>
      <div className='carda'data-aos="fade-up">
        <h2><i className="fa-solid fa-camera-retro"></i></h2>
        <h3>FOTOS Y BUENOS DESEOS</h3>
        <a href="">Compartir</a>
      </div>
    </section>
    <section className='vestimenta'>
      <h1 className='text-vesti' data-aos="fade-up">Código de Vestimenta</h1>
      <h2 data-aos="fade-up">FORMAL</h2>
      <img src={vestimentas} alt="icono de vestimenta" data-aos="fade-up"/>
    </section>
    <section className='cronograma' >
      <h1 className='text-crono' data-aos="fade-up">Cronograma</h1>
      <div className='linea' data-aos="fade-up">
        <article className='linea-principal'></article>
        <div className='cronograma-linea'>
          <div className='horario'>
              <img src={icono1} loading="lazy" alt="imagen de un jardin"/>
              <article className='linea-vertical'>
              </article>
              <article className='text-h'>
                <h1>Bienvenida</h1>
                <h2>12:00horas</h2>
              </article>
          </div>
          <div className='horario'>
              <img src={icono2} loading="lazy" alt="imagen de un jardin"/>
              <article className='linea-vertical'>
              </article>
             <article className='text-h'>
               <h1>Religiosa</h1>
               <h2>12:30horas</h2>
             </article>
          </div>
          <div className='horario'>
              <img src={icono3} loading="lazy" alt="imagen de un jardin"/>
              <article className='linea-vertical'>
              </article>
              <article className='text-h'>
                <h1>Recepción</h1>
                <h2>14:30horas</h2>
              </article>
          </div>
          <div className='horario'>
              <img src={icono4} loading="lazy" alt="imagen de un jardin"/>
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
      <h2 data-aos="fade-up">¡Te Esperamos!</h2>
      <h1 data-aos="fade-up">Danilo y Marcela</h1>
      <p>DISECKO GT - web 2024</p>
    </footer>
    </>
  )
}

export default Main
