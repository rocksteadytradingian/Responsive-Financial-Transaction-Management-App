import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDyzfoZ44o8FXD35di9hedAFWtpfm1M5xU",
  authDomain: "my-personal-finance-trac-e7578.firebaseapp.com",
  projectId: "my-personal-finance-trac-e7578",
  storageBucket: "my-personal-finance-trac-e7578.firebasestorage.app",
  messagingSenderId: "1057963134737",
  appId: "1:1057963134737:web:57145e69d75c0da6c7c6b0",
  measurementId: "G-PKTDF2M2SZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);