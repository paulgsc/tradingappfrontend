import { useParams } from "react-router";
import CheckboxDropdown from "../ui/CheckboxDropdown";
import { useSelector } from "react-redux";
import { getModelData } from "../../hooks/reactQuery";
import { useState } from "react";

function SetFields() {
  const { model } = useParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const {
    data: { results: { fields = [] } = {} },
  } = getModelData(token, model.toLowerCase(), { page: 1 });

  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleCheckboxChange = (idx, item) => {};
  return (
    <CheckboxDropdown btnTitle={"Change headers"}>
      {fields.map((item, i) => (
        <li key={item}>
          <div className="flex items-center pl-2 rounded hover:bg-gray-100">
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
              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded"
            >
              {item}
            </label>
          </div>
        </li>
      ))}
    </CheckboxDropdown>
  );
}

export default SetFields;
