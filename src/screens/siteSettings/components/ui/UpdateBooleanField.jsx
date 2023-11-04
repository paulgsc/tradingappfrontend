import EditInputField from "../../../../components/ui/EditInputField";
import SwitchBtn from "../../../../components/ui/SwitchBtn";

function UpdateBooleanField() {
  return (
    <div className="inline-flex">
      <SwitchBtn />
      <EditInputField />
    </div>
  );
}

export default UpdateBooleanField;
