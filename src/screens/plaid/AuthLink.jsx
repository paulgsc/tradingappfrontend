import React, { useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useDispatch, useSelector } from "react-redux";
import { exchangePublicTokenForAccessToken } from "../../contexts/redux/actions/plaidActions";
import Button from "plaid-threads/Button";

function AuthLink() {
  const {
    plaidInfo: { linkToken, isPaymentInitiation },
  } = useSelector((state) => state.plaid);
  const dispatch = useDispatch();
  const onSuccess = (public_token) => {
    dispatch(exchangePublicTokenForAccessToken(public_token));
  };

  const oauthStateId = Math.random().toString(36).substring(2);
  const redirectUri = `http://localhost:5173/personal/banking/link/callback?oauth_state_id=${oauthStateId}`;
  const config = { token: linkToken, redirectUri, onSuccess };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (ready) {
      open();
    }
  }, [ready, open]);

  useEffect(() => {
    if (window.location.href.includes("?oauth_state_id=")) {
      const urlParams = new URLSearchParams(window.location.search);
      const oauthStateIdParam = urlParams.get("oauth_state_id");
      if (oauthStateIdParam === oauthStateId) {
        const receivedRedirectUri = window.location.href;
        config.receivedRedirectUri = receivedRedirectUri;
        open();
      } else {
        console.error("Invalid oauth_state_id parameter received.");
      }
    }
  }, [oauthStateId, open]);

  return <></>;
}

export default AuthLink;
