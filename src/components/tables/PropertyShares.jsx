import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { popupStyles } from "../../lib/utils";
import { fetchOrderForProperty } from "../../contexts/redux/actions/fetchDataActions";

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
    <div className="flex w-full">
      <div className="flex w-full">
        {headerGroups.map((headerGroup) => (
          <div className="flex w-full" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <div className="flex w-full" {...column.getHeaderProps()}>
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <div className="" {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <div className="" {...cell.getCellProps()}>
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

export default PropertyShares;
