import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAa5ZltFwco-ka-I3efJgR5QUPuvRq8Qzs",
  authDomain: "hospitallia-app.firebaseapp.com",
  projectId: "hospitallia-app",
  storageBucket: "hospitallia-app.firebasestorage.app",
  messagingSenderId: "572644743390",
  appId: "1:572644743390:web:d6b8b83d64144271208a4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
