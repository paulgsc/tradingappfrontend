import React, { useEffect, useState } from "react";
import PortfolioChart from "./PortfolioChart";
import SideMenu from "./SideMenu";
import CustomSvg from "../../components/ui/CustomSvg";
import NavbarLogo from "../../components/navbar/navlogo/NavbarLogo";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSummary,
  fetchShares,
} from "../../contexts/redux/actions/fetchDataActions";
import PropertyShares from "../../components/tables/PropertyShares";
import Profile from "../../components/profile/Profile";
import "./account.css";
import currency from "currency.js";
import OrderHistory from "../../components/tables/OrderHistory";

function Account() {
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    summary: {
      amount_purchased = "",
      transfer_remaining = "",
      propertyOrders = [],
      transfers_total = "",
    } = {},
    sharesData = [],
    propertyData = [],
    loading,
  } = useSelector((state) => state.fetchData);

  const { userInfo: { token = "" } = {} } = useSelector(
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
    dispatch(fetchSummary());
    dispatch(fetchShares());
  }, []);

  return (
    <div className="bg-gray-50 h-screen flex flex-col flex-1">
      <nav className="fixed top-0 z-50 w-full bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                aria-label="open"
                id="open"
                className="account-top-section-menu-btn"
                onClick={openMenu}
              >
                <CustomSvg.HamburgerMenu />
              </button>
              <NavbarLogo />
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <Profile user={profileInitial} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="sidebar"
        className="hidden fixed top-0 left-0 w-96 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="z-0 h-full overflow-y-auto bg-[#FFF] dark:bg-gray-800">
          <SideMenu />
        </div>
      </aside>
      <div className="p-4 flex flex-1">
        <div className="p-4  rounded-lg dark:border-gray-700 mt-14 z-60">
          <div className=" flex items-center justify-center h-24 mb-4 rounded shadow-sm bg-white dark:bg-gray-800">
            <h3 className=" text-6xl font-bold">
              {" "}
              {currency(transfers_total).format()}
            </h3>
          </div>
          <div className=" top-40 grid grid-cols-3 gap-4 mb-4">
            <div className="text-left ">
              <span className="w-full flex items-start flex-1 justify-start">
                <p className=" font-semibold w-1/4 text-xl px-4 shadow-md rounded-sm bg-white">
                  Investments
                </p>
              </span>
              <div className="flex items-center justify-center h-24 rounded shadow-sm bg-green-50 dark:bg-gray-800">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-500">
                  {currency(amount_purchased).format()}
                </p>
              </div>
            </div>
            <div className="text-left ">
              <span className="w-full flex items-start flex-1 justify-start">
                <p className=" font-semibold w-1/4 text-xl px-4 shadow-md rounded-sm bg-white">
                  Cash
                </p>
              </span>
              <div className="flex items-center justify-center h-24 rounded shadow-sm bg-green-50  dark:bg-gray-800">
                <p className=" text-2xl font-bold text-gray-900 dark:text-gray-500">
                  {currency(transfer_remaining).format()}
                </p>
              </div>
            </div>
            <div className="text-left ">
              <span className="w-full flex items-start flex-1 justify-start">
                <p className=" font-semibold w-1/4 text-xl px-4 shadow-md rounded-sm bg-white">
                  Reserved
                </p>
              </span>
              <div className="flex items-center justify-center h-24 rounded shadow-sm bg-green-50 dark:bg-gray-800">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-500">
                  {currency(amount_purchased).format()}
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="flex items-center justify-center h-[2/5-screen] w-full mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <PortfolioChart />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 h-full bg-gray-50 ">
            <div className="flex items-start justify-center h-full rounded dark:bg-gray-800">
              <PropertyShares sharesData={sharesData} />
            </div>

            <div className="flex items-start justify-center h-full rounded bg-gray-50 dark:bg-gray-800">
              <OrderHistory orders={propertyOrders} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
