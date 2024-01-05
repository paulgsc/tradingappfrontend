import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { userRequestCoinBaseAccessToken } from "../../../contexts/redux/actions/coinbaseActions";

const useCoinbaseGetAccessToken = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const data = {
      code: searchParams.get("code"),
      state: searchParams.get("state"),
      redirect_uri:
        "https://leafiproperties.com/personal/dashboard/coinbase/oauth/callback",
    };
    dispatch(userRequestCoinBaseAccessToken(data));
  }, [dispatch, searchParams]); // Dependency array ensures the effect runs only once on mount
};

export default useCoinbaseGetAccessToken;
