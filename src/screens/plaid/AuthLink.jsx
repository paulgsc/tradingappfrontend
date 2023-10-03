import { useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useDispatch, useSelector } from "react-redux";
import { exchangePublicTokenForAccessToken } from "../../contexts/redux/actions/plaidActions";
import { useLocation } from "react-router";

function AuthLink() {
  const location = useLocation();
  const {
    plaidInfo: { linkToken, isPaymentInitiation },
  } = useSelector((state) => state.plaid);
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const onSuccess = async (public_token) => {
    dispatch(exchangePublicTokenForAccessToken(public_token));
  };

  const onExit = (error, metadata) => {
    if (error) {
      console.log("Plaid exit error:", error);
    } else {
      window.location.href = `${redirect}`;
    }
  };

  const redirectUri = "https://leafiproperties.com/personal/banking";
  const oauthStateId = Math.random().toString(36).substring(2); // Generate a random alphanumeric string
  const config = {
    token: linkToken,
    onSuccess,
    onExit,
  };

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

      // Check if the received oauthStateIdParam matches the expected value
      if (oauthStateIdParam === oauthStateId) {
        const receivedRedirectUri = window.location.href;

        // Redirect the user to the receivedRedirectUri
        window.location.href = receivedRedirectUri;
      } else {
        console.error("Invalid oauth_state_id parameter received.");
      }
    }
  }, []);

  return <></>;
}

export default AuthLink;
