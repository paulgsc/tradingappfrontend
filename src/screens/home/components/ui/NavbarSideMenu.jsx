import SideMenu from "../../../../components/ui/SideMenu";
import { DashboardSvg, SettingsSvg } from "../../../../constants/svgs/Svg";

function NavSideMenu() {
  const sidenavslinks = {
    top: [
      {
        id: "dashboard",
        title: "dashboard",
        path: "/admin",
        icon: <DashboardSvg className={"w-6 h-6"} />,
      },
      {
        id: "search",
        title: "search",
        path: "/admin",
        icon: (
          <svg
            className="w-6 h-6 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        ),
      },
      {
        id: "trade",
        title: "trade",
        path: "/trade",
        icon: (
          <svg
            className="w-6 h-6 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        ),
      },
    ],
    bottom: [
      {
        id: "documents",
        title: "documents",
        path: "/admin",
        icon: (
          <svg
            className="w-6 h-6 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
            />
          </svg>
        ),
      },
      {
        id: "settings",
        title: "settings",
        path: "/admin",
        icon: <SettingsSvg className={"w-6 h-6"} />,
      },
    ],
  };
  return <SideMenu sidenavslinks={sidenavslinks} />;
}

export default NavSideMenu;
