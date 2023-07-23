import React from "react";
import TradingPropertyImages from "./TradingPropertyImages";
import PropertyTabs from "./PropertyTabs";
import { useSelector } from "react-redux";
import OrderPortalLayout from "../inputPortal/OrderPortalLayout";

function TradingInfoLayout() {
  const { showSummaryPortal = false } = useSelector((state) => state.trade);
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-7 gap-4  w-full h-full flex-1">
      <div className="sm:hidden xl:block xl:col-span-1"></div>
      <div className="col-span-1 lg:col-span-2 xl:col-span-3">
        <div className="flex items-center justify-center rounded bg-gray-50 h-full dark:bg-gray-800">
          <div
            className={`grid ${
              !showSummaryPortal && "grid-rows-3"
            } gap-0 w-full h-full items-start`}
          >
            <div className=" row-span-1">
              <TradingPropertyImages />
            </div>
            <div
              className={`${
                showSummaryPortal ? "hidden" : "block"
              } transition-all duration-1000 ease-in-out row-span-2`}
            >
              <div className="flex items-center justify-center w-full rounded bg-gray-50 dark:bg-gray-800">
                <PropertyTabs />
              </div>
              <div className="flex items-center justify-center w-full rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-1 xl:col-span-2 w-full h-fit sticky top-[80px] xl:top-32 ">
        <div className="flex items-center justify-center rounded  h-full w-full ">
          <div className="flex flex-col justify-start m-0 p-4 w-full h-full mb-4 bg-transparent">
            <OrderPortalLayout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradingInfoLayout;
