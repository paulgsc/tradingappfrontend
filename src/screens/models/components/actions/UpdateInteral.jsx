import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminStageCronChanges } from "../../../../reducers/adminActionsReducers";
import Selection from "../ui/Selection";
import { getCeleryIntervals } from "../../hooks/reactQuery";
import EditInputField from "./EditInputField";
import { useEffect } from "react";

function UpdateInteral({ field, value = "" }) {
  const dispatch = useDispatch();
  const [selectedFrequency, setSelectedFrequency] = useState(value);
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { editedCronFields = {} } = useSelector((state) => state.adminActions);
  const { data = [] } = getCeleryIntervals(token);
  const handleFrequencyChange = (event) => {
    setSelectedFrequency(parseInt(event.target.value) || 0);
    const stagedChange = {
      ...editedCronFields,
      [field]: parseInt(event.target.value) || 0,
    };
    dispatch(adminStageCronChanges(stagedChange));
  };

  useEffect(() => {
    if (editedCronFields[field] === undefined) {
      setSelectedFrequency(value);
    }
  }, [value, editedCronFields, field]);

  return (
    <div className="inline-flex items-center space-x-6">
      <Selection
        data={data}
        handleFrequencyChange={handleFrequencyChange}
        selectedFrequency={selectedFrequency}
      />
      <EditInputField field={field} />
    </div>
  );
}

export default UpdateInteral;
