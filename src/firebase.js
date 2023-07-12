import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDXE_6VvZKYdU2SOvQVKlE5fgPRBKsWbwc",
  authDomain: "chatapplication-4028b.firebaseapp.com",
  projectId: "chatapplication-4028b",
  storageBucket: "chatapplication-4028b.appspot.com",
  messagingSenderId: "277798396927",
  appId: "1:277798396927:web:159bc24e7cd15d78c77dca",
  measurementId: "G-K499GE101C"
};

const firebaseApp = initializeApp(firebaseConfig); 
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export {auth,googleProvider}
export default db;