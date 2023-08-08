import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import { accessProtectedView } from "../../contexts/redux/actions/userActions";
import Spinner from "../loading/Spinner";
import jwtDecode from "jwt-decode";
import ExpiredSession from "./ExpiredSession";

function AuthRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.pathname;
  const {
    access,
    refreshingSession = false,
    userInfo: { token = "" },
  } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const [isloading, checkLoading] = useState(true);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    let timeoutId;
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

    return () => {
      clearTimeout(timeoutId);
    };
  }, [token]);

  useEffect(() => {
    const grantAcces = () => async (dispatch) => {
      const response = await dispatch(accessProtectedView());
      checkLoading(false);
    };
    dispatch(grantAcces());
  }, [navigate, access]);

  if (!token && refreshingSession) {
    return <Navigate to={`/login/?redirect=${redirect}`} />;
  }

  if (!token) {
    return <Navigate to={"/"} />;
  }

  if (isloading) {
    return <Spinner />;
  }

  if (isTokenExpired && token && !refreshingSession) {
    return <ExpiredSession />;
  }

  return access ? <Outlet /> : <Navigate to={`/login/?redirect=${redirect}`} />;
}

export default AuthRoute;
