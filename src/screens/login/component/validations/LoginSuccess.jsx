import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "../../../../hooks/firebase-hooks";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import {
  broadcastLogout,
  verifyGmailLogin,
  verifyGmailSignup,
} from "../../../../contexts/redux/actions/userActions";
import { getIdToken } from "firebase/auth";

function LoginSuccess() {
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const { user, loadingRef } = useCurrentUser();
  const [idToken, setIdToken] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const { exp, email_verified, session_id } =
        typeof token === "string" ? jwtDecode(token) : {};

      if (token && !email_verified) {
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (exp > currentTime && typeof idToken === "string") {
          // call backend to create emailverified token for authenticated firebase user
          if (location.pathname.includes("/login"))
            dispatch(verifyGmailLogin(idToken));
          if (location.pathname.includes("/register"))
            dispatch(verifyGmailSignup(idToken));
        }
        if (exp > currentTime && !user && !loadingRef.current && token) {
          // render otp dialog
          if (location.pathname.includes("/login"))
            navigate(
              `/login/otp/?sessionId=${session_id}/?redirect=${redirect}`
            );
          if (location.pathname.includes("/register"))
            navigate(
              `/register/otp/?sessionId=${session_id}/?redirect=${redirect}`
            );
        }
      }
    };
    checkTokenExpiration();
  }, [
    dispatch,
    idToken,
    navigate,
    redirect,
    user,
    loadingRef,
    token,
    location,
  ]);

  useEffect(() => {
    const func = async () => {
      try {
        setIdToken(await getIdToken(user));
      } catch (error) {
        console.error("Error fetching ID token:", error);
      }
    };

    if (user) func();
  }, [user]);

  return <></>;
}

export default LoginSuccess;
