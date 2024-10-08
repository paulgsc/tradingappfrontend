import { useEffect, useState } from "react";
import NavbarLogins from "../ui/NavbarLogins";
import NavbarLogo from "./navlogo/NavbarLogo";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";
import CustomSvg from "../ui/CustomSvg";

function Navbar({ showMenu, Menubar }) {
  const [isActive, setIsActive] = useState(false);
  const { userInfo: { token = "", is_admin = false } = {} } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (typeof initLetter === "function") {
      setProfileInitial(initLetter());
    }
  }, [token]);

  const initLetter = () =>
    JSON.parse(localStorage.getItem("userInfo"))?.email?.charAt(0) || "";
  const [profileInitial, setProfileInitial] = useState(initLetter());

  const openMenu = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const container = document.getElementById("navbar-sidebar");
      const button = document.getElementById("hamburger-menu");
      if (container && !container.contains(event.target) && isActive) {
        container.style.display = "none";
        setIsActive(false);
      } else if (!isActive && button && button.contains(event.target)) {
        setIsActive(true);
        container.style.display = "block";
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  return (
    <div className="">
      <nav className="fixed z-50 top-0 w-full h-14 bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center w-full h-full px-3 lg:px-5 lg:pl-3">
          <div className="relative flex h-full w-full items-center justify-between">
            <div className="flex justify-start items-center w-3/5 h-full">
              <div className="flex h-full z-0 ">
                <button
                  aria-label="open"
                  id="hamburger-menu"
                  onClick={openMenu}
                  className="h-full p-2 focus:outline-none cursor-pointer"
                >
                  <CustomSvg.HamburgerMenu />
                </button>

                <NavbarLogo />
              </div>
            </div>
            {showMenu && <Menubar />}
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  {token ? (
                    <Profile
                      user={profileInitial}
                      is_admin={is_admin}
                      className=""
                    />
                  ) : (
                    <NavbarLogins />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
