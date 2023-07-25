import React from "react";
import OrderSummary from "../../../../components/ui/OrderSummary";
import { useDispatch } from "react-redux";
import { excersiseTrade } from "../../../../contexts/redux/actions/tradingActions";

function BuyBtn() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(excersiseTrade());
  };
  return (
    <div className="mt-6 w-full flex justify-center items-center">
      <OrderSummary.Button handleClick={handleClick}>
        Submit Order
      </OrderSummary.Button>
    </div>
  );
}

export default BuyBtn;
