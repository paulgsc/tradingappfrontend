import React from "react";

function ModalMsg() {
  return (
    <div>
      <p className="text-sm xl:text-base leading-relaxed text-gray-500 dark:text-gray-400">
        In order to buy shares of property you need to have a balance in your
        account. Transfer money to you account using your linked banks. In you
        haven't set up any linked accounts, set up you bank links first.
      </p>
      <p className="text-xs xl:text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        Your bank links set up and transfers are handled through plaid.
      </p>
    </div>
  );
}

export default ModalMsg;
