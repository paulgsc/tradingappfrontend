import { useState } from "react";
import Step from "../../../../components/animation/Step";
import { useSelector } from "react-redux";
import Step1 from "./Step1";
import ValidateStep2 from "../validations/ValidateStep2";
import ValidateStep3 from "../validations/ValidateStep3";

function IPaddressSetup({ step = 1, setDisableContinue }) {
  const { userInfo: { ip_address } = {} } = useSelector(
    (state) => state.userAuth
  );

  const [additionalIPs, setAdditionalIPs] = useState(ip_address);

  return (
    <div>
      <div className="flex justify-between rounded p-8">
        <Step step={1} maxStep={3} currentStep={step} />
        <Step step={2} maxStep={3} currentStep={step} />
        <Step step={3} maxStep={3} currentStep={step} />
      </div>
      <div className="space-y-2 px-8">
        {stepsList(
          <Step1 setDisableContinue={setDisableContinue} />,
          <ValidateStep2
            setAdditionalIPs={setAdditionalIPs}
            setDisableContinue={setDisableContinue}
          />,
          <ValidateStep3 additionalIPs={additionalIPs} />
        ).find((_, i) => i + 1 === step)}
      </div>
    </div>
  );
}

const stepsList = (...Steps) => {
  return Steps;
};

export default IPaddressSetup;
