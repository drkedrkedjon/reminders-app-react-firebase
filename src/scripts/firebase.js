// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGwkEkhTMslljwjDIjyKdmBQ4uqbLV4xk",
  authDomain: "reminders-app-sasa.firebaseapp.com",
  databaseURL: "https://reminders-app-sasa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reminders-app-sasa",
  storageBucket: "reminders-app-sasa.appspot.com",
  messagingSenderId: "918772711499",
  appId: "1:918772711499:web:bcc57fcbbc9a4cf30d4dce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app)
export const listasEnDB = ref(db, "listas")

// Inicializar Storage
export const storage = getStorage(app);
