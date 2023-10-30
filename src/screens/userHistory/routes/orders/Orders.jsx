import Navbar from "../../components/ui/Navbar";
import OrderHistory from "../../pages/orders/OrderHistory";

function Orders() {
  return (
    <div className="w-full">
      <section className="w-full sticky top-0 z-50 bg-white">
        <Navbar />
      </section>

      <OrderHistory />
    </div>
  );
}

export default Orders;
