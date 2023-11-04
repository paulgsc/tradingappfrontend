import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { adminStageCronChanges } from "../../../../reducers/adminActionsReducers";
import EditInputField from "../../../../components/ui/EditInputField";

function InputField({ value = "", label = "label", field, placeholder }) {
  const [input, setInput] = useState(value);
  const dispatch = useDispatch();
  const { editedCronFields = {} } = useSelector((state) => state.adminActions);

  const handleInput = (e) => {
    setInput(e.target.value);
    const stagedChange = {
      ...editedCronFields,
      [field]: e.target.value,
    };
    dispatch(adminStageCronChanges(stagedChange));
  };

  useEffect(() => {
    if (value && !editedCronFields[field]) {
      setInput(value);
    }
  }, [value, editedCronFields, field, input]);

  return (
    <div className="w-full lg:max-w-xl xl:max-w-3xl">
      <label htmlFor="success" className="block mb-2 text-sm font-medium ">
        {label}
      </label>
      <div className="inline-flex items-center space-x-4 w-full">
        <input
          value={input}
          onChange={handleInput}
          required
          type="text"
          id="success"
          className={`valid:bg-green-50 border border-slate-400  text-sm rounded-lg hover:border-neutral-300 focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500`}
          placeholder={placeholder}
        />
        <EditInputField field={field} />
      </div>
    </div>
  );
}

export default InputField;
