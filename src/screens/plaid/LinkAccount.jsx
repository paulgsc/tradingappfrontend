import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestLinkToken } from "../../contexts/redux/actions/plaidActions";
import AuthLink from "./AuthLink";
import Spinner from "../../components/loading/Spinner";

function LinkAccount() {
  const dispatch = useDispatch();

  const { plaidInfo: loading } = useSelector((state) => state.plaid);

  const generateLinkToken = useCallback(() => {
    dispatch(requestLinkToken());
  }, [dispatch]);

  useEffect(() => {
    const init = async () => {
      // do not generate a new token for OAuth redirect; instead
      // setLinkToken from localStorage

      generateLinkToken();
    };
    init();
  }, [dispatch, generateLinkToken]);
  return (
    <div className="plaid-app">
      <div className="plaid-app_container">
        <AuthLink />
      </div>
    </div>
  );
}

export default LinkAccount;
