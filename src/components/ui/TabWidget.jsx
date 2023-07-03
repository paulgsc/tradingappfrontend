import React, { useState } from "react";
import { useNavigate } from "react-router";
import { cn } from "../../lib/utils";

function TabWidget({
  active = "Dashboard",
  tabHeaders = [],
  getclassName = () => {},
}) {
  const navigate = useNavigate;
  const [activeTab, setActiveTab] = useState(active);

  const handleTabClick = (tabId, path = "") => {
    setActiveTab(tabId);
    path && navigate(path);
  };

  const isTabActive = (tabId) => {
    return activeTab === tabId;
  };

  return (
    <div
      className={cn(
        `${getclassName("main-container")} flex items-end w-full h-full`
      )}
    >
      <div className="w-full h-full ">
        <TabWidget.Header
          handleTabClick={handleTabClick}
          isTabActive={isTabActive}
          tabHeaders={tabHeaders}
        />
        <div
          id="myTabContent"
          className="absolute top-14 min-h-screen right-0 inset-0"
        >
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
    </div>
  );
}

TabWidget.Header = ({ isTabActive, handleTabClick, tabHeaders }) => (
  <ul
    className="w-full h-full flex flex-wrap p-0 m-0  text-base font-medium text-center"
    role="tablist"
  >
    {tabHeaders.map((item) => (
      <li className=" mr-1 xl:mr-2" role="presentation" key={item.id}>
        <button
          className={`h-full inline-block p-2 border-b-2 rounded-t-lg hover:text-blue-600 hover:border-gray-300 dark:hover:text ${
            isTabActive(item.title) ? "border-blue-600" : "border-transparent"
          }`}
          id={`tabs-${item.title}`}
          type="button"
          role="tab"
          aria-controls={item.title}
          aria-selected={isTabActive(item.title)}
          onClick={() =>
            item?.path
              ? handleTabClick(item.title, item?.path)
              : handleTabClick(item.title)
          }
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
