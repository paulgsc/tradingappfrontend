import React, { useEffect, useMemo } from "react";
import { useTable } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../contexts/redux/actions/fetchDataActions";

function OrderHistory() {
  const dispatch = useDispatch();
  const { history = [] } = useSelector((state) => state.fetchData);
  const data = useMemo(() => history, [history]);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "property.property_name",
        Column: ({ header }) => <div className="">{header.value}</div>,
        Cell: ({ cell }) => (
          <div
            className=""
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
        Cell: ({ cell, row }) => (
          <div
            className=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {row.original.transaction_type === "BUY" ? "+" : "-"}
            {cell.value}
          </div>
        ),
      },
      {
        Header: "Date",
        accessor: "purchase_date",
        Cell: ({ cell }) => {
          try {
            if (!cell.value) return <></>;
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
                className=""
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {new Intl.DateTimeFormat("en-US", options).format(dateObj)}
              </div>
            );
          } catch (error) {
            return <></>;
          }
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
                className="flex justify-start items-center w-1/3 font-bold text-base lg:text-xl xl:text-2xl"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 w-full " {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <div className="flex justify-between w-full" {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <div
                  className="flex items-center justify-start w-1/3 border-b border-gray-300 text-base lg:text-lg"
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

export default OrderHistory;
