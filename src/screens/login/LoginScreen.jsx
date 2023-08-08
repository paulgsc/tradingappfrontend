import React from "react";
import LoginFormLayout from "./layout/LoginFormLayout";
import ExpiredToken from "./component/validations/ExpiredToken";
import LoginSuccess from "./component/validations/LoginSuccess";

function LoginScreen() {
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
