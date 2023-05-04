import React, { useEffect, useState } from "react";
import NavbarLogins from "./navlogins/NavbarLogins";
import NavbarLogo from "./navlogo/NavbarLogo";
import NavbarItems from "./menubar/NavbarItems";
import "../../styles/components/navbar.css";
import { useStateValue } from "../../contexts/firebase/StateProvider";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";

function Navbar() {
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

  return (
    <div className="flx-btw-container">
      <div className="flx-st-container">
        <NavbarLogo />
        <NavbarItems />
      </div>
      <div className="">
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
