import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import { accessProtectedView } from "../../contexts/redux/actions/userActions";
import Spinner from "../loading/Spinner";

function AuthRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.pathname;
  const { access, loading } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const [isloading, checkLoading] = useState(true);

  useEffect(() => {
    const grantAcces = () => async (dispatch) => {
      const response = await dispatch(accessProtectedView());
      checkLoading(false);
    };
    dispatch(grantAcces());
  }, [navigate, access]);
  if (isloading) {
    return <Spinner />;
  } else {
    {
      return access ? (
        <Outlet />
      ) : (
        <Navigate to={`/login/?redirect=${redirect}`} />
      );
    }
  }
}

export default AuthRoute;
