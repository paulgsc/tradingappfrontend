import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import FlipCard from "./FlipCard";
import OrderHistory from "../tables/OrderHistory";

function Tabs({ soldShares, totalShares, raisedAmount }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const isTabActive = (tabId) => {
    return activeTab === tabId;
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="w-full mb-4 border-b border-gray-200 dark:border-gray-700">
        <Tabs.Header
          handleTabClick={handleTabClick}
          isTabActive={isTabActive}
        />
      </div>
      <div id="myTabContent">
        <div
          className={`${
            isTabActive("dashboard") ? "bg-gray-50 " : "hidden"
          } p-0 py-4 rounded-lg dark:bg-gray-800`}
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <div className="grid gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50  dark:bg-gray-800">
              <Tabs.ProgressBar
                soldShares={soldShares}
                totalShares={totalShares}
                raisedAmount={raisedAmount}
              />
            </div>

            <div className="flex items-center xl:my-4">
              <div className="flex-1 h-0.5 bg-black mr-2"></div>
              <p className="text-sm xl:text-base text-gray-400 dark:text-gray-500">
                Purchase Shares
              </p>
              <div className="flex-1 h-0.5 bg-black ml-2"></div>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
              <FlipCard />
            </div>
            <div className="row-span-2"></div>
          </div>
        </div>
        <div
          className={`${
            isTabActive("orders") ? "" : "hidden"
          } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
          id="orders"
          role="tabpanel"
          aria-labelledby="orders-tab"
        >
          <div className="flex fle-col items-center">
            <OrderHistory />
          </div>
        </div>
        <div
          className={`${
            isTabActive("settings") ? "" : "hidden"
          } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
          id="settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400"></p>
        </div>
      </div>
    </div>
  );
}

Tabs.Header = ({ isTabActive, handleTabClick }) => (
  <ul
    className="sticky top-32 w-full flex flex-wrap p-0 m-0 -mb-px text-sm xl:text-xl font-medium text-center"
    id="myTab"
    role="tablist"
  >
    <li className="mr-2" role="presentation">
      <button
        className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-600 hover:border-gray-300 dark:hover:text ${
          isTabActive("dashboard") ? "border-blue-600" : "border-transparent"
        }`}
        id="dashboard-tab"
        type="button"
        role="tab"
        aria-controls="dashboard"
        aria-selected={isTabActive("dashboard")}
        onClick={() => handleTabClick("dashboard")}
      >
        Dashboard
      </button>
    </li>
    <li className="mr-2" role="presentation">
      <button
        className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-600 hover:border-gray-300 dark:hover:text ${
          isTabActive("orders") ? "border-blue-600" : "border-transparent"
        }`}
        id="orders-tab"
        type="button"
        role="tab"
        aria-controls="orders"
        aria-selected={isTabActive("orders")}
        onClick={() => handleTabClick("orders")}
      >
        Orders
      </button>
    </li>
  </ul>
);

Tabs.ProgressBar = ({ soldShares, totalShares, raisedAmount }) => {
  const percent = 100 * (parseFloat(soldShares) / parseFloat(totalShares));
  return (
    <div className="flex items-center justify-center w-full rounded bg-gray-50  dark:bg-gray-800">
      <div className="w-full h-fit mb-06 rounded-lg shadow-lg">
        <ProgressBar
          percent={percent}
          sold={soldShares}
          available={totalShares}
          raised={raisedAmount}
        />
      </div>
    </div>
  );
};

export default Tabs;
