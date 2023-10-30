import CompleteBtn from "../buttons/CompleteBtn";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

function ConfirmationPage() {
  const queryClient = useQueryClient();
  const {
    orderInfo: {
      exercisedOrderInfo: {
        order_amount = 0,
        order_shares_total = 0,
        price_per_share = 0,
        purchase_date,
      } = {},
    } = {},
  } = useSelector((state) => state.trade);
  const date = new Date(purchase_date);

  useEffect(() => {
    const queryKeys = ["user-balance", "user-shares"];
    queryKeys.forEach(async (qk) => {
      await queryClient.invalidateQueries({
        queryKey: [qk],
        exact: true,
        refetchType: "active",
      });
    });
  }, [queryClient]);

  return (
    <div className="bg-white w-full flex flex-col justify-center space-y-2  rounded-lg p-4 break-words overflow-auto no-scrollbar">
      <h3 className="text-base xl:text-lg font-semibold">
        SPY Order Completed
      </h3>
      <span className="text-sm xl:text-base font-thin">
        {`Your order to buy ${order_amount} of SPY is complete. `}
        <strong className="text-green-600 font-semibold">View Order</strong>
      </span>
      <div className="flex flex-col justify-center items-center w-full p-2 space-y-4 text-sm xl:text-base">
        <div className="w-4/5 flex justify-between items-center border-b">
          <span className="">Order Amount</span>
          <span className="font-semibold">{order_amount}</span>
        </div>
        <div className="w-4/5 flex justify-between items-center border-b">
          <span className="">Shares Added</span>{" "}
          <span className="font-semibold">{order_shares_total}</span>
        </div>
        <div className="w-4/5 flex justify-between items-center border-b">
          <span className="">price per share</span>
          <span className="text-end  font-semibold">{price_per_share}</span>
        </div>
        <div className="w-4/5 flex justify-between items-center border-b">
          <span className="">Expected dividend per share</span>
          <span className="font-semibold">1</span>
        </div>
        <div className="w-4/5 flex justify-between items-center border-b">
          <span className="">Purchase date</span>
          <time className="font-thin text-xs">{date.toLocaleString()}</time>
        </div>
      </div>
      <hr className="mb-6 invisible" />
      <CompleteBtn />
    </div>
  );
}

export default ConfirmationPage;
