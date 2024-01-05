import DashboardLayout from "./DashboardLayout";
import TabMenu from "../../../components/ui/TabMenu";
import OrdersLayout from "./OrdersLayout";
import Investments from "../components/ui/Investments";
import NewOrdersIcon from "../components/ui/NewOrdersIcon";
import useTabNavigation from "../../../hooks/useTabNavigation";

function OrderPortalLayout() {
  const { handleTabClick, isTabActive } = useTabNavigation(
    "activeTradePortal",
    "dashboard"
  );

  const headers = [
    {
      id: "dashboard",
      title: "Dashboard",
      content: <DashboardLayout />,
    },
    {
      id: "portfolio",
      title: "Portfolio",
      content: <Investments />,
    },
    {
      id: "orders",
      title: <NewOrdersIcon />,
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
