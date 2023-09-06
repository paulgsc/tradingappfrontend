import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import RecordsFilter from "../queries/RecordsFilter";
import NavbarLogo from "../../../../components/navbar/navlogo/NavbarLogo";
import DashboardLink from "../../../../components/ui/DashboardLink";
import ProfileMenu from "../../../../components/ui/ProfileMenu";
import LiveNotifications from "../../../../components/alerts/LiveNotifications";

function Navbar({ globalFilter, setGlobalFilter }) {
  const inputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "/" && inputRef.current) {
        event.preventDefault();
        inputRef.current.focus();
        return;
      }
      return;
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  return (
    <header className="w-full">
      <nav className="bg-white shadow-inner border-b-2 border-neutral-300/60 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-1 justify-start items-center">
            <NavbarLogo />
            <form
              action="#"
              method="GET"
              className="hidden group focus-within:flex-1 lg:block lg:pl-2"
            >
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96 group-focus-within:w-full transition-all duration-500 ease-in-out">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                {location.pathname === "/models/list-view" ? (
                  <RecordsFilter
                    inputRef={inputRef}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                ) : (
                  <input
                    type="text"
                    name="email"
                    id="topbar-search"
                    ref={inputRef}
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                  />
                )}
              </div>
            </form>
          </div>
          <div className="flex items-center lg:order-2">
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Search</span>

              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <LiveNotifications />
            <DashboardLink path={"/models"} />
            <ProfileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
