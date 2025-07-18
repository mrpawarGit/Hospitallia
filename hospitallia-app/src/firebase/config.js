// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAa5ZltFwco-ka-I3efJgR5QUPuvRq8Qzs",
  authDomain: "hospitallia-app.firebaseapp.com",
  projectId: "hospitallia-app",
  storageBucket: "hospitallia-app.firebasestorage.app",
  messagingSenderId: "572644743390",
  appId: "1:572644743390:web:d6b8b83d64144271208a4f",
  measurementId: "G-P29EWZ5F61",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
