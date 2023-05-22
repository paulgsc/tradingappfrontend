import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlaceHolder from "../../components/loading/PlaceHolder";
import { useDispatch, useSelector } from "react-redux";
import {
  initiatePlaid,
  setTransferAmount,
} from "../../contexts/redux/actions/plaidActions";
import Spinner from "../../components/loading/Spinner";
import "./transfers.css";
import { fetchLinkedAccounts } from "../../contexts/redux/actions/fetchDataActions";
import { userLogoutPlaid } from "../../reducers/plaidAuthReducer";
import TransferKeyPad from "../../components/ui/TransferKeyPad";

function Index() {
  const { plaidInfo: { loading = false } = {} } = useSelector(
    (state) => state.plaid
  );
  const { linkedAccounts = [] } = useSelector((state) => state.fetchData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBack = (e) => {
    e.preventDefault();
    dispatch(setTransferAmount(""));
    dispatch(userLogoutPlaid());
    navigate("/personal");
  };

  useEffect(() => {
    dispatch(fetchLinkedAccounts());
    dispatch(initiatePlaid("transfer"));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div className="">
          <nav className="fixed top-0 z-50 w-full bg-transparent">
            <div className="flex items-center justify-start p-6">
              <button
                onClick={handleGoBack}
                className="flex items-center justify-center border border-gray-400 border-opacity-40 hover:border-opacity-80 rounded-lg p-2  text-gray-900 text-opacity-40 hover:text-opacity-100"
              >
                <PlaceHolder.Icon name="chevronLeft" />
                <span className=" ">Go back</span>
              </button>
            </div>
          </nav>
          <TransferKeyPad />
        </div>
      )}
    </>
  );
}

export default Index;
