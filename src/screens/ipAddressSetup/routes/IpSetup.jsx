import { useState } from "react";
import DemoDialog from "../../../components/ui/DemoDialog";
import IPaddressSetup from "../components/ui/IPaddressSetup";

function IpSetup() {
  const [step, setStep] = useState(1);
  const [disableContinue, setDisableContinue] = useState(true);
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
      disableContinue={disableContinue}
    >
      <IPaddressSetup
        step={step}
        handleContinue={handleContinue}
        setDisableContinue={setDisableContinue}
      />
    </DemoDialog>
  );
}

export default IpSetup;
