import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setTransferAmount } from "../../contexts/redux/actions/plaidActions";
import Spinner from "../loading/Spinner";
import { Card } from "../cards/Card";
import currency from "currency.js";
import "./keypad.css";
import PlaidHome from "../../screens/plaid/PlaidHome";

function KeyPad({ linkedAccounts }) {
  const [amount, setAmount] = useState("0");
  const [btnDisabled, ToggleDisabledBtn] = useState(true);
  const [transferTo, setTransferTo] = useState("");
  const [transferFrom, setTransferFrom] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropDown, setShowToDropDown] = useState(false);
  const [transferFromId, setTransferFromId] = useState("");
  const [goToPlaid, setGoToPlaid] = useState(false);
  const navigate = useNavigate();
  const {
    loading,
    plaidInfo: { transferAmount },
  } = useSelector((state) => state.plaid);

  const dispatch = useDispatch();

  const handleTransfer = (e) => {
    e.preventDefault();
    const data = {
      transferAmount: parseFloat(amount).toFixed(2).toString(),
      account: transferFromId,
    };
    dispatch(setTransferAmount(data));
  };

  const handleOpenTo = (e) => {
    e.preventDefault();
    setShowToDropDown(true);
  };

  const handleOpenFrom = (e) => {
    e.preventDefault();
    setShowFromDropdown(true);
  };

  const handleTranserTo = (e, acct) => {
    e.preventDefault();
    setTransferTo(acct);
    setShowToDropDown(false);
  };

  const handleTransferFrom = (e, acct, id) => {
    e.preventDefault();
    setTransferFrom(acct);
    setTransferFromId(id);
    setShowFromDropdown(false);
  };

  const handleTransferConfirm = (e) => {
    e.preventDefault();
    setGoToPlaid(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const clickedValue = e.target.innerText;

    if (e.target.id === "erase") {
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
    } else if (amount.includes(".")) {
      const [intPart, decimalPart] = amount.split(".");
      if (decimalPart.length >= 2) return;
      setAmount(`${intPart}.${decimalPart}${clickedValue}`);
    } else if (parseInt(amount + clickedValue) > 5000) {
      return;
    } else {
      setAmount(amount === "0" ? clickedValue : amount + clickedValue);
    }
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

  return (
    <>
      {goToPlaid ? (
        <>
          <PlaidHome />
        </>
      ) : (
        <div className="keypad__container">
          {loading ? (
            <Spinner />
          ) : !transferAmount ? (
            <div className="keypad__main-container">
              <div className="keypad__bank-links">
                <div className="keypad__dropdown-container">
                  <ul className="keypad__links-dropdown">
                    <li>
                      <button onClick={handleOpenFrom}>
                        <h4>Transfer from</h4>{" "}
                      </button>
                      <ul
                        className={
                          !showFromDropdown
                            ? "keypad__bank-accts keypad__hidden"
                            : "keypad__bank-accts"
                        }
                      >
                        <li>Choose an Account to transfer money From</li>
                        {transferTo !== "Brokerage" && (
                          <li>
                            <button
                              onClick={(e) =>
                                handleTransferFrom(e, "Brokerage")
                              }
                            >
                              Brokerage
                            </button>
                          </li>
                        )}
                        {linkedAccounts
                          .filter((item) => item?.official_name !== transferTo)
                          .map((item, index) => (
                            <li key={index}>
                              <button
                                onClick={(e) =>
                                  handleTransferFrom(
                                    e,
                                    item?.official_name,
                                    item?.id
                                  )
                                }
                              >
                                <span>{item?.official_name}</span>
                                <span>
                                  {item?.type} {item?.mask}
                                </span>
                              </button>
                            </li>
                          ))}
                      </ul>
                    </li>
                    <li className="keypad__acct-selected">
                      {" "}
                      <span>{transferFrom}</span>
                    </li>
                  </ul>
                </div>
                <div className="keypad__dropdown-container">
                  <ul className="keypad__links-dropdown">
                    <li>
                      {" "}
                      <button onClick={handleOpenTo}>
                        <h4>Transfer To</h4>
                      </button>
                      <ul
                        className={
                          !showToDropDown
                            ? "keypad__bank-accts keypad__hidden"
                            : "keypad__bank-accts"
                        }
                      >
                        <li>Choose an Account to transfer money to</li>
                        {transferFrom !== "Brokerage" && (
                          <li>
                            <button
                              onClick={(e) => handleTranserTo(e, "Brokerage")}
                            >
                              Brokerage
                            </button>
                          </li>
                        )}
                        {linkedAccounts
                          .filter(
                            (_) => transferFrom === "Brokerage" || !transferFrom
                          )
                          .map((item, index) => (
                            <li key={`to_${index}`}>
                              <button
                                onClick={(e) =>
                                  handleTranserTo(e, item?.official_name)
                                }
                              >
                                <span>{item?.official_name}</span>
                                <span>
                                  {item?.type} {item?.mask}
                                </span>
                              </button>
                            </li>
                          ))}
                      </ul>
                    </li>
                    <li className="keypad__acct-selected">
                      {" "}
                      <span>{transferTo}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="keypad__entry-container">
                <div className="keypad__amount">{amount}</div>
                <table className="keypad__table">
                  <tbody className="">
                    <tr className="">
                      <td className="keypad__btn-columns">
                        <button
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          1
                        </button>
                      </td>
                      <td className="keypad__btn-columns">
                        <button
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          2
                        </button>
                      </td>
                      <td className="keypad__btn-columns">
                        <button
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          3
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="keypad__btn-columns">
                        <button
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          4
                        </button>
                      </td>
                      <td className="keypad__btn-columns">
                        <button
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          5
                        </button>
                      </td>
                      <td className="keypad__btn-columns">
                        <button
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          6
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="keypad__btn-columns">
                        <button
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          7
                        </button>
                      </td>
                      <td className="keypad__btn-columns">
                        <button
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          8
                        </button>
                      </td>
                      <td className="keypad__btn-columns">
                        <button
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          9
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="keypad__btn-columns">
                        <button
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          0
                        </button>
                      </td>

                      <td
                        id="decimal"
                        onClick={handleClick}
                        className="keypad__btn-columns"
                      >
                        <button
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          .
                        </button>
                      </td>

                      <td className="keypad__btn-columns">
                        <button
                          id="erase"
                          onClick={handleClick}
                          className="keypad__buttons"
                        >
                          &#x232b;
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="keypad__review">
                <button
                  className="keypad__review-btn"
                  onClick={handleTransfer}
                  disabled={btnDisabled}
                >
                  Initiate Transfer
                </button>
              </div>
            </div>
          ) : (
            <div>
              <Card className="transfer-review">
                <Card.Header className="pd-10">
                  <h3 className="pd-mg-0">Transfering</h3>
                </Card.Header>
                <Card.Content className="pd-10">
                  <h1 className="pd-mg-0">
                    {currency(transferAmount).format()}
                  </h1>
                </Card.Content>
                <Card.Footer className="pd-20">
                  <span>
                    <h4 className="pd-mg-0">From</h4>
                  </span>
                  <span>
                    <h4 className="pd-mg-0">{transferFrom}</h4>
                  </span>
                  <span>
                    <h4 className="">To</h4>
                  </span>
                  <span>
                    <h4 className="">{transferTo}</h4>
                  </span>

                  <button
                    onClick={handleTransferConfirm}
                    className="keypad__btn-plaid"
                  >
                    Confirm Transfer
                  </button>
                </Card.Footer>
              </Card>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default KeyPad;
