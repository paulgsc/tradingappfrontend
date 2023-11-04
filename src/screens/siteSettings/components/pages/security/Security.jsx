import { useLocation } from "react-router";
import AuthenticationSideMenu from "../../ui/AuthenticationSideMenu";
import Authentication from "./pages/Authentication";
import SiteNotifications from "./pages/SiteNotifications";

function Security() {
  const location = useLocation();
  const sideNavs = [
    {
      id: 1,
      title: "User Session Settings",
      path: "/admin/site-settings/security/authentication",
    },
    {
      id: 2,
      title: "Account Notifications",
      path: "/admin/site-settings/security/notifications",
    },
  ];
  return (
    <section className="flex flex-1 items-start justify-center mx-6 mt-2 space-x-4">
      <AuthenticationSideMenu sideNavs={sideNavs} />
      {location.pathname.includes("/security/authentication") && (
        <Authentication />
      )}
      {location.pathname.includes("/security/notifications") && (
        <SiteNotifications />
      )}
    </section>
  );
}

export default Security;
