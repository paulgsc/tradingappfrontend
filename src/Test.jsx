import React, { useState } from "react";
import ConfirmationPage from "./screens/tradingportal/components/dashboard/ConfirmationPage";
import BuyBtn from "./screens/tradingportal/components/buttons/BuyBtn";

function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-300 to-yellow-200 flex justify-center items-center py-20">
      <table className="w-96 h-96 animate-pulse bg-transparent">
        <thead className="h-4 bg-stone-100 shadow-inner rounded-t-lg p-2 space-x-2s">
          <tr className="">
            {Array(5)
              .fill()
              .map((_, i) => (
                <td key={i} className="h-4/5 rounded-full p-2"></td>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(5)
            .fill()
            .map((_, i) => (
              <tr key={i}>
                {Array(5)
                  .fill()
                  .map((item, i) => (
                    <td key={i}>foo foo</td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Test;
