import NavLayout from "../../../../components/ui/NavLayout";
import Navbar from "../../components/ui/Navbar";
import TransferHistory from "../../pages/transfers/TransferHistory";

function Transfers() {
  return (
    <div className="w-full">
      <NavLayout>
        <Navbar />
      </NavLayout>

      <TransferHistory />
    </div>
  );
}

export default Transfers;
