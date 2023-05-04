import React, { useState } from "react";

function PurchasePopUp() {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value);

    // Only allow positive integers
    if (isNaN(parseInt(inputValue)) || parseInt(inputValue) < 1) {
      setValue("");
      return;
    }

    // Restrict the input to a maximum value of 500
    if (inputValue > 500) {
      setValue(value);
      return;
    }
    console.log("foo foo");

    setValue(parseInt(inputValue));
  };
  return (
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
        <input
          placeholder="shares"
          type="text"
          value={value}
          onInput={handleInputChange}
          pattern="[0-9]+"
        />
      </div>
    </div>
  );
}

export default PurchasePopUp;
