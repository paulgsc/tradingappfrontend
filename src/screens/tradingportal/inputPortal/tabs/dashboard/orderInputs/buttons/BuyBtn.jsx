import React from "react";
import OrderSummary from "../../../../../../../components/ui/OrderSummary";

function BuyBtn() {
  const handleClick = () => {};
  return (
    <div className="mt-6 w-full flex justify-center items-center">
      <OrderSummary.Button handleClick={handleClick}>
        Submit Order
      </OrderSummary.Button>
    </div>
  );
}

export default BuyBtn;
