import React from "react";
import OTPLayout from "./layout/OTPLayout";
import ExpiredToken from "./component/validations/ExpiredToken";

function LoginOTPScreen() {
  return (
    <div>
      <ExpiredToken>
        <OTPLayout />
      </ExpiredToken>
    </div>
  );
}

export default LoginOTPScreen;
