import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { validateOrderInput } from "../../../../contexts/redux/actions/tradingActions";
import { useQueryClient } from "@tanstack/react-query";

function ValidateAmount() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    orderInfo: {
      transactionType = null,
      orderInput = "",

      validOrder = false,
    } = {},
  } = useSelector((state) => state.trade);

  const { price_per_share = 0 } =
    queryClient.getQueryData(["active-property"]) || {};

  const { transfer_remaining = 0 } =
    queryClient.getQueryData(["user-balance"]) || {};

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
