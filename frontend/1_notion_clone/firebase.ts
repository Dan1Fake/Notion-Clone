import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT9gXBjhjDQh9mJY3Q2yVebv4KZ-lKqT8",
  authDomain: "notion-clone-9e011.firebaseapp.com",
  projectId: "notion-clone-9e011",
  storageBucket: "notion-clone-9e011.firebasestorage.app",
  messagingSenderId: "533757428011",
  appId: "1:533757428011:web:276129b44feba6ad3e856e",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
