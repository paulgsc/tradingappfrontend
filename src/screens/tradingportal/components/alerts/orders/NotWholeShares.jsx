import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCalloutAlert } from "../../../../../reducers/tradingReducers";
import Callout from "../../../../../components/ui/Callout";

function NotWholeShares() {
  const dispatch = useDispatch();
  const [showCallout, setShowCallout] = useState(false);
  const [count, setCount] = useState(0);
  const { callouts: { showNotWholeSharesAlert = false } = {} } = useSelector(
    (state) => state.trade
  );

  const toggleAlert = () => {
    dispatch(
      showCalloutAlert({
        showNotWholeSharesAlert: false,
      })
    );
  };

  useEffect(() => {
    if (showNotWholeSharesAlert) {
      setShowCallout(true);
      setCount((prevCount) => prevCount + 1);
    }
    const timeoutId = setTimeout(() => {
      setShowCallout(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showNotWholeSharesAlert]);

  useEffect(() => {
    if (count > 0) {
      toggleAlert();
    }
  }, [count]);

  useEffect(() => {
    if (showCallout) {
      setCount((prevCount) => prevCount + 1);
    }
  }, [showCallout]);

  return (
    <>
      {showCallout && (
        <Callout
          className={
            "absolute flex flex-1 top-0 right-0 -translate-y-6 w-3/5 scale-90"
          }
          message={"Can only trade whole shares!"}
        />
      )}
    </>
  );
}

export default NotWholeShares;
