import NavLayout from "../../../../components/ui/NavLayout";
import Navbar from "../../components/ui/Navbar";
import OrderHistory from "../../pages/orders/OrderHistory";

function Orders() {
  return (
    <div className="w-full">
      <NavLayout>
        <Navbar />
      </NavLayout>

      <OrderHistory />
    </div>
  );
}

export default Orders;
