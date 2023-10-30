import { useSelector } from "react-redux";
import { getUserBalance } from "../../tradingportal/components/hooks/reactQuery";
import DashboardLayout from "../components/ui/DashboardLayout";
import Navbar from "../components/ui/Navbar";

function UserDashboard() {
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);

  const { isLoading: userBalanceLoading } = getUserBalance(token);
  return (
    <div className="block w-full">
      <section className="w-full sticky top-0 z-50 bg-white">
        <Navbar />
      </section>
      <DashboardLayout />
    </div>
  );
}

export default UserDashboard;
