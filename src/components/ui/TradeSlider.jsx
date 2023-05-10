import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyById } from "../../contexts/redux/selectors/propertySelectors";
import { fetchPropertyRows } from "../../contexts/redux/actions/fetchPropertyActions";
import { useMemo } from "react";
import { useEffect } from "react";
import { clearOrderInfo, storeOrderInfo } from "../../reducers/tradingReducers";
import { fetchBalance } from "../../contexts/redux/actions/tradingActions";
import currency from "currency.js";
function TradeSlider({ propertyId }) {
  const {
    orderInfo: { amount = "", shares = "", pricePerShare = "" } = {},
    balanceInfo: { transferAmountRemaining = "", amountPurchased = "" } = {},
  } = useSelector((state) => state.trade);

  const dispatch = useDispatch();
  const [inputshares, setInputShares] = useState(0);
  const [review, setReview] = useState(false);
  const [maxShares, setMaxShares] = useState(0);
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const {
    id = "",
    price_per_share = "",
    available_shares = "",
  } = useSelector((state) => getPropertyById(state, propertyId));
  const payload = useMemo(() => {
    if (isNaN(parseInt(inputshares)) || parseInt(inputshares) < 1) {
      return null;
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
  ]);

  const handleSliderChange = (e) => {
    e.preventDefault();
    setInputShares(parseInt(e.target.value));
  };
  return (
    <div className=" flex-col-container trade-container">
      <div className="flx-al-ct-container txt-al-ct">
        <input
          className="brd-shd-none zer-outl bg-gr-100 trade_input"
          type="text"
          value={shares}
          onChange={handleInputChange}
        />
        <p className="font-20 mg-input-trade">Shares</p>
      </div>

      <input
        className="trade-slider"
        type="range"
        min="0"
        max={maxShares}
        value={parseInt(shares) || 0}
        onChange={handleSliderChange}
      />

      <div className="bar-max">
        <div
          className="purchase-power"
          style={{
            width: `${
              100 * ((parseInt(shares) || 0) / (parseInt(maxShares) || 1))
            }%`,
          }}
        ></div>
        {shares && (
          <div className="flex-col-container">
            <span className="ft-bldr">Buying power</span>
            <span className="ft-bldr">
              {currency(amount).format()} of{" "}
              {currency(transferAmountRemaining).format()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
export default TradeSlider;
