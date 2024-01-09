import { useNavigate } from "react-router";
import DemoDialog from "../../../components/ui/DemoDialog";
import CoinbaseSetupStepsCard from "../components/coinbase/CoinbaseSetupStepsCard";
import { useState } from "react";
function CoinbaseSetup() {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const handleBack = () => {
    setStep(step < 2 ? step : step - 1);
  };
  const handleContinue = (maxStep) => {
    setStep((prevStep) => (prevStep < maxStep ? prevStep + 1 : prevStep));
  };
  const handleClose = () => {
    navigate("/personal/dashboard");
  };

  return (
    <DemoDialog
      step={step}
      maxStep={3}
      handleBack={handleBack}
      handleContinue={handleContinue}
      handleClose={handleClose}
    >
      <CoinbaseSetupStepsCard step={step} />
    </DemoDialog>
  );
}

export default CoinbaseSetup;
