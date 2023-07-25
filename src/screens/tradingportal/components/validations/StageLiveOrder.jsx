import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stageLiveOrder } from "../../../../contexts/redux/actions/tradingActions";

function StageLiveOrder() {
  const dispatch = useDispatch();

  const {
    orderInfo: {
      transactionType = null,
      orderInput = "",
      pricePerShare = 0,
      validOrder = false,
    } = {},
    orderValidation: { isWholeShares = false, isLessThanBalance = false } = {},
  } = useSelector((state) => state.trade);

  const setShares = () => {
    if (transactionType === "Shares") {
      return parseInt(orderInput);
    }
    if (transactionType === "Dollars") {
      const amount = parseFloat(orderInput);
      return pricePerShare > 0 ? amount / pricePerShare : 0;
    }
  };

  const setAmount = () => {
    if (transactionType === "Dollars") {
      return parseFloat(orderInput);
    }
    if (transactionType === "Shares") {
      const shares = parseInt(orderInput);
      return pricePerShare * shares;
    }
  };
  useEffect(() => {
    if (isLessThanBalance && isWholeShares && validOrder) {
      const shares = setShares();
      const amount = setAmount();

      const orderInfo = {
        shares: shares,
        amount: amount,
      };

      dispatch(stageLiveOrder(orderInfo));
    } else {
      const orderInfo = {
        shares: 0,
        amount: 0,
      };
      dispatch(stageLiveOrder(orderInfo));
    }
  }, [orderInput, isLessThanBalance, isWholeShares, validOrder]);
  return <div></div>;
}

export default StageLiveOrder;
