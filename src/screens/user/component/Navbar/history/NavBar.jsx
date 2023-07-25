import React from "react";
import { useLocation } from "react-router";
import { useRef } from "react";
import NavMenu from "./NavMenu";
import Navbar from "../../../../../components/navbar/Navbar";

function HistoryNavBar() {
  const activePathRef = useRef(null);
  const location = useLocation();

  const handleSelect = (parent) => {
    activePathRef.current = parent;
    localStorage.setItem("activePath", parent);
  };
  return (
    <Navbar
      showMenu={true}
      Menubar={() => (
        <NavMenu handleSelect={handleSelect} location={location} />
      )}
    />
  );
}

export default HistoryNavBar;
