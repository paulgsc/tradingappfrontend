import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import ConfirmPassword from "./ConfirmPassword";

function DeodeNewAdminToken() {
  const [queryParameters] = useSearchParams();
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const decodeToken = () => {
      try {
        setDecodedToken(jwtDecode(queryParameters.get("sessionId")));
      } catch (error) {
        window.location.href = "404";
      }
    };
    decodeToken();
  }, [queryParameters]);

  if (decodedToken?.profile)
    return <ConfirmPassword adminEmail={decodedToken?.email_for_admin} />;
}

export default DeodeNewAdminToken;
