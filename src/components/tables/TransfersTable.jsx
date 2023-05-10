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
          return new Intl.DateTimeFormat("en-US", options).format(dateObj);
        },
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TransfersTable;
