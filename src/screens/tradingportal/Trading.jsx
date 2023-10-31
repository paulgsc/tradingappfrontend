import TradingHeader from "./components/ui/TradingHeader";
import NoFunds from "./components/alerts/transfer/NoFunds";
import TradingInfoLayout from "./layouts/TradingInfoLayout";
import Navbar from "./components/ui/Navbar";
import {
  getActivePropertyData,
  getUserBalance,
} from "./components/hooks/reactQuery";
import { useSelector } from "react-redux";
import SubmissionError from "./components/alerts/orders/SubmissionError";
import NavLayout from "../../components/ui/NavLayout";

function Trading() {
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const { isLoading: propertyLoading } = getActivePropertyData();
  const { isLoading: userBalanceLoading } = getUserBalance(token);

  return (
    <div className="">
      <NavLayout>
        <Navbar />
      </NavLayout>
      <main className="min-h-screen flex flex-col items-center justify-center w-full h-full ">
        <section className="relative flex flex-col w-full  h-full justify-center items-center px-4 border-gray-200 rounded-lg ">
          <TradingHeader />
          <hr className="  w-full mb-2" />

          <NoFunds isLoading={userBalanceLoading} token={token} />
          <SubmissionError />

          <TradingInfoLayout />
        </section>
      </main>
    </div>
  );
}

export default Trading;
