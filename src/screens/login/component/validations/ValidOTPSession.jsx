import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { verifyLoginEmail } from "../../../../contexts/redux/actions/userActions";
import MagicLinkCard from "../ui/MagicLinkCard";
import WiggleLoader from "../../../../components/loading/WiggleLoader";
import ExpiredMagicLinkCard from "../ui/ExpiredMagicLinkCard";
import jwtDecode from "jwt-decode";

function ValidOTPSession() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const otp = location.search.match(/otp=(\d{6})/)[1];
  const redirect = location.search.match(/redirect=(.+)$/)[1];
  const { userInfo: { token, loading } = {} } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    const handleMagicLink = (otp) => async (dispatch) => {
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken?.verified_email) await dispatch(verifyLoginEmail(otp));
      }

      token && navigate(redirect);
    };

    dispatch(handleMagicLink(otp));
  }, [dispatch, navigate, otp, redirect, token]);

  if (loading) {
    return <WiggleLoader />;
  }

  if (token === undefined) {
    return <ExpiredMagicLinkCard />;
  }

  return <MagicLinkCard />;
}

export default ValidOTPSession;
