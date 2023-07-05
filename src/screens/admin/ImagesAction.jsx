import React, { useState } from "react";
import TabMenu from "../../components/ui/TabMenu";

function ImagesAction() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tabId, path = "") => {
    setActiveTab(tabId);
  };

  const isTabActive = (tabId) => {
    return activeTab === tabId;
  };
  const headers = [
    {
      id: "tab_1",
      title: "Dashboard",
      content: "",
    },
    {
      id: "tab_2",
      title: "Upload",
      content: "",
    },
  ];
  return (
    <TabMenu>
      <TabMenu.List>
        {headers.map((item) => (
          <TabMenu.ListItems key={item.id}>
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
        {headers.map((item) => (
          <TabMenu.Content item={item} isTabActive={isTabActive} />
        ))}
      </TabMenu.ContentCard>
    </TabMenu>
  );
}

export default ImagesAction;
