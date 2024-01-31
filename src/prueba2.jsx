import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import app from './firebase-config'; // Asegúrate de que la ruta es correcta para tu configuración

const db = getFirestore(app);

function Gifts() {
  const [gifts, setGifts] = useState([]);
  const [newGiftName, setNewGiftName] = useState(''); // Estado para el nombre del nuevo regalo

  useEffect(() => {
    // Función para obtener la lista de regalos desde Firestore
    const fetchGifts = async () => {
      const giftCollectionRef = collection(db, "boda-gifts"); // "gifts" es el nombre de tu colección en Firestore
      const giftSnapshot = await getDocs(giftCollectionRef);
      const giftList = giftSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGifts(giftList);
    };

    fetchGifts();
  }, []);

  // Función para añadir regalos
  const addGift = async () => {
    if (newGiftName.trim() === "") return;
    await addDoc(collection(db, "boda-gifts"), { name: newGiftName, reservedBy: "", status: "disponible" });
    setNewGiftName('');
    fetchGifts(); // Vuelve a obtener los regalos para actualizar la lista
  };

  // Función para reservar un regalo
  const reserveGift = async (id) => {
    await updateDoc(doc(db, "boda-gifts", id), { reservedBy: "Nombre del Usuario", status: "no disponible" });
    fetchGifts(); // Vuelve a obtener los regalos para actualizar la lista
  };

  // Función para eliminar un regalo
  const deleteGift = async (id) => {
    await deleteDoc(doc(db, "boda-gifts", id));
    setGifts(gifts.filter(gift => gift.id !== id));
  };

  return (
    <div>
      {/* Input y botón para agregar un nuevo regalo */}
      <input 
        type="text"
        placeholder="Nombre del regalo"
        value={newGiftName}
        onChange={(e) => setNewGiftName(e.target.value)}
      />
      <button onClick={addGift}>Agregar Regalo</button>

      {/* Lista de regalos */}
      {gifts.map((gift) => (
        <div key={gift.id}>
          <span>{gift.name}</span>
          {' '}
          {gift.status === 'disponible' ? (
            <>
              <span>Disponible</span>
              <button onClick={() => reserveGift(gift.id)}>Reservar</button>
            </>
          ) : (
            <>
              <span>No Disponible</span>
              {/* Solo muestra el botón de eliminar si el regalo está reservado */}
              {gift.reservedBy && (
                <button onClick={() => deleteGift(gift.id)}>Eliminar</button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Gifts;
