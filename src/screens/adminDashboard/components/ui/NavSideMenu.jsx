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
        path: "/admin/dashboard",
        icon: <DashboardSvg className={"w-6 h-6"} />,
      },
      {
        id: "apps",
        title: "apps",
        path: "/models",
        icon: (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        ),
      },
      {
        id: "search",
        title: "search",
        path: "/admin",
        icon: <MagnifyingGlass className={"w-6 h-6"} />,
      },
      {
        id: "insights",
        title: "insights",
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
              d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        ),
      },
    ],
    bottom: [
      {
        id: "django",
        title: "Django Portal Link",
        path: "/admin/dashboard?djangoLink=showDialog",
        icon: (
          <svg
            className="w-4 h-4 text-gray-800 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
            />
          </svg>
        ),
      },
      {
        id: "documents",
        title: "documents",
        path: "/admin",
        icon: <DocumentsSvg className={"w-6 h-6"} />,
      },
      {
        id: "settings",
        title: "settings",
        path: "/admin/site-settings/overview/info",
        icon: <SettingsSvg className={"w-6 h-6"} />,
      },
    ],
  };
  return <SideMenu sidenavslinks={sidenavslinks} />;
}

export default NavSideMenu;
