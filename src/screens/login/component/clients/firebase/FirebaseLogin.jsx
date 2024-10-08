import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useRecaptcha,
  verifyUserMFA,
} from "../../../../../hooks/firebase-hooks";
import { useNavigate } from "react-router";
import GmailLogin from "../../ui/GmailLogin";
import { RecaptchaVerifier, onAuthStateChanged } from "firebase/auth";
import { gmailLogin } from "../../../../../contexts/redux/actions/userActions";
import { CodeSignIn } from "./multifactorOauth/CodeSignIn";
import { auth, handleSignInWithGoogle } from "../../../../../../firebase";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingBtn from "../../../../../components/ui/LoadingBtn";

function FirebaseLogin() {
  const recaptcha = useRecaptcha("sign-in");
  const [verificationId, setVerificationId] = useState(null);
  const [resolver, setResolver] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();

  const [firebaseError, setFirebaseError] = useState(null);

  const handleGmail = async () => {
    try {
      await handleSignInWithGoogle();
    } catch (error) {
      setFirebaseError(error);
    }
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // check if verifiation path is set
      const verifiationPathParam = urlParams.get("vfPath");
      const userInfoFromStorage = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : {};
      const { token } = userInfoFromStorage;

      if (user && !verifiationPathParam && typeof token !== "string") {
        const currentSearchParams = new URLSearchParams(urlParams);
        currentSearchParams.append("vfPath", "firebase");
        const path = "/login";
        navigate(`${path}?${currentSearchParams.toString()}`);

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
    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate, urlParams, firebaseError]);

  if (resolver && verificationId) {
    return <CodeSignIn verificationId={verificationId} resolver={resolver} />;
  }
  if (urlParams.get("vfPath")) return <LoadingBtn />;
  return <GmailLogin handleGmail={handleGmail} />;
}

export default FirebaseLogin;
