import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { verifyLoginEmail } from "../../../../contexts/redux/actions/userActions";
import WiggleLoader from "../../../../components/loading/WiggleLoader";
import ExpiredMagicLinkCard from "../ui/ExpiredMagicLinkCard";
import jwtDecode from "jwt-decode";
import { useSearchParams } from "react-router-dom";
import SuccessCard from "../../../../components/ui/SuccessCard";
import MagicLinkCard from "./MagicLinkCard";

function ValidOTPSession() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [queryParameters] = useSearchParams();
  const { userInfo: { token, loading } = {} } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const emailVerified = decodedToken?.email_verified;
      if (typeof emailVerified === "boolean" && !emailVerified) {
        const otp = queryParameters.get("otp");
        dispatch(verifyLoginEmail(otp, location.pathname));
        return;
      }
    }
  }, [dispatch, navigate, queryParameters, token, location]);

  if (loading) {
    return <WiggleLoader />;
  }

  if (token === undefined) {
    return <ExpiredMagicLinkCard />;
  }

  return <MagicLinkCard />;
}

export default ValidOTPSession;
