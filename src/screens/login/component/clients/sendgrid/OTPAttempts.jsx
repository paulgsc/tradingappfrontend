import React from "react";
import CircularProgresBar from "../../../../../components/ui/CircularProgresBar";
import { useDispatch, useSelector } from "react-redux";
import { broadcastLogout } from "../../../../../contexts/redux/actions/userActions";

function OTPAttempts() {
  const dispatch = useDispatch();
  const { error = null } = useSelector((state) => state.userAuth);
  const regex = /(incorrect passcode)/i;
  const tooManyAttemptRegex = /too many incorrect attempts/i;
  const passcodeError = regex.test(error);
  const attempts = passcodeError ? error?.match(/you have\s(\d)\s/i)[1] : 0;
  if (tooManyAttemptRegex.test(error)) {
    dispatch(broadcastLogout());
  }
  return (
    <div
      className={`${
        !passcodeError ? "hidden scale-0 blur-md opacity-0" : "scale-95"
      } pointer-events-none transition-all ease-in-out duration-300   p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 `}
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">Incorrect passcode attempt</h3>
      </div>
      <div className="mt-2 mb-4 text-base text-black flex flex-1 items-center justify-between">
        <span>
          You have <strong>{attempts}</strong> attempts left
        </span>
        <CircularProgresBar
          radius={26}
          strokeColor={"#3498db"}
          percentage={(5 - (attempts || 0)) / 5}
        />
      </div>
    </div>
  );
}

export default OTPAttempts;
