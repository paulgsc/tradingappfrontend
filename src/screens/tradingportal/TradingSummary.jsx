import React from "react";
import OrderSummary from "../../components/ui/OrderSummary";
import { housePic_1 } from "../../assets";
import currency from "currency.js";
import { useSelector } from "react-redux";

function TradingSummary() {
  const {
    orderInfo: {
      amount = "",
      shares = "",
      pricePerShare = "",
      propertyId = "",
      isValid = false,
    } = {},
  } = useSelector((state) => state.trade);
  return (
    <OrderSummary className={"shadow-md border-l border-t"}>
      <OrderSummary.Card
        className={"flex items-center justify-center w-full p-4"}
      >
        <OrderSummary.TotalCard className={""}>
          {currency(amount).format()}
        </OrderSummary.TotalCard>
      </OrderSummary.Card>
      <OrderSummary.Title>Order Summary</OrderSummary.Title>
      <OrderSummary.Card className={"border-t-2 border-slate-400"}>
        <div className="grid grid-cols-4 text-center items-center">
          <OrderSummary.Img className={""} src={housePic_1} />

          <span className="flex flex-col justify-center text-center">
            <span className="font-semibold text-2xl">
              {currency(pricePerShare).format()}
            </span>
            <span className="text-xs text-slate-400 font-light">
              Price per share
            </span>
          </span>
          <span className="flex flex-col justify-center text-center">
            <span className="font-semibold text-2xl">{shares || 0}</span>
            <span className="text-xs text-slate-400 font-light">Shares</span>
          </span>
          <span className="flex flex-col justify-center text-center">
            <span className="font-semibold text-2xl">
              {currency(amount).format()}
            </span>
            <span className="text-xs text-slate-400 font-light">Total</span>
          </span>
        </div>
        <hr className="mb-12" />
        <OrderSummary.Detail className={"grid border shadow-sm p-2"}>
          <div className="grid grid-cols-3 font-semibold text-slate-600 text-base xl:text-lg py-2 underline">
            <span>Description</span>
            <span>Order detail</span>
            <span>Property metrics</span>
          </div>
          <div className="grid grid-cols-3">
            <div className="grid text-sm xl:text-base gap-2 ">
              <span>Property name: name</span>
              <span>Property address: address</span>
              <span>Property rental status: status</span>
            </div>
            <div className="grid text-sm xl:text-base gap-2 ">
              <span>Price Per Share: {currency(pricePerShare).format()}</span>
              <span>Shares: {shares || 0}</span>
              <span>Purchase Amount: {currency(amount).format()}</span>
            </div>
            <div className="grid text-sm xl:text-base gap-2 ">
              <span>Current dividend: $0.00</span>
              <span>Outstanding shares: 0.00</span>
              <span>Percent shares sold: 0%</span>
            </div>
          </div>
        </OrderSummary.Detail>
      </OrderSummary.Card>
    </OrderSummary>
  );
}

export default TradingSummary;
