import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import app from './firebase-config';
import Swal from 'sweetalert2';

import './gifts.css'; 

const db = getFirestore(app);

function Gifts() {
  const [gifts, setGifts] = useState([]);
  const currentUser = "Nombre del Usuario"; // Este valor debe ser dinámico y basado en la autenticación del usuario

  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "boda-gifts"), (snapshot) => {
      const giftList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setGifts(giftList);
    });

    return () => unsubscribe();
  }, []);


  const hasUserReserved = gifts.some(gift => gift.reservedBy === currentUser);

  const reserveGift = async (giftId) => {
    if (hasUserReserved) {
      // Reemplaza el alert con SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Ya has reservado un regalo',
        text: 'No puedes reservar más de uno.',
      });
      return;
    }
    await updateDoc(doc(db, "boda-gifts", giftId), { reservedBy: currentUser, status: "no disponible" });
  };

 const cancelReservation = async (giftId) => {
  const gift = gifts.find(gift => gift.id === giftId);
  if (gift && gift.reservedBy === currentUser) {
    // Mostrar un modal de confirmación con SweetAlert2
    const result = await Swal.fire({
      title: '¿Estás seguro de cancelar la reserva?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
      title: 'Reserva',
      text: `El regalo ${gift.name} está reservado por: ${gift.reservedBy}`,
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
  };
  

  return (
    <div>
      <table className="gifts-table">
        <thead>
          <tr>
            <th>Listado de regalos</th>
            <th>Elige tu regalo (Estado)</th>
            <th>Nombre Usuario</th>
            <th>Eliminar o visualizar</th>
          </tr>
        </thead>
        <tbody>
          {gifts.map((gift) => (
            <tr key={gift.id}>
              <td>{gift.name}</td>
              <td>{gift.status === 'disponible' ? 'Disponible' : 'No disponible'}</td>
              <td>{gift.reservedBy || 'N/A'}</td>
              <td>
                {gift.reservedBy === currentUser ? (
                  <button className="button-delete" onClick={() => cancelReservation(gift.id)}>
                    Cancelar Reserva
                  </button>
                ) : gift.status === 'disponible' ? (
                  <button className="button-reserve" onClick={() => reserveGift(gift.id)}>
                    Reservar
                  </button>
                ) : (
                  <button className="button-view" onClick={() => handleViewReservation(gift)}>Visualizar</button>
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
