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

function TradeWidget() {
  const {
    orderInfo: {
      amount = "",
      shares = "",
      pricePerShare = "",
      propertyId = "",
    } = {},
    balanceInfo: { transferAmountRemaining = "", amountPurchased = "" } = {},
  } = useSelector((state) => state.trade);
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
                  <span className=" bg-blk-1000 cl-wht trade-mg">Buy</span>
                </button>
              </li>
              <li className="">
                <button className="btn-container-zero no-pointer">
                  <span className="bg-gr-1000 cl-blk trade-mg">Sell</span>
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
              Current Balance of {currency(transferAmountRemaining).format()}
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
  );
}

export default TradeWidget;
