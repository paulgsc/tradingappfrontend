import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import SheetTabs from "../../gsheets/SheetTabs";
import { validateSheetRange } from "../../../hooks/reactQuery";
import { useState } from "react";

function Step3({ setShowContinue }) {
  const sheetName = useRef("");
  const dataRange = useRef("");
  const sheetId = useRef(null);
  const [sheetUrl, setSheetUrl] = useState("");
  const { data, refetch = () => {} } = validateSheetRange(
    "",
    sheetUrl,
    `'${sheetName.current}'!${dataRange.current}`
  );
  const handleRangeInput = (e) => {
    e.preventDefault();
    const validSheetRangePattern = /^([A-Z]+\d+:[A-Z]+\d+|[A-Z]+:[A-Z]+)$/i;
    const isValid = validSheetRangePattern.test(e.target.value);
    if (isValid) {
      dataRange.current = e.target.value;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (sheetName.current && dataRange.current) {
      const storedValue = localStorage.getItem("gsheet");
      const { url = "" } = JSON.parse(storedValue);
      setSheetUrl(url);
      if (storedValue) {
        const gsheet = {
          ...JSON.parse(storedValue),
          sheet: sheetName.current,
          range: dataRange.current,
          sheetId: sheetId.current,
        };
        localStorage.setItem("gsheet", JSON.stringify(gsheet));
      }

      return;
    }
    if (!dataRange.current) {
      const msg = "range must be valid format: (A:A, c11:f20: etc).";
      toast.error(msg, {
        duration: 5000,
        position: "top-center",
        className: "bg-gradient-to-r from-pink-100 to-red-500 text-xs",
      });
      return;
    }
    if (!sheetName.current) {
      const msg = "sheet name must be 50 char or less.";
      toast.error(msg, {
        duration: 5000,
        position: "top-center",
        className: "bg-gradient-to-r from-pink-100 to-red-500",
      });
      return;
    }
  };

  useEffect(() => {
    if (dataRange.current && sheetName.current && sheetUrl) {
      refetch();

      return;
    } else {
      setShowContinue(false);
    }
  }, [sheetUrl, refetch, setShowContinue]);

  useEffect(() => {
    if (data === "Range verified") {
      setShowContinue(true);
    }
  }, [data, setShowContinue]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 w-full inline-flex items-center space-x-2">
        <h1 className="font-bold">Specify the data range</h1>
        <input
          type="text"
          id="sheet"
          className="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Sheet1"
          disabled
          value={
            (sheetName.current &&
              `'${sheetName.current}'!${dataRange.current}`) ||
            ""
          }
        />
      </div>
      <SheetTabs sheetName={sheetName} sheetId={sheetId} />
      <div className="mb-6">
        <label
          htmlFor="data-range"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Data range
        </label>
        <input
          type="text"
          id="data-range"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="A:D"
          required
          onChange={handleRangeInput}
        />
      </div>

      <button
        type="submit"
        className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default Step3;
