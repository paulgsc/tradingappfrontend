import React from "react";

import { useDispatch } from "react-redux";
import { excersiseTrade } from "../../../../contexts/redux/actions/tradingActions";

function BuyBtn() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(excersiseTrade());
  };
  return (
    <button
      className="mt-2 shadow-sm border w-full xl:h-16 p-2 rounded-md text-white bg-black enabled:hover:bg-blue-600 disabled:opacity-40 enabled:cursor-pointer disabled:cursor-not-allowed"
      onClick={handleClick}
    >
      Submit Order
    </button>
  );
}

export default BuyBtn;
