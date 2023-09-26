import NavbarLogo from "../../../../components/navbar/navlogo/NavbarLogo";
import DashboardLink from "../../../../components/ui/DashboardLink";
import ProfileMenu from "../../../../components/ui/ProfileMenu";
import LiveNotifications from "../../../../components/alerts/LiveNotifications";
import NavSideMenu from "../../../adminDashboard/components/ui/NavSideMenu";
import SearchImages from "./SearchImages";

function Navbar() {
  return (
    <header className="w-full">
      <nav className="bg-white shadow-inner border-b-2 border-neutral-300/60 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-1 justify-start items-center">
            <NavSideMenu />
            <NavbarLogo />
            <SearchImages />
          </div>

          <div className="flex items-center lg:order-2">
            <LiveNotifications />
            <DashboardLink path={"/models"} />
            <ProfileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
