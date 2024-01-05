import TabMenu from "../../../components/ui/TabMenu";
import useTabNavigation from "../../../hooks/useTabNavigation";
import TradeGeneralSettings from "./TradeGeneralSettings";

function TradeSettingsTabs() {
  const { handleTabClick, isTabActive } = useTabNavigation(
    "settingsTab",
    "general"
  );

  const headers = [
    {
      id: "general",
      title: "General Settings",
      content: <TradeGeneralSettings />,
    },
    {
      id: "content",
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
