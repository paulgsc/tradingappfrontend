import React from "react";
import { Link } from "react-router-dom";
import PlaceHolder from "../../loading/PlaceHolder";

function NavbarLogo() {
  return (
    <div className="left-margin-container-1 home-brd">
      <Link to="/" className="">
        <span className="">
          <PlaceHolder.Icon className="" name={"roof"} />
        </span>
      </Link>
    </div>
  );
}

export default NavbarLogo;
