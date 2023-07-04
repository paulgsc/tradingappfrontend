import React from "react";
import { Link } from "react-router-dom";
import { siteLogo1 } from "../../../assets";

function NavbarLogo() {
  return (
    <div className="flex items-center">
      <Link to={"/"} className="">
        <div className=" flex items-center text-start justify-start rounded-lg shadow-sm h-0 w-36">
          <img
            src={siteLogo1}
            className="bg-stone-100 z-0 flex justify-start text-start object-left "
          />
        </div>
      </Link>
    </div>
  );
}

export default NavbarLogo;
