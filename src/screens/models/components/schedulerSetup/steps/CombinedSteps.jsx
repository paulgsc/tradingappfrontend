import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step from "../../../../../components/animation/Step";
import Step4 from "./Step4";
import Step5 from "./Step5";

function CombinedSteps({ step = 1, setShowContinue }) {
  return (
    <div>
      <div className="flex justify-between rounded p-8">
        <Step step={1} maxStep={5} currentStep={step} />
        <Step step={2} maxStep={5} currentStep={step} />
        <Step step={3} maxStep={5} currentStep={step} />
        <Step step={4} maxStep={5} currentStep={step} />
        <Step step={5} maxStep={5} currentStep={step} />
      </div>
      <div className="space-y-2 px-8">
        {stepsList(
          <Step1 setShowContinue={setShowContinue} />,
          <Step2 setShowContinue={setShowContinue} />,
          <Step3 setShowContinue={setShowContinue} />,
          <Step4 setShowContinue={setShowContinue} />,
          <Step5 />
        ).find((_, i) => i + 1 === step)}
      </div>
    </div>
  );
}

const stepsList = (...Steps) => {
  return Steps;
};

export default CombinedSteps;
