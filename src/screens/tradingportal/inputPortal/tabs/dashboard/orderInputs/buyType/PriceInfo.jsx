import currency from "currency.js";
import React from "react";
import { useSelector } from "react-redux";

function PriceInfo() {
  const { tradingPropertyInfo: { price_per_share } = {} } = useSelector(
    (state) => state.propertyData
  );
  return (
    <div className="flex flex-col items-center text-xs">
      <span>{currency(price_per_share).format()}</span>
      <small className=" text-[11px] font-thin">per/share</small>
    </div>
  );
}

export default PriceInfo;
