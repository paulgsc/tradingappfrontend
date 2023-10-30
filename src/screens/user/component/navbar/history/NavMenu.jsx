import NavMenuItems from "./NavMenuItems";
import DropDownIcon from "../../ui/DropDownIcon";
import { transactionsNavbar } from "../../../../../constants/navbar/menubar";

function NavMenu() {
  return (
    <div className="flex items-center justify-center h-full w-full sm:gap-12 md:gap-24">
      {transactionsNavbar.map((menu) => (
        <div
          key={menu.id}
          className="flex items-center  relative h-full text-left dropdown"
        >
          <span className="flex items-center h-full w-full">
            <div
              to={menu.title}
              className={
                true
                  ? ""
                  : "flex items-center h-full relative after:absolute after:bottom-0 after:left-0 after:w-3/5 after:h-[3px] after:rounded-lg after:bg-blue-400"
              }
            >
              <button
                className="hidden sm:flex  items-center justify-center h-full w-full text-xs md:text-sm lg:text-base xl:text-lg font-medium leading-5 text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-900 active:text-gray-800 relative"
                type="button"
                aria-haspopup="true"
                aria-expanded="true"
                aria-controls={`headlessui-menu-items-${menu.id}`}
              >
                <span className="relative z-10">{menu.title}</span>
                {menu?.content && <DropDownIcon />}
              </button>
            </div>
          </span>
          {menu?.content && <NavMenuItems dropdown={menu.content} />}
        </div>
      ))}
    </div>
  );
}

export default NavMenu;
