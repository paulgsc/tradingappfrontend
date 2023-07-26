import React from "react";
import { useSelector } from "react-redux";
import Transition from "../components/ui/Transition";
import FlipCard from "../components/dashboard/FlipCard";
import ConfirmationPage from "../components/dashboard/ConfirmationPage";

function TransitionLayout() {
  const { tradeComplete = false } = useSelector((state) => state.trade);
  return (
    <Transition>
      <Transition.Off toggle={tradeComplete}>
        <FlipCard />
      </Transition.Off>
      <Transition.On toggle={tradeComplete}>
        <ConfirmationPage />
      </Transition.On>
    </Transition>
  );
}

export default TransitionLayout;
