import React from "react";
import Step from "../../../../../../../components/animation/Step";
import Step1 from "./Step1";

function TFASetup({ step = 1, user }) {
  return (
    <div>
      <div className="flex justify-between rounded p-8">
        <Step step={1} maxStep={3} currentStep={step} />
      </div>
      <div className="space-y-2 px-8">
        {stepsList(<Step1 />).find((_, i) => i + 1 === step)}
      </div>
    </div>
  );
}

const stepsList = (...Steps) => {
  return Steps;
};

export default TFASetup;
