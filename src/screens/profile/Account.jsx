import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import PortfolioChart from "./PortfolioChart";
import SideMenu from "./SideMenu";
import PlaidHome from "../plaid/PlaidHome";
import StripeLink from "../stripe/StripeLink";
import Balances from "./Balances";
import { Card } from "../../components/cards/Card";
import CustomSvg from "../../components/ui/CustomSvg";
import SearchBar from "../../components/searchbar/SearchBar";
import NavbarLogo from "../../components/navbar/navlogo/NavbarLogo";
import { useLocation } from "react-router";
import History from "./History";
import Register from "../legal/Register";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSummary,
  fetchShares,
} from "../../contexts/redux/actions/fetchDataActions";
import Spinner from "../../components/loading/Spinner";
import PropertyShares from "../../components/tables/PropertyShares";
import Profile from "../../components/profile/Profile";
import TradeWidget from "../../components/ui/TradeWidget";
import "./account.css";
import ResultList from "../../components/searchResult/ResultList";
import Property from "../../components/searchResult/Property";
import currency from "currency.js";

function Account() {
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    summary: {
      amount_purchased = "",
      transfer_remaining = "",
      shares_purchased = "",
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
    const Main = document.getElementById("Main");
    Main.classList.toggle("hidden");
  };

  useEffect(() => {
    dispatch(fetchSummary());
    dispatch(fetchShares());
  }, []);

  return (
    <div className="account_container">
      <div className="account__top-section">
        <div className="account__top-section__left-side">
          <button
            aria-label="open"
            id="open"
            onClick={openMenu}
            className="account-top-section-menu-btn"
          >
            <CustomSvg.HamburgerMenu />
          </button>
          <NavbarLogo />
        </div>
        <div className="account__profile-container">
          <Profile user={profileInitial} />
        </div>
      </div>
      <div className="account__content-section">
        <div className="account__content">
          {location.pathname.includes("/register") ? (
            <></>
          ) : (
            <div className="z-mx pos-fxd">
              <SideMenu />
            </div>
          )}
          {/^\/personal\/?$/.test(location.pathname) && (
            <div className="account__content_right-side">
              <div className="">
                <div className="account__content__cards my-account-section">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <div>
                      <p className="">My Account</p>
                      <h3 className="">
                        {" "}
                        {currency(transfers_total).format()}
                      </h3>
                    </div>
                  )}
                </div>
                <div className="account__content__cards account__content_card__breakdown">
                  <div>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div className="account-breadown-section">
                        <p>Investments</p>
                        <h5 className="">
                          {currency(amount_purchased).format()}
                        </h5>
                      </div>
                    )}
                  </div>
                  <div>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div className="account-breadown-section">
                        <p className="">Cash</p>
                        <h5 className="">
                          {currency(transfer_remaining).format()}
                        </h5>
                      </div>
                    )}
                  </div>
                  <div>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div className="account-breadown-section">
                        <p className="">Reserved</p>
                        <h5 className="">
                          {currency(transfers_total).format()}
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
                <div className="account__content__cards account__content_shares">
                  <PropertyShares sharesData={sharesData} />
                </div>
              </div>
              <div>
                <div className="account__content__cards account-chart">
                  <PortfolioChart />
                </div>
                <div className="account__content__cards">
                  <Property />
                </div>
              </div>
              <div className="account-trade-section">
                <TradeWidget />
              </div>
            </div>
          )}

          {location.pathname.includes("/balances") ? (
            <div className="account__balances-container">
              <Card>
                <Card.Description className="account__balances-title">
                  Overview
                </Card.Description>
              </Card>
              <Balances transersTotal={transfers_total} />
            </div>
          ) : location.pathname.includes("/history") ? (
            <History />
          ) : location.pathname.includes("/registerr") ? (
            <Register />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
