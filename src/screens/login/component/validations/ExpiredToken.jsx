import jwtDecode from "jwt-decode";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { logout } from "../../../../contexts/redux/actions/userActions";

function ExpiredToken({ login = true, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search
    ? location.search.split("redirect=")[1]
    : "/";
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const dispatch = useDispatch();
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    let timeoutId;
    const checkTokenExpiration = () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken?.email_verified) {
          const broadcastChannel = new BroadcastChannel("authChannel");
          broadcastChannel.postMessage({ type: "AUTH_SUCCESS" });
          navigate(redirect);
        }
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp < currentTime) {
          setIsTokenExpired(true);
        } else {
          const expirationTime = decodedToken.exp * 1000;
          const timeRemaining = expirationTime - Date.now();
          timeoutId = setTimeout(() => setIsTokenExpired(true), timeRemaining);
        }
      }
    };

    checkTokenExpiration();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [token]);

  useEffect(() => {
    if (isTokenExpired) {
      const error = "Login session timed out!";
      toast.error(error, {
        duration: 5000,
        position: "top-center",
        className: "bg-gradient-to-r from-pink-100 to-red-500",
      });
      dispatch(logout());
    }
    if (!token) {
      navigate(`/${login ? "login" : "register"}/?redirect=${redirect}`);
    }
  }, [isTokenExpired, token]);

  return <>{children}</>;
}

export default ExpiredToken;
