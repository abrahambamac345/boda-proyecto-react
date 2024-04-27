import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import defaultImage1 from './assets/img/marcoboda (1).png';
import defaultImage2 from './assets/img/marcoboda (3).png';
import fotografia from './assets/img/fotografia.png';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

function FotoMarco() {
  const location = useLocation();
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [selectedFrame, setSelectedFrame] = useState(defaultImage1);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const url = searchParams.get('url');
    if (url) {
      setUploadedImageUrl(url);
      const img = new Image();
      img.onload = () => {
        setImageWidth(img.width);
        setImageHeight(img.height);
      };
      img.src = url;
    }
  }, [location.search]);

  const handleDownload = async () => {
    if (!uploadedImageUrl) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const uploadedImage = new Image();
    uploadedImage.crossOrigin = 'anonymous';
    uploadedImage.onload = () => {
      canvas.width = uploadedImage.width;
      canvas.height = uploadedImage.height;

      const frameImage = new Image();
      frameImage.crossOrigin = 'anonymous';
      frameImage.onload = async () => {
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL('image/png');

        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + Date.now() + '.png');
        canvas.toBlob(async (blob) => {
          await uploadBytes(storageRef, blob);
          console.log('Image with frame uploaded to Firebase Storage');
        }, 'image/png');
        
        // Descargar la imagen con el marco
        const link = document.createElement('a');
        link.href = dataURL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.download = 'foto_con_marco.png';
        link.click();
      };
      frameImage.src = selectedFrame;
    };
    uploadedImage.src = uploadedImageUrl;
  };

  const handleFrameChange = (event) => {
    setSelectedFrame(event.target.value);
  };

  return (
    <div>
      <div className='foto-marco-container'>
        <div className="image-container">
          {uploadedImageUrl && (
            <img src={uploadedImageUrl} alt="Uploaded" className="default-image" style={{ width: imageWidth, height: imageHeight }} />
          )}
          {selectedFrame && (
            <img src={selectedFrame} alt="Selected Frame" className="uploaded-image" style={{ width: imageWidth, height: imageHeight }} />
          )}
        </div>
      </div>
      <hr />
      <div className='sss'>
        <h1 className='text-vesti'>Descarga un Recuerdo!</h1>
        <select onChange={handleFrameChange} className="form-select form-select-lg mb-3 select-colore">
          <option value={defaultImage1} className='optiona'>Marco 1</option>
          <option value={defaultImage2}>Marco 2</option>
        </select>
        <button onClick={handleDownload} className='tfotos'>Descargar Imagen</button>
        <Link to="/fotos" className='tfotos link-fotos'>Tomar otra foto</Link>
      </div>
      <div className='fotora'> 
        <img src={fotografia} loading="lazy" alt="Garden Image" className='fotografia'/>
      </div> 
      <footer>
      <h2 >¡Gracias por estar!</h2>
      <h1 >Danilo y Marcela</h1>
      <p>DISECKO GT - web 2024</p>
      </footer>
    </div>
  );
}

export default FotoMarco;
