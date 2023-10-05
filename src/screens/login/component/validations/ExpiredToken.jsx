import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { broadcastLogout } from "../../../../contexts/redux/actions/userActions";
import { useCurrentUser } from "../../../../hooks/firebase-hooks";
import TFADialog from "../clients/firebase/multifactorOauth/dialog/TFADialog";
import { useSearchParams } from "react-router-dom";

function ExpiredToken({ login = true, children }) {
  const navigate = useNavigate();
  const { user, loading } = useCurrentUser();
  const [queryParameters] = useSearchParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const dispatch = useDispatch();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    let timeoutId;
    const checkTokenExpiration = () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken?.email_verified) {
          setIsEmailVerified(decodedToken?.email_verified);
          const broadcastChannel = new BroadcastChannel("authChannel");
          broadcastChannel.postMessage({ type: "AUTH_SUCCESS" });
          if (!user && !loading) navigate(queryParameters.get("redirect"));
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
  }, [dispatch, navigate, token, user, loading, queryParameters]);

  useEffect(() => {
    if (isTokenExpired) {
      const error = "Login session timed out!";
      toast.error(error, {
        duration: 5000,
        position: "top-center",
        className: "bg-gradient-to-r from-pink-100 to-red-500",
      });
      dispatch(broadcastLogout());
      navigate(
        `/${login ? "login" : "register"}/?redirect=${queryParameters.get(
          "redirect"
        )}`
      );
    }
  }, [dispatch, login, navigate, isTokenExpired, token, queryParameters]);

  if (isEmailVerified) return <TFADialog user={user} />;
  return <>{children}</>;
}

export default ExpiredToken;
