import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import "./PropertyTrade.css"; // import CSS file
import { clearOrderInfo, storeOrderInfo } from "../../reducers/tradingReducers";

function PropertyTrade() {
  const { propertyData = [] } = useSelector((state) => state.fetchData);
  const dispatch = useDispatch();
  const data = useMemo(() => propertyData, [propertyData]);
  const setNewTrade = (propertyId) => async (dispatch) => {
    await dispatch(clearOrderInfo());
    dispatch(
      storeOrderInfo({
        propertyId: propertyId,
      })
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "property_name",
        Cell: ({ cell }) => (
          <div onClick={() => dispatch(setNewTrade(cell.row.original.id))}>
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Address",
        accessor: "property_address",
        Cell: ({ cell }) => (
          <div onClick={() => dispatch(setNewTrade(cell.row.original.id))}>
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Property Value",
        accessor: "current_property_value",
        Cell: ({ cell }) => (
          <div onClick={() => dispatch(setNewTrade(cell.row.original.id))}>
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Trade",
        accessor: "id",
        Cell: ({ cell }) => (
          <button onClick={() => dispatch(setNewTrade(cell.value))}>
            Trade
          </button>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="property-table-container">
      {" "}
      {/* add a container div to apply styles to */}
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
    </div>
  );
}

export default PropertyTrade;
