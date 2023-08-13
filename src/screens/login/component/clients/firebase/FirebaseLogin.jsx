import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useRecaptcha,
  verifyUserMFA,
} from "../../../../../hooks/firebase-hooks";
import { useLocation } from "react-router";
import GmailLogin from "../../ui/GmailLogin";
import { RecaptchaVerifier, onAuthStateChanged } from "firebase/auth";
import { gmailLogin } from "../../../../../contexts/redux/actions/userActions";
import { CodeSignIn } from "./multifactorOauth/CodeSignIn";
import { auth, handleSignInWithGoogle } from "../../../../../../firebase";
import TFADialog from "./multifactorOauth/dialog/TFADialog";
import { toast } from "react-hot-toast";

function FirebaseLogin() {
  const recaptcha = useRecaptcha("sign-in");
  const [verificationId, setVerificationId] = useState(null);
  const [resolver, setResolver] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const [firebaseError, setFirebaseError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const { userInfo: { is_admin = false, token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  const redirect = location.search
    ? location.search.split("=")[1] === "/" && is_admin
      ? "/admin"
      : location.search.split("=")[1]
    : is_admin
    ? "/admin"
    : "/";

  const handleGmail = async () => {
    const result = await handleSignInWithGoogle();
    setFirebaseError(result);
  };

  async function handleMFA(response) {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        "sign-in",
        {
          size: "invisible",
        },
        auth
      );

      if (recaptchaVerifier) {
        try {
          const data = await verifyUserMFA(response, recaptchaVerifier, 0);
          const { verificationId, resolver } = data;
          setVerificationId(verificationId);
          setResolver(resolver);
          recaptchaVerifier.clear();
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          dispatch(gmailLogin(user));
        }
        if (firebaseError) {
          if (firebaseError.code === "auth/multi-factor-auth-required") {
            handleMFA(firebaseError);
            return;
          } else {
            firebaseError?.code &&
              toast.error(firebaseError.code, {
                duration: 5000,
                position: "top-center",
                className: "bg-gradient-to-r from-pink-100 to-red-500",
              });
          }
        }
      });

      return () => unsubscribe();
    } catch (error) {}
  }, [firebaseError]);

  if (resolver && verificationId) {
    return (
      <CodeSignIn
        verificationId={verificationId}
        resolver={resolver}
        redirect={redirect}
      />
    );
  }

  if (currentUser && token) {
    return <TFADialog user={currentUser} redirect={redirect} />;
  }
  return <GmailLogin handleGmail={handleGmail} />;
}

export default FirebaseLogin;
