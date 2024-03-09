// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APIKEY,
//   authDomain: import.meta.env.VITE_AUTHDOMAIN,
//   projectId: import.meta.env.VITE_PROJECTID,
//   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_APPID
// };
const firebaseConfig = {
  apiKey: "AIzaSyBigeml6CObzk0V2aH6XesCsyTK1NuOHBM",
  authDomain: "job-portal-demo-19d0d.firebaseapp.com",
  projectId: "job-portal-demo-19d0d",
  storageBucket: "job-portal-demo-19d0d.appspot.com",
  messagingSenderId: "429914960907",
  appId: "1:429914960907:web:b7519fb960e418f79c830e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;