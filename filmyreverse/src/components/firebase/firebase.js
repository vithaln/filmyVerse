// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqsIYk_nrCNosqkeD8cSpBk9Dhjp8go7k",
  authDomain: "filmeverse-e0847.firebaseapp.com",
  projectId: "filmeverse-e0847",
  storageBucket: "filmeverse-e0847.appspot.com",
  messagingSenderId: "918537852029",
  appId: "1:918537852029:web:40ef942b1b618a0efacd14",
  measurementId: "G-RB8TWF5WK7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const moviesref = collection(db, "movies");
export const reviewsref = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;
