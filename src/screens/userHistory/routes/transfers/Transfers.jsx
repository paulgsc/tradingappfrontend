import Navbar from "../../components/ui/Navbar";
import TransferHistory from "../../pages/transfers/TransferHistory";

function Transfers() {
  return (
    <div className="w-full">
      <section className="w-full sticky top-0 z-50 bg-white">
        <Navbar />
      </section>

      <TransferHistory />
    </div>
  );
}

export default Transfers;
