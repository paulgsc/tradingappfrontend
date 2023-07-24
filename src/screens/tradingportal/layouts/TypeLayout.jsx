import React from "react";
import BuyIn from "../components/ui/BuyIn";
import PriceInfo from "../components/ui/PriceInfo";

function TypeLayout() {
  return (
    <div className="flex items-center w-fit space-x-2">
      <BuyIn />
      <PriceInfo />
    </div>
  );
}

export default TypeLayout;
