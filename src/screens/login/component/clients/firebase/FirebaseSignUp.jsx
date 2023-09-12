import GmailSignUp from "../../ui/GmailSignUp";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { auth, handleSignInWithGoogle } from "../../../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { gmailRegister } from "../../../../../contexts/redux/actions/userActions";
import TFADialog from "./multifactorOauth/dialog/TFADialog";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function FirebaseSignUp() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [firebaseError, setFirebaseError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const { userInfo: { is_admin = false, token } = {} } = useSelector(
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

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          !token && dispatch(gmailRegister(user));
          return;
        }
      });
      firebaseError?.code &&
        toast.error(firebaseError.code, {
          duration: 5000,
          position: "top-center",
          className: "bg-gradient-to-r from-pink-100 to-red-500",
        });

      return () => unsubscribe();
    } catch (error) {}
  }, [firebaseError, dispatch, token]);

  if (currentUser && token) {
    return <TFADialog user={currentUser} redirect={redirect} />;
  }
  return <GmailSignUp handleGmail={handleGmail} />;
}
export default FirebaseSignUp;
