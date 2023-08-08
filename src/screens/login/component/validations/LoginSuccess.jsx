import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../../hooks/firebase-hooks";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

function LoginSuccess() {
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const user = useCurrentUser();
  const [decodedToken, setDecodedToken] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const checkTokenExpiration = () => {
    if (decodedToken && !decodedToken?.verified_email) {
      const currentTime = Date.now() / 1000; // Convert to seconds

      if (decodedToken.exp < currentTime && user) {
        // call backend to create emailverified token for authenticated firebase user
      }
      if (decodedToken.exp > currentTime && !user) {
        // render otp dialog
        navigate(
          `/login/otp/?sessionId=${decodedToken?.session_id}/?redirect=${redirect}`
        );
      }
    }
  };

  useEffect(() => {
    try {
      setDecodedToken(jwtDecode(token));
    } catch (error) {
      setDecodedToken(null);
    }
  }, [token]);

  useEffect(() => {
    checkTokenExpiration();
  }, [decodedToken]);

  return <></>;
}

export default LoginSuccess;
