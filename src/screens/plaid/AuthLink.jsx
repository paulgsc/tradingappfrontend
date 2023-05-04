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
    dispatch(
      exchangePublicTokenForAccessToken(public_token, isPaymentInitiation)
    );
  };

  let isOauth = false;
  const config = {
    token: linkToken,
    onSuccess,
  };

  if (window.location.href.includes("?oauth_state_id=")) {
    // TODO: figure out how to delete this ts-ignore
    // @ts-ignore
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <Button type="button" large onClick={() => open()} disabled={!ready}>
      Transfer with Plaid
    </Button>
  );
}

export default AuthLink;
