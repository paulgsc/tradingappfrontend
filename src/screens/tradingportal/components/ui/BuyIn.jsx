import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { setTransactionType } from "../../../../reducers/tradingReducers";

function BuyIn() {
  const dispatch = useDispatch();
  const [buyIn, setBuyIn] = useState("Shares");
  const buyInShares = () => {
    setBuyIn("Shares");
  };
  const buyInDollars = () => {
    setBuyIn("Dollars");
  };

  useEffect(() => {
    dispatch(setTransactionType(buyIn));
  }, [buyIn]);

  return (
    <div tabIndex={-1} className="group relative">
      <div className=" cursor-pointer">
        <span className=" flex items-center justify-center bg-gray-400 rounded-md p-2 text-xs xl:text-base text-white">
          {buyIn}
          <i className="fas fa-caret-down ml-2 text-xs"></i>
        </span>
      </div>
      <div className="hidden scale-90 group-focus-within:block absolute justify-center items-center mt-2 w-24 h-10 bg-white rounded-md shadow-lg ring-1 ring-neutral-300 hover:bg-stone-200 hover:scale-95 transition-all duration-200 ease-in-out">
        {buyIn === "Shares" ? (
          <button
            onClick={buyInDollars}
            className="w-full h-full flex items-center justify-center px-1 text-xs xl:text-base text-center text-gray-800 font-semibold hover:text-blue-600"
          >
            Dollars
          </button>
        ) : (
          <button
            onClick={buyInShares}
            className="w-full h-full flex items-center justify-center px-1 text-xs xl:text-base text-center text-gray-800 font-semibold hover:text-blue-600"
          >
            Shares
          </button>
        )}
      </div>
    </div>
  );
}

export default BuyIn;
