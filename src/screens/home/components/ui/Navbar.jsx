import { useSelector } from "react-redux";
import NavbarLogo from "../../../../components/navbar/navlogo/NavbarLogo";
import DashboardLink from "../../../../components/ui/DashboardLink";
import ProfileMenu from "../../../../components/ui/ProfileMenu";
import NavSideMenu from "./NavbarSideMenu";
import NavbarItems from "./NavbarItems";
import NavbarLogins from "../../../../components/ui/NavbarLogins";
import DebugMode from "../../../../components/ui/DebugMode";
import { Link } from "react-router-dom";

function Navbar() {
  const { userInfo: { token, is_admin } = {} } = useSelector(
    (state) => state.userAuth
  );
  return (
    <header className="w-full">
      <nav className="shadow-inner border-b-2 border-neutral-300/60 px-4 lg:px-6 py-2.5 ">
        <div className="flex md:flex-wrap justify-between items-center">
          <div className="flex flex-1 justify-start items-center bg">
            <div className="block lg:hidden">
              <NavSideMenu />
            </div>
            <NavbarLogo />
            <NavbarItems />
          </div>
          <div className="flex items-center lg:order-2">
            {token && is_admin && <DebugMode />}
            {token && <DashboardLink path={"/personal/dashboard"} />}
            {token ? (
              <ProfileMenu />
            ) : (
              <>
                <div className="hidden md:inline-flex m-auto justify-start items-center md:w-72 lg:w-80 gap-2">
                  <div className="w-4/12">
                    <NavbarLogins />
                  </div>
                  <Link
                    to={"/register"}
                    className="text-sm md:text-base text-center text-white tracking-tight w-6/12 max-h-12 overflow-hidden bg-gray-800 px-2 py-1 rounded-full hover:bg-zinc-50 hover:text-black"
                    rel="noopener noreferrer"
                  >
                    Start investing
                  </Link>
                </div>
                <div className="md:hidden">
                  <NavbarLogins />
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
