import { useSelector } from "react-redux";
import { getCeleryIntervals } from "../../hooks/reactQuery";
import Selection from "../ui/Selection";

function SetInterval({ handleFrequencyChange, selectedFrequency }) {
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );

  const { data = [] } = getCeleryIntervals(token);

  return (
    <Selection
      data={data}
      handleFrequencyChange={handleFrequencyChange}
      selectedFrequency={selectedFrequency}
    />
  );
}

export default SetInterval;
