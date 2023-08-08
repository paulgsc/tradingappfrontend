import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { verifyLoginEmail } from "../../../../contexts/redux/actions/userActions";
import MagicLinkCard from "../ui/MagicLinkCard";
import WiggleLoader from "../../../../components/loading/WiggleLoader";

function ValidOTPSession() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const otp = location.search.match(/otp\=(\d{6})/)[1];
  const redirect = location.search.match(/redirect\=(.+)$/)[1];
  const { userInfo: { token = null, loading = false } = {} } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    const handleMagicLink = (otp) => async (dispatch) => {
      await dispatch(verifyLoginEmail(otp));
      token && navigate(redirect);
    };

    dispatch(handleMagicLink(otp));
  }, []);

  if (loading) {
    return <WiggleLoader />;
  }

  return <MagicLinkCard />;
}

export default ValidOTPSession;
