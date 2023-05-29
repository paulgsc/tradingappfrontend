import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorizeAndCreateTransfer } from "../../contexts/redux/actions/plaidActions";

function PlaidHome() {
  const dispatch = useDispatch();
  const {
    plaidInfo: {
      type = "",
      transferAmount = "",
      account = "",
      description = "",
    } = {},
  } = useSelector((state) => state.plaid);

  const validate = () => {
    const validType = ["debit", "credit"];
    const parsedAmount = parseFloat(transferAmount).toFixed(2);
    const isValidType = validType.includes(type);
    const isValidAmount =
      !isNaN(parsedAmount) && parsedAmount === transferAmount;
    const isValidAccount = Number.isInteger(parseInt(account));
    const isValidDescription = description.length <= 10;

    return isValidType && isValidAmount && isValidAccount && isValidDescription;
  };

  const generateToken = useCallback(() => {
    if (validate()) {
      dispatch(authorizeAndCreateTransfer());
    }
  }, [dispatch, validate]);

  useEffect(() => {
    generateToken();
  }, []);

  return <></>;
}

export default PlaidHome;
