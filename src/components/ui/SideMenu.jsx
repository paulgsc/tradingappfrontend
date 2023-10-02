import { useState } from "react";
import CustomSvg from "./CustomSvg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function SideMenu({ sidenavslinks }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const toggleActive = (e) => {
      const sidebar = document.getElementById("admin-dashboard-sidebar");
      if (!sidebar.contains(e.target)) {
        setActive(false);
      }
    };
    document.addEventListener("click", toggleActive);
    return () => {
      document.removeEventListener("click", toggleActive);
    };
  }, []);
  return (
    <div id="admin-dashboard-sidebar" className="relative group">
      <button
        onClick={() => {
          setActive(!active);
        }}
        aria-label="open"
        className="h-full p-2 focus:outline-none cursor-pointer"
      >
        <CustomSvg.HamburgerMenu />
      </button>
      <aside
        tabIndex={-1}
        className={`pointer-events-none fixed top-[68px] left-0 w-64 h-screen border-r-2 transition-transform -translate-x-full ${
          active ? "translate-x-0 pointer-events-auto bg-white" : ""
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium z-50">
            {sidenavslinks.top.map((item) => (
              <li className="z-50" key={item.id}>
                <Link
                  to={item.path}
                  className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group"
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="pt-4 mt-4 space-y-6 font-medium border-t border-gray-200 dark:border-gray-700">
            {sidenavslinks.bottom.map((item) => (
              <li
                className="flex items-center justify-between ml-2"
                key={item.id}
              >
                <Link
                  to={item.path}
                  className="flex  flex-1 items-center p-2 text-gray-900 lowercase rounded-lg border-l border-b border-zinc-400 shadow-sm hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  {item.icon}
                  <span className="ml-4">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default SideMenu;
