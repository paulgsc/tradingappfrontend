import { useEffect, useState } from "react";
import Step from "../../../../components/animation/Step";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useFetchCoinbaseActions } from "../../hooks/reactQuery";
import { useSelector } from "react-redux";

function CoinbaseSetupStepsCard({ step = 1 }) {
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const { data } = useFetchCoinbaseActions(token);
  const [thirdPartyCoinbaseActions, setThirdPartyCoinbaseActions] = useState({
    available: [],
    selected: [],
    draggable: [],
  });

  useEffect(() => {
    setThirdPartyCoinbaseActions((prevItems) => ({
      ...prevItems,
      available: data,
      selected: [],
    }));
  }, [data]);

  return (
    <div>
      <div className="sticky top-0 z-50 backdrop-blur-sm backdrop:pointer-events-none flex justify-between rounded p-8">
        <Step step={1} maxStep={3} currentStep={step} />
        <Step step={2} maxStep={3} currentStep={step} />
        <Step step={3} maxStep={3} currentStep={step} />
      </div>
      <div className="space-y-2 px-8">
        {stepsList(
          <Step1 />,
          <Step2
            thirdPartyCoinbaseActions={thirdPartyCoinbaseActions}
            setThridPartyCoinbaseActions={setThirdPartyCoinbaseActions}
            data={data}
          />,
          <Step3 />
        ).find((_, i) => i + 1 === step)}
      </div>
    </div>
  );
}

export default CoinbaseSetupStepsCard;

const stepsList = (...Steps) => {
  return Steps;
};
