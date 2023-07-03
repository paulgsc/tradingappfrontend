import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";
import { accessAdminView } from "../../contexts/redux/actions/userActions";
import Spinner from "../loading/Spinner";

function AdminRoute() {
  const navigate = useNavigate();
  const { adminHash, loading } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const [isloading, checkLoading] = useState(true);

  useEffect(() => {
    const grantAcces = () => async (dispatch) => {
      const response = await dispatch(accessAdminView());
      checkLoading(false);
    };
    dispatch(grantAcces());
  }, []);
  if (isloading) {
    return <Spinner />;
  } else {
    {
      return adminHash ? <Outlet /> : <Navigate to="/404" />;
    }
  }
}

export default AdminRoute;
