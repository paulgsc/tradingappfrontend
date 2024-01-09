import { useSelector } from "react-redux";
import { useFetchCoinbaseActions } from "../../hooks/reactQuery";
import CoinBaseScopes from "../ui/CoinBaseScopes";

function Step2() {
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const { data } = useFetchCoinbaseActions(token);
  return <CoinBaseScopes data={data} />;
}

export default Step2;
