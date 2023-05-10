import React, { useEffect, useMemo, useState } from "react";
import SearchNavbar from "../../components/navbar/SearchNavbar";
import CustomSvg from "../../components/ui/CustomSvg";
import { Card } from "../../components/cards/Card";
import SideBar from "../../components/sidemenu/SideBar";
import { sideMenuItems, sideMenuNavs } from "../../constants/sidemenu/sideMenu";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import TradeSlider from "../../components/ui/TradeSlider";
import { fetchPropertyRows } from "../../contexts/redux/actions/fetchPropertyActions";
import NavbarLogo from "../../components/navbar/navlogo/NavbarLogo";
import NavbarLogins from "../../components/navbar/navlogins/NavbarLogins";
import Profile from "../../components/profile/Profile";
import SearchBar from "../../components/searchbar/SearchBar";
import currency from "currency.js";
import { excersiseTrade } from "../../contexts/redux/actions/tradingActions";
import Spinner from "../../components/loading/Spinner";
import TransfersTable from "../../components/tables/TransfersTable";
import { fetchOrders } from "../../contexts/redux/actions/fetchDataActions";
import PropertyTrade from "../../components/tables/PropertyTrade";
import { getPropertyById } from "../../contexts/redux/selectors/propertySelectors";
import { clearOrderInfo } from "../../reducers/tradingReducers";

function TradingScreen() {
  const {
    orderInfo: {
      amount = "",
      shares = "",
      pricePerShare = "",
      propertyId = "",
    } = {},
    balanceInfo: { transferAmountRemaining = "", amountPurchased = "" } = {},
  } = useSelector((state) => state.trade);

  const { loading } = useSelector((state) => state.fetchData);
  const dispatch = useDispatch();
  const [flipped, setFlipped] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location?.pathname;
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  const {
    id = "",
    price_per_share = "",
    available_shares = "",
    url = "",
    property_name = "",
    property_address = "",
  } = useSelector((state) => getPropertyById(state, propertyId));
  useEffect(() => {
    dispatch(fetchPropertyRows());
    dispatch(fetchOrders());
  }, []);

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

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token && amount) {
      const syncActions = () => async (dispatch) => {
        await dispatch(excersiseTrade());
        dispatch(fetchOrders());
        dispatch(clearOrderInfo());
      };
      dispatch(syncActions());
    }
  };

  useEffect(() => {
    if (!amount) {
      setFlipped(false);
    }
  }, [amount]);

  return (
    <div className="bg-wht-smk">
      <div className="flx-btw-container pd-20">
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
          <NavbarLogo />
        </div>
        <div className="right-margin-container-2 ">
          {token ? <Profile user={profileInitial} /> : <NavbarLogins />}
        </div>
      </div>
      <div className="flx-btw-inh">
        <SideBar sideMenuItems={sideMenuItems} sideMenuNavs={sideMenuNavs} />
        <div className="flx-btw-inh">
          <Card className="trade-cards_history">
            <Card.Title>Recent Orders</Card.Title>
            <Card.Content>
              {loading ? <Spinner /> : <TransfersTable />}
            </Card.Content>
          </Card>
          <div>
            <Card className="trade-cards">
              <Card.Header>
                <h4>{property_name}</h4>
              </Card.Header>
              <Card.Content className="trade-img">
                <img src={url} />
              </Card.Content>
              <Card.Footer>
                <span>
                  <p>{property_address}</p>
                  <p>some description</p>
                </span>
                <span>{available_shares} avialable shares</span>
              </Card.Footer>
            </Card>
          </div>
          <div className={flipped ? "flip-card hoverme" : "flip-card"}>
            <Card
              className={
                flipped
                  ? "trade-cards_trade_flipped blk-center pd-20 flip-card-inner"
                  : "trade-cards_trade blk-center pd-20 flip-card-inner"
              }
            >
              <div className="flip-card-front">
                <div className=" mg-bm-6">
                  <SearchBar classname={"trade_search_width"} />
                </div>
                <Card.Header className="">
                  <ul className="flx-al-ct-container pd-mg-0">
                    <li className="">
                      <button className="btn-container-zero">
                        <span className="pd-20 bg-blk-1000 cl-wht trade-mg">
                          Buy
                        </span>
                      </button>
                    </li>
                    <li className="">
                      <button className="btn-container-zero no-pointer">
                        <span className="pd-20 bg-gr-1000 cl-blk trade-mg">
                          Sell
                        </span>
                      </button>
                    </li>
                  </ul>
                </Card.Header>
                <Card.Content className="amount_container">
                  <TradeSlider propertyId={propertyId} />
                </Card.Content>
                <Card.Footer className="top-margin-container">
                  <button
                    className="btn-container-zero trade-buy-button"
                    disabled={!parseInt(shares)}
                    onClick={handleClick}
                  >
                    <span className=" bg-blk-1000 cl-wht trade-mg">Review</span>
                  </button>
                </Card.Footer>
              </div>
              <div className="flip-card-back">
                <div className="">
                  <h4 className="bm-brd-container-gr">Trade Summary</h4>
                  <div className="flx-btw-container rt-lft-mg-container-8  ">
                    <p className="ft-container-12">price per share</p>
                    <p className="ft-container-12 wd-container-10-abs">
                      {pricePerShare}
                    </p>
                  </div>
                  <div className="flx-btw-container rt-lft-mg-container-8  ">
                    <p className="ft-container-12">...</p>
                    <p className="ft-container-12 wd-container-10-abs">
                      {pricePerShare}
                    </p>
                  </div>
                  <div className="flx-btw-container rt-lft-mg-container-8  ">
                    <p className="ft-container-12">dividends</p>
                    <p className="ft-container-12 wd-container-10-abs">
                      {pricePerShare}
                    </p>
                  </div>
                </div>
                <h1>{currency(amount).format()}</h1>
                <h4>{shares} shares</h4>
                <p>some discolure...</p>
                <Card.Footer className="top-margin-container">
                  <button className="btn-container-zero" onClick={handleSubmit}>
                    <span className=" bg-blk-1000 cl-wht trade-mg">Submit</span>
                  </button>
                </Card.Footer>
              </div>
            </Card>
            {transferAmountRemaining < 5 && (
              <Card className="trade-cards">
                <Card.Header>
                  <span>i</span>
                  <span>
                    Current Balance of{" "}
                    {currency(transferAmountRemaining).format()}
                  </span>
                </Card.Header>
                <Card.Footer className="">
                  <button className="btn-container-zero">
                    <span className=" bg-blk-1000 cl-wht ">Transfer Funds</span>
                  </button>
                </Card.Footer>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Card className="trade-cards">
        <PropertyTrade />
      </Card>
    </div>
  );
}

export default TradingScreen;
