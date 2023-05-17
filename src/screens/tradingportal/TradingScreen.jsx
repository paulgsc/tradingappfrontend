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
import ResultList from "../../components/searchResult/ResultList";
import "./tradingscreen.css";

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

  const { loading, propertyData = [] } = useSelector(
    (state) => state.fetchData
  );
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
    <div className="">
      <div className="flx-btw-inh">
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
          <div
            className={
              flipped
                ? "tradingscreen__trade-widget-container hoverme"
                : "tradingscreen__trade-widget-container"
            }
          >
            <Card
              className={
                flipped
                  ? "tradingscreen__trade-card-flipped flip-card-inner"
                  : "tradingscreen__trade-card flip-card-inner"
              }
            >
              <div className="tradingscreen__flip-card-front">
                <div className="tradingscreen__trade-top">
                  <ul className="">
                    <li>
                      <SearchBar classname={"trade__search_width"} />
                    </li>
                    <li>
                      {" "}
                      <ResultList propertyData={propertyData} />{" "}
                    </li>
                  </ul>
                </div>
                <Card.Header className="tradingscreen__order-type">
                  <ul className="">
                    <li className="tradingscreen__buy-type">
                      <button className="">
                        <span className="">Buy</span>
                      </button>
                    </li>
                    <li className="tradingscreen__sell-type">
                      <button className="">
                        <span className="">Sell</span>
                      </button>
                    </li>
                  </ul>
                </Card.Header>
                <Card.Content className="">
                  <TradeSlider propertyId={propertyId} />
                </Card.Content>
                <Card.Footer className="tradingscreen__review">
                  <button
                    className=""
                    disabled={!parseInt(shares)}
                    onClick={handleClick}
                  >
                    <span className="">Review</span>
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
              <Card className="">
                <Card.Header>
                  <span>i</span>
                  <span>
                    Current Balance of{" "}
                    {currency(transferAmountRemaining).format()}
                  </span>
                </Card.Header>
                <Card.Footer className="">
                  <button className="">
                    <span className="">Transfer Funds</span>
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
