import React, { useEffect, useState } from "react";
import NavbarLogo from "./navlogo/NavbarLogo";
import NavbarLogins from "../ui/NavbarLogins";
import SearchBar from "../searchbar/SearchBar";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";

function SearchNavbar({ className, children }) {
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
    <div className="">
      <nav className="z-50 fixed top-0 flex items-center justify-between w-full px-6 py-2 bg-white border-b-2 border-neutral-300">
        <NavbarLogo />

        {children}

        <div className="">
          {token ? (
            <Profile user={profileInitial} className={className} />
          ) : (
            <NavbarLogins />
          )}
        </div>
      </nav>
    </div>
  );
}

export default SearchNavbar;
