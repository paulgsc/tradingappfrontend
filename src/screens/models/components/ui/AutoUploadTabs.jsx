import TabMenu from "../../../../components/ui/TabMenu";
import { useEffect, useState } from "react";
import ModelFields from "../gsheets/ModelFields";
import { useNavigate, useParams } from "react-router";
import CronJobs from "../gsheets/CronJobs";
import RangePreview from "../gsheets/RangePreview";
import { getActionTrace } from "../../hooks/reactQuery";
import { useSearchParams } from "react-router-dom";
import SettingsArccordian from "../settings/SettingsArccordian";

function AutoUploadTabs() {
  const [activeTab, setActiveTab] = useState("");
  const { model } = useParams();
  const [queryParameters] = useSearchParams();
  const cronId = queryParameters.get("jobId");
  const navigate = useNavigate();
  const { data: { sheet_url = "", data_range = "" } = {} } = getActionTrace(
    "",
    { job_id: cronId }
  );
  const match = sheet_url.match(/\/d\/(.+?)\//);
  const sheetId = match ? match[1] : null;
  const handleTabClick = (tabId, path = null) => {
    setActiveTab(tabId);
    if (path) {
      navigate(path);
    }
  };

  const isTabActive = (tabId) => {
    return activeTab === tabId;
  };
  const headers = [
    {
      id: "tab_1",
      title: "Model Fields",
      content: <ModelFields />,
    },
    {
      id: "tab_2",
      title: "Sheets Preview",
      content: <RangePreview />,
      path: `/models/${model}/uploads/gsheets/cron/?jobId=${cronId}&sheetId=${sheetId}&dataRange=${data_range}`,
    },
    {
      id: "tab_3",
      title: "Upload Status",
      content: <CronJobs />,
    },
    {
      id: "tab_4",
      title: "Configurations",
      content: <SettingsArccordian />,
    },
  ];

  useEffect(() => {
    if (cronId) {
      setActiveTab("Upload Status");
    } else {
      setActiveTab("Model Fields");
    }
  }, [cronId]);
  return (
    <TabMenu className="w-full overflow-x-auto col-span-10">
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
        {headers.map(
          (item, i) =>
            isTabActive(item.title) && (
              <TabMenu.Content
                className={"w-full"}
                key={i}
                item={item}
                isTabActive={isTabActive}
              />
            )
        )}
      </TabMenu.ContentCard>
    </TabMenu>
  );
}

export default AutoUploadTabs;
