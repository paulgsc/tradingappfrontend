import React from "react";
import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import TabMenu from "../../../components/ui/TabMenu";
import OrdersLayout from "./OrdersLayout";
import Investments from "../components/ui/Investments";

function OrderPortalLayout() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const isTabActive = (tabId) => {
    return activeTab === tabId;
  };
  const headers = [
    {
      id: "tab_1",
      title: "Dashboard",
      content: <DashboardLayout />,
    },
    {
      id: "tab_2",
      title: "Portfolio",
      content: <Investments />,
    },
    {
      id: "tab_3",
      title: "Orders",
      content: <OrdersLayout />,
    },
  ];
  return (
    <TabMenu>
      <TabMenu.List
        className={
          " rounded-t-md shadow-sm shadow-neutral-50 bg-gradient-to-tr from-white via-stone-100 to-white"
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
      <TabMenu.ContentCard className={"w-full"}>
        {headers.map((item, i) => (
          <TabMenu.Content key={i} item={item} isTabActive={isTabActive} />
        ))}
      </TabMenu.ContentCard>
    </TabMenu>
  );
}

export default OrderPortalLayout;
