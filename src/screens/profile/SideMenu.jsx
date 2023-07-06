import React, { useState } from "react";
import PlaceHolder from "../../components/loading/PlaceHolder";
import SearchNavbar from "../../components/navbar/SearchNavbar";
import CustomSvg from "../../components/ui/CustomSvg";
import { sideMenuItems, sideMenuNavs } from "../../constants/sidemenu/sideMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfilePopUp from "../../components/ui/ProfilePopUp";
import { centerScreenPopUp } from "../../styles/events";

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
    <div id="Main" className="flex flex-col gap-2 w-full">
      <SideMenu.Profile
        handleProfile={handleProfile}
        url={url}
        username={username}
      />
      <div>
        <SideMenu.Main sideMenuNavs={sideMenuNavs} />
        <SideMenu.MenuItems sideMenuItems={sideMenuItems} showMenu={showMenu} />
      </div>
    </div>
  );
}

SideMenu.Profile = ({ handleProfile, url, username }) => (
  <div className="flex justify-center gap-2 items-center w-full">
    <div
      id="profile-icon-button"
      className="flex items-center py-4 cursor-pointer text-gray-300"
      onClick={handleProfile}
    >
      {url ? (
        <img className="" src={url} alt="avatar" />
      ) : (
        <PlaceHolder.Icon
          name="faceIcon"
          sx={{
            width: {
              xs: 16,
              sm: 20,
              md: 30,
              lg: 30,
            },
            height: {
              xs: 16,
              sm: 20,
              md: 30,
              lg: 30,
            },
          }}
        />
      )}
    </div>

    <ProfilePopUp />

    <span className="text-xs xl:text-sm h-10 w-24 -600 break-all ">
      {username}
    </span>
  </div>
);

SideMenu.Main = ({ sideMenuNavs }) => (
  <div className="flex flex-col w-full border-b border-black">
    {sideMenuNavs.map((item, index) => (
      <Link to={item.path} key={`icon-menu${index}`}>
        <button
          key={item.id}
          className="flex items-center justify-between px-10 w-full h-12  text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-70"
        >
          <p className="">{item.title}</p>
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
        </button>
      </Link>
    ))}
  </div>
);

SideMenu.MenuItems = ({ sideMenuItems, showMenu }) => (
  <>
    {sideMenuItems.map((menuItems, menuIndex) => {
      return (
        <div key={menuItems.id} className="flex flex-col w-full">
          <button
            onClick={showMenu}
            id={menuIndex + 1}
            className="flex items-center border-b border-black w-full h-12 px-10 hover:bg-gray-300 hover:text-black dark:hover:bg-gray-70"
          >
            <div
              className="flex items-center flex-grow h-full w-full"
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
            className="hidden dark:bg-gray-800 shadow-inner w-full"
          >
            {menuItems.content.map((item, itemIndex) => (
              <div key={`menu-item${itemIndex}`} className="w-full">
                <Link to={item.path} key={`c${itemIndex}`} className="flex">
                  <button className="flex w-full items-center  gap-4 pl-12 py-2 text-black hover:bg-indigo-200 hover:text-white dark:hover:bg-gray-70">
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
  </>
);

export default SideMenu;
