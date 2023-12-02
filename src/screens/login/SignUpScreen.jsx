import SignUpFormLayout from "./layout/SignUpFormLayout";
import ExpiredToken from "./component/validations/ExpiredToken";
import LoginSuccess from "./component/validations/LoginSuccess";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

function SignUpScreen() {
  const navigate = useNavigate();
  const { userInfo: { token, isLoggedIn } = {} } = useSelector(
    (state) => state.userAuth
  );
  useEffect(() => {
    try {
      const { email_verified } = jwtDecode(token);
      if (email_verified && isLoggedIn) navigate("/personal/dashboard");
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, [navigate, token, isLoggedIn]);
  return (
    <div>
      <ExpiredToken login={false}>
        <SignUpFormLayout />
        <LoginSuccess />
      </ExpiredToken>
    </div>
  );
}

export default SignUpScreen;
