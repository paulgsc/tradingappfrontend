import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateOrderInput } from "../../../../contexts/redux/actions/tradingActions";

function ValidShares() {
  const dispatch = useDispatch();
  const {
    orderInfo: {
      transactionType = null,
      orderInput = "",
      pricePerShare = 0,
      availableShares = 0,
      validOrder = false,
    } = {},
  } = useSelector((state) => state.trade);

  const isWholeShares = () => {
    if (pricePerShare > 0 && !isNaN(parseFloat(orderInput))) {
      const orderAmount = parseFloat(orderInput);
      const shares = orderAmount / pricePerShare;
      return Number.isInteger(shares);
    }
    return false;
  };

  useEffect(() => {
    if (validOrder) {
      if (transactionType === "Dollars") {
        const result = isWholeShares();
        const validationInfo = {
          isWholeShares: result,
        };
        dispatch(validateOrderInput(validationInfo));
        return;
      }
      if (transactionType === "Shares") {
        if (!isNaN(parseInt(orderInput))) {
          const result = parseInt(orderInput) <= availableShares;
          const validationInfo = {
            isWholeShares: result,
          };
          dispatch(validateOrderInput(validationInfo));
          return;
        }
      }
    }
  }, [orderInput]);
  return <></>;
}

export default ValidShares;
