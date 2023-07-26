import React from "react";
import { Toaster } from "react-hot-toast";
import TransferModal from "../components/alerts/transfer/TransferModal";
import InputLayout from "./InputLayout";
import ReviewBtn from "../components/buttons/ReviewBtn";

function OrderEntryLayout() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="items-center w-full space-y-2">
        <TransferModal />
        <InputLayout />
        <ReviewBtn />
      </div>

      <Toaster />
    </div>
  );
}

export default OrderEntryLayout;
