import React, { useState } from "react";

function TabWidget({ active = "Dashboard", tabHeaders = [] }) {
  const [activeTab, setActiveTab] = useState(active);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const isTabActive = (tabId) => {
    return activeTab === tabId;
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full mb-4 border-b border-gray-200 dark:border-gray-700">
        <TabWidget.Header
          handleTabClick={handleTabClick}
          isTabActive={isTabActive}
          tabHeaders={tabHeaders}
        />
      </div>
      <div id="myTabContent">
        {tabHeaders.map((item) => (
          <div
            key={item.id}
            className={`${
              isTabActive(item.title) ? "" : "hidden"
            } p-0 py-4 rounded-lg dark:bg-gray-800`}
            id={item.title}
            role="tabpanel"
            aria-labelledby={`${item.title}-tab`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}

TabWidget.Header = ({ isTabActive, handleTabClick, tabHeaders }) => (
  <ul
    className="w-full flex flex-wrap p-0 m-0 -mb-px text-base font-medium text-center"
    role="tablist"
  >
    {tabHeaders.map((item) => (
      <li className="mr-1 xl:mr-2" role="presentation" key={item.id}>
        <button
          className={`inline-block p-2 border-b-2 rounded-t-lg hover:text-blue-600 hover:border-gray-300 dark:hover:text ${
            isTabActive(item.title) ? "border-blue-600" : "border-transparent"
          }`}
          id={`tabs-${item.title}`}
          type="button"
          role="tab"
          aria-controls={item.title}
          aria-selected={isTabActive(item.title)}
          onClick={() => handleTabClick(item.title)}
        >
          <div className="flex relative">
            <span>{item.title}</span>
            {item?.icon && (
              <span className="absolute -right-4 xl:-right-6 -top-2">
                {item?.icon}
              </span>
            )}
          </div>
        </button>
      </li>
    ))}
  </ul>
);

export default TabWidget;
