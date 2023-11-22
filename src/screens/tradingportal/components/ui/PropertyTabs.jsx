import PropertyOverview from "./PropertyOverview";
import TabMenu from "../../../../components/ui/TabMenu";
import FinancialsLayout from "../../layouts/FinancialsLayout";
import Documents from "./Documents";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function PropertyTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();

  const handleTabClick = (tabId) => {
    const currentSearchParams = new URLSearchParams(queryParameters);
    currentSearchParams.has("info")
      ? currentSearchParams.set("info", tabId)
      : currentSearchParams.append("info", tabId);
    navigate(`${location.pathname}?${currentSearchParams.toString()}`);
  };
  const isTabActive = (tabId) => {
    const info = queryParameters.get("info");
    return info ? tabId === info : tabId === "overview";
  };
  const headers = [
    {
      id: "overview",
      title: "Overview",
      content: <PropertyOverview />,
    },
    {
      id: "facts",
      title: "Facts",
      content: "",
    },
    {
      id: "financials",
      title: "Financials",
      content: <FinancialsLayout />,
    },
    {
      id: "documents",
      title: "Documents",
      content: <Documents />,
    },
  ];

  return (
    <TabMenu className={"hidden md:block h-fit lg:min-h-screen"}>
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
