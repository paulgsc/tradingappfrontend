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

  const {
    id = "",
    price_per_share = "",
    available_shares = "",
  } = useSelector((state) => getSelectedPropertyById(state, propertyId || 49));
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
  return (
    <div className="w-full">
      <div className="grid grid-rows-3 items-center w-full gap-2 mb-4">
        <div className="flex items-center justify-between w-full p-4 border-2 rounded-lg border-gray-400">
          <span>Shares </span>
          <input
            type="text"
            name="sharesAmount"
            autocomplete="off"
            inputmode="numeric"
            validation="default"
            value={shares}
            onChange={handleInputChange}
            className=" w-2/3 text-right outline-0 text-black bg-transparent"
          />
        </div>

        <div className="flex items-center justify-center rounded h-4/5 dark:bg-gray-800">
          <input
            className="trade-slider__slider"
            type="range"
            min="0"
            max={maxShares}
            value={parseInt(shares) || 0}
            onChange={handleSliderChange}
          />
        </div>
        <div className="flex items-center justify-center rounded h-4/5 dark:bg-gray-800">
          <div className={parseInt(shares) ? "bg-black h-4.875" : ""}>
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
export default TradeSlider;
