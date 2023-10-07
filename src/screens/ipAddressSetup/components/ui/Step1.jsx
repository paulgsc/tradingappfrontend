import { useEffect } from "react";

function Step1({ setDisableContinue }) {
  useEffect(() => {
    setDisableContinue(false);

    return () => {
      setDisableContinue(true);
    };
  }, [setDisableContinue]);
  return (
    <div>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        New device setup
      </h3>
      <div className="p-6 space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          You&apos;ve logged in as <b>admin</b> user in a <b>new device</b>. To
          <b> access</b> admin dashboard, you need to <b>add</b> the device{" "}
          <b>ip address</b> to the allowed ip address permission list. Continue
          with the next step to learn how to add the device ip address.
        </p>
      </div>
    </div>
  );
}

export default Step1;
