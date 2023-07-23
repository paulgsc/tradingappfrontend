import React from "react";
import ReviewBtn from "./buttons/ReviewBtn";
import InputLayout from "./inputModes/InputLayout";
import TransferModal from "./alerts/transfer/TransferModal";
import { Toaster } from "react-hot-toast";

function OrderEntryLayout() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="items-center w-full gap-2 mb-4">
        <TransferModal />
        <InputLayout />
        <ReviewBtn />
      </div>

      <Toaster />
    </div>
  );
}

export default OrderEntryLayout;
