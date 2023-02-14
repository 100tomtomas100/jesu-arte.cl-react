// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVvs9yXiz-x_cdrmv5C4RBXX-KHgdH7Ro",
  authDomain: "jesu-arte.firebaseapp.com",
  databaseURL: "https://jesu-arte-default-rtdb.firebaseio.com",
  projectId: "jesu-arte",
  storageBucket: "jesu-arte.appspot.com",
  messagingSenderId: "315622930282",
  appId: "1:315622930282:web:588d82ef8857811de1d713",
  measurementId: "G-WGWL8H3D5V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

