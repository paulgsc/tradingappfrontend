import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import TwoFactorOptionToggle from "./TwoFactorOptionToggle";
import CreateTwoFA from "./CreateTwoFA";
import { useDispatch, useSelector } from "react-redux";
import { unEnrollMultiFactor } from "../../../../../../hooks/firebase-hooks";
import { notify } from "../../../../../../lib/utils";
import { broadcastLogout } from "../../../../../../contexts/redux/actions/userActions";

function ToggleTwoFactor({ currentUser }) {
  const storedValue = true;
  const [checked, setChecked] = useState(storedValue);
  const [recentSignIn, setRecentSignIn] = useState(null);
  const dispatch = useDispatch();
  const { userInfo: { gmailInfo: { lastSignInTime = "" } = {} } = {} } =
    useSelector((state) => state.userAuth);

  const recentLogin = () => {
    const now = new Date();
    const selectedTime = new Date(lastSignInTime);
    const timeDiffMinutes = Math.abs(now - selectedTime) / (1000 * 60);
    return timeDiffMinutes;
  };
  const triggerSignIn = (event) => {
    const { checked } = event.target;

    if (recentLogin() < 5) {
      setRecentSignIn(true);
      setChecked(checked);
      return;
    }
    setChecked(checked);
    localStorage.setItem("checked", checked);
    dispatch(broadcastLogout());
  };

  const toggleMultifactor = (event) => {
    const { checked } = event.target;
    setChecked(checked);

    if (recentLogin() < 5) {
      setRecentSignIn(true);
      setChecked(checked);
      try {
        currentUser && unEnrollMultiFactor(currentUser);
        notify("successful");
      } catch (error) {
        notify(error?.code);
      }
      return;
    }
  };

  useEffect(() => {
    const enrollTwoFA = () => {
      if (recentLogin() < 5) {
        setRecentSignIn(true);
        setChecked(localStorage.getItem("checked") === "true"); // Parse the stored value from localStorage as a boolean
        localStorage.removeItem("checked");
      }
    };

    enrollTwoFA(); // Call the function immediately

    // Cleanup function (optional)
    return () => {
      // Perform any necessary cleanup here
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {storedValue && checked && (
        <TwoFactorOptionToggle
          handleClick={toggleMultifactor}
          checked={checked}
        />
      )}
      {!storedValue && !checked && (
        <TwoFactorOptionToggle handleClick={triggerSignIn} checked={checked} />
      )}
      {!storedValue && checked && recentSignIn && (
        <CreateTwoFA currentUser={currentUser} />
      )}
      <Toaster />
    </div>
  );
}

export default ToggleTwoFactor;
