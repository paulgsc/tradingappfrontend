import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateOrderInput } from "../../../../../../contexts/redux/actions/tradingActions";
import { useEffect } from "react";

function ValidateAmount() {
  const dispatch = useDispatch();
  const {
    orderInfo: {
      transactionType = null,
      orderInput = "",
      pricePerShare = 0,
    } = {},
    userBalance: { transfer_remaining } = {},
  } = useSelector((state) => state.trade);

  const orderAmount = () => {
    if (transactionType === "Dollars") {
      if (!isNaN(parseFloat(orderInput))) {
        return parseFloat(orderInput);
      }
    }
    if (transactionType === "Shares") {
      if (!isNaN(parseInt(orderInput)) && pricePerShare > 0) {
        const shares = parseInt(orderInput);
        const orderAmount = shares / pricePerShare;
        return orderAmount;
      }
    }
    return null;
  };
  const isLessThanBalance = (orderAmount) => {
    return orderAmount <= transfer_remaining;
  };

  useEffect(() => {
    const amount = orderAmount();
    if (amount) {
      const result = isLessThanBalance(amount);
      const validationInfo = {
        isLessThanBalance: result,
      };
      dispatch(validateOrderInput(validationInfo));
    }
  }, [orderInput]);
  return <></>;
}

export default ValidateAmount;
