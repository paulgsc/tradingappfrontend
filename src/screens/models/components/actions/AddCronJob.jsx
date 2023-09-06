import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import SetInterval from "./SetInterval";
import { useState } from "react";
import { addGsheetCronJob } from "../../../../contexts/redux/actions/adminActions";
import Callout from "../../../../components/ui/Callout";

function AddCronJob({ setShowContinue }) {
  const { model } = useParams();
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const { jobId = null, error } = useSelector((state) => state.adminActions);
  const [selectedFrequency, setSelectedFrequency] = useState("");

  const handleFrequencyChange = (event) => {
    setSelectedFrequency(parseInt(event.target.value));
  };

  const createCronJob = () => {
    const storedValue = localStorage.getItem("gsheet");
    const {
      name = "",
      url = "",
      range = "",
      sheet = "",
      sheetId = null,
    } = JSON.parse(storedValue) || {};
    if (
      name &&
      url &&
      range &&
      sheet &&
      sheetId &&
      model &&
      selectedFrequency
    ) {
      const range_name = `'${sheet}'!${range}`;
      const data = {
        name: name,
        sheet_url: url,
        sheet_id: sheetId,
        data_range: range_name,
        model_name: model,
        frequency: selectedFrequency,
      };

      dispatch(addGsheetCronJob(data));
    }
  };
  const handleChecked = (e) => {
    if (e.target.checked) {
      createCronJob();
    }
  };
  useEffect(() => {
    if (jobId) {
      setShowContinue(true);
    }
  }, [jobId]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }

    const timer = setTimeout(() => {
      setShowError(false);
    }, 10000); // 10000 milliseconds (10 seconds)

    // Clear the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <>
      <li>
        <SetInterval
          handleFrequencyChange={handleFrequencyChange}
          selectedFrequency={selectedFrequency}
        />
      </li>
      <li>
        <div className="relative flex p-2 rounded hover:bg-gray-100 ">
          <label className="relative inline-flex items-center w-full cursor-pointer">
            <input
              onChange={handleChecked}
              type="checkbox"
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Add Cron task
            </span>
            {jobId && <p className=" flex-1 text-end px-6">&#x2714;</p>}
            {showError && (
              <span className="flex flex-1 items-center justify-end text-end px-6">
                <p className="items-center text-center  w-5 h-5 rounded-full text-semibold text-pink-200 bg-red-900 ">
                  &#x2718;
                </p>
              </span>
            )}
          </label>
          {showError && (
            <Callout
              className={
                "absolute z-50 top-0 max-w-[200px] w-fit -translate-y-full flex justify-center"
              }
              message={error}
            />
          )}
        </div>
      </li>
    </>
  );
}

export default AddCronJob;
