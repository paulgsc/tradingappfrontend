import React from "react";
import { cn } from "../../lib/utils";

function OrderSummary({ className, ...props }) {
  return <div className={cn(`${className}  `)} {...props} />;
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

OrderSummary.Img = ({ className, src, ...props }) => {
  return (
    <img
      src={src}
      className={cn(
        `${className} w-28 h-28 p-2 xl:w-36 xl:h-36 rounded-full bg-cover`
      )}
      {...props}
    />
  );
};

OrderSummary.Button = ({ className, handleClick, ...props }) => {
  return (
    <button
      onClick={handleClick}
      className={cn(`${className}  h-12 w-28 shadow-sm rounded-md text-white`)}
      {...props}
    />
  );
};

OrderSummary.TotalCard = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        `${className} flex items-center justify-center md:w-28 md:h-28 xl:w-40 xl:h-40 border rounded-full ring-2 ring-blue-100 shadow-sm ring-opacity-40 bg-stone-50 font-bold md:text-lg xl:text-xl`
      )}
      {...props}
    />
  );
};

OrderSummary.Detail = ({ className, ...props }) => {
  return <div className={cn(`${className} `)} {...props} />;
};
