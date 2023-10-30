import { useLocation } from "react-router";
import Orders from "./orders/Orders";
import Transfers from "./transfers/Transfers";

function MyHistory() {
  const location = useLocation();

  if (location.pathname.includes("/personal/myhistory/orders")) {
    return <Orders />;
  }
  if (location.pathname.includes("/personal/myhistory/transfers")) {
    return <Transfers />;
  }
}

export default MyHistory;
