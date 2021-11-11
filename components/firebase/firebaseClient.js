// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO8w69psKstNqTx0v_Swx9pfAekqgGDeo",
  authDomain: "next-game-d05b8.firebaseapp.com",
  databaseURL: "https://next-game-d05b8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "next-game-d05b8",
  storageBucket: "next-game-d05b8.appspot.com",
  messagingSenderId: "587635464070",
  appId: "1:587635464070:web:6516edeea6a123b4d2be07",
  measurementId: "G-MFYJ9YXBW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(); 