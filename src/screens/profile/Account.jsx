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
    <div className="parent">
      <div className="flx-btw-container bm-brd-container pd-20 fixed-container bg-wht">
        <div className="flx-st-container">
          <button
            aria-label="open"
            id="open"
            onClick={openMenu}
            className="btn-container-zero"
          >
            <CustomSvg.HamburgerMenu />
          </button>
          <NavbarLogo />
        </div>
        <Profile user={profileInitial} />
      </div>
      <div className="next-container">
        <div className="flx">
          {location.pathname.includes("/register") ? (
            <></>
          ) : (
            <div className="z-mx pos-fxd">
              <SideMenu />
            </div>
          )}
          {/^\/personal\/?$/.test(location.pathname) && (
            <div>
              <div className="flex-col-container">
                <div className="pd-mg-0 bx-shd-brd-1 fxd-pos-1 bg-wht">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <div>
                      <p className="pd-mg-0 txt-al-lft">My Account</p>
                      <h3 className="txt-pd-1 txt-al-ct">
                        $ {transfers_total}
                      </h3>
                    </div>
                  )}
                </div>
                <div className="pd-mg-0  fxd-pos-2">
                  <div>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div className="bg-wht bx-shd-brd-1 pd-10 fxd-pos-3">
                        <p className="pd-mg-0 txt-al-lft">Investments</p>
                        <h5 className="txt-pd-1 txt-al-ct">
                          $ {amount_purchased}
                        </h5>
                      </div>
                    )}
                  </div>
                  <div>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div className="bg-wht bx-shd-brd-1 pd-10 fxd-pos-3">
                        <p className="pd-mg-0 txt-al-lft">Cash</p>
                        <h5 className="txt-pd-1 txt-al-ct">
                          $ {transfer_remaining}
                        </h5>
                      </div>
                    )}
                  </div>
                  <div>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div className="bg-wht bx-shd-brd-1 pd-10 fxd-pos-3">
                        <p className="pd-mg-0 txt-al-lft">Reserved</p>
                        <h5 className="txt-pd-1 txt-al-ct">
                          $ {transfers_total}
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
                <div className=" bx-shd-brd-1 shares-container">
                  <PropertyShares sharesData={sharesData} />
                </div>
              </div>
              <div className="bg-wht-smk pd-20 bx-shd-brd-1 chart-sz">
                {" "}
                <PortfolioChart />
              </div>
              <div className="trade-widget">
                <TradeWidget />
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
