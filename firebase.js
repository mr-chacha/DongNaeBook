import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBk_KBI47YEAlh7ntEpHnIVkRCU6kM83sY',
  authDomain: 'dongnaebook-2dd14.firebaseapp.com',
  projectId: 'dongnaebook-2dd14',
  storageBucket: 'dongnaebook-2dd14.appspot.com',
  messagingSenderId: '82821287565',
  appId: '1:82821287565:web:4c9795342e48c9c5345cc4',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authService = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
