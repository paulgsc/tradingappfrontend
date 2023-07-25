import React from "react";
import { useSelector } from "react-redux";
import UserBalance from "../../user/component/data/UserBalance";

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
