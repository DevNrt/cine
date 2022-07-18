import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS0c8pAM1Tg-uY-5K9jt1W2IoZYKn1z6s",
  authDomain: "cine-2a5bb.firebaseapp.com",
  projectId: "cine-2a5bb",
  storageBucket: "cine-2a5bb.appspot.com",
  messagingSenderId: "19534474362",
  appId: "1:19534474362:web:350614580d274e74925fc3",
};

initializeApp(firebaseConfig);

export const database = getFirestore();
