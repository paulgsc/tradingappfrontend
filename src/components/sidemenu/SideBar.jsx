import React from "react";
import { siteLogo1 } from "../../assets";
import CustomSvg from "../ui/CustomSvg";
import PlaceHolder from "../loading/PlaceHolder";
import { adminMenuItems } from "../../constants/sidemenu/sideMenu";
import { Link } from "react-router-dom";

const Sidebar = ({ closeAdminMenu }) => {
  const showMenu = () => {};

  const openMenu = (e) => {
    e.preventDefault();
  };

  return (
    <aside
      id="admin-sidebar"
      className="hidden z-50 fixed flex-1  w-72 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto bg-white"
    >
      <Sidebar.Logo openMenu={openMenu} />
      <Sidebar.MenuItems
        adminMenuItems={adminMenuItems}
        chooseMenu={showMenu}
        closeAdminMenu={closeAdminMenu}
      />
    </aside>
  );
};

Sidebar.Logo = ({ openMenu }) => (
  <div className="flex items-center text-center justify-center px-1 py-2 w-full h-20 rounded-sm">
    <div className="ml-3 w-10">
      <button
        onClick={openMenu}
        aria-label="open"
        id="admin-hamburger-menu"
        className="h-full focus:outline-none cursor-pointer"
      >
        <CustomSvg.HamburgerMenu />
      </button>
    </div>
    <img src={siteLogo1} className="object-cover h-full w-full" />
  </div>
);

Sidebar.MenuItems = ({ closeAdminMenu, adminMenuItems, showMenu }) => (
  <>
    {adminMenuItems.map((menuItems, menuIndex) => {
      return (
        <div key={menuItems.id} className="flex flex-col w-full">
          <button
            chooselick={showMenu}
            id={menuIndex + 1}
            className="flex items-center border-b border-black w-full h-12 px-10 hover:bg-gray-300 hover:text-black dark:hover:bg-gray-70"
          >
            <div
              className="flex items-center flex-grow h-full w-full"
              id={`gap${menuIndex + 1}`}
              onClick={(e) => {
                closeAdminMenu(e, menuItems?.path);
              }}
            >
              {menuItems.title}
            </div>
          </button>
          <div
            id={`menu${menuIndex + 1}`}
            className=" dark:bg-gray-800 shadow-inner w-full"
          >
            {menuItems.content.map((item, itemIndex) => (
              <div key={`menu-item${itemIndex}`} className="w-full">
                <button
                  key={`c${itemIndex}`}
                  onClick={(e) => {
                    closeAdminMenu(e, item.path);
                  }}
                  className="flex w-full items-center  gap-4 pl-12 py-2 text-black hover:bg-indigo-200 hover:text-white dark:hover:bg-gray-70"
                >
                  <PlaceHolder.Icon
                    className={item.className}
                    name={item.icon}
                  />
                  <p className="">{item.title}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </>
);

export default Sidebar;
