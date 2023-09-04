import { getCeleryIntervals } from "../../hooks/reactQuery";
import Selection from "../ui/Selection";

function SetInterval({ handleFrequencyChange, selectedFrequency }) {
  const { data = [] } = getCeleryIntervals();

  return (
    <Selection
      data={data}
      handleFrequencyChange={handleFrequencyChange}
      selectedFrequency={selectedFrequency}
    />
  );
}

export default SetInterval;
