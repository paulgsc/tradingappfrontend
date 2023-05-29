import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTable } from "react-table";

function TransfersTable() {
  const { history = [] } = useSelector((state) => state.fetchData);

  const data = useMemo(() => history, [history]);

  const columns = useMemo(
    () => [
      {
        Header: "Transaction",
        accessor: (row) =>
          row.recordType === "Transfer" ? row.recordType : row.transaction_type,
      },
      {
        Header: "Amount",
        accessor: (row) =>
          row.recordType === "Transfer" ? row.amount : row.order_amount,
      },
      {
        Header: "Created At",
        accessor: (row) => {
          const dateStr =
            row.recordType === "Transfer" ? row.created_at : row.purchase_date;
          if (!dateStr) {
            return "";
          }
          const dateObj = new Date(dateStr);
          const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
          };
          return new Intl.DateTimeFormat("en-US", options)?.format(dateObj);
        },
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex w-full">
        {headerGroups.map((headerGroup) => (
          <div
            className="flex justify-between w-full border-b"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <div
                className="flex justify-start items-center w-1/3 font-bold text-base"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full " {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <div className="flex justify-between w-full" {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <div
                  className="flex items-center justify-start lg:h-10 w-1/3 border-b border-gray-300 text-sm"
                  {...cell.getCellProps()}
                >
                  <span className="">{cell.render("Cell")}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TransfersTable;
