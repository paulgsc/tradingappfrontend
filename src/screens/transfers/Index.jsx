import React, { useEffect } from "react";
import KeyPad from "../../components/ui/KeyPad";
import { Link, useNavigate } from "react-router-dom";
import PlaceHolder from "../../components/loading/PlaceHolder";
import { useDispatch, useSelector } from "react-redux";
import { setTransferAmount } from "../../contexts/redux/actions/plaidActions";
import Spinner from "../../components/loading/Spinner";
import "./transfers.css";
import { fetchLinkedAccounts } from "../../contexts/redux/actions/fetchDataActions";

function Index() {
  const {
    plaidInfo: { loading },
  } = useSelector((state) => state.plaid);
  const { linkedAccounts = [] } = useSelector((state) => state.fetchData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBack = (e) => {
    e.preventDefault();
    dispatch(setTransferAmount(""));
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchLinkedAccounts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div className="transfers__container">
          <div className="transfers__back-btn-container">
            <button onClick={handleGoBack} className=" ">
              <PlaceHolder.Icon name="chevronLeft" />
              <span className=" ">Go back</span>
            </button>
          </div>
          <KeyPad linkedAccounts={linkedAccounts} />
        </div>
      )}
    </>
  );
}

export default Index;
