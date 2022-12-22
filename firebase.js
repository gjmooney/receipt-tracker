// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSWLBnJARCJz9QmZylrEwt9ecLr5BHYzg",
  authDomain: "receipttracker-6fa97.firebaseapp.com",
  projectId: "receipttracker-6fa97",
  storageBucket: "receipttracker-6fa97.appspot.com",
  messagingSenderId: "229028737128",
  appId: "1:229028737128:web:24b6952a9174eb155b4bdd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
