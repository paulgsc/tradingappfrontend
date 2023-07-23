import React from "react";
import Modal from "../../../../../../../../components/ui/Modal";
import ModalMsg from "./ModalMsg";
import ModalFooter from "./ModalFooter";
import { useSelector } from "react-redux";

function TransferModal() {
  const { userBalance: { transfer_remaining } = {} } = useSelector(
    (state) => state.trade
  );

  // Check if transfer_remaining is a valid number or not
  const isValidNumber =
    !isNaN(transfer_remaining) && typeof transfer_remaining === "number";

  // If transfer_remaining is not a valid number, you can show an error message or handle it in any way you prefer
  if (!isValidNumber) {
    return <div>Invalid balance value</div>;
  }

  return (
    <>
      {transfer_remaining <= 0 && (
        <div className="absolute">
          <Modal
            title={"Transfer Funds To Trade"}
            body={<ModalMsg />}
            Footer={<ModalFooter />}
          />
        </div>
      )}
    </>
  );
}

export default TransferModal;
