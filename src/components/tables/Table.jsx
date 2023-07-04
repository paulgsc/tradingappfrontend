import React, { useMemo } from "react";
import { useTable, useSortBy, useFilters, useRowSelect } from "react-table";
import { cn } from "../../lib/utils";

function Table({
  columnData,
  history,

  getClassName,
  handleScroll = () => {},
  showCheckboxColumn = false,
}) {
  const data = useMemo(() => history, [history]);

  const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
    return (
      <input
        type="text"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full px-2 py-1 text-sm rounded-md bg-gray-100 border-gray-300"
        placeholder={`Filter ${column.Header}`}
      />
    );
  };

  const columns = useMemo(() => {
    if (!showCheckboxColumn) {
      return [...columnData];
    }

    // Add the checkbox column at the beginning if showCheckboxColumn is true
    const checkboxColumn = {
      id: "selection",
      Header: ({ getToggleAllRowsSelectedProps }) => (
        <>
          <input
            type="checkbox"
            {...getToggleAllRowsSelectedProps({ indeterminate: "false" })}
          />
        </>
      ),
      Cell: ({ row }) => (
        <div>
          <input
            type="checkbox"
            {...row.getToggleRowSelectedProps()}
            indeterminate={
              row.isSelected && !row.isSomeSelected ? "true" : undefined
            }
          />
        </div>
      ),
      disableSortBy: true,
    };

    const columns = [checkboxColumn, ...columnData];

    return [checkboxColumn, ...columnData];
  }, [columnData, showCheckboxColumn]);

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useSortBy,
    useRowSelect // Add the useRowSelect hook for row selection
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className={getClassName("table")}>
      <div className="flex w-full  justify-center items-center">
        {headerGroups.map((headerGroup) => (
          <div
            className={`${getClassName("header-row")}`}
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <div
                className={`${getClassName("header")}`}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <i className="ml-1 fas fa-sort-down"></i>
                    ) : (
                      <i className="ml-1 fas fa-sort-up"></i>
                    )
                  ) : (
                    ""
                  )}
                </span>
                <div>{column.hasFilter ? column.render("Filter") : null}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {history.length ? (
        <div
          className={getClassName("tbody")}
          {...getTableBodyProps()}
          onScroll={handleScroll}
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div className={`${getClassName("row")}`} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <div
                    className={`${getClassName("cell")}`}
                    {...cell.getCellProps()}
                  >
                    <span className="m-2 w-full">{cell.render("Cell")}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <Table.EmptyBody />
      )}
    </div>
  );
}

Table.Headers = ({ className, ...props }) => (
  <div className={cn(className)} {...props} />
);

Table.EmptyBody = () => (
  <div className="flex flex-col items-center justify-center border shadow-sm w-full h-32 xl:h-40 bg-gray-50">
    <span className="text-sm xl:text-base leading-4 text-gray-600">
      You have no transfers
    </span>
    <span className="text-sm xl:text-base leading-4 text-gray-600">
      Link an account and add transfers
    </span>
  </div>
);

Table.SimulateWidget = ({ handleSimulate, transferId, transferStatus }) => (
  <div className=" relative w-full">
    <Dropdown
      icon={
        <div className=" relative rotate-90">
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
        </div>
      }
      menu={
        <ul className="absolute left-10 -top-4 py-2 rounded-md shadow-sm z-50">
          <li>
            <button
              onClick={() => handleSimulate(transferId, transferStatus)}
              className="block px-4 py-2 text-gray-800 rounded-md bg-orange-50 dark:text-white hover:bg-orange-100 hover:text-white dark:hover:bg-gray-700"
            >
              <TransferEvents transferStatus={transferStatus} />
            </button>
          </li>
        </ul>
      }
    />
  </div>
);

const TransferEvents = ({ transferStatus }) => (
  <div className="w-30">
    <div className="flex items-center justify-between w-40 gap-8 relative">
      <div className="bg-blue-400 flex items-center justify-center text-center text-sm text-white w-12 h-12 rounded-full after:absolute after:bg-black after:w-8 after:h-1 after:top-[50%] after:right-[50%]">
        {transferStatus}
      </div>
      <div className="bg-gray-900 flex items-center justify-center text-center text-sm text-white w-12 h-12 rounded-full before:absolute before:bg-black before:w-10 before:h-1 before:bottom-[42%] before:right-[30%]">
        {states[transferStatus]}
      </div>
    </div>
  </div>
);

const states = {
  pending: "posted",
  posted: "settled",
};

export default Table;
