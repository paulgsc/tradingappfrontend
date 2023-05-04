import React, { useCallback, useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransferIntent,
  initiatePlaid,
  requestToken,
} from "../../contexts/redux/actions/plaidActions";
import Spinner from "../../components/loading/Spinner";
import { useLocation } from "react-router";

function PlaidHome() {
  const dispatch = useDispatch();

  const { plaidInfo: { request_id = "", transferAmount = "" } = {}, loading } =
    useSelector((state) => state.plaid);

  const getInfo = useCallback(() => {
    return dispatch(initiatePlaid());
  }, [dispatch]);

  const launchTransferIntent = useCallback(() => {
    dispatch(createTransferIntent());
  }, [dispatch]);

  const generateToken = useCallback(() => {
    dispatch(requestToken());
  }, [dispatch]);

  useEffect(() => {
    if (transferAmount) {
      launchTransferIntent();
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      // do not generate a new token for OAuth redirect; instead
      // setLinkToken from localStorage

      if (request_id) generateToken();
    };
    init();
  }, [dispatch, generateToken, request_id]);
  return (
    <div className="plaid-app">
      <div className="plaid-app_container">
        {loading ? <Spinner /> : <Header />}
      </div>
    </div>
  );
}

export default PlaidHome;
