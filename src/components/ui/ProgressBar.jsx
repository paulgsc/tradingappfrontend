import currency from "currency.js";
import React from "react";

function ProgressBar({ percent, sold, available, raised }) {
  return (
    <div className="w-full">
      <div className=" w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="w-full orange-gradient">
        <div className="mb-1 text-base font-light">
          <p className="px-2">
            {parseInt(sold)} shares sold of {parseInt(available)} shares
          </p>
        </div>
        <div className="">
          <p className="px-4 py-2 text-stat-title text-gray-600 font-normal text-stat text-lg leading-5 mb-0">
            {" "}
            {currency(raised).format()} funds raised{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
