import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateOrderInput } from "../../../../contexts/redux/actions/tradingActions";
import { getActivePropertyData, getUserBalance } from "../hooks/reactQuery";

function ValidShares() {
  const dispatch = useDispatch();
  const {
    orderInfo: {
      transactionType = null,
      orderInput = "",
      validOrder = false,
    } = {},
  } = useSelector((state) => state.trade);

  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const { data: { price_per_share = 0, available_shares = 0 } = {} } =
    getActivePropertyData(orderInput);

  // Second API call

  const { data: { transfer_remaining = 0 } = {} } = getUserBalance(
    orderInput,
    token
  );

  const isWholeShares = () => {
    if (price_per_share > 0 && !isNaN(parseFloat(orderInput))) {
      const orderAmount = parseFloat(orderInput);
      const shares = orderAmount / price_per_share;
      return Number.isInteger(shares) && orderAmount > 0;
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
        const result = parseInt(orderInput) <= available_shares;
        const validationInfo = {
          isWholeShares: result,
        };
        dispatch(validateOrderInput(validationInfo));
        return;
      }
    }
  }, [orderInput, price_per_share, available_shares, transfer_remaining]);
  return <></>;
}

export default ValidShares;
