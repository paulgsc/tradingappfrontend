import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaBackspace } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setTransferAmount } from "../../contexts/redux/actions/plaidActions";
import Selection from "./Selection";
import { fetchLinkedAccounts } from "../../contexts/redux/actions/fetchDataActions";
import currency from "currency.js";
import PlaidHome from "../../screens/plaid/PlaidHome";
const keyPad = [
  {
    id: "",
    val: "1",
  },
  {
    id: "",
    val: "2",
  },
  {
    id: "",
    val: "3",
  },
  {
    id: "",
    val: "4",
  },
  {
    id: "",
    val: "5",
  },
  {
    id: "",
    val: "6",
  },
  {
    id: "",
    val: "7",
  },
  {
    id: "",
    val: "8",
  },
  {
    id: "",
    val: "9",
  },
  {
    id: "",
    val: "0",
  },
  {
    id: "decimal",
    val: ".",
  },
  {
    id: "erase",
    val: <FaBackspace />,
  },
];

function TransferKeyPad() {
  const [amount, setAmount] = useState("0");
  const [btnDisabled, ToggleDisabledBtn] = useState(true);
  const [transferTo, setTransferTo] = useState("");
  const [transferFrom, setTransferFrom] = useState("");
  const [transferFromId, setTransferFromId] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [goToPlaid, setGoToPlaid] = useState(false);
  const dispatch = useDispatch();

  const {
    loading,
    plaidInfo: { transferAmount },
  } = useSelector((state) => state.plaid);

  const { linkedAccounts = [] } = useSelector((state) => state.fetchData);

  const handleTransfer = (e) => {
    e.preventDefault();

    const data = {
      transferAmount: parseFloat(amount).toFixed(2).toString(),
      account: transferFromId,
    };
    dispatch(setTransferAmount(data));
    setShowReview(true);
  };

  const handleTranserTo = (value) => {
    setTransferTo(value);
  };

  const handleTransferFrom = (value) => {
    setTransferFrom(value);
    setTransferFromId(parseInt(value));
  };

  const handleTransferConfirm = (e) => {
    e.preventDefault();
    setGoToPlaid(true);
  };

  const handleClick = (e) => {
    const eraaseElement = document.getElementById("erase");
    e.preventDefault();
    const clickedValue = e.target.innerText;

    if (eraaseElement.contains(e.target)) {
      if (amount.length === 1) {
        setAmount("0");
        return;
      }

      const newValue = amount.slice(0, -1);
      setAmount(newValue);
      return;
    } else if (clickedValue === ".") {
      if (amount.includes(".")) return;
      setAmount(amount + e.target.innerText);
    } else if (parseFloat(amount + clickedValue) > 5000) {
      return;
    } else if (amount.includes(".")) {
      const [intPart, decimalPart] = amount.split(".");
      if (decimalPart.length >= 2) return;
      setAmount(`${intPart}.${decimalPart}${clickedValue}`);
    } else {
      setAmount(amount === "0" ? clickedValue : amount + clickedValue);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setShowReview(false);
  };

  useEffect(() => {
    const validateAmount = () => {
      const amountInt = parseInt(amount);
      if (isNaN(amountInt) || amountInt < 5) {
        ToggleDisabledBtn(true);
        return;
      } else if (!transferFrom || !transferTo) {
        ToggleDisabledBtn(true);
        return;
      }
      ToggleDisabledBtn(false);
    };
    validateAmount();
  }, [amount, transferFrom, transferTo]);

  useEffect(() => {
    dispatch(fetchLinkedAccounts());
  }, [dispatch]);

  return (
    <>
      {goToPlaid ? (
        <>
          <PlaidHome />
        </>
      ) : (
        <div className="flex flex-col justify-center h-screen ">
          <div className="grid  gap-5 mb-4 h-full xl:h-4/5 ">
            <div className=" flex items-center justify-center rounded h-full dark:bg-gray-800">
              <div className=" items-end grid grid-cols-6 gap-4 w-full h-full">
                <div className="col-span-1 lg:col-span-2 w-full h-full">
                  <TransferKeyPad.Header
                    showReview={showReview}
                    handlPrev={handlePrev}
                  />
                </div>

                <div className="items-center justify-center col-span-4 lg:col-span-2 w-full h-2/5 lg:h-3/5 xl:h-full bg-transparent">
                  {showReview ? (
                    <TransferKeyPad.ReviewAmount
                      transferAmount={transferAmount}
                    />
                  ) : (
                    <TransferKeyPad.Amount amount={amount} />
                  )}
                </div>
                {showReview ? (
                  <div className="hidden lg:flex text-right items-center justify-center col-span-1 h-2/5 lg:h-3/5 xl:h-full rounded bg-transparent">
                    <p
                      className="lg:w-3/5 text-center font-thin text-2xl sm:text-4xl xl:text-7xl text-gray-400 dark:text-gray-500 overflow-ellipsis break-normal cursor-pointer hover:shadow-md hover:rounded-xl hover:text-gray-600"
                      onClick={handleTransferConfirm}
                    >
                      Confirm Transfer
                    </p>
                  </div>
                ) : (
                  <div className="hidden lg:flex text-right items-center justify-center col-span-1 h-2/5 lg:h-3/5 xl:h-full rounded bg-transparent">
                    <p className="lg:w-3/5 text-center font-thin text-2xl sm:text-4xl xl:text-7xl text-gray-400 dark:text-gray-500 overflow-ellipsis break-normal">
                      Review Transfer
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full h-full flex-1 items-center justify-center rounded dark:bg-gray-800">
              <div className="grid grid-cols-6 gap-4 mb-4 w-full h-full flex-1">
                <div className=" invisible col-span-1 flex items-center justify-center rounded bg-transparent">
                  <p className="text-4xl text-gray-400 dark:text-gray-500">+</p>
                </div>
                <div className="col-span-4 flex w-full h-full flex-1 items-center justify-center rounded dark:bg-gray-800">
                  <div className="grid grid-cols-4 items-start gap-4 mb-4 w-full h-full">
                    {!showReview ? (
                      <TransferKeyPad.Selection
                        linkedAccounts={linkedAccounts}
                        transferTo={transferTo}
                        transferFrom={transferFrom}
                        handleTranserTo={handleTranserTo}
                        handleTransferFrom={handleTransferFrom}
                      />
                    ) : (
                      <div></div>
                    )}

                    {showReview ? (
                      <TransferKeyPad.Summary
                        linkedAccounts={linkedAccounts}
                        transferFrom={transferFrom}
                        transferTo={transferTo}
                      />
                    ) : (
                      <TransferKeyPad.Keys handleClick={handleClick} />
                    )}

                    {showReview ? (
                      <div className="invisible col-span-1 lg:flex items-center justify-center rounded bg-indigo-100 dark:bg-gray-800"></div>
                    ) : (
                      <div className="hidden col-span-1 row-span-4 lg:flex items-start justify-center rounded bg-transparent dark:bg-gray-800">
                        <button
                          className="rounded-lg shadow-md bg-indigo-50 enabled:hover:bg-indigo-300 enabled:hover:text-white text-4xl h-24 w-3/5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                          onClick={handleTransfer}
                          disabled={btnDisabled}
                        >
                          Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="invisible col-span-1 flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

TransferKeyPad.Header = ({ showReview, handlPrev }) => (
  <>
    {!showReview ? (
      <div className="hidden lg:grid grid-cols-2 items-end justify-center rounded h-full">
        <div className=" col-span-1"></div>
        <div className="flex text-right items-center justify-center col-span-1 h-2/5 lg:h-3/5 xl:h-full rounded bg-transparent">
          <p className="lg:w-3/5 text-center font-thin text-2xl sm:text-4xl xl:text-7xl text-gray-400 dark:text-gray-500 overflow-ellipsis break-normal">
            Select Account
          </p>
        </div>
      </div>
    ) : (
      <div className="hidden lg:grid grid-cols-2 items-end justify-center rounded h-full">
        <div className=" col-span-1"></div>

        <div className="flex text-right items-center justify-center col-span-1 h-2/5 lg:h-3/5 xl:h-full rounded bg-transparent ">
          <div className="flex items-center text-center justify-center gap-2 h-20 w-min hover:bg-gray-100 py-2 px-8 rounded-xl hover:shadow-md cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="p-0 m-0 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:h-16 xl:w-16 text-gray-400 dark:text-gray-500"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <p
              className="p-0 m-0 lg:w-3/5 text-center font-thin text-2xl sm:text-4xl xl:text-6xl text-gray-400 dark:text-gray-500 overflow-ellipsis break-normal"
              onClick={handlPrev}
            >
              Edit
            </p>
          </div>
        </div>
      </div>
    )}
  </>
);

TransferKeyPad.Amount = ({ amount }) => (
  <div className="flex items-center justify-center text-right h-full rounded-xl shadow-xl bg-gray-600">
    <p className="font-thin text-4xl sm:text-7xl xl:text-9xl text-gray-400 dark:text-gray-500">
      {amount}
    </p>
  </div>
);

TransferKeyPad.ReviewAmount = ({ transferAmount }) => (
  <div className="flex items-center justify-center text-right h-full  bg-transparent">
    <p className="font-thin text-4xl sm:text-7xl xl:text-9xl text-gray-700 dark:text-gray-900">
      {currency(transferAmount).format()}
    </p>
  </div>
);

TransferKeyPad.Selection = ({
  linkedAccounts,
  transferTo,
  transferFrom,
  handleTranserTo,
  handleTransferFrom,
}) => (
  <div className="hidden col-span-1 lg:flex items-center justify-center rounded-lg p-2 bg-transparent dark:bg-gray-800">
    <div className="grid gap-4 mb-4 w-full h-full">
      <div className="row-span-2"></div>
      <Selection
        options={[
          { id: "brokerage", official_name: "Brokerage" },
          ...linkedAccounts,
        ].filter((item) => item?.id.toString() !== transferTo)}
        selected={"Transfer From"}
        onSelectionChange={handleTransferFrom}
      />
      <Selection
        options={[
          { id: "brokerage", official_name: "Brokerage" },
          ...linkedAccounts,
        ].filter((item) =>
          transferFrom && transferFrom !== "brokerage"
            ? item?.id === "brokerage"
            : item?.id.toString() !== transferFrom
        )}
        selected={"Transfer To"}
        onSelectionChange={handleTranserTo}
      />
      <div className="row-span-2"></div>
    </div>
  </div>
);

TransferKeyPad.Keys = ({ handleClick }) => (
  <div className="col-span-4 lg:col-span-2 flex items-stretch justify-center rounded-xl shadow-xl bg-indigo-200">
    <div className="grid grid-cols-3 grid-rows-4 gap-2 m-0 w-full">
      {keyPad.map((key, index) => (
        <div
          key={index}
          className="flex items-center justify-center rounded  bg-indigo-100 dark:bg-gray-800"
        >
          {key?.id !== "" ? (
            <button
              className="flex items-center justify-center text-center sm:h-16 sm:w-16 md:h-20 md:w-20 xl:p-6 xl:h-40 xl:w-40 text-8xl lg:text-5xl xl:text-9xl  border rounded-full border-indigo-100 hover:shadow-inner hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 hover:bg-indigo-300 hover:text-white text-gray-400 dark:text-gray-500"
              onClick={handleClick}
              id={key?.id}
            >
              {key.val}
            </button>
          ) : (
            <button
              className="flex items-center justify-center text-center sm:h-16 sm:w-16 md:h-20 md:w-20 xl:p-6 xl:h-40 xl:w-40 text-8xl lg:text-5xl xl:text-9xl  border rounded-full border-indigo-100 hover:shadow-inner hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 hover:bg-indigo-300 hover:text-white text-gray-400 dark:text-gray-500"
              onClick={handleClick}
            >
              {key.val}
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);

TransferKeyPad.Summary = ({ linkedAccounts, transferFrom, transferTo }) => (
  <div className="col-span-4 lg:col-span-2 flex items-start justify-center bg-transparent">
    <div className="flex flex-col lg:gap-14 m-0 w-full">
      <div className="flex flex-col border-b border-gray-400 ">
        <span className="text-base lg:text-xl cursor-default">From </span>
        <span className="text-base lg:text-4xl xl:text-6xl break-normal cursor-default">
          {
            [
              ...linkedAccounts,
              { id: "brokerage", official_name: "Brokerage" },
            ].find((item) => item.id.toString() === transferFrom)?.official_name
          }
        </span>
      </div>

      <div className="flex flex-col border-b border-gray-400">
        <span className="text-base lg:text-xl cursor-default">To </span>
        <span className="text-base lg:text-4xl xl:text-6xl break-normal cursor-default">
          {
            [
              ...linkedAccounts,
              { id: "brokerage", official_name: "Brokerage" },
            ].find((item) => item.id.toString() === transferTo)?.official_name
          }
        </span>
      </div>
    </div>
  </div>
);

export default TransferKeyPad;
