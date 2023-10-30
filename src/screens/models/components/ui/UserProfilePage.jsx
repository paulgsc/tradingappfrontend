import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TabMenu from "../../../../components/ui/TabMenu";
import UserSettingsCard from "./UserSettingsCard";
import ProfileRolesSettings from "./ProfileRolesSettings";

function UserProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();
  const isTabActive = (tabId) => {
    return queryParameters.get("activeTab")
      ? queryParameters.get("activeTab") === tabId
      : "Settings" === tabId;
  };
  const handleTabClick = (tab, path = location.pathname) => {
    const currentSearchParams = new URLSearchParams(queryParameters);
    currentSearchParams.set("activeTab", tab);
    navigate(`${path}?${currentSearchParams.toString()}`);
  };

  const headers = [
    {
      id: "tab_1",
      title: "Settings",
      content: <UserSettingsCard />,
    },
    {
      id: "tab_2",
      title: "Roles",
      content: <ProfileRolesSettings />,
    },
  ];

  return (
    <TabMenu className="w-full min-h-screen xl:w-10/12  lg:max-w-6xl xl:max-w-full p-2 border-l shadow-sm">
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
      <TabMenu.ContentCard className={"w-full "}>
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

export default UserProfilePage;
