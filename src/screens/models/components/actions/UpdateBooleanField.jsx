import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EditInputField from "./EditInputField";
import { adminStageCronChanges } from "../../../../reducers/adminActionsReducers";
import SwitchBtn from "../../../../components/ui/SwitchBtn";

function UpdateBooleanField({ field, value = undefined, label = "" }) {
  const dispatch = useDispatch();
  const [switchState, setSwitchState] = useState(!!value);
  const { editedCronFields = {} } = useSelector((state) => state.adminActions);

  const handleSwitchToggle = (event) => {
    setSwitchState(event.target.checked);
    const stagedChange = {
      ...editedCronFields,
      [field]: !!event.target.checked,
    };
    dispatch(adminStageCronChanges(stagedChange));
  };

  useEffect(() => {
    if (editedCronFields[field] === undefined) {
      setSwitchState(!!value);
    }
  }, [value, editedCronFields, field]);
  return (
    <div className="inline-flex">
      <SwitchBtn
        handleChecked={handleSwitchToggle}
        checked={switchState}
        label={label}
      />
      <EditInputField field={field} />
    </div>
  );
}

export default UpdateBooleanField;
