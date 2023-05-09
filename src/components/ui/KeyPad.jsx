import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setTransferAmount } from "../../contexts/redux/actions/plaidActions";
import Spinner from "../loading/Spinner";
import { Card } from "../cards/Card";
import currency from "currency.js";

function KeyPad() {
  const [amount, setAmount] = useState("0");
  const [btnDisabled, ToggleDisabledBtn] = useState(true);
  const navigate = useNavigate();
  const {
    loading,
    plaidInfo: { transferAmount },
  } = useSelector((state) => state.plaid);
  const dispatch = useDispatch();

  const handleTransfer = (e) => {
    e.preventDefault();
    dispatch(setTransferAmount(amount));
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
      }
      ToggleDisabledBtn(false);
    };
    validateAmount();
  }, [amount]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : !transferAmount ? (
        <div className="center-container">
          <div className="some-box">
            <h4>Transfer from</h4>
            <h4>Transfer To</h4>
          </div>
          <div className="mg-200px-0">
            <div className=" cl-wht font-60 pd-tp-bm-2-4">{amount}</div>
            <table className="">
              <tbody className="">
                <tr className="">
                  <td className="wd-7">
                    <button
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      1
                    </button>
                  </td>
                  <td className="wd-7">
                    <button
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      2
                    </button>
                  </td>
                  <td className="wd-7">
                    <button
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      3
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="wd-7">
                    <button
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      4
                    </button>
                  </td>
                  <td className="wd-7">
                    <button
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      5
                    </button>
                  </td>
                  <td className="wd-7">
                    <button
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      6
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="wd-7">
                    <button
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      7
                    </button>
                  </td>
                  <td className="wd-7">
                    <button
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      8
                    </button>
                  </td>
                  <td className="wd-7">
                    <button
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      9
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="wd-7">
                    <button
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      0
                    </button>
                  </td>

                  <td
                    id="decimal"
                    onClick={handleClick}
                    className="btn-container-zero cl-wht font-50"
                  >
                    .
                  </td>

                  <td className="wd-7">
                    <button
                      id="erase"
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      &#x232b;
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mg-lft-8 mg-tp-200 ">
            <button
              className="transfer-btn"
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
              <h1 className="pd-mg-0">{currency(transferAmount).format()}</h1>
            </Card.Content>
            <Card.Footer className="pd-20">
              <span>
                <h4 className="pd-mg-0">From ...</h4>
              </span>
              <span>
                <h4 className="">To ...</h4>
              </span>
              <Link to={"/personal/transfer/plaid"}>
                <button>Go to Plaid </button>
              </Link>
            </Card.Footer>
          </Card>
        </div>
      )}
    </div>
  );
}

export default KeyPad;
