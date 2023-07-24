import React from "react";
import { useSelector } from "react-redux";

function PropertyHeader() {
  const {
    tradingPropertyInfo: {
      property_address = "",
      city = "",
      state = "",
      zip_code = "",
      description = "",
    } = {},
  } = useSelector((state) => state.propertyData);
  return (
    <div className="flex flex-col">
      <span className="text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold">
        {property_address}
      </span>
      <span className="text-sm xl:text-base font-extralight">{`${city}, ${state} ${zip_code}`}</span>
      <span className="text-sm xl:text-base font-semibold">{description}</span>
    </div>
  );
}

export default PropertyHeader;
