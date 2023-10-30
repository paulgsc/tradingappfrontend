import RecentOrders from "./RecentOrders";

function OrdersColumns({
  handleCellClick,
  containerRef,
  token,
  orders,
  isLoading,
  lastRowRef,
}) {
  const CellWithClickHandler = ({ className, cellData, onClick }) => (
    <span className={className} onClick={() => onClick(cellData)}>
      {cellData}
    </span>
  );

  const columns = [
    {
      Header: "Property",
      Cell: ({ row }) => (
        <div className="grid grid-cols-1 text-xs xl:text-sm">
          <CellWithClickHandler
            cellData={row?.original?.property?.property_name}
            onClick={handleCellClick}
          />
          <CellWithClickHandler
            cellData={row?.original?.property?.property_address}
            onClick={handleCellClick}
          />
        </div>
      ),
    },
    {
      Header: "Amount",
      accessor: "order_amount",
      Cell: ({ row }) => (
        <CellWithClickHandler
          cellData={row.original.order_amount}
          onClick={handleCellClick}
        />
      ),
    },
    {
      Header: "Order date",
      accessor: "purchase_date",
      Cell: ({ row }) => (
        <CellWithClickHandler
          cellData={row.original.purchase_date}
          onClick={handleCellClick}
        />
      ),
    },
  ];
  return (
    <RecentOrders
      columns={columns}
      isLoading={isLoading}
      orders={orders}
      token={token}
      containerRef={containerRef}
      lastRowRef={lastRowRef}
    />
  );
}

export default OrdersColumns;
