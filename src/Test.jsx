import React, { useEffect, useState } from "react";

import CircularProgresBar from "./components/ui/CircularProgresBar";
import EmailOTP from "./screens/login/component/clients/sendgrid/EmailOTP";
import OTPAttempts from "./screens/login/component/clients/sendgrid/OTPAttempts";

function Test() {
  return (
    <div className="min-h-screen flex items-center justify-center space-x-4">
      <EmailOTP />
      <OTPAttempts />
    </div>
  );
}

export default Test;
