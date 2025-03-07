import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth"; 

//const FIREBASE_API_KEY = import.meta.env.FIREBASE_API_KEY;
const FIREBASE_API_KEY = '';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgTCpvms2EU0UygLBjIStvQJwcnHHlIVA",
  authDomain: "mr-game-and-rate.firebaseapp.com",
  projectId: "mr-game-and-rate",
  storageBucket: "mr-game-and-rate.firebasestorage.app",
  messagingSenderId: "1008663096909",
  appId: "1:1008663096909:web:022e05a954138e0f6a3604",
  measurementId: "G-H6355SXVLD"
};

// Initialize Firebase
const firebaseApp = getApps().length 
    ? getApp()
    : initializeApp(firebaseConfig);

const analytics = getAnalytics(firebaseApp);

const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

export { auth, googleAuthProvider };