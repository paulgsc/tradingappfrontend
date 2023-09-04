import { useState, useEffect } from "react";
import { getSheetsMetadata } from "../../hooks/reactQuery";

function LinkSheet() {
  const [sheetUrl, setSheetUrl] = useState("");
  const { refetch = () => {} } = getSheetsMetadata("", sheetUrl) || {};
  const handleChecked = (e) => {
    const checked = e.target.checked;
    if (checked) {
      const storedValue = localStorage.getItem("gsheet") || {};
      const { url = "" } = JSON.parse(storedValue);
      setSheetUrl(url);
    }
  };

  useEffect(() => {
    if (sheetUrl) {
      refetch();
    }
  }, [sheetUrl, refetch]);

  return (
    <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
      <label className="relative inline-flex items-center w-full cursor-pointer">
        <input
          type="checkbox"
          onChange={(e) => {
            handleChecked(e);
          }}
          value=""
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Link spreadsheet
        </span>
      </label>
    </div>
  );
}

export default LinkSheet;
