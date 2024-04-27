import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import defaultImage1 from './assets/img/marcoboda (1).png'; // Importar la imagen predefinida del primer marco
import defaultImage2 from './assets/img/marcoboda (2).png'; // Importar la imagen predefinida del segundo marco

function FotoMarco() {
  const location = useLocation();
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [selectedFrame, setSelectedFrame] = useState(defaultImage1); // Estado para almacenar el marco seleccionado
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const url = searchParams.get('url');
    if (url) {
      setUploadedImageUrl(url);
      // Obtener las dimensiones de la imagen cargada
      const img = new Image();
      img.onload = () => {
        setImageWidth(img.width);
        setImageHeight(img.height);
      };
      img.src = url;
    }
  }, [location.search]);

  const handleDownload = () => {
    if (!uploadedImageUrl) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const uploadedImage = new Image();
    uploadedImage.onload = () => {
      canvas.width = uploadedImage.width;
      canvas.height = uploadedImage.height;

      const frameImage = new Image();
      frameImage.onload = () => {
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataURL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.download = 'foto_con_marco.png';

        link.click();
      };
      frameImage.src = selectedFrame; // Usa el marco seleccionado
    };
    uploadedImage.src = uploadedImageUrl;
  };

  // Función para manejar el cambio de marco seleccionado
  const handleFrameChange = (event) => {
    setSelectedFrame(event.target.value);
  };

  return (
    <div>
      <div className='foto-marco-container'>
        <div className="image-container">
          {uploadedImageUrl && (
            <img src={uploadedImageUrl} alt="Foto cargada" className="default-image" style={{ width: imageWidth, height: imageHeight }} />
          )}
          {selectedFrame && (
            <img src={selectedFrame} alt="Marco seleccionado" className="uploaded-image" style={{ width: imageWidth, height: imageHeight }} />
          )}
        </div>
      </div>
      <div className='sss'>
        <h1 className='text-vesti'>Descarga un recuerdo!</h1>
        <select onChange={handleFrameChange} className="form-select form-select-lg mb-3 select-colore">
          <option value={defaultImage1} className='optiona'>Marco 1</option>
          <option value={defaultImage2}>Marco 2</option>
        </select>
        <button onClick={handleDownload} className='tfotos'>Descargar Foto</button>
        <Link to="/photos" className='tfotos link-fotos'>Tomar otra foto</Link> {/* Botón para regresar a photos.jsx */}
      </div>
    </div>
  );
}

export default FotoMarco;
