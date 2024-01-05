import TabMenu from "./components/ui/TabMenu";
import useTabNavigation from "./hooks/useTabNavigation";

function Test() {
  const { handleTabClick, isTabActive } = useTabNavigation("test", "dashboard");

  const headers = [
    {
      id: "dashboard",
      title: "Dashboard",
      content: "",
    },
    {
      id: "portfolio",
      title: "Portfolio",
      content: "",
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

export default Test;
