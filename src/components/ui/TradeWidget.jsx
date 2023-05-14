import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../contexts/redux/actions/fetchDataActions";
import { clearOrderInfo } from "../../reducers/tradingReducers";
import { excersiseTrade } from "../../contexts/redux/actions/tradingActions";
import SearchBar from "../searchbar/SearchBar";
import { Card } from "../cards/Card";
import TradeSlider from "./TradeSlider";
import currency from "currency.js";
import { useState } from "react";
import { useEffect } from "react";
import "./tradewidget.css";
import ResultList from "../searchResult/ResultList";

function TradeWidget() {
  const {
    orderInfo: { amount = "", shares = "", pricePerShare = "" } = {},
    balanceInfo: { transferAmountRemaining = "", amountPurchased = "" } = {},
  } = useSelector((state) => state.trade);
  const { propertyData = [] } = useSelector((state) => state.fetchData);
  const dispatch = useDispatch();
  const [flipped, setFlipped] = useState(false);
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
    <div
      className={
        flipped
          ? "trade-widget__container flip-card hoverme"
          : "trade-widget__container flip-card"
      }
    >
      <Card
        className={
          flipped
            ? "trade-widget__flipped flip-card-inner"
            : "trade-widget__not-flipped flip-card-inner"
        }
      >
        <div className="flip-card-front">
          <ul className="trade-widget__search">
            <li>
              <SearchBar classname={"trade__search_width"} />
            </li>
            <li>
              {" "}
              <ResultList propertyData={propertyData} />{" "}
            </li>
          </ul>
          <Card.Header className="">
            <ul className="trade-widget__trade-type">
              <li className="buy-btn">
                <button className="">
                  <span className=" ">Buy</span>
                </button>
              </li>
              <li className="sell-btn">
                <button id="sell-btn" className="">
                  <span className="">Sell</span>
                </button>
              </li>
            </ul>
          </Card.Header>
          <Card.Content className="">
            <TradeSlider />
          </Card.Content>
          <Card.Footer className="trade-widget__review-section">
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
            <h4 className="">Trade Summary</h4>
            <div className="  ">
              <p className="">price per share</p>
              <p className="">{pricePerShare}</p>
            </div>
            <div className="  ">
              <p className="">...</p>
              <p className="">{pricePerShare}</p>
            </div>
            <div className="">
              <p className="">dividends</p>
              <p className="">{pricePerShare}</p>
            </div>
          </div>
          <h1>{currency(amount).format()}</h1>
          <h4>{shares} shares</h4>
          <p>some discolure...</p>
          <Card.Footer className="">
            <button className="" onClick={handleSubmit}>
              <span className="">Submit</span>
            </button>
          </Card.Footer>
        </div>
      </Card>
      {transferAmountRemaining < 5 && (
        <Card className="trade-cards">
          <Card.Header>
            <span>i</span>
            <span>
              Current Balance of {currency(transferAmountRemaining).format()}
            </span>
          </Card.Header>
          <Card.Footer className="">
            <button className="">
              <span className=" ">Transfer Funds</span>
            </button>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
}

export default TradeWidget;
