import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorizeAndCreateTransfer } from "../../contexts/redux/actions/plaidActions";
import SkeletonLoading from "../../components/loading/SkeletonLoading";

function PlaidHome() {
  const dispatch = useDispatch();
  const {
    loading,
    plaidInfo: {
      type = "",
      transferAmount = "",
      account = "",
      description = "",
      transferStatus = "",
      transferAuthSuccess = false,
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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loading && !transferAuthSuccess && <PlaidHome.AuthorizingTransfer />}
      {loading && transferAuthSuccess && (
        <PlaidHome.FetchingStatus transferStatus={transferStatus} />
      )}
      <SkeletonLoading size={7} />
    </div>
  );
}

PlaidHome.AuthorizingTransfer = () => (
  <span>Sending info and attempting to authorize transfer...</span>
);

PlaidHome.FetchingStatus = ({ transferStatus }) => (
  <span>
    Transfer was created {transferStatus}. Fetching details and status of
    created transfer ...
  </span>
);

export default PlaidHome;
