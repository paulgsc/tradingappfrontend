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

function Trading() {
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const { isLoading: propertyLoading } = getActivePropertyData();
  const { isLoading: userBalanceLoading } = getUserBalance(token);

  return (
    <div className="">
      <section className="w-full sticky top-0 z-50">
        <Navbar />
      </section>
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
