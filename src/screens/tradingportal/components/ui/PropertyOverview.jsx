import React from "react";

function PropertyOverview() {
  return (
    <div className="flex flex-col">
      <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
        $299,997
      </span>
      <span>rental status: 100% filled</span>
      <span>monthly rent: $1,200</span>
      <span>rental revenue: $10,000</span>
      <span>HOE: $2,000</span>
      <span>Maintanance: $2,000</span>
    </div>
  );
}

export default PropertyOverview;
