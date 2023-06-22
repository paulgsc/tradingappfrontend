import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/auth';
import { GoogleAuthProvider, browserSessionPersistence, getAuth, setPersistence, signInWithPopup, signInWithRedirect } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZGKZzyhWnEjRoscmErhkpN71cD8mVO_o",
  authDomain: "user-database-44e3b.firebaseapp.com",
  projectId: "user-database-44e3b",
  storageBucket: "user-database-44e3b.appspot.com",
  messagingSenderId: "515463498483",
  appId: "1:515463498483:web:e7b26f52e5c13912dd4586",
  measurementId: "G-ZTLQR5GJ57"
};
// Initialize Firebase app
let app;


let auth;
let storage;
let provider;
try {
  app = initializeApp(firebaseConfig);
  if (app) {
    auth = getAuth(app);
    storage = getStorage(app);
    provider = new GoogleAuthProvider();
    setPersistence(auth, browserSessionPersistence);
  }
} catch (error) {
  console.error('Error initializing Firebase app:', error);
  // Handle the error gracefully (e.g., display a message to the user)
  
}


const handleSignInWithGoogle = async () => {
  try {
    if (!auth) {
      throw new Error('Firebase app not initialized');
    }

    // Handle the sign-in with popup
    await signInWithPopup(auth, new GoogleAuthProvider());
    return true;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return error;
  }
};

const verifyRecaptcha = () => {
  // Recaptcha verification logic goes here
};

export { auth, storage, handleSignInWithGoogle, verifyRecaptcha };
