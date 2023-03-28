// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt0U5OB0F0vlX35CLhi_o6vnOXFtdZZVQ",
  authDomain: "study-with-mentors.firebaseapp.com",
  projectId: "study-with-mentors",
  storageBucket: "study-with-mentors.appspot.com",
  messagingSenderId: "551646869653",
  appId: "1:551646869653:web:275debb5c8ba3c06eb839c",
  measurementId: "G-L6WDFMYMCS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
