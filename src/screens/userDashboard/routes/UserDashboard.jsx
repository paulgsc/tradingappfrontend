import { useSelector } from "react-redux";
import { getUserBalance } from "../../tradingportal/components/hooks/reactQuery";
import DashboardLayout from "../components/ui/DashboardLayout";
import Navbar from "../components/ui/Navbar";
import NavLayout from "../../../components/ui/NavLayout";
import { useLocation } from "react-router";
import CoinbaseAuthCard from "../components/ui/CoinbaseAuthCard";
import CoinbaseSetup from "../pages/CoinbaseSetup";

function UserDashboard() {
  const location = useLocation();
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);

  const { isLoading: userBalanceLoading } = getUserBalance(token);

  if (location.pathname === "/coinbase/callback") return <CoinbaseAuthCard />;

  return (
    <>
      {location.pathname.includes("/coinbase/setup") && <CoinbaseSetup />}
      <div className="block w-full">
        <NavLayout>
          <Navbar />
        </NavLayout>
        <DashboardLayout />
      </div>
    </>
  );
}

export default UserDashboard;
