import React, { useState } from "react";
import PlaceHolder from "../../components/loading/PlaceHolder";
import SearchNavbar from "../../components/navbar/SearchNavbar";
import CustomSvg from "../../components/ui/CustomSvg";
import { sideMenuItems, sideMenuNavs } from "../../constants/sidemenu/sideMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePopUp from "../../components/ui/ProfilePopUp";
import { centerScreenPopUp } from "../../styles/events";

const openMenu = (e) => {
  e.preventDefault();
  const Main = document.getElementById("Main");
  Main.classList.toggle("hidden");
};

function SideMenu() {
  const { userInfo: { username = "", url = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  const showMenu = (e) => {
    e.preventDefault();
    if (e.target.id.includes("icon")) {
      const icon = document.getElementById(e.target.id);
      const lastChar = icon.id[icon.id.length - 1];
      const menu = document.getElementById(`menu${lastChar}`);
      if (icon) icon.classList.toggle("rotate-180");
      if (menu) menu.classList.toggle("hidden");
    } else if (e.target.id.includes("gap")) {
      console.log("foo");
      const gap = document.getElementById(e.target.id);
      const lastChar = gap.id[gap.id.length - 1];
      const menu = document.getElementById(`menu${lastChar}`);
      const icon = document.getElementById(`icon${lastChar}`);
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
  const handleProfile = (e) => {
    e.preventDefault();
    centerScreenPopUp("profile-popup");
  };
  return (
    <div id="Main" className="">
      <div className=" ">
        <div className="">
          <div className="flex flex-col items-center">
            <div
              id="profile-icon-button"
              className="flex items-center py-4 cursor-pointer"
              onClick={handleProfile}
            >
              {url ? (
                <img className="" src={url} alt="avatar" />
              ) : (
                <PlaceHolder.Icon
                  name="faceIcon"
                  sx={{
                    color: "grey",
                    width: {
                      xs: 16,
                      sm: 20,
                      md: 30,
                      lg: 40,
                      xlg: 40,
                    },
                    height: {
                      xs: 16,
                      sm: 20,
                      md: 30,
                      lg: 40,
                      xlg: 40,
                    },
                  }}
                />
              )}
              <PlaceHolder.Icon name="brush" />
            </div>

            <ProfilePopUp />

            <div className="">
              <p className="">{username}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-b border-black">
        {sideMenuNavs.map((item, index) => (
          <Link
            to={item.path}
            key={`icon-menu${index}`}
            className="m-0 p-0 w-full"
          >
            <button
              key={item.id}
              className="flex items-center gap-4 p-2 my-4 w-full text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-70"
            >
              <PlaceHolder.Icon
                sx={{
                  color: "white",
                  fill: "black",
                  width: {
                    xs: 12,
                    sm: 16,
                    md: 20,
                    lg: 30,
                    xlg: 40,
                  },
                  height: {
                    xs: 12,
                    sm: 16,
                    md: 20,
                    lg: 30,
                    xlg: 40,
                  },
                }}
                name={item.icon}
              />
              <p className="">{item.title}</p>
            </button>
          </Link>
        ))}
      </div>
      {sideMenuItems.map((menuItems, menuIndex) => {
        return (
          <div key={menuItems.id} className="flex flex-col">
            <button
              onClick={showMenu}
              id={menuIndex + 1}
              className="flex items-center border-b border-black w-full gap-0 px-10 py-4 hover:bg-gray-300 hover:text-black dark:hover:bg-gray-70"
            >
              <div
                className="flex items-center flex-grow"
                id={`gap${menuIndex + 1}`}
              >
                <p className="" id={menuIndex + 1}>
                  {menuItems.title}
                </p>
              </div>
              <div className="flex items-center">
                <CustomSvg.Arrow
                  id={`icon${menuIndex + 1}`}
                  className="rotate-180"
                />
              </div>
            </button>
            <div
              id={`menu${menuIndex + 1}`}
              className="hidden m-0 p-0 bg-gray-300 dark:bg-gray-800 shadow-inner"
            >
              {menuItems.content.map((item, itemIndex) => (
                <div key={`menu-item${itemIndex}`} className="flex m-0 p-0">
                  <Link
                    to={item.path}
                    key={`c${itemIndex}`}
                    className="p-0 m-0 flex flex-1"
                  >
                    <button className="flex items-center gap-4 px-2 py-2 text-white hover:bg-gray-600 hover:text-black dark:hover:bg-gray-70 w-full">
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

export default SideMenu;
