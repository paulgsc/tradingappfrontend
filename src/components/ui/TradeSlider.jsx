import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedPropertyById } from "../../contexts/redux/selectors/propertySelectors";
import { fetchPropertyRows } from "../../contexts/redux/actions/fetchPropertyActions";
import { useMemo } from "react";
import { useEffect } from "react";
import { clearOrderInfo, storeOrderInfo } from "../../reducers/tradingReducers";
import { fetchBalance } from "../../contexts/redux/actions/tradingActions";
import currency from "currency.js";
import "./tradeslider.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";

function TradeSlider() {
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
  const [inputshares, setInputShares] = useState(0);
  const [maxShares, setMaxShares] = useState(0);
  const [showModal, toggleShowModal] = useState(false);

  const {
    id = "",
    price_per_share = "",
    available_shares = "",
  } = useSelector((state) => getSelectedPropertyById(state, propertyId));
  const payload = useMemo(() => {
    if (isNaN(parseInt(inputshares)) || parseInt(inputshares) < 1) {
      return {
        shares: 0,
        amount: 0,
        propertyId: propertyId,
        transactionType: "BUY",
        pricePerShare: pricePerShare,
      };
    } else if (inputshares > maxShares) {
      return {
        shares: shares,
        amount: amount,
        propertyId: propertyId,
        transactionType: "BUY",
        pricePerShare: pricePerShare,
      };
    } else {
      const purchaseAmount =
        parseInt(inputshares) * parseFloat(price_per_share);
      if (isNaN(purchaseAmount)) {
        return null;
      } else {
        return {
          shares: inputshares,
          amount: purchaseAmount,
          propertyId: propertyId,
          transactionType: "BUY",
          pricePerShare: price_per_share,
        };
      }
    }
  }, [inputshares]);
  const handleInputChange = (e) => {
    e.preventDefault();
    setInputShares(parseInt(e.target.value));
  };
  useEffect(() => {
    if (payload) {
      dispatch(storeOrderInfo(payload));
    } else {
      shares && dispatch(clearOrderInfo());
    }
  }, [payload]);

  useEffect(() => {
    dispatch(fetchBalance()).then(() => {
      const getMaxShares = () => {
        const maxShareAmount = parseInt(
          parseFloat(transferAmountRemaining) / parseFloat(price_per_share)
        );

        setMaxShares(isNaN(maxShareAmount) ? 0 : maxShareAmount);
      };

      transferAmountRemaining && getMaxShares();
    });
  }, [
    dispatch,
    transferAmountRemaining,
    price_per_share,
    transferAmountRemaining,
    propertyId,
  ]);

  const handleSliderChange = (e) => {
    e.preventDefault();
    setInputShares(parseInt(e.target.value));
  };

  const handleSliderClick = (e) => {
    !transferAmountRemaining && toggleShowModal(true);
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
      {showModal && (
        <Modal
          title={"Transfer Funds To Trade"}
          body={<TradeSlider.PopupMessage />}
          Footer={<TradeSlider.PopupActionFooter />}
        />
      )}

      <div className="grid grid-rows-3 items-center w-full gap-2 mb-4">
        <div
          id="inputshares"
          className="flex items-center justify-between w-full p-4 border-2 rounded-lg border-gray-400"
        >
          <span>Shares </span>
          <input
            type="text"
            name="sharesAmount"
            autoComplete="off"
            inputMode="numeric"
            validation="default"
            value={shares}
            onChange={handleInputChange}
            onClick={handleSliderClick}
            className=" w-2/3 text-right outline-0 text-black bg-transparent"
          />
        </div>

        <div
          id="inputSlider"
          className="flex items-center justify-center rounded h-4/5 dark:bg-gray-800"
        >
          <input
            className="trade-slider__slider w-3/5"
            type="range"
            min="0"
            max={maxShares}
            value={parseInt(shares) || 0}
            onChange={handleSliderChange}
            onTouchStart={handleSliderClick}
          />
        </div>

        <div className="flex items-center justify-center rounded h-4/5 dark:bg-gray-800">
          <div className={parseInt(shares) ? "bg-black h-5 w-3/5" : ""}>
            <div
              className="bg-blue-300 h-5"
              style={{
                width: `${
                  100 * ((parseInt(shares) || 0) / (parseInt(maxShares) || 1))
                }%`,
              }}
            ></div>
            {shares && (
              <div className="">
                <span className="">Buying power</span>
                <span className="">
                  {currency(amount).format()} of{" "}
                  {currency(transferAmountRemaining).format()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

TradeSlider.PopupMessage = () => (
  <>
    <p className="text-base xl:tex-lg leading-relaxed text-gray-500 dark:text-gray-400">
      In order to buy shares of property you need to have a balance in your
      account. Transfer money to you account using your linked banks. In you
      haven't set up any linked accounts, set up you bank links first.
    </p>
    <p className="text-base xl:tex-lg leading-relaxed text-gray-500 dark:text-gray-400">
      Your bank links set up and transfers are handled through plaid.
    </p>
  </>
);

TradeSlider.PopupActionFooter = () => (
  <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
    <Link to={"/personal/banking"}>
      <button
        data-modal-hide="defaultModal"
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Transfer Funds
      </button>
    </Link>
  </div>
);
export default TradeSlider;
