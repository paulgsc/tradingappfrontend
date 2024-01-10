import { useNavigate } from "react-router";
import DemoDialog from "../../../components/ui/DemoDialog";
import CoinbaseSetupStepsCard from "../components/coinbase/CoinbaseSetupStepsCard";
import { useState } from "react";
import { useSelector } from "react-redux";
function CoinbaseSetup() {
  const [step, setStep] = useState(1);
  const { actionIds } = useSelector((state) => state.coinbaseActions);

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
      disableContinue={
        Array.isArray(actionIds) && actionIds.length < 1 && step === 2
      }
    >
      <CoinbaseSetupStepsCard step={step} />
    </DemoDialog>
  );
}

export default CoinbaseSetup;
