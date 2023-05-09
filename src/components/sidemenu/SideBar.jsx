import React from "react";
import PlaceHolder from "../loading/PlaceHolder";
import CustomSvg from "../ui/CustomSvg";
import { Link } from "react-router-dom";

function SideBar({ sideMenuItems, sideMenuNavs }) {
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
    <div
      id="Main"
      className="wd-12vw hidden bg-container-gr-600 full-ht-container start-container-flx-st ht-container-100h"
    >
      <div className=" ">
        <div className="bm-brd-container flx-al-ct-container">
          <div className="flx-al-ct-container">
            <div>
              <img className="rounded-full" src="" alt="avatar" />
            </div>

            <div className="">
              <p className="">name / email</p>
            </div>
          </div>
          <PlaceHolder.Icon className={""} name="brush" />
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
  );
}

export default SideBar;
