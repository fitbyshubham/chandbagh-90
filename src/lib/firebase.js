
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvOkL29Phqz2nhM2Y-zbm0BpkjugYG3Jc",
  authDomain: "otp-demo-clean.firebaseapp.com",
  projectId: "otp-demo-clean",
  storageBucket: "otp-demo-clean.firebasestorage.app",
  messagingSenderId: "716661866765",
  appId: "1:716661866765:web:b0d29bf567fe3f39e5b044",
  measurementId: "G-VFNF7CTPDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;