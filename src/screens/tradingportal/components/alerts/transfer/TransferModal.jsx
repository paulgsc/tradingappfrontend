import React from "react";
import ModalMsg from "./ModalMsg";
import ModalFooter from "./ModalFooter";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../../components/ui/Modal";
import { useEffect } from "react";
import { showCalloutAlert } from "../../../../../reducers/tradingReducers";

function TransferModal() {
  const dispatch = useDispatch();
  const { callouts: { showNotNotLoggedInAlert = false } = {} } = useSelector(
    (state) => state.trade
  );

  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );

  const title = token ? "Transfer Funds To Trade" : "Login to begin trading";
  useEffect(() => {
    if (token) {
      dispatch(
        showCalloutAlert({
          showNotNotLoggedInAlert: false,
        })
      );
    }
  }, [token]);
  return (
    <>
      {showNotNotLoggedInAlert && (
        <div className="absolute">
          <Modal title={title} body={<ModalMsg />} Footer={<ModalFooter />} />
        </div>
      )}
    </>
  );
}

export default TransferModal;
