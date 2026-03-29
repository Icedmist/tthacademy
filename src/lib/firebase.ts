
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB03DllfRq_EVM3Y1BHyZBdal-jHF6oGZM",
  authDomain: "tech-trade-hub-academy.firebaseapp.com",
  projectId: "tech-trade-hub-academy",
  storageBucket: "tech-trade-hub-academy.appspot.com",
  messagingSenderId: "537073268634",
  appId: "1:537073268634:web:149f89c584bc9716692c23",
  measurementId: "G-9XG86V54C2"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };
