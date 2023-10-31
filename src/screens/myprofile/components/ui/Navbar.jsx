import LiveNotifications from "../../../../components/alerts/LiveNotifications";
import NavbarLogo from "../../../../components/navbar/navlogo/NavbarLogo";
import DashboardLink from "../../../../components/ui/DashboardLink";
import ProfileMenu from "../../../../components/ui/ProfileMenu";
import NavSideMenu from "./NavSideMenu";
import NavTabs from "./NavTabs";

function Navbar() {
  return (
    <header className="w-full z-50 bg-white">
      <nav className=" shadow-inner border-b-2 border-neutral-300/60 px-4 lg:px-6">
        <div className="flex  justify-between items-center relative">
          <div className="flex justify-start items-center h-16">
            <NavSideMenu />
            <NavbarLogo />
          </div>
          <NavTabs />
          <div className="flex items-center lg:order-2">
            <LiveNotifications />
            <DashboardLink path={"/personal/dashboard"} />
            <ProfileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
