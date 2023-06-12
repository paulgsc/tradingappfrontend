import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TransfersTable from "../../components/tables/TransfersTable";
import TabWidget from "../../components/ui/TabWidget";
import KeyPad from "../../components/ui/KeyPad";
import Selection from "../../components/ui/Selection";
import currency from "currency.js";
import {
  fetchLinkedAccounts,
  fetchSummary,
  fetchTransfers,
} from "../../contexts/redux/actions/fetchDataActions";
import {
  getTransferStatus,
  initiatePlaid,
  setTransferAmount,
  unlinkBankAccount,
} from "../../contexts/redux/actions/plaidActions";
import { FramerNotifications } from "../../components/animation/Framer";
import Dropdown from "../../components/ui/Dropdown";
import SkeletonLoading from "../../components/loading/SkeletonLoading";
import { validate } from "uuid";

const Index = () => {
  const [amount, setAmount] = useState("0");
  const [maxAmount, setMaxAmount] = useState(5000);
  const [transferTo, setTransferTo] = useState("");
  const [transferFrom, setTransferFrom] = useState("");
  const [transferFromId, setTransferFromId] = useState("");
  const [launchTransfer, toggleLaunchTransfer] = useState(false);
  const [btnDisabled, ToggleDisabledBtn] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.pathname;
  const dispatch = useDispatch();

  const {
    linkedAccounts = [],
    summary: { transfer_remaining = "", transfer_pending = "" } = {},
    history = [],
  } = useSelector((state) => state.fetchData);
  const {
    loading,
    fetchingData = false,
    unlinkResponse = "",
    plaidInfo: { transferAmount },
  } = useSelector((state) => state.plaid);

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleNewAccount = (e) => {
    e.preventDefault();
    dispatch(initiatePlaid("link")).then(() => {});
    navigate(`/personal/banking/link/?redirect=${redirect}`);
  };

  const handleTranserTo = (value) => {
    setTransferTo(value);
  };

  const handleTransferFrom = (value) => {
    setTransferFrom(value);
    setTransferFromId(parseInt(value));
  };

  const handleLaunchTransfer = (e) => {
    e.preventDefault();
    toggleLaunchTransfer(true);
  };

  const handleTransfer = (e) => {
    e.preventDefault();

    const data = {
      transferAmount: parseFloat(amount).toFixed(2).toString(),
      account: transferFromId,
      type: transferTo === "brokerage" ? "debit" : "credit",
      description: transferTo === "brokerage" ? "deposit" : "withdr",
    };
    dispatch(setTransferAmount(data));
    setShowReview(true);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setShowReview(false);
  };

  const handleTransferConfirm = (e) => {
    e.preventDefault();
    dispatch(initiatePlaid("transfer")).then(() => {});
    navigate(`/personal/banking/transfer/?redirect=${redirect}`);
  };

  const handleExitTransfer = (e) => {
    e.preventDefault();
    toggleLaunchTransfer(false);
  };

  const handleUnlink = (accountId) => {
    const accountIds = [accountId];
    dispatch(unlinkBankAccount(accountIds));
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
    const validateMaxAmount = () => {
      transferFrom === "brokerage"
        ? setMaxAmount(transfer_remaining)
        : setMaxAmount(5000);

      if (
        transferFrom === "brokerage" &&
        parseFloat(amount) > parseFloat(maxAmount)
      ) {
        setAmount("0");
      }
    };
    validateMaxAmount();
  }, [transferFrom, maxAmount]);

  useEffect(() => {
    dispatch(fetchLinkedAccounts());
    dispatch(fetchSummary());
    dispatch(fetchTransfers());
    dispatch(getTransferStatus());
  }, [dispatch, fetchingData]);

  return (
    <div className="flex flex-col h-screen gap-2">
      <Index.Nav handleGoBack={handleGoBack} />
      <div className="flex items-center justify-center h-screen w-full  ">
        {launchTransfer ? (
          <div className="flex flex-col mx-2 items-start justify-start w-6/12 h-screen ">
            {showReview ? (
              <Index.Summary
                linkedAccounts={linkedAccounts}
                transferFrom={transferFrom}
                transferTo={transferTo}
                transferAmount={transferAmount}
                handleCloseModal={handleCloseModal}
              />
            ) : (
              <>
                <Index.KeyPad
                  handleExitTransfer={handleExitTransfer}
                  amount={amount}
                  setAmount={setAmount}
                  maxAmount={maxAmount}
                />
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-start justify-start w-6/12 h-screen ">
            <Index.LinkedAcct
              handleNewAccount={handleNewAccount}
              linkedAccounts={linkedAccounts}
              handleUnlink={handleUnlink}
              fetchingData={fetchingData}
              loading={loading}
            />

            <Index.Balance
              transferRemaining={transfer_remaining}
              transferPending={transfer_pending}
            />
            <Index.Transfers />
          </div>
        )}

        <div className="flex  w-3/12 h-full">
          <Index.Tabs
            handleLaunchTransfer={handleLaunchTransfer}
            launchTransfer={launchTransfer}
            linkedAccounts={linkedAccounts}
            transferTo={transferTo}
            transferFrom={transferFrom}
            handleTranserTo={handleTranserTo}
            handleTransferFrom={handleTransferFrom}
            handleTransfer={handleTransfer}
            handleTransferConfirm={handleTransferConfirm}
            btnDisabled={btnDisabled}
            showReview={showReview}
          />
        </div>
      </div>
    </div>
  );
};

Index.Nav = ({ handleGoBack }) => (
  <nav className="sticky top-0 flex items-center justify-start left-0 shadow-md w-full h-full bg-transparent opacity-40 hover:opacity-60">
    <div className="flex items-center justify-center gap-8 ml-1 ">
      <div className="flex items-center justify-center text-center border rounded-full h-full w-full px-[8px] py-[4px]  border-gray-400 border-opacity-10 hover:bg-gray-100 hover:border-opacity-100 ">
        <Link to={"/"}>
          <HomeIcon
            sx={{
              color: "white",
              fill: "black",
              width: {
                xs: 12,
                sm: 16,
                md: 16,
                lg: 16,
              },
              height: {
                xs: 12,
                sm: 16,
                md: 16,
                lg: 16,
              },
            }}
          />
        </Link>
      </div>

      <button
        className="flex items-center justify-center text-center border rounded-full h-full w-full px-[10px] py-[12px]  border-gray-400 border-opacity-10 hover:bg-gray-100 hover:border-opacity-100"
        onClick={handleGoBack}
      >
        <svg
          fill="inherit"
          className="h-3 w-4"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xmlSpace="preserve"
        >
          <path
            id="XMLID_92_"
            d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"
          />
        </svg>
      </button>
    </div>
  </nav>
);

Index.LinkedAcct = ({
  linkedAccounts,
  handleNewAccount,
  handleUnlink,
  loading,
  fetchingData,
}) => (
  <div className="flex flex-col w-full gap-2 items-center">
    <div className="flex w-11/12">
      <h1 className=" text-base lg:text-xl font-bold">Linked accounts</h1>
    </div>
    <ul className="flex flex-col border rounded-lg shadow-sm gap-2 p-2 w-11/12 items-center justify-center">
      {linkedAccounts.map((acct, index) => (
        <li
          key={index}
          className="flex justify-between items-center border-b h-16 w-11/12 text-base font-medium text-gray-800"
        >
          {loading && fetchingData ? (
            <Index.UnlinkSkelton />
          ) : (
            <>
              {" "}
              <div className="flex flex-col ">
                <span> {acct?.official_name}</span>

                <span className="text-sm text-gray-400">
                  {acct?.type}

                  {acct?.mask}
                </span>
              </div>
              <Index.UnlinkWidget
                unlinkAccountId={acct.id}
                handleUnlink={handleUnlink}
              />
            </>
          )}
        </li>
      ))}
      <li className="flex items-center justify-between w-11/12 h-16">
        <button
          onClick={handleNewAccount}
          className="flex items-center w-full gap-1 text-base lg:text-xl font-semibold text-gray-500"
        >
          <span className="mb-1">
            <AddCircleOutlineIcon
              sx={{
                color: "grey",
                width: {
                  xs: 16,
                  sm: 20,
                  md: 16,
                  lg: 16,
                },
                height: {
                  xs: 16,
                  sm: 20,
                  md: 16,
                  lg: 16,
                },
              }}
            />
          </span>
          <span className="text-base">Add new account</span>
        </button>
      </li>
    </ul>
  </div>
);

Index.UnlinkWidget = ({ handleUnlink, unlinkAccountId }) => (
  <div className="relative">
    <Dropdown
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8  bg-tranparent"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <circle cx="10" cy="4" r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="10" cy="16" r="1.5" />
        </svg>
      }
      menu={
        <ul className="absolute -top-2 right-10 py-1">
          <li>
            <button
              onClick={() => handleUnlink(unlinkAccountId)}
              className="block px-4 py-2 text-gray-800 rounded-md bg-gray-200 dark:text-white hover:bg-gray-600 hover:text-white dark:hover:bg-gray-700"
            >
              Unlink
            </button>
          </li>
        </ul>
      }
    />
  </div>
);

