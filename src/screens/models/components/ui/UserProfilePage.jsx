import TabMenu from "../../../../components/ui/TabMenu";
import UserSettingsCard from "./UserSettingsCard";
import ProfileRolesSettings from "./ProfileRolesSettings";
import useTabNavigation from "../../../../hooks/useTabNavigation";

function UserProfilePage() {
  const { handleTabClick, isTabActive } = useTabNavigation(
    "activeTab",
    "settings"
  );

  const headers = [
    {
      id: "settings",
      title: "Settings",
      content: <UserSettingsCard />,
    },
    {
      id: "roles",
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
      <TabMenu.ContentCard className={"w-full"}>
        {headers.map((item, i) => (
          <TabMenu.Content key={i} item={item} isTabActive={isTabActive} />
        ))}
      </TabMenu.ContentCard>
    </TabMenu>
  );
}

export default UserProfilePage;
