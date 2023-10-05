import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { broadcastLogout } from "../../../../contexts/redux/actions/userActions";

import SuccessCard from "../../../../components/ui/SuccessCard";
import { useState } from "react";

function AdminRegisterSuccess() {
  const dispatch = useDispatch();
  const { createAdminResult } = useSelector((state) => state.adminActions);
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    let timeoutId;
    const logoutUser = () => {
      timeoutId = setTimeout(() => dispatch(broadcastLogout()), 15000);
    };

    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(countdown); // Stop the countdown when it reaches 0
      }
    }, 1000); // Update every 1 second (1000 milliseconds)

    logoutUser();
    return () => {
      clearTimeout(timeoutId);
      clearInterval(countdown);
    };
  }, [dispatch, createAdminResult, seconds]);
  return <SuccessCard timer={seconds} />;
}

export default AdminRegisterSuccess;
