import { useQuery } from "@tanstack/react-query";
import currency from "currency.js";
import React from "react";
import { fetchSelectedProperty } from "../../../../contexts/redux/actions/tradingActions";

function PriceInfo() {
  const queryKey = ["active-property"];
  const { data: { price_per_share = 0 } = {} } = useQuery(
    queryKey,
    fetchSelectedProperty,
    {
      refetchOnWindowFocus: false, // Disable fetch on tab switch
      refetchOnMount: true, // Fetch on initial mount
    }
  );
  return (
    <div className="flex flex-col items-center text-xs text-blue-900 h-full bg-gradient-to-b from-white via-stone-100 to-white">
      <span>{currency(price_per_share).format()}</span>
      <small className=" text-[11px] font-semibold">per/share</small>
    </div>
  );
}

export default PriceInfo;
