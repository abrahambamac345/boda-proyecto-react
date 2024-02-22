import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword,/*  GoogleAuthProvider, signInWithPopup  */} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';
import './SignIn.css';
import login from './assets/img/anillos2.png'
function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = username + '@gmail.com';
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Verifica si el inicio de sesión es del administrador
      if(email === 'admin@gmail.com' && password === 'admin123') {
        navigate('/admin'); // Redirige a la vista de administrador
      } else {
        navigate('/regalos'); // Redirige a la lista de regalos para usuarios
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    const email = username + '@gmail.com';
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/regalos'); // Redirige a la lista de regalos
    } catch (error) {
      setError(error.message);
    }
  };



  return (
    <div className='center-container'>
        <div className="container">
         <article className='container-fluids'>
            <img src={login} alt="" />
            <h1>INICIAR SESIÓN</h1>
            <p>Para acceder a la lista de regalos solamente tienes que escribir un nombre y apellido juntos en minúsculas. Ejemplo: juanzunun. Adicional de una contraseña la cual puedas recordar. Por ultimo dar clic en Crear Cuenta y si ya creaste tu cuenta en Iniciar Sesión</p>
         </article>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin} className="form-group">
        <input
          type="text"
          value={username}
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
        />
        <div className="password-container">
          <input
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="toggle-password-visibility"
          aria-label={isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {isPasswordVisible ? (
            <><i className="eyes fa-solid fa-eye"></i></>
          ) : (
            <><i className=" eyes fa-solid fa-eye-slash"></i></>
          )}
        </button>
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
       {/*  <button onClick={handleGoogleSignIn} className="google-sign-in">Iniciar Sesión con Google</button> */}
        <button onClick={handleSignUp} className="sign-up-button">Crear Cuenta</button>
        </ div>
    </div>
  );
}

export default SignIn;
