import { useEffect } from "react";

function Step1({ setShowContinue }) {
  useEffect(() => {
    setShowContinue(true);
  }, []);
  return (
    <div>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Upload from spreadsheet Setup
      </h3>
      <div className="p-6 space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The following steps will allow you to link your google spreadsheet for
          automatic uploads to database. To successufully link your spreadsheet,
          follow the steps, start by clicking continue below.
        </p>
      </div>
    </div>
  );
}

export default Step1;
