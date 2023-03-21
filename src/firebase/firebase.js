// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEIxfffZW7STQEtSGmNKq8z5MKqcXjGUw",
  authDomain: "studywithmentor-swm.firebaseapp.com",
  projectId: "studywithmentor-swm",
  storageBucket: "studywithmentor-swm.appspot.com",
  messagingSenderId: "586394298235",
  appId: "1:586394298235:web:d9a7cc0affd70de496ffde",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
