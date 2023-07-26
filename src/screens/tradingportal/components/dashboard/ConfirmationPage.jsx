import React from "react";
import CompleteBtn from "../buttons/CompleteBtn";

function ConfirmationPage() {
  return (
    <div className="bg-white w-full flex flex-col justify-center space-y-2  rounded-lg p-4 break-words overflow-auto no-scrollbar">
      <h3 className="text-base xl:text-lg font-semibold">
        SPY Order Completed
      </h3>
      <span className="text-sm xl:text-base font-thin">
        Your order to buy $1.00 of SPY is complete.{" "}
        <strong className="text-green-600 font-semibold">View Order</strong>
      </span>
      <div className="flex flex-col justify-center items-center w-full p-2 space-y-4 text-sm xl:text-base">
        <div className="w-4/5 flex justify-between items-center border-b">
          <span className="">Order Amount</span>
          <span className="font-semibold">$1.00</span>
        </div>
        <div className="w-4/5 flex justify-between items-center border-b">
          <span className="">Shares Added</span>{" "}
          <span className="font-semibold">10</span>
        </div>
        <div className="w-4/5 flex justify-between items-center border-b">
          <span className="">price per share</span>
          <span className="text-end  font-semibold">1</span>
        </div>
        <div className="w-4/5 flex justify-between items-center border-b">
          <span className="">Expected dividend per share</span>
          <span className="font-semibold">1</span>
        </div>
      </div>
      <hr className="mb-6 invisible" />
      <CompleteBtn />
    </div>
  );
}

export default ConfirmationPage;
