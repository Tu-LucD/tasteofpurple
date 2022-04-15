// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWmqDjs8bLk7e9PddpvK2_PL55g0LeXO8",
  authDomain: "tasteofpurple-d1717.firebaseapp.com",
  projectId: "tasteofpurple-d1717",
  storageBucket: "tasteofpurple-d1717.appspot.com",
  messagingSenderId: "427906029092",
  appId: "1:427906029092:web:1f32ae3ba6b3a3c3506ab1",
  measurementId: "G-E2EVVM06FR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();