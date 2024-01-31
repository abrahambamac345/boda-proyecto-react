// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; // Comentado porque no se usa

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkRHlrj2s3sjToL7XqYGg9O7I6v60A9XM",
  authDomain: "boda-dym-ed60d.firebaseapp.com",
  projectId: "boda-dym-ed60d",
  storageBucket: "boda-dym-ed60d.appspot.com",
  messagingSenderId: "361508605277",
  appId: "1:361508605277:web:4cd517eed5cfadfcc2ecb4",
  measurementId: "G-RGH76JRHRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Comentado porque no se usa
const auth = getAuth(app);

export { auth };

export default app;
