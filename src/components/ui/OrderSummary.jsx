import React from "react";
import { cn } from "../../lib/utils";

function OrderSummary({ className, ...props }) {
  return (
    <div
      className={cn(`${className} px-6 w-full min-h-screen bg-white`)}
      {...props}
    />
  );
}

export default OrderSummary;

OrderSummary.Card = ({ className, ...props }) => {
  return <div className={cn(`${className}`)} {...props} />;
};

OrderSummary.OrdersCard = ({ className, ...props }) => {
  return <div className={cn(`${className}`)} {...props} />;
};

OrderSummary.Title = ({ className, ...props }) => {
  return (
    <h3
      className={cn(
        `${className} text-lg xl:text-2xl font-semibold text-neutral-700 mx-auto my-auto py-4`
      )}
      {...props}
    />
  );
};

OrderSummary.Description = ({ className, ...props }) => {
  return <span className={cn(`${className}`)} {...props} />;
};

OrderSummary.Button = ({ className, handleClick, ...props }) => {
  return (
    <button
      onClick={handleClick}
      className={cn(
        `${className}  h-12 w-28 shadow-sm rounded-md text-white bg-black enabled:hover:bg-blue-600 disabled:opacity-40 enabled:cursor-pointer disabled:cursor-not-allowed`
      )}
      {...props}
    />
  );
};

OrderSummary.TotalCard = ({ className, ...props }) => {
  return <div className={cn(`${className}`)} {...props} />;
};
