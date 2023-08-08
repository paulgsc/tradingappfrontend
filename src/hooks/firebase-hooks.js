import {

    PhoneAuthProvider,
    PhoneMultiFactorGenerator,
    RecaptchaVerifier,
    getMultiFactorResolver,
    multiFactor,
    onAuthStateChanged,
    signOut
  } from "firebase/auth";
  import { auth } from "../../firebase";
import { useEffect } from "react";
import { useState } from "react";
import { notify } from "../lib/utils";
  
export function useRecaptcha(componentId) {
    const [recaptcha, setRecaptcha] = useState();

    useEffect(() => {
      try {
        const recaptchaVerifier = new RecaptchaVerifier(componentId, {
          size: "invisible"
        }, auth);
    
        setRecaptcha(recaptchaVerifier);
    
        return () => {
          recaptchaVerifier.clear();
        };
      } catch (error) {
        
      }
    }, [componentId]);
    

    return recaptcha;
}

export async function enrollUser(
    user,
    verificationCodeId,
    verificationCode,
) {
    const phoneAuthCredential = PhoneAuthProvider.credential(verificationCodeId, verificationCode);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(phoneAuthCredential);

    try {
        await multiFactor(user).enroll(multiFactorAssertion, 'Personal Phone Number');
        return true;
      } catch (error) {
        throw error;
      }
      
}

export const unEnrollMultiFactor = async (user) => {
  // Check if the user is enroll in MFA.
  const checkMfaEnrollment = multiFactor(user).enrolledFactors;
  
  // Unenroll all the MFA entries in the current user by uid.
  for (let i = 0; i < checkMfaEnrollment.length; i++) {
    await multiFactor(user).unenroll(checkMfaEnrollment[i].uid)
  }
}


export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(
    null
  );

  useEffect(() => {
   try {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
   } catch (error) {
    
   }
  }, []);

  return currentUser;
}

export async function verifyPhoneNumber(
    user,
    phoneNumber,
    recaptchaVerifier,
) {
    const session = await multiFactor(user).getSession();
    const phoneInfoOptions = {
        phoneNumber,
        session
    }

    const phoneAuthProvider = new PhoneAuthProvider(auth);
    try {
        return await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
      } catch (error) {
        throw error;
      }      
}

export async function verifyUserMFA(error, recaptchaVerifier, selectedIndex) {
    const resolver = getMultiFactorResolver(auth, error);
   
    if (resolver.hints[selectedIndex].factorId === PhoneMultiFactorGenerator.FACTOR_ID) {
      const phoneInfoOptions = {
        multiFactorHint: resolver.hints[selectedIndex],
        session: resolver.session
      };
      
      const phoneAuthProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
      return { verificationId, resolver };

    }

  }
  

export async function verifyUserEnrolled(
    verificationMFA,
    verificationCode
) {
    const {verificationId, resolver} = verificationMFA;
    const credentials = PhoneAuthProvider.credential(verificationId, verificationCode);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(credentials);

    try {
        await resolver.resolveSignIn(multiFactorAssertion);
        return true;
    }catch (error) {
        throw(error)
    }
}

export async function firebaseLogout() {
    try {
      await signOut(auth); // auth is your Firebase Auth instance
      // Perform any additional actions after successful logout
    } catch (error) {
      // Handle any errors that occur during logout
      console.error("Error occurred during logout:", error);
    }
  }

