import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../contexts/redux/actions/fetchDataActions";
import Navbar from "../../components/navbar/Navbar";
import { transactionsNavbar } from "../../constants/navbar/menubar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

function Transactions() {
  const activePathRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.fetchData);

  const handleSelect = (parent) => {
    activePathRef.current = parent;
    localStorage.setItem("activePath", parent);
  };

  useEffect(() => {
    const storedActivePath = localStorage.getItem("activePath");
    if (storedActivePath) {
      activePathRef.current = storedActivePath;
    }

    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div>
      <Transactions.Nav
        location={location}
        activePath={activePathRef.current}
        handleSelect={handleSelect}
      />
    </div>
  );
}

Transactions.Nav = ({ location, activePath, handleSelect }) => (
  <div>
    <Navbar
      showMenu={true}
      Menubar={() => (
        <Transactions.NavMenu
          activePath={activePath}
          handleSelect={handleSelect}
          location={location}
        />
      )}
    />
  </div>
);

const DropdownIcon = () => (
  <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    ></path>
  </svg>
);

Transactions.NavMenu = ({ location, activePath, handleSelect }) => (
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
              activePath !== menu.id
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
              {menu?.content && <DropdownIcon />}
            </button>
          </div>
        </span>
        {menu?.content && (
          <Transactions.MenuItems
            dropdown={menu.content}
            handleSelect={handleSelect}
          />
        )}
      </div>
    ))}
  </div>
);

Transactions.MenuItems = ({ dropdown, handleSelect }) => (
  <div className="hidden dropdown-menu">
    <div
      className="absolute right-0 top-12 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
      aria-labelledby="headlessui-menu-button-1"
      id="headlessui-menu-items-117"
      role="menu"
    >
      {dropdown.map((item) => (
        <div
          key={item.id}
          className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
        >
          <NavLink to={item.path}>
            <button
              onClick={() => handleSelect(item.parent)}
              className="text-sm text-left leading-5 w-full"
            >
              {item.title}
            </button>
          </NavLink>
        </div>
      ))}
    </div>
  </div>
);

export default Transactions;
