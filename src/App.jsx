import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Gifts from './gifts';
import AdminGifts from './admin-regalos';
import Photoshare from './photos';
import Main from './initial'; 
import FotoMarco from './FotoMarco'; 
import FotosVideos from './Fotosvideos'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/regalos" element={<Gifts />} />
        <Route path="/admin" element={<AdminGifts />} />
        <Route path="/fotos" element={<Photoshare />} />
        <Route path="/FotoMarco" element={<FotoMarco/>} /> 
        <Route path="/Fotosvideos" element={<FotosVideos/>} /> 
      </Routes>
    </Router>
  );
}

export default App;