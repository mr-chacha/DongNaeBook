import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBk_KBI47YEAlh7ntEpHnIVkRCU6kM83sY",
  authDomain: "dongnaebook-2dd14.firebaseapp.com",
  projectId: "dongnaebook-2dd14",
  storageBucket: "dongnaebook-2dd14.appspot.com",
  messagingSenderId: "82821287565",
  appId: "1:82821287565:web:4c9795342e48c9c5345cc4",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const authService = getAuth();
export const storage = getStorage();
