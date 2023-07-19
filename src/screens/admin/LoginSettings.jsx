import React from "react";
import TokenSettings from "../../components/auth/TokenSettings";
import { fetchSiteSettings } from "../../hooks/react-query";
import { useSelector } from "react-redux";

function LoginSettings() {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { settings: { site_settings: { token_expiration = 0 } = {} } = {} } =
    fetchSiteSettings(token);
  console.log(token_expiration);
  return (
    <div className="w-full h-full">
      <TokenSettings token_duration={token_expiration} />
    </div>
  );
}

export default LoginSettings;
