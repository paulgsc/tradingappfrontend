import React from "react";
import OrderEntryLayout from "../../layouts/OrderEntryLayout";

function OrderPage({ flipped }) {
  return (
    <div
      className={`${
        flipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
      } transition-all duration-1000 ease-in-out absolute top-0 left-0 w-full`}
    >
      <OrderEntryLayout />
    </div>
  );
}

export default OrderPage;
