import currency from "currency.js";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { clearOrderInfo, storeOrderInfo } from "../../reducers/tradingReducers";
import { useMemo } from "react";
import { getPropertyById } from "../../contexts/redux/selectors/propertySelectors";
import { excersiseTrade } from "../../contexts/redux/actions/tradingActions";

function PurchasePopUp({ classId, propertyId }) {
  const { orderInfo: { amount = "", shares = "" } = {} } = useSelector(
    (state) => state.trade
  );

  const dispatch = useDispatch();
  const [inputshares, setInputShares] = useState("");
  const [review, setReview] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location?.pathname;
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const {
    id = "",
    price_per_share = "",
    property_name = "",
    url = "",
    available_shares = "",
  } = useSelector((state) => getPropertyById(state, propertyId));

  const payload = useMemo(() => {
    if (isNaN(parseInt(inputshares)) || parseInt(inputshares) < 1) {
      return null;
    } else if (inputshares > 500) {
      return {
        shares: shares,
        amount: amount,
        propertyId: propertyId,
        transactionType: "BUY",
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
          propertyId: id,
          transactionType: "BUY",
        };
      }
    }
  }, [inputshares]);

  const handleReview = (e) => {
    e.preventDefault();
    if (!token) {
      navigate(`/login/?redirect=${redirect}`);
    } else if (token && amount && !review) {
      setReview(true);
    } else if (token && amount && review) {
      dispatch(excersiseTrade());
    }
  };

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
    if (!shares) {
      setReview(false);
    }
  }, [shares]);
  return (
    <div className={`_${classId}purchase-popup hidden-popup popup-purchase`}>
      {!review ? (
        <div>
          <div>
            <span>Last Month's Dividend Payout</span>
            <span>$ 50.00</span>
          </div>
          <div>
            <div>
              <ul>
                <li>Rental Income</li>
                <li>$1000</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Expenses</li>
                <li>$900</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Dividend</li>
                <li>$900</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Dividend Per Share</li>
                <li>$900</li>
              </ul>
            </div>
          </div>

          <div>
            <div>
              <span>{currency(price_per_share).format()}/share</span>
              {amount && <span>{amount} Total</span>}
            </div>
            <input
              id="trade-input"
              placeholder="shares"
              type="text"
              value={shares}
              onInput={handleInputChange}
              pattern="[0-9]+"
              required
            />
          </div>
        </div>
      ) : (
        <div>
          <h4>Review Your Order</h4>
          <div>
            <div>
              <img src={url} />
            </div>
            <div>
              <span>{property_name}</span>
            </div>
          </div>
          <div>{amount && <span>{amount}</span>}</div>
          <div>
            .<p>{shares} shares</p>
          </div>

          <div>
            <p>some discolusure...</p>
          </div>
        </div>
      )}
      <button
        id="trade-buy-button"
        disabled={!parseInt(shares)}
        onClick={handleReview}
      >
        {review ? "Buy" : "Finalize Order"}
      </button>
    </div>
  );
}

export default PurchasePopUp;
