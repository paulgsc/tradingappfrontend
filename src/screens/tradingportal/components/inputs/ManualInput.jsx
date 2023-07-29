import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedProperty,
  storeOrderInput,
} from "../../../../contexts/redux/actions/tradingActions";
import NotEnoughFunds from "../alerts/orders/NotEnoughFunds";
import NotWholeShares from "../alerts/orders/NotWholeShares";
import { useQuery } from "@tanstack/react-query";

function ManualInput() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("0");
  const [counter, setCounter] = useState(0);
  const queryKey = ["active-property"];
  const {
    data: { available_shares = 0 } = {},
    isError,
    refetch,
  } = useQuery(queryKey, fetchSelectedProperty, {
    enabled: true,
  });

  const { orderInfo: { transactionType = null, orderInput = "" } = {} } =
    useSelector((state) => state.trade);

  const isPositiveNumber = (val) => {
    const numericValue = parseFloat(val);
    return !isNaN(numericValue) && numericValue >= 0;
  };
  const numericOnly = (val) => {
    // Updated regular expression to meet the specified criteria
    const numericRegex =
      /^(?!0\d)(?!1000000\.)(?:1000000|\d{1,6})(?:\.\d{0,2})?$/;

    return numericRegex.test(val.trim());
  };

  const digitOnly = (val) => {
    const digitRegex = /^\d+$/;
    return digitRegex.test(val);
  };

  const isWithinAvailableShares = (val) => {
    const integerValue = parseInt(val, 10);
    return !isNaN(integerValue) && integerValue <= available_shares;
  };

  const handleInput = (e) => {
    setCounter((prevCounter) => prevCounter + 1);

    const val = e.target.value.trim();

    if (val === "") {
      setInput(val);
      return;
    }
    if (transactionType === "Shares") {
      if (
        digitOnly(val) &&
        isPositiveNumber(val) &&
        isWithinAvailableShares(val)
      ) {
        setInput(val);
        return;
      }
    }
    if (transactionType === "Dollars") {
      if (numericOnly(val) && isPositiveNumber(val)) {
        setInput(val);
        return;
      }
    }
  };

  useEffect(() => {
    const orderInfo = {
      orderInput: input,
    };

    dispatch(storeOrderInput(orderInfo));
  }, [input, counter]);

  useEffect(() => {
    setInput("");
  }, [transactionType]);

  useEffect(() => {
    refetch();
  }, [orderInput]);

  return (
    <div className="flex flex-1 h-full">
      <NotEnoughFunds />
      <NotWholeShares />
      <input
        id="inputAmount"
        type="text"
        name="sharesAmount"
        autoComplete="off"
        inputMode="numeric"
        value={orderInput}
        onChange={handleInput}
        className="w-full h-full py-2 text-right text-lg xl:text-xl outline-0 bg-slate-100 rounded-r-md shadow-sm text-black appearance-none no-spin-button"
      />
    </div>
  );
}

export default ManualInput;
