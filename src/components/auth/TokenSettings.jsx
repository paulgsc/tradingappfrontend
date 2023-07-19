import React from "react";
import Counter from "../ui/Counter";
import { useDispatch, useSelector } from "react-redux";
import { updateConfigurationsSettings } from "../../contexts/redux/actions/adminActions";
import { Toaster } from "react-hot-toast";
import ToastAlerts from "../ui/ToastAlerts";
import { removeToast, showNotify } from "../../lib/utils";
import { useState } from "react";
import { useEffect } from "react";

function TokenSettings({ token_duration = 0 }) {
  const dispatch = useDispatch();
  const { error, successMessage } = useSelector((state) => state.adminActions);
  const [updateCount, setUpdateCount] = useState(0);

  const timeConversionToSeconds = (obj) => {
    const { units, duration } = obj;
    const conversion = {
      seconds: 1,
      minutes: 60,
      hours: 60 * 60,
      days: 60 * 60 * 24,
      weeks: 60 * 60 * 24 * 7,
    };
    return duration * conversion[units.toLowerCase()];
  };

  const updateTokenExpiry = (e, tokenExpiryObj) => {
    e.preventDefault();
    const tokenLifetime = timeConversionToSeconds(tokenExpiryObj);
    const formData = {
      token_expiration: tokenLifetime,
    };
    dispatch(updateConfigurationsSettings(formData));
    setUpdateCount((prevUpdateCount) => prevUpdateCount + 1);
  };

  useEffect(() => {
    if (error && updateCount) {
      showNotify(
        "error",
        "bg-gradient-to-r from-pink-100 to-red-500",
        <ToastAlerts.Success msg={error} removeToast={removeToast} />,
        "top-center"
      );
    }
    if (updateCount && successMessage) {
      showNotify(
        "success",
        "bg-gradient-to-r from-indigo-100 to-green-300",
        <ToastAlerts.Success msg={successMessage} removeToast={removeToast} />,
        "top-center"
      );
    }
  }, [error, successMessage]);

  return (
    <div className="w-full border shadow-md">
      <div className="w-full py-2 px-12 flex flex-1 justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg ">
            Set the duration until new login required
          </span>
          <div tabIndex={-1} className="relative group flex h-full">
            <span className="text-sm h-6 w-6 border rounded-full text-center italic bg-indigo-100 focus:ring-2 hover:bg-indigo-300 ring-indigo-300 cursor-pointer">
              i
            </span>
            <p className="hidden group-focus-within:block absolute right-0 top-12 border leading-normal text-center break-word w-72 p-2">
              after each login, authenticated user is assigned an access token
              with a given expiration. You can set the duration needed before a
              new login session is required.
            </p>
          </div>
        </div>
        <Counter initial={token_duration} handleSubmit={updateTokenExpiry} />
      </div>
      <Toaster />
    </div>
  );
}

export default TokenSettings;
