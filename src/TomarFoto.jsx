import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function TomarFotos() {
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const videoRef = useRef();

  const handleCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Para que abra la cámara trasera en dispositivos móviles
    input.addEventListener('change', handleFileSelect, false);
    input.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setCapturedPhoto(e.target.result);
      // Aquí puedes guardar la imagen en la base de datos o hacer otras operaciones
    };
    reader.readAsDataURL(file);
  };

  const handleBack = () => {
    setCapturedPhoto(null);
  };


  return (
    <div className="container-camara">
      {capturedPhoto ? (
        <div className="foto-capturada">
          <img src={capturedPhoto} alt="Foto capturada" className="foto" />
          <div className="botones">
            <button onClick={handleCapture} className="button-tomar-otra">Tomar otra foto</button>
            <Link to="/fotos" className="button-subir">Subir Foto</Link>
            <button onClick={handleBack} className="button-regresar">Regresar</button>
          </div>
        </div>
      ) : (
        <div className="video-container">
          <video ref={videoRef} autoPlay className="video" />
          <button onClick={handleCapture} className="button-tomar-foto">Tomar Foto</button>
        </div>
      )}
    </div>
  );
}

export default TomarFotos;
