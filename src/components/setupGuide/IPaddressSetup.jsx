import React, { useState } from "react";
import Step from "../animation/Step";
import { useDispatch, useSelector } from "react-redux";
import { addIPAddress } from "../../contexts/redux/actions/adminActions";
import SkeletonLoading from "../loading/SkeletonLoading";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function IPaddressSetup({ step = 1, handleContinue }) {
  const dispatch = useDispatch();
  const { userInfo: { ip_address = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const {
    loading = false,
    error = null,
    successMessage = null,
  } = useSelector((state) => state.adminActions);
  const [additionalIPs, setAdditionalIPs] = useState(ip_address);
  const [isValid, setIsValid] = useState(true);
  const ipRegex =
    /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|^::1$|^(?:(?:[a-fA-F0-9]{1,4}:){6}(?:(?:25[0-5]|(?:2[0-4]|1?[0-9])?[0-9])\.?){4}|(?=(?:[a-fA-F0-9]{1,4}:){0,5}[a-fA-F0-9]{1,4}$)(([0-9a-fA-F]{1,4}:){1,5}|:)((:[0-9a-fA-F]{1,4}){1,5}:|:)((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.?){4}|(?=(?:[a-fA-F0-9]{1,4}:){0,3}[a-fA-F0-9]{1,4}$)([0-9a-fA-F]{1,4}:){0,4}:((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.?){4})$/;

  // Function to validate if the input is a valid IP address
  const isValidIP = (input) => {
    return ipRegex.test(input);
  };
  const handleInput = (e) => {
    e.preventDefault();
    if (!e.target.value.includes(ip_address)) {
      return;
    }
    const addresses = e.target.value.split(",");

    const invalidInput = addresses.find((address) => {
      return !isValidIP(address);
    });

    setIsValid(!invalidInput);
    setAdditionalIPs(e.target.value);
  };

  const addIPToSettings = () => {
    if (isValid && additionalIPs) {
      dispatch(addIPAddress(additionalIPs));
    }
  };

  useEffect(() => {
    if (successMessage) {
      handleContinue();
    }
  }, [error, successMessage]);
  return (
    <div>
      <div className="flex justify-between rounded p-8">
        <Step step={1} maxStep={3} currentStep={step} />
        <Step step={2} maxStep={3} currentStep={step} />
        <Step step={3} maxStep={3} currentStep={step} />
      </div>
      <div className="space-y-2 px-8">
        {stepsList(
          <Step1 />,
          <Step2
            additionalIPs={additionalIPs}
            isValid={isValid}
            handleInput={handleInput}
          />,
          <Step3
            handleAddIps={addIPToSettings}
            loading={loading}
            successMessage={successMessage}
            error={error}
          />
        ).find((_, i) => i + 1 === step)}
      </div>
    </div>
  );
}

const stepsList = (...Steps) => {
  return Steps;
};

const Step1 = () => {
  return (
    <div>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        New device setup
      </h3>
      <div className="p-6 space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          You've logged in as <b>admin</b> user in a <b>new device</b>. To
          <b> access</b> admin dashboard, you need to <b>add</b> the device{" "}
          <b>ip address</b> to the allowed ip address permission list. Continue
          with the next step to learn how to add the device ip address.
        </p>
      </div>
    </div>
  );
};

const Step2 = ({ additionalIPs, isValid, handleInput }) => {
  return (
    <div className="">
      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Device IP address -{" "}
        <small> to add more devices, separate by comma</small>
      </div>

      <textarea
        id="message"
        rows="3"
        className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  ${
          !isValid
            ? "focus:outline-none focus:ring-2 ring-red-600"
            : "focus:ring-blue-500 focus:border-blue-500"
        }`}
        placeholder="Write additional IP addresses here, separated by comma..."
        value={additionalIPs}
        onChange={handleInput}
      ></textarea>
    </div>
  );
};
const Step3 = ({ loading, successMessage, error, handleAddIps }) => {
  useEffect(() => {
    handleAddIps();
  }, []);
  return (
    <div>
      {loading ? (
        <SkeletonLoading size={3} />
      ) : successMessage ? (
        <div className="flex flex-col items-center gap-2 p-6 bg-[#FFFFEB] rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#059669] mx-auto h-11 rounded-full bg-[#D1FAE5] w-11"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-2xl font-medium">{successMessage}</span>
          <Link
            to={"/admin"}
            className="p-3 bg-[#4F46E5] rounded-lg w-full text-white"
          >
            Go to admin dashboard
          </Link>
        </div>
      ) : (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Error!</span> {error}
        </div>
      )}
    </div>
  );
};

export default IPaddressSetup;
