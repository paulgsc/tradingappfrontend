import React from "react";
import { useState } from "react";
import { useCurrentUser } from "../../hooks/firebase-hooks";
import { useEffect } from "react";
import { verifyGmailLogin } from "../../contexts/redux/actions/userActions";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoading from "../loading/SkeletonLoading";

function OTPRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.pathname;
  const { userInfo: { token = null, gmailInfo: { email = null } = {} } = {} } =
    useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const user = useCurrentUser();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        if (decodedToken.exp < currentTime) {
          setIsTokenExpired(true);
        }
        setEmailVerified(decodedToken?.email_verified || false);
        if (decodedToken?.email_verified) {
          const broadcastChannel = new BroadcastChannel("authChannel");
          broadcastChannel.postMessage({ type: "AUTH_SUCCESS" });
        }
      }
    };

    checkTokenExpiration();
  }, [token]);

  useEffect(() => {
    const verifyFirebaseUser = () => {
      if (token && email && user) {
        if (!emailVerified && !isTokenExpired) {
          dispatch(verifyGmailLogin());
        }
      }
    };

    verifyFirebaseUser();
  }, [token, email, user]);

  return emailVerified || !token ? (
    <Outlet />
  ) : isTokenExpired ? (
    <Navigate to={`/login/?redirect=${redirect}`} />
  ) : (
    <div className="fixed inset-0 min-h-screen flex items-center justify-center">
      <SkeletonLoading size={6} />
    </div>
  );
}

export default OTPRoute;
