import React, { useEffect, useState } from "react";
import NavbarLogins from "./navlogins/NavbarLogins";
import NavbarLogo from "./navlogo/NavbarLogo";
import NavbarItems from "./menubar/NavbarItems";
import "../../styles/components/navbar.css";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";
import CustomSvg from "../ui/CustomSvg";
import "./navbar.css";

function Navbar({ showMenu }) {
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
    const Main = document.getElementById("Main");
    Main.classList.toggle("hidden");
  };

  return (
    <div className="navbar__container">
      <div className="navbar__left">
        <button
          aria-label="open"
          id="open"
          onClick={openMenu}
          className="btn-container-zero"
        >
          <CustomSvg.HamburgerMenu />
        </button>
        <NavbarLogo />
        {showMenu && <NavbarItems />}
      </div>
      <div className="navbar__right">
        {token ? (
          <Profile user={profileInitial} className="home_nav" />
        ) : (
          <NavbarLogins />
        )}
      </div>
    </div>
  );
}

export default Navbar;
