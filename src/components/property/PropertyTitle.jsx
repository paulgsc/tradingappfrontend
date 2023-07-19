import React from "react";
import { useSelector } from "react-redux";

function PropertyTitle() {
  const {
    imagesSelectedQuery: {
      property_address = "",
      state = "",
      city = "",
      zip_code = "",
      id = null,
    } = {},
  } = useSelector((state) => state.adminFetchData);
  if (!id) {
    return (
      <div className="w-full h-32 bg-gray-100 border border-gray-400 shadow-inner p-2 ">
        <span className="text-sm font-thin">
          property details will appear here...
        </span>
      </div>
    );
  }
  return (
    <div className="block w-full p-2 bg-gradient-to-bl from-white via-indigo-100 to-lime-50 shadow-inner">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg xl:text-2xl font-bold capitalize">
          {property_address}
        </h3>
        <div className="flex flex-1 justify-start items-center gap-2 text-base xl:text-lg font-medium ">
          <span className="capitalize">{city && `${city},`}</span>
          <span className="uppercase">{state}</span>
          <span>{zip_code}</span>
          <span className="text-xs xl:text-sm uppercase ml-2 text-lime-500">
            30% sold
          </span>
        </div>
        <div className="mt-6  flex flex-col items-start justify-center gap-1 text-sm xl:text-base capitalize font-thin">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-600">1599 /mo</span>
            <span>single family</span>
            <span>leased</span>
          </div>
          <div className="flex items-center gap-2">
            <span>4 beds</span>
            <span>4 baths</span>
            <span>1235 sq ft</span>
            <span>year built 1992</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyTitle;
