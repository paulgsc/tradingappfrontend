import DemoDialog from "../ui/DemoDialog";
import { useState } from "react";
import IPaddressSetup from "../setupGuide/IPaddressSetup";

function SetupStep() {
  const [step, setStep] = useState(1);
  const handleBack = () => {
    setStep(step < 2 ? step : step - 1);
  };
  const handleContinue = (maxStep) => {
    setStep((prevStep) => (prevStep < maxStep ? prevStep + 1 : prevStep));
  };

  return (
    <DemoDialog
      step={step}
      maxStep={3}
      handleBack={handleBack}
      handleContinue={handleContinue}
    >
      <IPaddressSetup step={step} handleContinue={handleContinue} />
    </DemoDialog>
  );
}

export default SetupStep;
