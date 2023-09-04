import { useState } from "react";
import { getSheetsMetadata } from "../../hooks/reactQuery";
import CheckboxDropdown from "../ui/CheckboxDropdown";

function SheetTabs({ sheetName, sheetId }) {
  const storedValue = localStorage.getItem("gsheet");
  let sheetUrl;
  if (storedValue) {
    const { url = "" } = JSON.parse(storedValue);
    sheetUrl = url;
  }
  const { data = [] } = getSheetsMetadata("", sheetUrl) || {};

  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleCheckboxChange = (idx, item) => {
    setSelectedIdx(idx);
    sheetName.current = item?.title;
    sheetId.current = item?.sheetId;
  };
  return (
    <CheckboxDropdown btnTitle={"Tabs"}>
      {data.map((item, i) => (
        <li key={item?.sheetId}>
          <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <input
              id={`checkbox-item-${i}`}
              type="checkbox"
              value=""
              checked={selectedIdx === i}
              onChange={() => handleCheckboxChange(i, item)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor={`checkbox-item-${i}`}
              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
            >
              {item?.title}
            </label>
          </div>
        </li>
      ))}
    </CheckboxDropdown>
  );
}

export default SheetTabs;
