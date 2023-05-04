import React, { useEffect, useState } from "react";
import NavbarLogo from "./navlogo/NavbarLogo";
import NavbarLogins from "./navlogins/NavbarLogins";
import SearchBar from "../searchbar/SearchBar";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";

function SearchNavbar({ className }) {
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
    <div className="pd-tp-bm-2 flx-btw-container">
      <div className=" left-margin-container-2 flx-st-container ">
        <NavbarLogo />

        <SearchBar />
      </div>
      <div className="right-margin-container-2">
        {token ? (
          <Profile user={profileInitial} className={className} />
        ) : (
          <NavbarLogins />
        )}
      </div>
    </div>
  );
}

export default SearchNavbar;
