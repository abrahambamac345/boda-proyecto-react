import React, { useState } from 'react';
import { storage } from './firebase-config';

function TomarFotos() {
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const handleUpload = async () => {
    if (capturedPhoto) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`photos/${Date.now()}.jpg`);

      try {
        await fileRef.putString(capturedPhoto, 'data_url');
        alert('Foto subida exitosamente');
        setCapturedPhoto(null);
      } catch (error) {
        console.error('Error al subir la foto:', error);
      }
    } else {
      alert('No hay foto para subir');
    }
  };

  const handleDelete = () => {
    setCapturedPhoto(null);
  };

  return (
    <div className="container-camara">
      {capturedPhoto ? (
        <div className="foto-capturada">
          <img src={capturedPhoto} alt="Foto capturada" className="foto" />
          <div className="botones">
            <button onClick={handleUpload} className="button-subir">Subir</button>
            <button onClick={handleDelete} className="button-eliminar">Eliminar</button>
          </div>
        </div>
      ) : (
        <div className="mensaje-vacio">No se ha capturado ninguna foto</div>
      )}
    </div>
  );
}

export default TomarFotos;
