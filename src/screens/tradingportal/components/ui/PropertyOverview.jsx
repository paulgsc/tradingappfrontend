import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchSelectedProperty } from "../../../../contexts/redux/actions/tradingActions";

function PropertyOverview() {
  const activePropertyQueryKey = ["active-property"];
  const {
    data: {
      property_address = "property name",
      description = "description...",
    } = {},
  } = useQuery(activePropertyQueryKey, fetchSelectedProperty, {
    refetchOnMount: true, // Fetch on initial mount
    refetchOnWindowFocus: false, // Disable fetch on tab switch
  });

  return (
    <div className="flex flex-col mx-auto my-2 space-y-4">
      <title className="flex flex-1 justify-start items-center space-x-6">
        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase">
          {property_address}
        </h1>
        <div className="flex items-center space-x-2">
          <span className="bg-lime-400 h-4 w-4 rounded-full inline-block" />
          <span>100% occupied</span>
        </div>
      </title>
      <section className="">
        <summary className="flex flex-1 items-center justify-between w-1/2">
          <span>1 Bed</span>
          <span>1 Bath</span>
          <span>1235 sqft</span>
          <span>1 Bed</span>
        </summary>
      </section>
      <section>
        <address>Street, City, CA Zip</address>
      </section>

      <section>
        <div className="flex items-start justify-start ">
          <details
            open
            className="w-full h-fit bg-white border-t rounded-t-md shadow-sm group "
          >
            <summary className="px-2 py-4 outline-none cursor-pointer focus:underline focus:text-indigo-600 font-semibold marker:text-transparent group-open:before:rotate-90  before:origin-center relative before:w-[18px] before:h-[18px] before:transition-transform before:duration-200 before:-left-1 before:top-2/4 before:-translate-y-2/4 before:absolute before:bg-no-repeat before:bg-[length:18px_18px] before:bg-center before:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22h-6%20w-6%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%3E%0A%20%20%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M9%205l7%207-7%207%22%20%2F%3E%0A%3C%2Fsvg%3E')]">
              Property details
            </summary>
            <p>{description}</p>
          </details>
        </div>
      </section>
    </div>
  );
}

export default PropertyOverview;
