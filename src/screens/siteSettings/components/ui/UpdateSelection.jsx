import EditInputField from "../../../../components/ui/EditInputField";
import SelectionField from "./SelectionField";

function UpdateSelection() {
  return (
    <div className="inline-flex items-center space-x-6">
      <SelectionField />
      <EditInputField />
    </div>
  );
}

export default UpdateSelection;
