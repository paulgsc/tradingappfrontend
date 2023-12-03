import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { accessProtectedView } from "../../contexts/redux/actions/userActions";
import Spinner from "../loading/Spinner";

function UserProtectedRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.pathname;
  const {
    access,
    error,
    userInfo: { token },
  } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const [isloading, checkLoading] = useState(true);

  useEffect(() => {
    const grantAcces = () => async (dispatch) => {
      await dispatch(accessProtectedView());
      checkLoading(false);
    };
    dispatch(grantAcces());
  }, [dispatch, navigate, access]);

  useEffect(() => {
    if (token && typeof error === "string") throw new Error(error);
  }, [token, error]);

  if (!token) {
    return <Navigate to={`/login?redirect=${location.pathname}`} />;
  }

  if (isloading) {
    return <Spinner />;
  }

  return access ? <Outlet /> : <Navigate to={`/login/?redirect=${redirect}`} />;
}

export default UserProtectedRoute;
