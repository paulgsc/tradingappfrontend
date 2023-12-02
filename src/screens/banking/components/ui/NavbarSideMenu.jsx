import SideMenu from "../../../../components/ui/SideMenu";
import {
  DashboardSvg,
  DocumentsSvg,
  MagnifyingGlass,
  SettingsSvg,
} from "../../../../constants/svgs/Svg";

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
        icon: <MagnifyingGlass className={"w-6 h-6"} />,
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
        icon: <DocumentsSvg className={"w-6 h-6"} />,
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
