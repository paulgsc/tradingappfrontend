import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/auth';
import { GoogleAuthProvider, browserSessionPersistence, getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, setPersistence, signInWithEmailLink, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { notify } from './src/lib/utils';

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

async function handleSignIn(email, redirect) {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `http://localhost:5173/login/?redirect=${redirect}`,
    // This must be true.
    handleCodeInApp: true,

  };
  try {
    const auth = getAuth();
    
    // Send the sign-in link to the provided email
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);

    // Check if the link is a sign-in with email link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Get the email from storage or prompt the user for it
      email = window.localStorage.getItem('emailForSignIn') || window.prompt('Please provide your email for confirmation');

      // Sign in with the email link
      const result = await signInWithEmailLink(auth, email, window.location.href);

      // Clear email from storage
      window.localStorage.removeItem('emailForSignIn');

      // Access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // Check if the user is new or existing via:
      // result.additionalUserInfo.isNewUser

      // Perform any additional actions after successful sign-in

    } else {
      // Handle case when the link is not a sign-in with email link
      notify('Invalid sign-in link');
    }
  } catch (error) {
    // Handle any errors that occur during the sign-in process
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    notify(errorMessage)
  }
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

export { auth, storage, handleSignInWithGoogle, verifyRecaptcha, handleSignIn };
