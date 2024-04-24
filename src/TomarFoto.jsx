import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function TomarFotos() {
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    setShowCamera(true);

    const constraints = {
      video: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      })
      .catch((error) => {
        console.error('Error al acceder a la cámara:', error);
      });

    return () => {
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/jpeg');
    localStorage.setItem('capturedPhoto', dataURL);
    window.location.href = '/capture-photos';
  };

  return (
    <div className="container-camara">
      {showCamera && (
        <div className="video-container">
          <video ref={videoRef} autoPlay className="video"></video>
        </div>
      )}
      <button onClick={handleCapture} className="button-tomar-foto"><i className="fa-regular fa-circle"></i> Tomar Foto</button>
      <Link to="/fotos" className="button-regresar"><i className="fa-regular fa-circle-left"></i> Regresar</Link>
    </div>
  );
}

export default TomarFotos;
