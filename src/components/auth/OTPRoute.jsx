import { useState } from "react";
import { useEffect } from "react";
import { broadcastLogout } from "../../contexts/redux/actions/userActions";
import { Navigate, Outlet, useLocation } from "react-router";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentUser } from "../../hooks/firebase-hooks";

function OTPRoute() {
  const location = useLocation();
  const redirect = location?.pathname;
  const { user } = useCurrentUser();
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const handleExpired = () => {
      setIsTokenExpired(true);
    };
    let timeoutId;
    const checkTokenExpiration = () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp < currentTime) {
          setIsTokenExpired(true);
          dispatch(broadcastLogout());
        }
        if (decodedToken?.email_verified) {
          const broadcastChannel = new BroadcastChannel("authChannel");
          broadcastChannel.postMessage({ type: "AUTH_SUCCESS" });
        } else {
          const expirationTime = decodedToken.exp * 1000;
          const timeRemaining = expirationTime - Date.now();
          timeoutId = setTimeout(() => handleExpired(), timeRemaining);
        }
      } else if (user) {
        timeoutId = setTimeout(() => handleExpired(), 300000);
      } else return;
    };

    checkTokenExpiration();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [token, dispatch, user]);

  useEffect(() => {
    if (isTokenExpired) {
      dispatch(broadcastLogout());
      window.location.href = location.pathname;
    }
  }, [dispatch, isTokenExpired, location]);

  return <Outlet />;
}

export default OTPRoute;
