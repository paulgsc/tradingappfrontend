import React from "react";
import KeyPad from "../../components/ui/KeyPad";
import { Link, useNavigate } from "react-router-dom";
import PlaceHolder from "../../components/loading/PlaceHolder";

function Index() {
  const navigate = useNavigate();

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="ht-container-100vh bg-blk">
      <div className="">
        <button onClick={handleGoBack} className="btn-container-zero">
          <div className="flex-col-container left-margin-container-5 cl-wht ">
            <PlaceHolder.Icon name="chevronLeft" />
            <span className="cl-wht ">Go back</span>
          </div>
        </button>
      </div>
      <KeyPad />
    </div>
  );
}

export default Index;
