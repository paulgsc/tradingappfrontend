import React, { useEffect, useState } from "react";
import NavbarLogo from "./navlogo/NavbarLogo";
import NavbarLogins from "./navlogins/NavbarLogins";
import SearchBar from "../searchbar/SearchBar";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";
import "./searchnavbar.css";

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
    <div className="searchnavbar__container">
      <div className="searchnavbar__right-side">
        <NavbarLogo />
        <div className="searchnavbar__search">
          <SearchBar classname={"searchnavbar__search-input"} />
        </div>
      </div>
      <div className="">
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
