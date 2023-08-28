// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg0zMLQ9oFkdPBShFlirhAS3slKXCRboA",
  authDomain: "react-firebase-e7513.firebaseapp.com",
  projectId: "react-firebase-e7513",
  storageBucket: "react-firebase-e7513.appspot.com",
  messagingSenderId: "1043018740789",
  appId: "1:1043018740789:web:9b460c23289ccc950dad7c",
  measurementId: "G-BSCSBQ9LFL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
