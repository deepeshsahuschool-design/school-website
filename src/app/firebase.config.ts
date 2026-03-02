import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjhYlXhynnjQm_xxaytGvfzMVkh4Sp-Uo",
  authDomain: "pencil-school.firebaseapp.com",
  projectId: "pencil-school",
  storageBucket: "pencil-school.firebasestorage.app",
  messagingSenderId: "388201245766",
  appId: "1:388201245766:web:eabed7a18a7da4af8dee47",
  measurementId: "G-C1X29R5LXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services and EXPORT them
export const db = getFirestore(app);
export const auth = getAuth(app);

// Set default persistence to NONE (in-memory only, cleared on reload)
setPersistence(auth, inMemoryPersistence);
