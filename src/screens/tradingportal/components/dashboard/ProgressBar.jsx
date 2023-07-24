import currency from "currency.js";
import React from "react";
import { useSelector } from "react-redux";

function ProgressBar() {
  const {
    tradingPropertyInfo: {
      total_property_shares = 0,
      total_purchased_shares = 0,
      total_purchased_amount = 0,
    } = {},
  } = useSelector((state) => state.propertyData);
  const percent =
    100 *
    (parseFloat(total_purchased_shares) / parseFloat(total_property_shares));
  return (
    <div className="flex items-center justify-center w-full rounded bg-gray-50  dark:bg-gray-800">
      <div className="w-full h-fit mb-06 rounded-lg shadow-lg">
        <div className=" w-full bg-gray-200 rounded-full h-2.5 mb-2 dark:bg-gray-700">
          <div
            className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <div className="w-full orange-gradient">
          <div className="mb-1 text-sm xl:text-lg font-light">
            <p className="px-2">
              {parseInt(total_purchased_shares) || 0} shares sold of{" "}
              {parseInt(total_property_shares) || 0} shares
            </p>
          </div>
          <div className="">
            <p className="px-4 text-stat-title text-gray-600 font-normal text-stat text-xs xl:text-base leading-5 mb-0">
              {" "}
              {currency(total_purchased_amount).format() || 0} funds raised{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
