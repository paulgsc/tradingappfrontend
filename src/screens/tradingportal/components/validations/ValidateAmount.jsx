import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchSelectedProperty,
  validateOrderInput,
} from "../../../../contexts/redux/actions/tradingActions";
import { useQuery } from "@tanstack/react-query";
import { fetchUserBalance } from "../../../../contexts/redux/actions/userActions";

function ValidateAmount() {
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
  const { data: { price_per_share = 0 } = {} } = useQuery(
    activePropertyQueryKey,
    fetchSelectedProperty,
    {
      refetchOnWindowFocus: false, // Disable fetch on tab switch
      refetchOnMount: true, // Fetch on initial mount
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
      refetchOnWindowFocus: false, // Disable fetch on tab switch
      refetchOnMount: true, // Fetch on initial mount
    }
  );

  const orderAmount = () => {
    if (transactionType === "Dollars") {
      if (!isNaN(parseFloat(orderInput))) {
        return parseFloat(orderInput);
      }
    }
    if (transactionType === "Shares") {
      if (!isNaN(parseInt(orderInput))) {
        const shares = parseInt(orderInput);
        const orderAmount = shares * price_per_share;
        return orderAmount;
      }
    }
    return null;
  };
  const isLessThanBalance = (orderAmount) => {
    return orderAmount <= transfer_remaining && orderAmount > 0;
  };

  useEffect(() => {
    if (validOrder) {
      const amount = orderAmount();

      const result = isLessThanBalance(amount);
      const validationInfo = {
        isLessThanBalance: result,
      };
      dispatch(validateOrderInput(validationInfo));
    }
  }, [orderInput, transfer_remaining, price_per_share]);
  return <></>;
}

export default ValidateAmount;
