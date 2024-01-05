import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userRequestCoinBaseExchangeToken } from "../../../contexts/redux/actions/coinbaseActions";
import jwtDecode from "jwt-decode";

const useCoinbaseExchangeToken = (token) => {
  const dispatch = useDispatch();
  const [coinbaseAcctExists, setCoinbaseAcctExists] = useState(false);

  useEffect(() => {
    // only call exchangetoken for users who haven't setup their account in our application
    if (token) {
      const { auth_session: { has_coinbase_acct } = {} } = jwtDecode(token);
      setCoinbaseAcctExists(!!has_coinbase_acct);
      if (!has_coinbase_acct) dispatch(userRequestCoinBaseExchangeToken());
    }
  }, [dispatch, token]); // Dependency array ensures the effect runs only once on mount
  return [coinbaseAcctExists];
};

export default useCoinbaseExchangeToken;
