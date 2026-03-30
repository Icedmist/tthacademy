// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB03DllfRq_EVM3Y1BHyZBdal-jHF6oGZM",
  authDomain: "tech-trade-hub-academy.firebaseapp.com",
  projectId: "tech-trade-hub-academy",
  storageBucket: "tech-trade-hub-academy.firebasestorage.app",
  messagingSenderId: "537073268634",
  appId: "1:537073268634:web:149f89c584bc9716692c23",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
