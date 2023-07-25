import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { validateOrderInput } from "../../../../contexts/redux/actions/tradingActions";

function ValidateAmount() {
  const dispatch = useDispatch();
  const {
    orderInfo: {
      transactionType = null,
      orderInput = "",
      pricePerShare = 0,
      validOrder = false,
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
      if (!isNaN(parseInt(orderInput))) {
        const shares = parseInt(orderInput);
        const orderAmount = shares * pricePerShare;
        return orderAmount;
      }
    }
    return null;
  };
  const isLessThanBalance = (orderAmount) => {
    return orderAmount <= transfer_remaining;
  };

  useEffect(() => {
    if (validOrder) {
      const amount = orderAmount();
      if (amount) {
        const result = isLessThanBalance(amount);
        const validationInfo = {
          isLessThanBalance: result,
        };
        dispatch(validateOrderInput(validationInfo));
      }
    }
  }, [orderInput]);
  return <></>;
}

export default ValidateAmount;
