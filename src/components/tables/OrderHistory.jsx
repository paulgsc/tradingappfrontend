import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTable } from "react-table";
import "./orderhistory.css";
import { popupStyles } from "../../lib/utils";
import { useState } from "react";
import { useEffect } from "react";

function OrderHistory({ orders }) {
  const data = useMemo(() => orders, [orders]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "property_name",
        Column: ({ header }) => (
          <div className="shares-row-cell">{header.value}</div>
        ),
        Cell: ({ cell }) => (
          <div
            className="shares-row-cell"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Type",
        accessor: "transaction_type",
        Cell: ({ cell }) => (
          <div
            className="shares-row-cell"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Amount",
        accessor: "order_amount",
        Cell: ({ cell }) => (
          <div
            className="shares-row-cell"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Shares",
        accessor: "order_shares_total",

        Cell: ({ cell }) => (
          <div
            className="shares-row-cell"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Dividends",
        accessor: "income",
        Cell: ({ cell }) => (
          <div
            className="shares-row-cell"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Date",
        accessor: "purchase_date",
        Cell: ({ cell }) => {
          const dateObj = new Date(cell.value);
          const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
          };
          return (
            <div
              className="shares-row-cell"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {new Intl.DateTimeFormat("en-US", options).format(dateObj)}
            </div>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="shares-table">
      <div className="shares-table-header">
        {headerGroups.map((headerGroup) => (
          <div
            className="shares-table-row"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <div
                className="shares-table-cell txt-al-ct shares-row-cell"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="shares-table-row-group" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <div className="shares-table-row" {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <div className="shares-table-cell" {...cell.getCellProps()}>
                  <span className="shares-table-cell-text">
                    {cell.render("Cell")}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderHistory;
