import { useSelector } from "react-redux";
import { getUserBalance } from "../../tradingportal/components/hooks/reactQuery";
import DashboardLayout from "../components/ui/DashboardLayout";
import Navbar from "../components/ui/Navbar";
import NavLayout from "../../../components/ui/NavLayout";

function UserDashboard() {
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);

  const { isLoading: userBalanceLoading } = getUserBalance(token);
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
