import React, { useState } from "react";
import { Card } from "../cards/Card";
import TradeSlider from "./TradeSlider";
import { useSelector } from "react-redux";
import { fetchOrders } from "../../contexts/redux/actions/fetchDataActions";
import { clearOrderInfo } from "../../reducers/tradingReducers";
import currency from "currency.js";

function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  const {
    orderInfo: {
      amount = "",
      shares = "",
      pricePerShare = "",
      propertyId = "",
    } = {},
  } = useSelector((state) => state.trade);

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

  return (
    <div className={flipped ? "flex-1 overme" : "flex-1 "}>
      <Card
        className={
          flipped
            ? "flex-1 rounded-md  flip-card-inner"
            : "flex-1 rounded-md  flip-card-inner"
        }
      >
        <div className="flex items-center flex-col space-y-4 backface-hidden">
          <TradeSlider propertyId={propertyId} />

          <Card.Footer className="py-6">
            <button
              className="bg-black border-none text-white font-medium text-base py-4 px-6 disabled:opacity-40 disabled:pointer-events-none"
              disabled={!parseInt(shares)}
              onClick={handleClick}
            >
              <span className="">Review</span>
            </button>
          </Card.Footer>
        </div>

        <div className="rotatey flex items-center flex-col absolute w-full h-full backface-hidden">
          <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
            <h4 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Trade Summary
            </h4>
            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
              <div className="flex justify-between w-full">
                <p className="text-3xl dark:text-white leading-4 text-gray-800">
                  price per share
                </p>
                <p className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                  {currency(pricePerShare).format()}
                </p>
              </div>
            </div>
          </div>
          <h1 className="my-6 text-4xl dark:text-white xl:text-6xl font-semibold leading-6 text-gray-800">
            {currency(amount).format()}
          </h1>
          <h4 className="my-6 text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-500">
            {shares} shares
          </h4>
          <p>some disclosure...</p>
          <Card.Footer className="">
            <button
              className="bg-black border-none text-white font-medium text-base py-4 px-6"
              onClick={handleSubmit}
            >
              <span className="">Submit</span>
            </button>
          </Card.Footer>
        </div>
      </Card>
    </div>
  );
}

export default FlipCard;
