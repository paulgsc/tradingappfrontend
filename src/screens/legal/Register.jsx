import React, { useEffect, useState } from "react";
import { navLinks } from "../../constants/legal/legal";
import PlaceHolder from "../../components/loading/PlaceHolder";
import Form from "../../components/forms/Form";
import { Card } from "../../components/cards/Card";
import Contact from "./Contact";
import Address from "./Address";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Type from "./Type";
import Encrypt from "./Encrypt";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [activePath, setActivePath] = useState(redirect);

  const handleNavs = (e) => {
    e.preventDefault();
    const path = e.target.id;
    const fullPath = location.pathname;
    navigate(`${fullPath}?redirect=${path}`);
    setActivePath(path);
  };

  const navLinks = [
    { id: 1, title: "Type", path: "type" },
    { id: 2, title: "Contact", path: "contact" },
    { id: 3, title: "Legal", path: "legal" },
    { id: 4, title: "Invest", path: "invest" },
  ];

  useEffect(() => {
    !redirect.includes("/") && setActivePath(redirect);
    console.log(redirect);
  }, [redirect]);

  return (
    <div className="">
      <div className="flx-al-ct-container ">
        <Link to={"/"}>
          {" "}
          <PlaceHolder.Icon
            name="faHome"
            className="right-margin-container-30"
          />
        </Link>
        <div className="flx-center-container">
          {navLinks.map((item) => (
            <div className="flx-st-container" key={item.id}>
              <button
                id={item.path}
                className={
                  item.path === activePath
                    ? "active btn-container-zero flx-st-container"
                    : "btn-container-zero flx-st-container"
                }
                onClick={handleNavs}
              >
                <h5 id={item.path} className="margin-rt-lft-container-1">
                  {item.title}
                </h5>
                <PlaceHolder.Icon
                  name="chevronRight"
                  className="top-margin-container-1"
                  id={item.path}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="content">
        {activePath === "type" && (
          <div>
            <Type />
          </div>
        )}
        {activePath === "contact" && (
          <div>
            <Contact />
          </div>
        )}
        {activePath === "legal" && (
          <div>
            <Encrypt />
          </div>
        )}
        {activePath === "invest" && <div>Invest content</div>}
      </div>
    </div>
  );
}

export default Register;
