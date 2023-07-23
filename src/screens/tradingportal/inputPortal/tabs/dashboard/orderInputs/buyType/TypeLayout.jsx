import React from "react";
import BuyIn from "./BuyIn";
import PriceInfo from "./PriceInfo";

function TypeLayout() {
  return (
    <div className="flex items-center w-fit space-x-2">
      <BuyIn />
      <PriceInfo />
    </div>
  );
}

export default TypeLayout;
