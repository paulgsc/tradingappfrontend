import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import "./propertyshares.css";
import { popupStyles } from "../../lib/utils";
import { useState } from "react";
import { useEffect } from "react";
import { fetchOrderForProperty } from "../../contexts/redux/actions/fetchDataActions";
import OrderHistory from "./OrderHistory";

function PropertyShares({ sharesData }) {
  const data = useMemo(() => sharesData, [sharesData]);

  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "property_name",
        Cell: ({ cell }) => (
          <div
            className="shares-row-cell"
            onClick={() => {
              const element = document.getElementById("shares_orders_history");
              dispatch(fetchOrderForProperty(cell.row.original.id));
              setPopup(element);
              popupStyles(element);
            }}
          >
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Shares",
        accessor: "total_purchased_shares",
        Cell: ({ cell }) => (
          <div
            className="shares-row-cell"
            onClick={() => {
              const element = document.getElementById("shares_orders_history");
              dispatch(fetchOrderForProperty(cell.row.original.id));
              setPopup(element);
              popupStyles(element);
            }}
          >
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Amount",
        accessor: "total_purchased_amount",
        Cell: ({ cell }) => (
          <div
            className="shares-row-cell"
            onClick={() => {
              const element = document.getElementById("shares_orders_history");
              dispatch(fetchOrderForProperty(cell.row.original.id));
              setPopup(element);
              popupStyles(element);
            }}
          >
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Price",
        accessor: "price_per_share",
        Cell: ({ cell }) => (
          <div
            className="shares-row-cell"
            onClick={() => {
              const element = document.getElementById("shares_orders_history");
              dispatch(fetchOrderForProperty(cell.row.original.id));
              setPopup(element);
              popupStyles(element);
            }}
          >
            {cell.value}
          </div>
        ),
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
                className="shares-table-cell txt-al-ct"
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

export default PropertyShares;
