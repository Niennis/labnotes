// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/* const firebaseConfig = {
  apiKey: "AIzaSyAxn3TGudq94CMBnwhnOgfU0QURbUppBZI",
  authDomain: "bog003-labnotes.firebaseapp.com",
  projectId: "bog003-labnotes",
  storageBucket: "bog003-labnotes.appspot.com",
  messagingSenderId: "539672958699",
  appId: "1:539672958699:web:0cf4eb34cae7d9dbb250ae"
}; */

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// import firebase from "firebase/app";

export const app = initializeApp({
  "projectId": "bog003-labnotes",
  "appId": "1:539672958699:web:a8d7ef42851bee82b250ae",
  "storageBucket": "bog003-labnotes.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyAxn3TGudq94CMBnwhnOgfU0QURbUppBZI",
  "authDomain": "bog003-labnotes.firebaseapp.com",
  "messagingSenderId": "539672958699"
})

export const db = getFirestore(app);