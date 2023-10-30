import Pagination from "../../../models/components/ui/Pagination";
import TransferColumns from "./tables/TransferColumns";

function MyTransfers({
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
        <TransferColumns
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

export default MyTransfers;
