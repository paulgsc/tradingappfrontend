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
import { fetchSummary } from "../../contexts/redux/actions/fetchDataActions";
import Spinner from "../../components/loading/Spinner";
import Index from "../transfers/Index";
import SearchNavbar from "../../components/navbar/SearchNavbar";

function Account() {
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    summary: {
      monthly_income = "",
      percent_shares_owned = "",
      shares_purchased = "",
      total_amount = "",
    } = {},
    loading,
  } = useSelector((state) => state.fetchData);

  const openMenu = (e) => {
    e.preventDefault();
    const Main = document.getElementById("Main");
    Main.classList.toggle("hidden");
  };

  useEffect(() => {
    dispatch(fetchSummary());
    console.log("foo foo", location.pathname);
  }, []);
  const balance = 0;
  return (
    <div className="">
      <div className="bm-brd-container-gr flx-st-container kp-rt-container-grow absolute-container">
        {location.pathname.includes("/register") ? (
          <></>
        ) : (
          <>
            <div
              aria-label="toggler"
              className="margin-rt-lft-container-1 flx-st-container"
            >
              <button
                aria-label="open"
                id="open"
                onClick={openMenu}
                className="btn-container-zero"
              >
                <CustomSvg.HamburgerMenu />
              </button>
            </div>
            <SearchNavbar className="account_nav" />
          </>
        )}
      </div>
      <div className="flx">
        {location.pathname.includes("/register") ? (
          <></>
        ) : (
          <div>
            <SideMenu />
          </div>
        )}
        {/^\/personal\/?$/.test(location.pathname) && (
          <div>
            <div>{loading ? <Spinner /> : <h4>$ {total_amount}</h4>}</div>
            <div>
              {" "}
              <PortfolioChart />
            </div>
          </div>
        )}

        {location.pathname.includes("/balances") ? (
          <div>
            <Card className="flx-st-container left-margin-container-20 bm-brd-container-gr ">
              <Card.Description className="left-margin-container-2 right-margin-container-2">
                Overview
              </Card.Description>
              <Card.Description className="right-margin-container-2">
                Cash
              </Card.Description>
              <Card.Description>Investments</Card.Description>
            </Card>
            <Balances />
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
  );
}

export default Account;