Index.UnlinkSkelton = () => (
  <div>
    <SkeletonLoading size={0} />
  </div>
);

Index.Balance = ({ transferRemaining, transferPending }) => (
  <div className="flex flex-col w-full gap-2 items-center mb-2 mt-2 ">
    <div className="w-11/12 m-1 shadow-sm border-r">
      <div className="flex w-11/12">
        <h1 className="text-base lg:text-xl font-bold">Cash</h1>
      </div>
      <div className="flex items-end justify-between w-11/12 h-10 border-b ">
        <span className="ml-10 text-base">Withdrawable cash</span>
        <span className=" mr-20 text-base">
          {currency(transferRemaining).format()}
        </span>
      </div>
      <div className="flex items-end justify-between w-11/12 h-10 border-b">
        <span className="ml-10 text-base">Pending deposits</span>
        <span className="mr-20 text-base">
          {currency(transferPending).format()}
        </span>
      </div>
    </div>
  </div>
);

Index.Transfers = () => (
  <div className="flex flex-col w-full h-full gap-2 items-center">
    <div className="flex w-11/12">
      <h1 className="text-base lg:text-xl  font-bold">Transfer history</h1>
    </div>
    <div className="w-11/12">
      <TransfersTable />
    </div>
  </div>
);

Index.Tabs = ({
  handleLaunchTransfer,
  launchTransfer,
  linkedAccounts,
  transferTo,
  transferFrom,
  handleTranserTo,
  handleTransferFrom,
  handleTransfer,
  handleTransferConfirm,
  btnDisabled,
  showReview,
}) => {
  const headers = [
    {
      id: "tab_1",
      title: "Dashboard",
      content: (
        <Index.Dashboard
          handleLaunchTransfer={handleLaunchTransfer}
          launchTransfer={launchTransfer}
          linkedAccounts={linkedAccounts}
          transferTo={transferTo}
          transferFrom={transferFrom}
          handleTranserTo={handleTranserTo}
          handleTransferFrom={handleTransferFrom}
          handleTransfer={handleTransfer}
          handleTransferConfirm={handleTransferConfirm}
          btnDisabled={btnDisabled}
          showReview={showReview}
        />
      ),
    },
    {
      id: "tab_2",
      title: "notifications",
      icon: <FramerNotifications notifications={2} />,
      content: <Index.Notifications />,
    },
  ];
  return (
    <div className="flex justify-between w-full">
      <TabWidget tabHeaders={headers} />
    </div>
  );
};

