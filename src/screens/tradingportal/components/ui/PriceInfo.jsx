import currency from "currency.js";
import React from "react";
import { useSelector } from "react-redux";

function PriceInfo() {
  const { tradingPropertyInfo: { price_per_share } = {} } = useSelector(
    (state) => state.propertyData
  );
  return (
    <div className="flex flex-col items-center text-xs text-blue-900 h-full bg-gradient-to-b from-white via-stone-100 to-white">
      <span>{currency(price_per_share).format()}</span>
      <small className=" text-[11px] font-semibold">per/share</small>
    </div>
  );
}

export default PriceInfo;
