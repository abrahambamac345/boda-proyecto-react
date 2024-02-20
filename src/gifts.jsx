import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import app from './firebase-config';
import Swal from 'sweetalert2';
import './gifts.css'; 
import { useNavigate } from 'react-router-dom';

const db = getFirestore(app);
const auth = getAuth(app); // Inicializa la autenticación de Firebase

function Gifts() {
  const [gifts, setGifts] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState(null); // Almacenará el correo del usuario actual
  const navigate = useNavigate();

  useEffect(() => {
    // Establecer el observador para el estado de autenticación
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si hay un usuario, actualiza el correo electrónico
        setCurrentUserEmail(user.email);
      } else {
        // Si no hay usuario, establece el correo electrónico en null
        setCurrentUserEmail(null);
      }
    });

    // Establecer el observador para la colección de regalos
    const unsubscribeGifts = onSnapshot(collection(db, "boda-gifts"), (snapshot) => {
      const giftList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setGifts(giftList);
    });

    // Función de limpieza para desuscribirse de los observadores cuando el componente se desmonte
    return () => {
      unsubscribeAuth();
      unsubscribeGifts();
    };
  }, []);

  const hasUserReserved = gifts.some(gift => gift.reservedBy === currentUserEmail);

  const reserveGift = async (giftId) => {
    if (!currentUserEmail) {
      // Si no hay un usuario autenticado, muestra un mensaje
      Swal.fire('Por favor, inicia sesión para reservar un regalo.');
      return;
    }

    if (hasUserReserved) {
      // Si el usuario ya ha reservado un regalo, muestra un error
      Swal.fire({
        icon: 'error',
        title: 'Ya has reservado un regalo',
        text: 'No puedes reservar más de uno.',
      });
      return;
    }
    
    // Si no hay reservas previas, procede a reservar el regalo
    await updateDoc(doc(db, "boda-gifts", giftId), { reservedBy: currentUserEmail, status: "no disponible" });
  };


  const cancelReservation = async (giftId) => {
    const gift = gifts.find(gift => gift.id === giftId);
    if (gift && gift.reservedBy === currentUserEmail) {
      // Mostrar un modal de confirmación con SweetAlert2
      const result = await Swal.fire({
        title: '¿Estás seguro de cancelar la reserva?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'blue',
        cancelButtonColor: 'red',
        confirmButtonText: 'Sí, cancelar reserva',
        cancelButtonText: 'Cancelar',
      });
  
      if (result.isConfirmed) {
        // El usuario confirmó la cancelación, realizar la acción
        await updateDoc(doc(db, "boda-gifts", giftId), { reservedBy: "", status: "disponible" });
      }
    } else {
      alert('No puedes cancelar la reserva de un regalo que no reservaste.');
    }
  };

  
    const handleViewReservation = (gift) => {
      Swal.fire({
        title: 'Reservado',
        text: `El regalo ${gift.name} está reservado.`,
        icon: 'info',
        confirmButtonText: 'Cerrar',
      });
    };
    


    const handleSignOut = async () => {
      try {
        await signOut(auth);
        Swal.fire('Has cerrado sesión.');
        navigate('/'); // Usa la ruta donde se encuentra tu componente Initial.jsx
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        Swal.fire('Error', 'No se pudo cerrar sesión', 'error');
      }
    };
    
    return (
      <div className='backback'>
        <nav className="navbar navbar-expand-lg navbar-bg px-5 ">
  <div className="navs">
  <a className="navbar-brand text-white" href="#"><i className="fa-solid fa-gift"></i> LISTA DE REGALOS</a>
 <div className='apartado'>
   <a className="nav-link active text-white" aria-current="page" href="#">Home</a>
   <button className='btn botoncerrar' onClick={handleSignOut}>Cerrar Sesión</button>
 </div >
  </div>
</nav>
        <table className="gifts-table ">
        <thead className=''>
          <tr>
            <th>Lista</th>
            <th>Estado</th>
            {/* <th>Nombre Usuario</th> */}
            <th>Reservar</th>
          </tr>
        </thead>
          <tbody>
            {gifts.map((gift) => (
              <tr key={gift.id}>
              <td className='td-left'>{gift.name}</td>
              <td>{gift.status === 'disponible' ? 'Disponible' : 'No disponible'}</td>
              {/* <td>{gift.reservedBy || 'N/A'}</td> */}
                <td>
                {gift.reservedBy === currentUserEmail ? (
    <button className="button-delete" onClick={() => cancelReservation(gift.id)}>
      Cancelar Reserva
    </button>
  ) : gift.status === 'disponible' ? (
    <button className="button-reserve" onClick={() => reserveGift(gift.id)}>
      Reservar
    </button>
  ) : (
    <button className="button-view" onClick={() => handleViewReservation(gift)}>
      Visualizar
    </button>
  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  

export default Gifts;
