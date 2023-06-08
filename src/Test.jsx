import React, { useState } from "react";
import { auth, verifyRecaptcha } from "../firebase"; // Update the path to your firebase.js file

const TwoFactorAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  // Handle phone number submission
  const handlePhoneNumberSubmit = async (e) => {
    e.preventDefault();

    try {
      verifyRecaptcha();
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  // Handle verification code submission
  const handleVerificationCodeSubmit = async (e) => {
    e.preventDefault();

    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirmationResult.verificationId,
        verificationCode
      );

      const userCredential = await auth.currentUser.linkWithCredential(
        credential
      );
      const user = userCredential.user;
      console.log("Successfully logged in:", user);
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <div>
      {!confirmationResult ? (
        <form onSubmit={handlePhoneNumberSubmit}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button id="recaptcha-container" type="submit">
            Send SMS
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerificationCodeSubmit}>
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
};

export default TwoFactorAuth;
