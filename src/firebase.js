// Import the functions you need from the SDKs you need
import { initializeApp } from "../node_modules/firebase/app";
import { getAuth } from "../node_modules/firebase/auth";
import { getFirestore } from "../node_modules/firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTrgljDA6s3xHzXDpG349j0W7LJNhKxTY",
  authDomain: "frugalfeasts-31eb4.firebaseapp.com",
  projectId: "frugalfeasts-31eb4",
  storageBucket: "frugalfeasts-31eb4.appspot.com",
  messagingSenderId: "12379761149",
  appId: "1:12379761149:web:c84b495c2b8dbcbf83d194",
  measurementId: "G-E0HMLMWS20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
