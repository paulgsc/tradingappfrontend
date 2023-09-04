import { useState } from "react";

import CombinedSteps from "./steps/CombinedSteps";
import Dialog from "./dialog/Dialog";
import { Toaster } from "react-hot-toast";

function SchedulerSetup() {
  const [step, setStep] = useState(1);
  const [showContinue, setShowContinue] = useState(false);
  const handleBack = () => {
    setStep(step < 2 ? step : step - 1);
  };
  const handleContinue = (maxStep) => {
    showContinue &&
      setStep((prevStep) => (prevStep < maxStep ? prevStep + 1 : prevStep));
  };

  return (
    <Dialog
      step={step}
      maxStep={5}
      handleBack={handleBack}
      handleContinue={handleContinue}
      showContinue={showContinue}
    >
      <CombinedSteps
        step={step}
        handleContinue={handleContinue}
        setShowContinue={setShowContinue}
      />
      <Toaster />
    </Dialog>
  );
}
export default SchedulerSetup;
