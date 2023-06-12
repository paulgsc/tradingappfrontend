// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { getStorage } from "firebase/storage";
import 'firebase/compat/auth';;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIRE_BASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIRE_BASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIRE_BASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIRE_BASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = getStorage(app);

const verifyRecaptcha = () => {


  let recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: "invisible",
    // callback: (response) => {
    //   // reCAPTCHA solved, proceed with phone number verification
    //   const phoneNumber = "+1234567890"; // Replace with the actual phone number entered by the user
    //   const phoneProvider = new firebase.auth.PhoneAuthProvider();
    //   phoneProvider
    //     .verifyPhoneNumber(phoneNumber, recaptchaVerifier)
    //     .then((verificationId) => {
    //       // Display success message or perform further actions
    //       console.log("Phone number verification initiated", verificationId);
    //     })
    //     .catch((error) => {
    //       // Handle error during phone number verification
    //       console.error("Phone number verification failed", error);
    //     });
    // }
  }, auth)
  // console.log(recaptchaVerifier)
}
export { auth, storage, verifyRecaptcha };
