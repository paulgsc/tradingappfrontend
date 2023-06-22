import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/auth';
import { GoogleAuthProvider, browserSessionPersistence, getAuth, setPersistence, signInWithPopup, signInWithRedirect } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIRE_BASE_API_KEY, 
  authDomain: import.meta.env.VITE_APP_FIRE_BASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIRE_BASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIRE_BASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID
};

// Initialize Firebase app
let app;
try {
  // app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Error initializing Firebase app:', error);
  // Handle the error gracefully (e.g., display a message to the user)
}

let auth;
let storage;
let provider;

if (app) {
  auth = getAuth(app);
  storage = getStorage(app);
  provider = new GoogleAuthProvider();
  setPersistence(auth, browserSessionPersistence);
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
