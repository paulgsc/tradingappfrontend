import TabMenu from "../../../../components/ui/TabMenu";
import UploadForm from "./UploadForm";
import ImageSubmitCard from "./ImageSubmitCard";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function ImagesAction() {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();

  const handleTabClick = (tabId) => {
    const currentSearchParams = new URLSearchParams(queryParameters);
    currentSearchParams.has("imageForm")
      ? currentSearchParams.set("imageForm", tabId)
      : currentSearchParams.append("imageForm", tabId);
    navigate(`${location.pathname}?${currentSearchParams.toString()}`);
  };

  const isTabActive = (tabId) => {
    const activeTab = queryParameters.get("imageForm")
      ? queryParameters.get("imageForm")
      : "dashboard";
    return activeTab === tabId;
  };
  const headers = [
    {
      id: "dashboard",
      title: "Dashboard",
      content: <ImageSubmitCard />,
    },
    {
      id: "upload",
      title: "Upload",
      content: <UploadForm />,
    },
  ];

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
