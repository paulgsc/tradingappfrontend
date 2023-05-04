import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavbarLogins() {
  const location = useLocation();
  const redirect = location?.pathname;

  return (
    <div className="right-margin-container-5">
      <Link to={`/login/?redirect=${redirect}`} className="">
        <span className="round-corner-container-1-cl">Sign In</span>
      </Link>
    </div>
  );
}

export default NavbarLogins;
