import React, { useState } from "react";
import { json, Link } from "react-router-dom";
import MenuItems from "../menuItems/MenuItems";
import { menubar } from "../../../constants/navbar/menubar";
import "./navbaritems.css";

function NavbarItems() {
  return (
    <div className="navbaritems__container">
      {menubar.map((menu) => (
        <ul key={menu.id} className="navbaritems__menu">
          <li key={menu.id} className="">
            <Link to={menu.path} className="">
              <span>{menu.title}</span>
            </Link>
            {menu?.dropdown && (
              <i
                className="fa fa-caret-down lft-mg-hlf gr-400"
                aria-hidden="true"
              />
            )}
            {menu?.dropdown && <MenuItems dropdown={menu.dropdown} />}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default NavbarItems;
