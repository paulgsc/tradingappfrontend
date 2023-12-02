import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import jwtDecode from "jwt-decode";
import ExpiredSession from "./ExpiredSession";
import { userSetAuthenticationStatus } from "../../reducers/userAuthReducer";

function AuthRoute() {
  const location = useLocation();
  const redirect = location?.pathname;
  const dispatch = useDispatch();
  const {
    refreshingSession = false,
    userInfo: { token = "" },
  } = useSelector((state) => state.userAuth);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    let timeoutId;
    // retrieve jwt expiration and set timeout to mount expired session modal
    const checkTokenExpiration = () => {
      if (token) {
        const decodedToken = jwtDecode(token);
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

    // on first mount of auth route upgrade user to authenticated
    // to prevent user from navigating back to /login path
    if (token) {
      const authenticatedStatus = {
        isLoggedIn: true,
      };
      dispatch(userSetAuthenticationStatus(authenticatedStatus));
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [token, dispatch]);

  if (!token && refreshingSession) {
    return <Navigate to={`/login/?redirect=${redirect}`} />;
  }

  if (isTokenExpired && token && !refreshingSession) {
    return <ExpiredSession />;
  }

  return <Outlet />;
}

export default AuthRoute;
