import { unpackObjects } from "../../../../../lib/utils";
import HistoryTable from "./HistoryTable";

function OrdersColumns({ data, isFetching, isLoading, query }) {
  const flattenedData = data.map((obj) =>
    Object.entries(obj).reduce(
      (acc, [key, val]) => ({
        ...acc,
        ...unpackObjects(key, val),
      }),
      {}
    )
  );

  const columns = [
    {
      Header: "Property Address",
      accessor: "property_address",
    },
    {
      Header: "amount",
      accessor: "order_amount",
    },
    {
      Header: "Dividend",
      accessor: "expected_dividends",
    },

    {
      Header: "Shares",
      accessor: "order_shares_total",
    },
    {
      Header: "Cost Basis",
      accessor: "price_per_share",
    },
    {
      Header: "order type",
      accessor: "order_type",
    },

    {
      Header: "Order Date",
      accessor: "purchase_date",
    },
  ];
  return (
    <HistoryTable
      columns={columns}
      data={flattenedData}
      isFetching={isFetching}
      isLoading={isLoading}
      query={query}
    />
  );
}

export default OrdersColumns;