Index.Dashboard = ({
  handleLaunchTransfer,
  launchTransfer,
  linkedAccounts,
  transferTo,
  transferFrom,
  handleTranserTo,
  handleTransferFrom,
  handleTransfer,
  btnDisabled,
  showReview,
  handleTransferConfirm,
}) => (
  <div className="mx-2">
    {launchTransfer ? (
      <Index.Selection
        linkedAccounts={linkedAccounts}
        transferFrom={transferFrom}
        transferTo={transferTo}
        handleTranserTo={handleTranserTo}
        handleTransferFrom={handleTransferFrom}
        handleTransfer={handleTransfer}
        btnDisabled={btnDisabled}
        showReview={showReview}
        handleTransferConfirm={handleTransferConfirm}
      />
    ) : (
      <div className="flex flex-col border p-4 gap-2">
        <span className="font-semibold text-gray-700 text-base lg:text-lg xl:text-xl">
          Transfer Money
        </span>
        <span className="text-sm xl:text-lg">
          Launch transfer portal, and deposit money to your account or widthraw
          to your bank.
        </span>
        <button
          className="flex border rounded-lg shadow-lg w-fit bg-gray-700"
          onClick={handleLaunchTransfer}
        >
          <span className="p-2 text-sm xl:text-base break-normal text-white">
            Launch Transfer
          </span>
        </button>
      </div>
    )}
  </div>
);

