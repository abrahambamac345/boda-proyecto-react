import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Gifts from './gifts';
import AdminGifts from './admin-regalos';
import Photoshare from './photos';
import Main from './initial';
import TomarFoto from './TomarFotos';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/regalos" element={<Gifts />} />
        <Route path="/admin" element={<AdminGifts />} />
        <Route path="/fotos" element={<Photoshare />} />
        {/* Nueva ruta para TomarFoto */}
       <Route path="/tomarfotos" element={<TomarFoto />} />  
      </Routes>
    </Router>
  );
}

export default App;