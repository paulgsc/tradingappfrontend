import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userRequestCoinBaseExchangeToken } from "../../../contexts/redux/actions/coinbaseActions";
import jwtDecode from "jwt-decode";

const useCoinbaseExchangeToken = (token) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // only call exchangetoken for users who haven't setup their account in our application
    if (token) {
      const { auth_session: { has_coinbase_acct } = {} } = jwtDecode(token);
      if (!has_coinbase_acct) dispatch(userRequestCoinBaseExchangeToken());
    }
  }, [dispatch, token]); // Dependency array ensures the effect runs only once on mount
};

export default useCoinbaseExchangeToken;
