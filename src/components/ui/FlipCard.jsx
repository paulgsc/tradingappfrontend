import React, { useState } from "react";
import { Card } from "../cards/Card";
import TradeSlider from "./TradeSlider";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../contexts/redux/actions/fetchDataActions";
import { clearOrderInfo } from "../../reducers/tradingReducers";
import currency from "currency.js";
import { excersiseTrade } from "../../contexts/redux/actions/tradingActions";

function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  const dispatch = useDispatch();
  const {
    orderInfo: {
      amount = "",
      shares = "",
      pricePerShare = "",
      propertyId = "",
      isValid = false,
    } = {},
  } = useSelector((state) => state.trade);

  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

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
        setFlipped(!flipped);
      };
      dispatch(syncActions());
    }
  };

  return (
    <div className={flipped ? "flex-1 hoverme" : "flex-1 "}>
      <Card
        className={
          flipped
            ? "flex-1 rounded-md  flip-card-inner"
            : "flex-1 rounded-md  flip-card-inner"
        }
      >
        <div className="flex flex-col gap-2 backface-hidden">
          <div className="  w-full">
            <TradeSlider propertyId={propertyId} />
          </div>

          <Card.Footer className="">
            <div className="flex items-center justify-center">
              <button
                className="bg-black border-none text-white font-medium text-sm xl:text-base rounded-md p-2 disabled:opacity-40 disabled:pointer-events-none"
                disabled={!parseInt(shares) || !isValid}
                onClick={handleClick}
              >
                <span className="">Review </span>
              </button>
            </div>
          </Card.Footer>
        </div>

        <div className="rotatey flex items-center flex-col absolute w-full h-full backface-hidden">
          <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
            <FlipCard.Header handleClick={handleClick} />
            <FlipCard.LineItems pricePerShare={pricePerShare} />
          </div>
          <h1 className="text-base lg:text-2xl xl:text-4xl dark:text-white font-semibold leading-6 text-gray-800">
            {currency(amount).format()}
          </h1>
          <h4 className="py-2 text-base lg:text-2xl xl:text-4xl dark:text-white font-semibold leading-7 lg:leading-9 text-gray-500">
            {shares} shares
          </h4>
          <p></p>
          <Card.Footer className="">
            <button
              className="bg-black border-none text-white font-medium text-base xl:text-lg rounded-md p-2"
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

FlipCard.Header = ({ handleClick }) => (
  <div className="flex justify-between">
    <h4 className="text-sm lg:text-xl xl:text-2xl dark:text-white font-semibold leading-7 lg:leading-9 text-gray-800">
      Trade Summary
    </h4>
    <button
      type="button"
      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      data-modal-hide="defaultModal"
      onClick={handleClick}
    >
      <svg
        aria-hidden="true"
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Close modal</span>
    </button>
  </div>
);

FlipCard.LineItems = ({ pricePerShare }) => (
  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
    <div className="flex justify-between w-full">
      <p className="text-sm xl:text-base dark:text-white leading-4 text-gray-800">
        price per share
      </p>
      <p className="text-sm xl:text-base dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
        {currency(pricePerShare).format()}
      </p>
    </div>
  </div>
);

export default FlipCard;
