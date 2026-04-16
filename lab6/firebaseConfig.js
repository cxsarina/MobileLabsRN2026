import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdzve6M5x7kuRLVBBaC4E8Od0r5hUUmOQ",
  authDomain: "lab6-73426.firebaseapp.com",
  projectId: "lab6-73426",
  storageBucket: "lab6-73426.firebasestorage.app",
  messagingSenderId: "53205911096",
  appId: "1:53205911096:web:bad7df616352882fb1c8cd",
  measurementId: "G-EB6L6XX43E"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };