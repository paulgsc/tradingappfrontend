import React, { useEffect } from "react";
import ChartContent from "./ChartContent";

function MetricChart({ id }) {
  const handleViewMore = (e) => {
    e.stopPropagation(); // Stop event propagation
    const element = document.getElementById(`metric-chart_${id}`);
    element.classList.toggle("opacity-0");
    element.classList.toggle("pointer-events-none");
  };

  const hideChart = (e) => {
    e.stopPropagation(); // Stop event propagation
    const element = document.getElementById(`metric-chart_${id}`);
    if (element.contains(e.target)) {
      console.log("foo foo foo");
      return;
    }
    console.log(e.target.contains(element));
    console.log("e.target: ", e.target);
    console.log("element: ", element);
    element.classList.add("opacity-0");
    element.classList.add("pointer-events-none");
  };

  useEffect(() => {
    document.addEventListener("click", hideChart);
    return () => {
      removeEventListener("click", hideChart);
    };
  }, []);
  return (
    <div className="">
      <div className="w-full">
        <span>Tracks count of unique user accounts created.</span>
        <div className="flex justify-end w-full">
          <button
            onClick={handleViewMore}
            type="button"
            className="text-white bg-teal-700 hover:bg-pink-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
          >
            <svg
              className="-ml-0.5 mr-2 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View more
          </button>
        </div>
      </div>
      <ChartContent id={id} />
    </div>
  );
}

export default MetricChart;
