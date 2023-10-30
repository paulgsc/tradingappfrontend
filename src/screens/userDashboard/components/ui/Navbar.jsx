import LiveNotifications from "../../../../components/alerts/LiveNotifications";
import NavbarLogo from "../../../../components/navbar/navlogo/NavbarLogo";
import DashboardLink from "../../../../components/ui/DashboardLink";
import ProfileMenu from "../../../../components/ui/ProfileMenu";
import NavSideMenu from "./NavSideMenu";

function Navbar() {
  return (
    <header className="w-full">
      <nav className="shadow-inner border-b-2 border-neutral-300/60 px-4 lg:px-6 py-2.5 bg-gradient-to-bl from-zinc-50 via-teal-200/70 to-zinc-100 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-1 justify-start items-center">
            <NavSideMenu />
            <NavbarLogo />
          </div>
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
