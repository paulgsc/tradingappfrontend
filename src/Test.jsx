import React, { useState } from "react";
import ConfirmationPage from "./screens/tradingportal/components/dashboard/ConfirmationPage";
import BuyBtn from "./screens/tradingportal/components/buttons/BuyBtn";

function Test() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-300 to-yellow-200 flex justify-center items-center py-20">
      <BuyBtn />
    </div>
  );
}

export default Test;
