import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedPropertyById } from "../../contexts/redux/selectors/propertySelectors";
import { useMemo } from "react";
import { useEffect } from "react";
import { clearOrderInfo, storeOrderInfo } from "../../reducers/tradingReducers";
import { fetchBalance } from "../../contexts/redux/actions/tradingActions";
import currency from "currency.js";
import "./tradeslider.css";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Dropdown from "./Dropdown";
import { notify } from "../../lib/utils";
import { Toaster } from "react-hot-toast";

function TradeSlider({ handleReview }) {
  const {
    orderInfo: {
      amount = "",
      shares = "",
      pricePerShare = "",
      propertyId = "",
      isValid = false,
      transactionType = "",
    } = {},
    balanceInfo: { transferAmountRemaining = "", amountPurchased = "" } = {},
  } = useSelector((state) => state.trade);

  const dispatch = useDispatch();
  const [inputAmount, setInputAmount] = useState(0);
  const [maxInput, setmaxInput] = useState(0);
  const [showModal, toggleShowModal] = useState(false);
  const [buyInShares, setBuyIn] = useState(true);
  const [showInputAlert, toggleInputAlert] = useState(false);

  const {
    id = "",
    price_per_share = "",
    available_shares = "",
  } = useSelector((state) => getSelectedPropertyById(state, propertyId));
  const payload = useMemo(() => {
    if (isNaN(parseInt(inputAmount)) || parseInt(inputAmount) < 1) {
      return {
        shares: 0,
        amount: 0,
        propertyId: propertyId,
        transactionType: "BUY",
        pricePerShare: pricePerShare,
        isValid: false,
      };
    } else if (buyInShares && inputAmount > available_shares) {
      notify("Cannot buy more shares than are available");
      return {
        shares: shares,
        amount: amount,
        propertyId: propertyId,
        transactionType: transactionType,
        pricePerShare: pricePerShare,
        isValid: isValid,
      };
    } else if (buyInShares && inputAmount <= available_shares) {
      const purchaseAmount =
        parseFloat(inputAmount) * parseFloat(price_per_share);
      if (isNaN(purchaseAmount)) {
        notify("something went wrong");
        return null;
      } else if (purchaseAmount > transferAmountRemaining) {
        notify("Not enough funds available!", "bottom-right");
        return {
          shares: shares,
          amount: amount,
          propertyId: propertyId,
          transactionType: transactionType,
          pricePerShare: pricePerShare,
          isValid: isValid,
        };
      } else {
        return {
          shares: inputAmount,
          amount: purchaseAmount,
          propertyId: propertyId,
          transactionType: "BUY",
          pricePerShare: price_per_share,
          isValid: true,
        };
      }
    } else if (!buyInShares && inputAmount > transferAmountRemaining) {
      notify("Not enough funds available!", "bottom-right");
      return {
        shares: shares,
        amount: amount,
        propertyId: propertyId,
        transactionType: transactionType,
        pricePerShare: pricePerShare,
        isValid: isValid,
      };
    } else if (!buyInShares && inputAmount <= transferAmountRemaining) {
      const sharesAmount = inputAmount / parseFloat(price_per_share);
      if (isNaN(sharesAmount)) {
        return null;
      } else if (sharesAmount > available_shares) {
        notify("Cannot buy more shares than are available", "bottom-right");
        return {
          shares: shares,
          amount: amount,
          propertyId: propertyId,
          transactionType: transactionType,
          pricePerShare: pricePerShare,
          isValid: false,
        };
      } else if (parseFloat(sharesAmount) !== parseInt(sharesAmount)) {
        toggleInputAlert(true);
        return {
          shares: shares,
          amount: inputAmount,
          propertyId: propertyId,
          transactionType: transactionType,
          pricePerShare: pricePerShare,
          isValid: false,
        };
      } else {
        toggleInputAlert(false);

        return {
          shares: sharesAmount,
          amount: inputAmount,
          propertyId: propertyId,
          transactionType: "BUY",
          pricePerShare: price_per_share,
          isValid: true,
        };
      }
    } else {
      return {
        shares: 0,
        amount: 0,
        propertyId: propertyId,
        transactionType: "BUY",
        pricePerShare: pricePerShare,
        isValid: false,
      };
    }
  }, [inputAmount]);
  const handleInputChange = (e) => {
    e.preventDefault();
    buyInShares
      ? setInputAmount(parseInt(e.target.value))
      : setInputAmount(parseFloat(e.target.value));
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
      const getmaxInput = () => {
        if (!buyInShares) {
          const maxAmount = parseFloat(
            parseFloat(available_shares) * parseFloat(price_per_share)
          );

          setmaxInput(
            isNaN(maxAmount) ? 0 : Math.min(transferAmountRemaining, maxAmount)
          );
        }
      };
      if (buyInShares) {
        const maxShares = parseInt(
          parseFloat(transferAmountRemaining) / parseFloat(price_per_share)
        );

        setmaxInput(
          isNaN(maxShares) ? 0 : Math.min(available_shares, maxShares)
        );
      }

      transferAmountRemaining && getmaxInput();
    });
  }, [
    dispatch,
    buyInShares,
    transferAmountRemaining,
    available_shares,
    propertyId,
  ]);

  const handleSliderChange = (e) => {
    e.preventDefault();
    buyInShares
      ? setInputAmount(parseInt(e.target.value))
      : setInputAmount(parseFloat(e.target.value));
  };

  const handleSliderClick = (e) => {
    !transferAmountRemaining && toggleShowModal(true);
  };

  const handleMenu = (e) => {
    e.preventDefault();
    setBuyIn(!buyInShares);
    setInputAmount(0);
  };
  return (
    <div className="flex justify-center items-center h-full w-full">
      {showModal && (
        <div className="absolute">
          <Modal
            title={"Transfer Funds To Trade"}
            body={<TradeSlider.PopupMessage />}
            Footer={<TradeSlider.PopupActionFooter />}
          />
        </div>
      )}
      <div className="grid grid-rows-3 items-center w-full gap-2 mb-4">
        <TradeSlider.ManualInput
          amount={buyInShares ? parseInt(shares) || 0 : parseFloat(amount) || 0}
          handleInputChange={handleInputChange}
          handleSliderClick={handleSliderClick}
          handleMenu={handleMenu}
          buyInShares={buyInShares}
          pricePerShare={price_per_share}
        />
        <div
          id="inputSlider"
          className="flex items-center justify-center rounded h-4/5 dark:bg-gray-800"
        >
          <input
            className="trade-slider__slider w-3/5"
            type="range"
            min="0"
            step="1"
            max={maxInput}
            value={
              buyInShares ? parseInt(shares) || 0 : parseFloat(amount) || 0
            }
            onChange={handleSliderChange}
            onMouseDown={handleSliderClick}
          />
        </div>
        <div className="flex items-center justify-center rounded h-4/5 dark:bg-gray-800">
          <div className={parseInt(shares) ? "bg-black h-5 w-3/5" : ""}>
            <div
              className="bg-blue-300 h-5"
              style={
                buyInShares
                  ? {
                      width: `${
                        100 *
                        ((parseInt(shares) || 0) / (parseInt(maxInput) || 1))
                      }%`,
                    }
                  : {
                      width: `${100 * ((amount || 0) / (maxInput || 1))}%`,
                    }
              }
            ></div>
            {!!shares && (
              <div className="">
                <span className="">
                  {currency(amount).format()} of
                  {currency(transferAmountRemaining).format()}
                </span>
              </div>
            )}
            {!!inputAmount && showInputAlert && <TradeSlider.InputAlert />}
          </div>
        </div>
        <div className="flex items-center justify-center w-full mx-auto my-auto py-6">
          <button
            disabled={!amount}
            onClick={handleReview}
            className=" h-12 w-24 shadow-sm rounded-md text-white bg-black enabled:hover:bg-blue-600 disabled:opacity-40 enabled:cursor-pointer disabled:cursor-not-allowed"
          >
            Review
          </button>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

TradeSlider.PopupMessage = () => (
  <>
    <p className="text-sm xl:text-base leading-relaxed text-gray-500 dark:text-gray-400">
      In order to buy shares of property you need to have a balance in your
      account. Transfer money to you account using your linked banks. In you
      haven't set up any linked accounts, set up you bank links first.
    </p>
    <p className="text-xs xl:text-sm leading-relaxed text-gray-500 dark:text-gray-400">
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
        className="text-sm xl:text-base text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Transfer Funds
      </button>
    </Link>
  </div>
);

TradeSlider.ManualInput = ({
  handleInputChange,
  handleSliderClick,
  handleMenu,
  amount,
  buyInShares,
  pricePerShare,
}) => {
  const getClassname = (name) => {
    switch (name) {
      case "main-container":
        return "fixed";
      case "menu-container":
        return "absolute -right-6 h-96 overflow-y-auto border";
      default:
        return "";
    }
  };
  return (
    <div
      id="inputAmount"
      className="flex items-center justify-between w-full p-2 border-2 rounded-lg border-gray-300"
    >
      <div className="flex items-center gap-2">
        <Dropdown
          getClassname={() => {}}
          icon={
            <div>
              <span className=" flex items-center justify-center bg-gray-400 rounded-md p-2 text-xs xl:text-base text-white">
                {buyInShares ? "Shares" : "Dollars"}{" "}
                <i className="fas fa-caret-down ml-2 text-xs"></i>
              </span>
            </div>
          }
          menu={
            <div className=" cursor-pointer absolute justify-center items-center mt-2 w-24 h-10 bg-white rounded-md shadow-lg z-10 hover:bg-stone-200">
              <ul className="py-1">
                <li
                  className="block px-1 text-xs xl:text-base text-center text-gray-800 font-semibold hover:text-blue-600"
                  onClick={handleMenu}
                >
                  {buyInShares ? "Dollars" : "Shares"}
                </li>
              </ul>
            </div>
          }
        />
        {!buyInShares && (
          <div className="flex items-center gap-1 capitalize text-xs xl:text-base">
            <span>price</span>
            <span>{currency(pricePerShare).format()}</span>
          </div>
        )}
      </div>
      <input
        type="text"
        name="sharesAmount"
        autoComplete="off"
        inputMode="numeric"
        validation="default"
        value={!!amount ? amount : ""}
        onChange={handleInputChange}
        onClick={handleSliderClick}
        className=" w-2/3 text-right outline-0 text-black bg-transparent"
      />
    </div>
  );
};

TradeSlider.InputAlert = () => (
  <div className="items-center justify-center">
    <div
      className="flex items-center justify-center bg-blue-400 text-center text-white text-sm font-bold px-4 py-3"
      role="alert"
    >
      <svg
        className="fill-current w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
      </svg>
      <p>Can only buy Whole Shares</p>
    </div>
  </div>
);

export default TradeSlider;
