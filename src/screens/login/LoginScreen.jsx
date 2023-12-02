import LoginFormLayout from "./layout/LoginFormLayout";
import ExpiredToken from "./component/validations/ExpiredToken";
import LoginSuccess from "./component/validations/LoginSuccess";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";

function LoginScreen() {
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
      <ExpiredToken>
        <LoginFormLayout />
        <LoginSuccess />
      </ExpiredToken>
    </div>
  );
}

export default LoginScreen;
