import { useSelector } from "react-redux";
import NavbarLogo from "../../../../components/navbar/navlogo/NavbarLogo";
import NavSideMenu from "./NavbarSideMenu";
import DebugMode from "../../../../components/ui/DebugMode";
import DashboardLink from "../../../../components/ui/DashboardLink";
import ProfileMenu from "../../../../components/ui/ProfileMenu";
import NavbarLogins from "../../../../components/ui/NavbarLogins";

function Navbar() {
  const { userInfo: { token, is_admin } = {} } = useSelector(
    (state) => state.userAuth
  );
  return (
    <header className="w-full">
      <nav className="shadow-inner border-b-2 border-neutral-300/60 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-1 justify-start items-center">
            <div className="block lg:hidden">
              <NavSideMenu />
            </div>
            <NavbarLogo />
          </div>
          <div className="flex items-center lg:order-2">
            {token && is_admin && <DebugMode />}
            {token && <DashboardLink path={"/personal/dashboard"} />}
            {token ? <ProfileMenu /> : <NavbarLogins />}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
