// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjKfLrK7xL1ucLiXyJEIMilNxl1y6as68",
  authDomain: "netflixgpt-99628.firebaseapp.com",
  projectId: "netflixgpt-99628",
  storageBucket: "netflixgpt-99628.appspot.com",
  messagingSenderId: "174010055963",
  appId: "1:174010055963:web:eefdc1eb8f34351d01e7be",
  measurementId: "G-2LHY3RZ6RX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
