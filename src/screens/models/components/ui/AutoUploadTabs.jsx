import TabMenu from "../../../../components/ui/TabMenu";
import { useEffect, useState } from "react";
import ModelFields from "../gsheets/ModelFields";
import { useLocation, useNavigate, useParams } from "react-router";
import CronJobs from "../gsheets/CronJobs";
import RangePreview from "../gsheets/RangePreview";
import { getActionTrace } from "../../hooks/reactQuery";
import { useSearchParams } from "react-router-dom";
import SettingsArccordian from "../settings/SettingsArccordian";
import { useSelector } from "react-redux";

function AutoUploadTabs() {
  const { model } = useParams();
  const location = useLocation();
  const [queryParameters] = useSearchParams();
  const cronId = queryParameters.get("jobId");
  const navigate = useNavigate();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { data: { sheet_url = "", data_range = "" } = {} } = getActionTrace(
    token,
    {
      job_id: queryParameters.get("jobId"),
      model_name: model,
    }
  );
  const match = sheet_url.match(/\/d\/(.+?)\//);
  const sheetId = match ? match[1] : null;
  const handleTabClick = (tabId, path = null) => {
    const currentSearchParams = new URLSearchParams(queryParameters);
    currentSearchParams.has("activeTab")
      ? currentSearchParams.set("activeTab", tabId)
      : currentSearchParams.append("activeTab", tabId);
    if (path) {
      navigate(`${path}?${currentSearchParams.toString()}`);
    } else {
      navigate(`${location.pathname}?${currentSearchParams.toString()}`);
    }
  };

  const isTabActive = (tabId) => {
    const activeTab = queryParameters.get("activeTab")
      ? queryParameters.get("activeTab")
      : cronId
      ? "status"
      : "fields";

    return activeTab === tabId;
  };
  const headers = [
    {
      id: "fields",
      title: "Model Fields",
      content: <ModelFields />,
    },
    {
      id: "preview",
      title: "Sheets Preview",
      content: <RangePreview />,
      path: `/models/${model}/uploads/gsheets/cron/?jobId=${cronId}&sheetId=${sheetId}&dataRange=${data_range}`,
    },
    {
      id: "status",
      title: "Upload Status",
      content: <CronJobs />,
    },
    {
      id: "config",
      title: "Configurations",
      content: <SettingsArccordian />,
    },
  ];

  return (
    <TabMenu className="min-w-full col-span-10">
      <TabMenu.List
        className={
          "rounded-t-md shadow-sm shadow-neutral-50 bg-gradient-to-tr from-white via-stone-100 to-white"
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

export default AutoUploadTabs;
