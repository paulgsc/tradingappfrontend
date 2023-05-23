import React, { useEffect, useState } from "react";
import NavbarLogins from "./navlogins/NavbarLogins";
import NavbarLogo from "./navlogo/NavbarLogo";
import NavbarItems from "./menubar/NavbarItems";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";
import CustomSvg from "../ui/CustomSvg";
import Sidebar2 from "../sidemenu/Sidebar2";

function Navbar({ showMenu }) {
  const [isActive, setIsActive] = useState(false);
  const { userInfo: { token = "" } = {} } = useSelector(
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
    <div>
      <nav className="fixed top-0 z-50 w-full bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                aria-label="open"
                id="hamburger-menu"
                onClick={openMenu}
                className="p-2 focus:outline-none cursor-pointer"
              >
                <CustomSvg.HamburgerMenu />
              </button>

              <NavbarLogo />
              {showMenu && <NavbarItems />}
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  {token ? (
                    <Profile user={profileInitial} className="" />
                  ) : (
                    <NavbarLogins />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="navbar-sidebar"
        className="hidden z-50 fixed top-0 left-0 w-56 h-screen pt-10 transition-transform -translate-x-full bg-transparent sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="top-0 h-full overflow-y-auto bg-transparent dark:bg-gray-800">
          {true && <Sidebar2 />}
        </div>
      </aside>
    </div>
  );
}

export default Navbar;
