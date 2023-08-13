import React from "react";

function TradingHeader({ propertyName }) {
  return (
    <header className="flex items-center justify-center h-24 w-full rounded bg-gray-50 dark:bg-gray-800">
      <h1 className="text-base lg:text-2xl xl:text-3xl leading-relaxed text-gray-600 dark:text-gray-500">
        Own a Piece of {propertyName}: Invest Now, Reap the Benefits Forever
      </h1>
    </header>
  );
}

export default TradingHeader;
