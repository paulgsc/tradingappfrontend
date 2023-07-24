import React from "react";
import UserBalance from "../components/data/UserBalance";
import { useSelector } from "react-redux";

function DataLayout() {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  return (
    <>
      {token && (
        <>
          <UserBalance />
        </>
      )}
    </>
  );
}

export default DataLayout;
