import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTable } from "react-table";

function TransfersTable() {
  const { transfers = {} } = useSelector((state) => state.fetchData);
  const data = useMemo(() => transfers, [transfers]);

  const columns = useMemo(
    () => [
      {
        Header: "Created At",
        accessor: "created_at",
      },
      {
        Header: "Expected Settlment Date",
        accessor: "expected_settlement_date",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Amount",
        accessor: "amount",
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
