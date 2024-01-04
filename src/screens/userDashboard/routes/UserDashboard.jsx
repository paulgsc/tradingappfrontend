import { useSelector } from "react-redux";
import { getUserBalance } from "../../tradingportal/components/hooks/reactQuery";
import DashboardLayout from "../components/ui/DashboardLayout";
import Navbar from "../components/ui/Navbar";
import NavLayout from "../../../components/ui/NavLayout";
import useCoinbaseExchangeToken from "../hooks/useCoinBaseExchangeToken";
import { useLocation } from "react-router";
import CoinbaseAuthCard from "../components/ui/CoinbaseAuthCard";

function UserDashboard() {
  const location = useLocation();
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  useCoinbaseExchangeToken(token);

  const { isLoading: userBalanceLoading } = getUserBalance(token);

  if (location.pathname === "/personal/dashboard/coinbase/oauth/callback")
    return <CoinbaseAuthCard />;

  return (
    <div className="block w-full">
      <NavLayout>
        <Navbar />
      </NavLayout>
      <DashboardLayout />
    </div>
  );
}

export default UserDashboard;
