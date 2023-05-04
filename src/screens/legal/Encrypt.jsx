import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

function Encrypt() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [activePath, setActivePath] = useState(redirect);

  const handleNavs = (e) => {
    e.preventDefault();
    const path = "invest";
    const fullPath = location.pathname;
    navigate(`${fullPath}?redirect=${path}`);
    setActivePath(path);
  };
  return (
    <div>
      <form>
        <input placeholder="MM/DD/YYYY" />
        <input placeholder="SSN" />
      </form>
      <button
        className={"contact/personal" === activePath ? "active" : ""}
        onClick={handleNavs}
      >
        next
      </button>
    </div>
  );
}

export default Encrypt;
