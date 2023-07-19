import React, { useEffect, useState } from "react";
import TabMenu from "../../components/ui/TabMenu";
import UploadForm from "../../components/ui/UploadForm";
import { useSelector } from "react-redux";
import ImageSubmitCard from "./ImageSubmitCard";

function ImagesAction() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { uploadState: { uploaded = false } = {} } = useSelector(
    (state) => state.adminFetchData
  );

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
      content: <ImageSubmitCard />,
    },
    {
      id: "tab_2",
      title: "Upload",
      content: <UploadForm />,
    },
  ];

  useEffect(() => {
    if (uploaded) {
      if (activeTab !== "Dashboard") {
        setActiveTab("Dashboard");
        return;
      }
    }
  }, [uploaded]);

  return (
    <TabMenu className={"w-full h-full"}>
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
      <TabMenu.ContentCard className={"w-full h-full"}>
        {headers.map((item) => (
          <TabMenu.Content
            className={"w-full h-full"}
            item={item}
            isTabActive={isTabActive}
            key={item.id}
          />
        ))}
      </TabMenu.ContentCard>
    </TabMenu>
  );
}

export default ImagesAction;
