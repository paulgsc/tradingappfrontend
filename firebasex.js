// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.FIRE_BASE_API_KEY,
  authDomain: import.meta.env.FIRE_BASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIRE_BASE_PROJECT_ID,
  storageBucket: import.meta.env.FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIRE_BASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIRE_BASE_APP_ID,
  measurementId: import.meta.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
