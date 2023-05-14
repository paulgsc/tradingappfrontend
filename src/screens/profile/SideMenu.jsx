import React, { useState } from "react";
import PlaceHolder from "../../components/loading/PlaceHolder";
import SearchNavbar from "../../components/navbar/SearchNavbar";
import CustomSvg from "../../components/ui/CustomSvg";
import { sideMenuItems, sideMenuNavs } from "../../constants/sidemenu/sideMenu";
import { Link } from "react-router-dom";
import "./sidemenu.css";
import { useSelector } from "react-redux";

const openMenu = (e) => {
  e.preventDefault();
  const Main = document.getElementById("Main");
  Main.classList.toggle("hidden");
};

const iconStyle = {
  width: 40,
  height: 40,
  color: "#FFF",
};

function SideMenu() {
  const { userInfo: { username = "", url = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  const showNav = (flag) => {
    if (flag) {
      // Main.classList.toggle("-translate-x-full");
      // Main.classList.toggle("translate-x-0");
      // open.classList.toggle("hidden");
      // close.classList.toggle("hidden");
    }
  };

  const showMenu = (e) => {
    e.preventDefault();
    if (e.target.id.includes("icon")) {
      const icon = document.getElementById(e.target.id);
      const lastChar = icon.id[icon.id.length - 1];
      const menu = document.getElementById(`menu${lastChar}`);
      if (icon) icon.classList.toggle("rotate-180");
      if (menu) menu.classList.toggle("hidden");
    } else {
      const menu = document.getElementById(`menu${e.target.id}`);
      const lastChar = menu.id[menu.id.length - 1];
      const icon = document.getElementById(`icon${lastChar}`);
      if (icon) icon.classList.toggle("rotate-180");
      if (menu) menu.classList.toggle("hidden");
    }
  };

  return (
    <div className="wd-15vw">
      <div aria-label="toggler" className="hidden">
        <button
          aria-label="open"
          id="open"
          onClick={showNav(true)}
          className=""
        >
          <CustomSvg.HamburgerMenu />
        </button>
        <button
          aria-label="close"
          id="close"
          onClick={showNav(true)}
          className=""
        >
          <CustomSvg.CloseX />
        </button>
      </div>
      <div id="Main" className="account_side-menu_container">
        <div className=" ">
          <div className="">
            <div className="acount_side-menu__username-container">
              <div className="account_side-menu__faceIcon-container">
                {url ? (
                  <img className="" src={url} alt="avatar" />
                ) : (
                  <PlaceHolder.Icon name="faceIcon" styles={iconStyle} />
                )}
                <PlaceHolder.Icon name="brush" />
              </div>

              <div className="">
                <p className="side-menu__username">{username}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col-container bm-brd-container margin-rt-lft-container-1">
          {sideMenuNavs.map((item, index) => (
            <Link to={item.path} key={`icon-menu${index}`}>
              <button
                key={item.id}
                className="btn-container-zero flx-al-ct-container txt-container-wt "
              >
                <PlaceHolder.Icon className={"fill-stroke"} name={item.icon} />
                <p className="">{item.title}</p>
              </button>
            </Link>
          ))}
        </div>
        {sideMenuItems.map((menuItems, menuIndex) => {
          return (
            <div
              key={menuItems.id}
              className=" bm-brd-container margin-rt-lft-container-1"
            >
              <button
                onClick={showMenu}
                id={menuIndex + 1}
                className=" btn-container-zero flx-al-ct-container txt-container-wt"
              >
                <p className="" id={menuIndex + 1}>
                  {menuItems.title}
                </p>
                <CustomSvg.Arrow
                  id={`icon${menuIndex + 1}`}
                  className="transform rotate-180"
                />
              </button>
              <div
                id={`menu${menuIndex + 1}`}
                className="hidden margin-rt-lft-container-1"
              >
                {menuItems.content.map((item, itemIndex) => (
                  <div key={`menu-item${itemIndex}`}>
                    <Link to={item.path} key={`c${itemIndex}`}>
                      <button
                        className="btn-container-zero flx-al-ct-container"
                        key={`c${itemIndex}`}
                      >
                        <PlaceHolder.Icon
                          className={item.className}
                          name={item.icon}
                        />
                        <p className="">{item.title}</p>
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideMenu;
