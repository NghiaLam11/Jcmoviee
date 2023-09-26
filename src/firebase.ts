import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBZxR3kt-Xj7S6tH7rNKJBt0Pl4Ph1dVz4",
  authDomain: "jcmoviee.firebaseapp.com",
  projectId: "jcmoviee",
  storageBucket: "jcmoviee.appspot.com",
  messagingSenderId: "814038019961",
  appId: "1:814038019961:web:d14c50927bca1835e909a8"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
