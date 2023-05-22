import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import "./transfers.css";

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
    <div className="">
      <table {...getTableProps()} className="table ">
        <thead className="">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="flex items-center text-center justify-center"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="flex items-center gap-0 p-0 xl:p-2  border-b-2 border-gray-400 font-light text-base lg:text-2xl xl:text-4xl text-center"
                >
                  <span>{column.render("Header")}</span>
                  <span>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8  bg-tranparent"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <circle cx="10" cy="4" r="1.5" />
                      <circle cx="10" cy="10" r="1.5" />
                      <circle cx="10" cy="16" r="1.5" />
                    </svg>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="">
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
    </div>
  );
}

export default TransfersTable;
