import HistoryTable from "./HistoryTable";

function TransferColumns({ data, isFetching, isLoading, query }) {
  const columns = [
    {
      Header: "amount",
      accessor: "amount",
    },
    {
      Header: "Type",
      accessor: "type",
    },

    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Transfer date",
      accessor: "created_at",
    },
    {
      Header: "Expected Settlement date",
      accessor: "expected_settlement_date",
    },
  ];
  return (
    <HistoryTable
      columns={columns}
      data={data}
      isFetching={isFetching}
      isLoading={isLoading}
      query={query}
    />
  );
}

export default TransferColumns;
