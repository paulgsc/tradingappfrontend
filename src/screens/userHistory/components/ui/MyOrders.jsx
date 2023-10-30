import Pagination from "../../../models/components/ui/Pagination";

import OrdersColumns from "./tables/OrdersColumns";

function MyOrders({
  orders,
  hasNextPage,
  hasPreviousPage,
  isLoading,
  isFetching,
  query,
  numPages,
}) {
  return (
    <section className="w-full mx-auto mt-6 px-12">
      <article>
        <OrdersColumns
          data={orders}
          isFetching={isFetching}
          isLoading={isLoading}
          query={query}
        />
      </article>
      <footer>
        <Pagination
          data={orders}
          next={hasNextPage}
          previous={hasPreviousPage}
          numPages={numPages}
        />
      </footer>
    </section>
  );
}

export default MyOrders;
