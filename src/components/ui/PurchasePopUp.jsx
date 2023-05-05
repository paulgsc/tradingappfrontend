import currency from "currency.js";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

function PurchasePopUp({ classId }) {
  const [shares, setShares] = useState("");
  const [amount, setAmount] = useState("");
  const [review, setReview] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location?.pathname;
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  const handleReview = (e) => {
    e.preventDefault();
    if (!token) {
      navigate(`/login/?redirect=${redirect}`);
    } else if (token && amount && !review) {
      setReview(true);
    } else if (token && amount && review) {
      navigate("/personal");
    }
  };

  const handleInputChange = (e) => {
    const inputshares = parseInt(e.target.value);

    // Only allow positive integers
    if (isNaN(parseInt(inputshares)) || parseInt(inputshares) < 1) {
      setShares("");
      return;
    }

    // Restrict the input to a maximum shares of 500
    if (inputshares > 500) {
      setShares(shares);
      return;
    }

    setShares(parseInt(inputshares));
  };

  useEffect(() => {
    if (shares) {
      const purchaseAmount = currency(
        parseInt(shares) * parseFloat(".55")
      ).format();

      setAmount(purchaseAmount);
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
              <span>$.55/share</span>
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
          <div>{amount && <span>{amount}</span>}</div>
          <div>
            .<p>55 shares</p>
          </div>
          <div></div>
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
