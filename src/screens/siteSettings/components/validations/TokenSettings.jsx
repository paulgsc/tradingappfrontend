import { useDispatch, useSelector } from "react-redux";
import { removeToast, showNotify } from "../../../../lib/utils";
import { useState } from "react";
import { useEffect } from "react";
import SettingsCard from "../ui/SettingsCard";
import Counter from "../ui/Counter";
import { updateConfigurationsSettings } from "../../../../contexts/redux/actions/adminActions";
import ToastAlerts from "../../../../components/ui/ToastAlerts";

function TokenSettings({ token_duration = 0, description, info }) {
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
  }, [error, successMessage, updateCount]);

  return (
    <SettingsCard description={description} info={info}>
      <Counter initial={token_duration} handleSubmit={updateTokenExpiry} />
    </SettingsCard>
  );
}

export default TokenSettings;
