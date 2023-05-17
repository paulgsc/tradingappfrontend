import React, { useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getLinkedAccounts,
  initiatePlaid,
} from "../../contexts/redux/actions/plaidActions";
import { useNavigate } from "react-router";
import {
  fetchLinkedAccounts,
  fetchTransfers,
} from "../../contexts/redux/actions/fetchDataActions";
import LinkAccount from "../plaid/LinkAccount";
import currency from "currency.js";
import TransfersTable from "../../components/tables/TransfersTable";
import PlaceHolder from "../../components/loading/PlaceHolder";

const iconStyle = {
  width: 20,
  height: 20,
  color: "#FFF",
};

function LinkBank() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    linkedAccounts = [],
    summary: { transfer_remaining = "" } = {},
    history = [],
  } = useSelector((state) => state.fetchData);
  const {
    plaidInfo: {
      initiationType = "",
      isError = false,
      linkSuccess = false,
      isItemAccess = true,
    } = {},
  } = useSelector((state) => state.plaid);

  useEffect(() => {
    if (linkSuccess) {
      dispatch(getLinkedAccounts());
    }
  }, [dispatch, isItemAccess, linkSuccess]);

  useEffect(() => {
    dispatch(fetchLinkedAccounts());
    dispatch(fetchTransfers());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(initiatePlaid("link")).then(() => {});
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <>
      {initiationType && isItemAccess && !linkSuccess ? (
        <LinkAccount />
      ) : (
        <div className="linkbank__container">
          <div className="linkbank__back-btn-container">
            <button onClick={handleGoBack} className=" ">
              <PlaceHolder.Icon name="chevronLeft" />
              <span className=" ">Go back</span>
            </button>
          </div>
          <div className="linkbank__header-container1">
            <h3>Cash</h3>
          </div>
          <div className="linkbank__balance-container">
            <div className="linkbank__balance__content">
              <div className="linkbank__balance_txt">
                <span>Withdrawable Cash</span>
              </div>
              <div className="linkbank__balance_txt">
                <span>{currency(transfer_remaining).format()}</span>
              </div>
            </div>
          </div>
          <div className="linkbank__header-container2">
            <h3>Linked Accounts</h3>
          </div>

          <div className="linkbank__account-container">
            <ul>
              {linkedAccounts.map((acct, index) => (
                <li key={index}>
                  {acct?.official_name}

                  <span className="linkbank__routing">
                    {acct?.type}

                    {acct?.mask}
                  </span>
                </li>
              ))}
              <li>
                <div className="linkbank__add-account">
                  <button onClick={handleClick}>
                    <span className="linkbank__add_acct">
                      <PlaceHolder.Icon name="addIcon" styles={iconStyle} />
                    </span>
                    <span className="linkbank__add_acct">Add New Account</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div className="linkbank__header-container3">
            <h3>Recent Transfers</h3>
          </div>
          <div className="linkbank__transfers-history-container">
            <TransfersTable />
          </div>
        </div>
      )}
    </>
  );
}

export default LinkBank;
