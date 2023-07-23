import React from "react";
import OrderSummary from "../../../../../components/ui/OrderSummary";
import { ProfileSvg } from "../../../../../constants/svgs/Svg";
import ProfileInfo from "../../../../../components/ui/ProfileInfo";
import currency from "currency.js";
import BuyBtn from "./orderInputs/buttons/BuyBtn";

function SummaryPage() {
  let shares;
  let amount;
  const handleClick = () => {};
  return (
    <OrderSummary className={""}>
      <OrderSummary.Title className={""}>User Snapshot</OrderSummary.Title>
      <div className="flex gap-4 border-t p-2 ">
        <ProfileInfo.ProfileImageCard
          className={" border-slate-600 w-12 h-12 "}
        >
          <ProfileSvg />
        </ProfileInfo.ProfileImageCard>
        <div className="flex flex-col">
          <span className="font-bold text-neutral-600 text-base xl:text-lg">
            John Doe
          </span>
          <span className="font-normal text-sm xl:text-base text-neutral-400">
            0 Property Shares Owned
          </span>
        </div>
      </div>
      <div className="mt-2">
        <OrderSummary.Title>Order Amount</OrderSummary.Title>
        <div className="border-t">
          <div>
            <span>You're paying: </span>
            <span>{currency(amount).format()}</span>
          </div>
          <div>
            <span>You're receiving: </span>
            <span>{shares} shares</span>
          </div>
        </div>
        <BuyBtn />
      </div>
    </OrderSummary>
  );
}

export default SummaryPage;