Index.Notifications = () => (
  <div>
    <div>
      <span>Your recent transfer is still pending!</span>
    </div>
  </div>
);

Index.Selection = ({
  linkedAccounts,
  transferTo,
  transferFrom,
  handleTranserTo,
  handleTransferFrom,
  handleTransfer,
  handleTransferConfirm,
  btnDisabled,
  showReview,
}) => (
  <div className="hidden flex-col gap-8 xl:gap-12 lg:flex items-center justify-center border shadow-sm rounded-lg p-2 bg-gray-50 dark:bg-gray-800">
    <div className="flex flex-col w-full">
      <span className="flex h-6 w-full text-xs xl:text-sm font-semibold">
        {transferFrom && "Transfer From"}
      </span>
      <div className="w-full">
        <Selection
          options={[
            { id: "brokerage", official_name: "Brokerage" },
            ...linkedAccounts,
          ].filter((item) => item?.id.toString() !== transferTo)}
          selected={"Transfer From"}
          onSelectionChange={handleTransferFrom}
        />
      </div>
    </div>
    <div className="flex flex-col w-full ">
      <span className="flex h-6 w-full text-xs xl:text-sm font-semibold">
        {transferTo && "Transfer To"}
      </span>
      <div className="w-full">
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
      </div>
    </div>
    <div className="mb-4 w-10/12">
      {showReview ? (
        <button
          onClick={handleTransferConfirm}
          disabled={btnDisabled}
          className="text-base  xl:text-lg p-4 text-white rounded-lg shadow-md bg-gray-700 enabled:hover:bg-gray-900 enabled:hover:text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Confirm
        </button>
      ) : (
        <button
          onClick={handleTransfer}
          disabled={btnDisabled}
          className="text-base  xl:text-lg p-4 text-white rounded-lg shadow-md bg-gray-700 enabled:hover:bg-gray-900 enabled:hover:text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Review
        </button>
      )}
    </div>
  </div>
);

Index.Summary = ({
  linkedAccounts,
  transferFrom,
  transferTo,
  transferAmount,
  handleCloseModal,
}) => (
  <div className="flex flex-col gap-8 mt-6 w-11/12">
    <button
      type="button"
      className="text-base w-8 h-8 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg  p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      data-modal-hide="defaultModal"
      onClick={handleCloseModal}
    >
      <svg
        aria-hidden="true"
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
    <div className="flex w-full items-center justify-center">
      <span className="text-base lg:text-6xl xl:text-8xl">
        {currency(transferAmount).format()}
      </span>
    </div>
    <div className="flex flex-col lg:h-12 xl:h-16 w-full border-b border-gray-400 ">
      <span className="w-full text-sm xl:text-base cursor-default">From </span>
      <span className="w-full text-base lg:text-2xl xl:text-4xl break-normal cursor-default">
        {
          [
            ...linkedAccounts,
            { id: "brokerage", official_name: "Brokerage" },
          ].find((item) => item.id.toString() === transferFrom)?.official_name
        }
      </span>
    </div>

    <div className="flex flex-col lg:h-12 xl:h-16 border-b border-gray-400">
      <span className="w-full text-sm xl:text-base h-full cursor-default">
        To
      </span>
      <span className="w-full text-base lg:text-2xl xl:text-4xl break-normal cursor-default">
        {
          [
            ...linkedAccounts,
            { id: "brokerage", official_name: "Brokerage" },
          ].find((item) => item.id.toString() === transferTo)?.official_name
        }
      </span>
    </div>
  </div>
);

Index.KeyPad = ({ handleExitTransfer, amount, setAmount, maxAmount }) => (
  <div className="flex flex-col w-full">
    <div className="flex justify-end mr-2">
      <button
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-hide="defaultModal"
        onClick={handleExitTransfer}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
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
    <KeyPad amount={amount} setAmount={setAmount} maxAmount={maxAmount} />
  </div>
);

<Dropdown
  icon={
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8  bg-tranparent"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <circle cx="10" cy="4" r="1.5" />
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="10" cy="16" r="1.5" />
    </svg>
  }
  menu={
    <ul className="py-1">
      <li>
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Pending Orders
        </a>
      </li>
      <li>
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Recurring
        </a>
      </li>
      <li>
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Completed
        </a>
      </li>
      <li>
        <a
          href="#"
          className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Canceled
        </a>
      </li>
    </ul>
  }
/>;

export default Index;
