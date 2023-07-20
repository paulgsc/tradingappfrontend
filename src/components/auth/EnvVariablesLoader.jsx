import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchEnvVariables } from "../../contexts/redux/actions/envAction";

const EnvVariablesLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the fetchEnvVariables action when the component mounts
    dispatch(fetchEnvVariables());
  }, [dispatch]);

  return null; // This component doesn't render anything, it just triggers the action on mount
};

export default EnvVariablesLoader;
