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
import { useQueryClient } from "@tanstack/react-query";

function ExpiredToken({ login = true, children }) {
  const navigate = useNavigate();
  const { user, loadingRef } = useCurrentUser();
  const [queryParameters] = useSearchParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const dispatch = useDispatch();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    let timeoutId;
    const checkTokenExpiration = () => {
      const { email_verified, exp } =
        typeof token === "string" ? jwtDecode(token) : {};
      if (email_verified) {
        const broadcastChannel = new BroadcastChannel("authChannel");
        broadcastChannel.postMessage({ type: "AUTH_SUCCESS" });
        if (!user && !loadingRef.current)
          navigate(queryParameters.get("redirect") || "/");
      }
      setIsEmailVerified(email_verified);
      if (exp) {
        const expirationTime = exp * 1000;
        const timeRemaining = expirationTime - Date.now();
        timeoutId = setTimeout(() => setIsTokenExpired(true), timeRemaining);
      } else {
        setIsTokenExpired(!!exp);
      }
    };

    checkTokenExpiration();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch, navigate, token, user, loadingRef, queryParameters]);
  useEffect(() => {
    if (isTokenExpired) {
      const error = "Login session timed out!";
      toast.error(error, {
        duration: 5000,
        position: "top-center",
        className: "bg-gradient-to-r from-pink-100 to-red-500",
      });
      dispatch(broadcastLogout());
      queryClient.clear();
      navigate(
        `/${login ? "login" : "register"}/?redirect=${queryParameters.get(
          "redirect"
        )}`
      );
    }

    if (!loadingRef.current && !user && queryParameters.get("vfPath"))
      navigate(
        `${location.pathname}?redirect=${
          queryParameters.get("redirect") || "/"
        }`
      );
  }, [
    dispatch,
    login,
    navigate,
    isTokenExpired,
    token,
    user,
    loadingRef,
    queryParameters,
    queryClient,
  ]);

  if (isEmailVerified) return <TFADialog user={user} />;
  return <>{children}</>;
}

export default ExpiredToken;
