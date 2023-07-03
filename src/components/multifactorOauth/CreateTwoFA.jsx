import React, { useState } from "react";
import { useRecaptcha, verifyPhoneNumber } from "../../hooks/firebase-hooks";
import { PhoneRegistration } from "./PhoneRegistration";
import { CodeSignup } from "./CodeSignUp";
import { notify } from "../../lib/utils";
import { Toaster } from "react-hot-toast";

function CreateTwoFA({ currentUser }) {
  const recaptcha = useRecaptcha("sign-up");
  const [verificationCodeId, setVerificationCodeId] = useState(null);

  async function getPhoneNumber(phoneNumber) {
    if (!currentUser || !recaptcha) {
      return;
    }

    const verificationId = await verifyPhoneNumber(
      currentUser,
      phoneNumber,
      recaptcha
    );

    if (!verificationId) {
      notify("Something went wrong.");
    } else {
      setVerificationCodeId(verificationId);
    }
  }

  return (
    <div className="min-h-screen flex justify-center mx-auto">
      {!verificationCodeId && (
        <PhoneRegistration getPhoneNumber={getPhoneNumber} />
      )}
      {verificationCodeId && currentUser && (
        <CodeSignup
          currentUser={currentUser}
          verificationCodeId={verificationCodeId}
        />
      )}
      <div id="sign-up"></div>
      <Toaster />
    </div>
  );
}

export default CreateTwoFA;
