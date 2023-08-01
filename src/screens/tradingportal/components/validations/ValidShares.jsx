import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedProperty,
  validateOrderInput,
} from "../../../../contexts/redux/actions/tradingActions";
import { useQuery } from "@tanstack/react-query";
import { fetchUserBalance } from "../../../../contexts/redux/actions/userActions";

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

  const activePropertyQueryKey = ["active-property", orderInput];
  const { data: { price_per_share = 0, available_shares = 0 } = {} } = useQuery(
    activePropertyQueryKey,
    fetchSelectedProperty,
    {
      enabled: true,
    }
  );

  // Second API call
  const userBalanceQueryKey = ["user-balance", orderInput];
  const { data: { transfer_remaining = 0 } = {} } = useQuery(
    userBalanceQueryKey,
    async () => {
      return await fetchUserBalance(token);
    },
    {
      enabled: true,
    }
  );

  const isWholeShares = () => {
    if (price_per_share > 0 && !isNaN(parseFloat(orderInput))) {
      const orderAmount = parseFloat(orderInput);
      const shares = orderAmount / price_per_share;
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
          const result = parseInt(orderInput) <= available_shares;
          const validationInfo = {
            isWholeShares: result,
          };
          dispatch(validateOrderInput(validationInfo));
          return;
        }
      }
    }
  }, [orderInput, price_per_share, available_shares, transfer_remaining]);
  return <></>;
}

export default ValidShares;
