import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setTransferAmount } from "../../contexts/redux/actions/plaidActions";
import Spinner from "../loading/Spinner";

function KeyPad() {
  const [amount, setAmount] = useState("0");
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

  return (
    <>
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
                  <td className="wd-7">
                    <button
                      id="decimal"
                      onClick={handleClick}
                      className="btn-container-zero cl-wht font-50"
                    >
                      .
                    </button>
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
            <div>
              <button onClick={handleTransfer}>Initiate Transfer</button>
            </div>
          </div>
        </div>
      ) : (
        <Link to={"/personal/transfer/plaid"}>
          <button>Go to Plaid </button>
        </Link>
      )}
    </>
  );
}

export default KeyPad;
