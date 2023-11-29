import { useEffect, useState } from "react";
import PortfolioChart from "./PortfolioChart";

import CustomSvg from "../../components/ui/CustomSvg";
import NavbarLogo from "../../components/navbar/navlogo/NavbarLogo";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchShares } from "../../contexts/redux/actions/fetchDataActions";

import Profile from "../../components/profile/Profile";

function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    summary: {
      amount_purchased = "",
      transfer_remaining = "",
      transfer_pending = "",
      transfers_total = "",
    } = {},
    sharesData = [],
  } = useSelector((state) => state.fetchData);

  const { adminHash = null, userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (typeof initLetter === "function") {
      setProfileInitial(initLetter());
    }
  }, [token]);

  const initLetter = () =>
    JSON.parse(localStorage.getItem("userInfo"))?.email?.charAt(0) || "";
  const [profileInitial, setProfileInitial] = useState(initLetter());

  const openMenu = (e) => {
    e.preventDefault();
    const sideBar = document.getElementById("sidebar");
    sideBar.classList.toggle("hidden");
  };

  useEffect(() => {
    dispatch(fetchShares());
  }, [dispatch]);

  return (
    <div className="bg-gray-50 h-screen w-full flex flex-col flex-1">
      <Account.Nav
        openMenu={openMenu}
        profileInitial={profileInitial}
        adminHash={adminHash}
        navigate={navigate}
      />
      <Account.SideMenu openMenu={openMenu} />

      <div className="flex flex-col w-full h-full py-4 rounded-lg dark:border-gray-700 mt-14 ">
        <Account.Header transfers_total={transfers_total} />
        <Account.Subtitle
          amount_purchased={amount_purchased}
          transfer_remaining={transfer_remaining}
          unsettled_funds={transfer_pending}
        />
        <div className="hidden items-center justify-center h-[2/5-screen] w-full mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <PortfolioChart />
        </div>
        <div className="flex flex-col w-full gap-1 h-full bg-gray-50 ">
          <Account.Property sharesData={sharesData} />
        </div>
      </div>
    </div>
  );
}

Account.Nav = ({ openMenu, profileInitial, adminHash, navigate }) => (
  <nav className="z-50 fixed top-0 w-full bg-green-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <button
            onClick={openMenu}
            aria-label="open"
            id="hamburger-menu"
            className="h-full focus:outline-none cursor-pointer"
          >
            <CustomSvg.HamburgerMenu />
          </button>
          <NavbarLogo />
        </div>
        <div className="flex items-center text-center w-72">
          <div className="flex items-center justify-between w-full ml-3">
            <button
              className="font-bold text-sm underline"
              onClick={() => {
                navigate(`/admin/${adminHash}`);
              }}
            >
              admin
            </button>
            {/* <div className="relative">
              <span className=" bg-[red] absolute inline-flex rounded-full h-[6px] lg:h-2 w-[6px] lg:w-2 -right-1 -top-1" />
              <BsChatLeft className=" w-4 h-4 lg:w-6 lg:h-6  bg-inherit text-[#5AFF7A]" />
            </div> */}
            <div>
              <Profile user={profileInitial} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

Account.SideMenu = ({ openMenu }) => (
  <aside
    id="sidebar"
    className="hidden fixed top-0 left-0 lg:w-[25%] xl:w-1/6 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div className="absolute top-6 left-6 flex items-center justify-start">
      <button
        onClick={openMenu}
        aria-label="open"
        id="hamburger-menu"
        className="h-full focus:outline-none cursor-pointer"
      >
        <CustomSvg.HamburgerMenu />
      </button>
      <NavbarLogo />
    </div>
    <div className="z-50 h-full overflow-y-auto bg-[#FFF] dark:bg-gray-800">
      <SideMenu />
    </div>
  </aside>
);

Account.Header = ({ transfers_total }) => (
  <div className=" flex items-center justify-center h-8 sm:h-16 md:h-16 xl:h-20  w-full mb-4 rounded shadow-sm bg-white dark:bg-gray-800">
    <h3 className="text-base sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
      {" "}
      {transfers_total}
    </h3>
  </div>
);

Account.Subtitle = ({
  amount_purchased,
  transfer_remaining,
  unsettled_funds,
}) => {
  const funds = [
    {
      title: "Investments",
      amount: amount_purchased,
    },
    {
      title: "Cash",
      amount: transfer_remaining,
    },
    {
      title: "Unsettled Funds",
      amount: unsettled_funds,
    },
  ];

  return (
    <div className="hidden sm:grid grid-cols-3 gap-4 mb-4">
      {funds.map((item, index) => (
        <div className="text-left " key={index}>
          <span className="w-full flex items-start flex-1 justify-start">
            <p className=" font-semibold text-xs md:text-base xl:text-xl px-4 shadow-md rounded-sm bg-white">
              {item.title}
            </p>
          </span>
          <div className="flex items-center justify-center h-10 xl:h-16 rounded shadow-sm bg-green-50 dark:bg-gray-800">
            <p className="text-sm md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-gray-500">
              {item.amount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

Account.Property = ({ sharesData }) => (
  <div className="flex flex-col items-start h-full w-full bg-gray-100 dark:bg-gray-800">
    <span className="text-base lg:text-lg  ml-4 py-2"> Properties owned</span>
    <div className="flex w-full justify-center">
      <div className="w-10/12 h-full font-medium text-gray-600 bg-white"></div>
    </div>
  </div>
);

export default Account;
