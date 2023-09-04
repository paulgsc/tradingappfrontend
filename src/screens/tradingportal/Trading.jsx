import TradingHeader from "./components/ui/TradingHeader";
import NoFunds from "./components/alerts/transfer/NoFunds";
import TradingInfoLayout from "./layouts/TradingInfoLayout";
import Navbar from "./components/ui/Navbar";

function Trading() {
  return (
    <div className="">
      <section>
        <Navbar />
      </section>
      <main className="min-h-screen flex flex-col items-center justify-center w-full h-full ">
        <section className="relative flex flex-col w-full  h-full justify-center items-center px-4 border-gray-200 rounded-lg ">
          <TradingHeader />
          <hr className="  w-full mb-2" />

          <NoFunds />

          <TradingInfoLayout />
        </section>
      </main>
    </div>
  );
}

export default Trading;
