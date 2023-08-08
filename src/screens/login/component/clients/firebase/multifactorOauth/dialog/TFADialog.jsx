import React, { useState } from "react";
import DemoDialog from "../../../../../../../components/ui/DemoDialog";
import TFASetup from "./TFASetup";
import CreateTwoFA from "../CreateTwoFA";
import Dialog from "../../../../../../../components/ui/Dialog";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function TFADialog({ user, redirect }) {
  const { gmailInfo: { email = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const handleBack = () => {
    setStep(step < 2 ? step : step - 1);
  };
  const handleContinue = (maxStep) => {
    setStep((prevStep) => (prevStep < maxStep ? prevStep + 1 : prevStep));
  };

  const onClose = () => {
    navigate(redirect);
  };

  return (
    <>
      {step === 1 && (
        <div className="fixed inset-0 min-h-screen z-50 backdrop:pointer-events-none">
          <DemoDialog
            step={step}
            maxStep={2}
            handleBack={handleBack}
            handleContinue={handleContinue}
          >
            <TFASetup step={step} user={user} />
          </DemoDialog>
        </div>
      )}
      {step === 2 && (
        <Dialog onClose={onClose}>
          <CreateTwoFA currentUser={user} />
        </Dialog>
      )}
    </>
  );
}

export default TFADialog;
