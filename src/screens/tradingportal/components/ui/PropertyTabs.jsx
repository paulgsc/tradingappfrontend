import React, { useState } from "react";
import PropertyOverview from "./PropertyOverview";
import TabMenu from "../../../../components/ui/TabMenu";
import FinancialsLayout from "../../layouts/FinancialsLayout";
import Documents from "./Documents";

function PropertyTabs() {
  const [activeTab, setActiveTab] = useState("Overview");

  const handleTabClick = (tabId, path = "") => {
    setActiveTab(tabId);
    path && navigate(path);
  };
  const isTabActive = (tabId) => {
    return activeTab === tabId;
  };
  const headers = [
    {
      id: "1_1",
      title: "Overview",
      content: <PropertyOverview />,
    },
    {
      id: "1_2",
      title: "Facts",
      content: "",
    },
    {
      id: "1_3",
      title: "Financials",
      content: <FinancialsLayout />,
    },
    {
      id: "1_3",
      title: "Documents",
      content: <Documents />,
    },
  ];
  const getClassname = (name) => {
    switch (name) {
      case "main-container":
        return "relative";
      default:
        return "";
    }
  };
  return (
    <TabMenu className={"min-h-screen"}>
      <TabMenu.List
        className={
          " rounded-t-md shadow-sm  py-2 shadow-neutral-50 bg-gradient-to-r from-stone-200 via-white to-stone-50"
        }
      >
        {headers.map((item, i) => (
          <TabMenu.ListItems key={i}>
            <TabMenu.ButtonAction
              handleTabClick={handleTabClick}
              isTabActive={isTabActive}
              item={item}
            >
              <div className="flex relative">
                <span>{item.title}</span>
                {item?.icon && (
                  <span className="absolute -right-4 xl:-right-6 -top-2">
                    {item?.icon}
                  </span>
                )}
              </div>
            </TabMenu.ButtonAction>
          </TabMenu.ListItems>
        ))}
      </TabMenu.List>
      <TabMenu.ContentCard>
        {headers.map((item, i) => (
          <TabMenu.Content key={i} item={item} isTabActive={isTabActive} />
        ))}
      </TabMenu.ContentCard>
    </TabMenu>
  );
}

export default PropertyTabs;
