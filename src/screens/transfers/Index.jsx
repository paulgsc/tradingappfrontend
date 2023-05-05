import React from "react";
import KeyPad from "../../components/ui/KeyPad";
import { Link, useNavigate } from "react-router-dom";
import PlaceHolder from "../../components/loading/PlaceHolder";
import { useDispatch, useSelector } from "react-redux";
import { setTransferAmount } from "../../contexts/redux/actions/plaidActions";
import Spinner from "../../components/loading/Spinner";

function Index() {
  const {
    plaidInfo: { loading },
  } = useSelector((state) => state.plaid);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBack = (e) => {
    e.preventDefault();
    dispatch(setTransferAmount(""));
    navigate(-1);
  };

  return (
    <>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div className="ht-container-100vh bg-blk">
          <div className="">
            <button onClick={handleGoBack} className=" transfer-back-btn">
              <div className="flex-col-container cl-wht ">
                <PlaceHolder.Icon name="chevronLeft" />
                <span className="cl-wht ">Go back</span>
              </div>
            </button>
          </div>
          <KeyPad />
        </div>
      )}
    </>
  );
}

export default Index;
