import React from "react";
import "./tradeslider.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import {
  fetchSelectedProperty,
  storeOrderInput,
} from "../../../../contexts/redux/actions/tradingActions";
import { useQuery } from "@tanstack/react-query";
import { fetchUserBalance } from "../../../../contexts/redux/actions/userActions";

function Slider() {
  const dispatch = useDispatch();
  const [sliderVal, setSliderVal] = useState(0);
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { orderInfo: { transactionType = null, orderInput = "" } = {} } =
    useSelector((state) => state.trade);

  const activePropertyQueryKey = ["active-property"];
  const { data: { available_shares = 0 } = {} } = useQuery(
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
      enabled: true,
    }
  );

  const max =
    transactionType === "Shares"
      ? available_shares
      : transactionType === "Dollars"
      ? transfer_remaining
      : 10;

  useEffect(() => {
    setSliderVal(0);
  }, [transactionType]);
  useEffect(() => {
    const input = sliderVal === 0 ? "" : sliderVal.toString();
    const orderInfo = {
      orderInput: input,
    };

    dispatch(storeOrderInput(orderInfo));
  }, [sliderVal]);

  return (
    <div
      id="inputSlider"
      className="flex items-center justify-center w-full rounded h-4/5 dark:bg-gray-800"
    >
      <input
        className="trade-slider__slider w-3/5"
        type="range"
        min="0"
        max={max}
        step="1"
        value={sliderVal}
        onChange={(e) => {
          setSliderVal(e.target.value);
        }}
      />
    </div>
  );
}

export default Slider;
