import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function OrderBarGraph() {
  const [percent, setPercent] = useState(0);
  const [valid, setValid] = useState(true);
  const {
    orderInfo: { transactionType = null, orderInput = "" } = {},
    userBalance: { transfer_remaining } = {},
  } = useSelector((state) => state.trade);
  const { tradingPropertyInfo: { available_shares } = {} } = useSelector(
    (state) => state.propertyData
  );

  const handleInputChange = () => {
    if (transactionType === "Shares") {
      const sharesAmount = parseInt(orderInput) || 0;
      const ratio = sharesAmount / Math.max(1, available_shares) || 0;

      setPercent(parseInt(ratio * 100));
      setValid(true);
      return;
    }
    if (transactionType === "Dollars") {
      const inputAmount = parseInt(orderInput) || 0;
      if (inputAmount <= transfer_remaining) {
        const ratio = inputAmount / Math.max(1, transfer_remaining) || 0;

        setPercent(parseInt(ratio * 100));
        setValid(true);
        return;
      }
      if (inputAmount > transfer_remaining) {
        setValid(false);
      }
    }
  };

  useEffect(() => {
    handleInputChange();
  }, [orderInput]);
  return (
    <div
      className={`${
        valid
          ? "scale-100 opacity-100 pointer-events-none"
          : " opacity-10 scale-95"
      } flex flex-1 items-center justify-center transition-all ease-in-out duration-150`}
    >
      <div className="h-3 w-3/5 rounded-md bg-gradient-to-r from-neutral-100 via-stone-100 to-neutral-200">
        <div
          className={`h-full bg-gradient-to-t from-blue-100 via-blue-400 to-blue-200 transition-colors duration-100 ease-in-out`}
          style={{
            width: `${percent}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default OrderBarGraph;
