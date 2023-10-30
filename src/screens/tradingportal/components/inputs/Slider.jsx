import "./tradeslider.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { storeOrderInput } from "../../../../contexts/redux/actions/tradingActions";
import { useQueryClient } from "@tanstack/react-query";

function Slider() {
  const dispatch = useDispatch();
  const [sliderVal, setSliderVal] = useState(0);
  const queryClient = useQueryClient();
  const { orderInfo: { transactionType } = {} } = useSelector(
    (state) => state.trade
  );

  const { transfer_remaining = 0 } =
    queryClient.getQueryData(["user-balance"]) || {};
  const { available_shares = 0 } =
    queryClient.getQueryData(["active-property"]) || {};

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
  }, [dispatch, sliderVal]);

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
