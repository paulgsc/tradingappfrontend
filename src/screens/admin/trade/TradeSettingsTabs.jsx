import React from "react";
import TabMenu from "../../../components/ui/TabMenu";
import { useNavigate } from "react-router";
import { useState } from "react";
import TradeGeneralSettings from "./TradeGeneralSettings";

function TradeSettingsTabs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("General Settings");

  const handleTabClick = (tabId, path = "") => {
    setActiveTab(tabId);
    path && navigate(path);
  };

  const isTabActive = (tabId) => {
    return activeTab === tabId;
  };
  const headers = [
    {
      id: "tab_1",
      title: "General Settings",
      content: <TradeGeneralSettings />,
    },
    {
      id: "tab_1",
      title: "Content page",
      content: "",
      path: "/admin/site/models/trade/content",
    },
  ];
  return (
    <TabMenu className={"w-full h-full"}>
      <TabMenu.List className={"justify-center"}>
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

export default TradeSettingsTabs;
