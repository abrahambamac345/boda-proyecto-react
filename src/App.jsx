import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Gifts from './gifts';
import AdminGifts from './admin-regalos';
import Main from './initial'; // Esto es correcto si Main es el nombre del componente en initial.jsx



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/regalos" element={<Gifts />} />
        <Route path="/admin" element={<AdminGifts />} />
      </Routes>
    </Router>
  );
}
export default App;
