import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeOrderInput } from "../../../../../../../contexts/redux/actions/tradingActions";
import { clearOrderInfo } from "../../../../../../../reducers/tradingReducers";

function ManualInput() {
  const dispatch = useDispatch();
  const { tradingPropertyInfo: { available_shares } = {} } = useSelector(
    (state) => state.propertyData
  );
  const { orderInfo: { transactionType = null, orderInput = "" } = {} } =
    useSelector((state) => state.trade);

  const [input, setInput] = useState("0");
  const [counter, setCounter] = useState(0);

  const isPositiveNumber = (val) => {
    const numericValue = parseFloat(val);
    return !isNaN(numericValue) && numericValue >= 0;
  };

  const numericOnly = (val) => {
    // Use a regular expression to check for numeric values
    const numericRegex = /^(?:\d+(\.\d*)?|\.\d+)$/;
    return numericRegex.test(val.trim());
  };

  const digitOnly = (val) => {
    const digitRegex = /^\d+$/;
    return digitRegex.test(val);
  };

  const isInteger = (val) => {
    const integerValue = parseInt(val, 10);
    return !isNaN(integerValue) && parseFloat(val) === integerValue;
  };

  const isWithinAvailableShares = (val) => {
    const integerValue = parseInt(val, 10);
    return !isNaN(integerValue) && integerValue <= available_shares;
  };

  const isWithinValidAmountInteger = (val) => {
    const numericValue = parseFloat(val);
    return !isNaN(numericValue) && numericValue <= 1000000;
  };

  const isWithinValidAmountDecimal = (val) => {
    const numericValue = parseFloat(val);
    return !isNaN(numericValue) && numericValue <= 100 && val.length < 3;
  };

  const validateInteger = (val) => {
    if (val === "" || (isPositiveNumber(val) && numericOnly(val))) {
      if (
        val === "" ||
        (transactionType === "Shares" &&
          isInteger(val) &&
          isWithinAvailableShares(val))
      ) {
        return true;
      }
      if (transactionType === "Dollars" && isWithinValidAmountInteger(val)) {
        return true;
      }
    }
    return false;
  };

  const validateDecimal = (val) => {
    if (transactionType === "Shares") {
      return false;
    }
    if (val === "" || (isPositiveNumber(val) && digitOnly(val))) {
      if (transactionType === "Dollars" && isWithinValidAmountDecimal(val)) {
        return true;
      }
    }
    return false;
  };

  const handleInput = (e) => {
    setCounter((prevCounter) => prevCounter + 1);
    const val = e.target.value.trim();
    if (val !== "" && !numericOnly(val)) {
      return;
    }
    const [intPart, decimalPart] = val.split(".");

    if (decimalPart) {
      if (validateInteger(intPart) && validateDecimal(decimalPart)) {
        isWithinValidAmountInteger(val) && setInput(val);
        return;
      }
      return;
    }
    validateInteger(intPart) && setInput(val);
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

  return (
    <div className="flex flex-1 h-full">
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
