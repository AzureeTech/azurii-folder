// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator
} from 'firebase/auth';
import {
  getFirestore
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyDiySyogMJsaZ62oPTv9IDyv7m04z6fkLc",
  authDomain: "azurii-world.firebaseapp.com",
  projectId: "azurii-world",
  // Add any other config like storageBucket, messagingSenderId, etc.
};

// 🔹 Main app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

// 🔹 Secondary app for creating users
const secondaryApp = initializeApp(firebaseConfig, "Secondary");
const secondaryAuth = getAuth(secondaryApp);

export const createUserAccount = httpsCallable(functions, 'createUserAccount');
export const recoverOrphanedAccount = httpsCallable(functions, 'recoverOrphanedAccount');

export { auth, db, secondaryAuth };
