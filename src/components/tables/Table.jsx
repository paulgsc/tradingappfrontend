import { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useRowSelect,
  useGlobalFilter,
} from "react-table";
import { cn } from "../../lib/utils";
import { filter } from "lodash";

function Table({
  columnData,
  history,
  getClassName,
  handleScroll = () => {},
  showCheckboxColumn = false,
  getSelectedIds = () => {},
  globalFilter,
  setGlobalFilter,
}) {
  const data = useMemo(() => history, [history]);

  const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
    return (
      <div className="p-1 absolute inset-0 -translate-y-14 -translate-x-4 scale-105 h-fit">
        <label htmlFor="input-group-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            id="input-group-search"
            type="text"
            value={filterValue || ""}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
            placeholder={`Filter ${column.Header}`}
          />
        </div>
      </div>
    );
  };

  const columns = useMemo(() => {
    if (!showCheckboxColumn) {
      return [...columnData];
    }

    // Add the checkbox column at the beginning if showCheckboxColumn is true
    const checkboxColumn = {
      id: "selection",
      width: "12%",
      Header: ({ getToggleAllRowsSelectedProps }) => (
        <div className={`${getClassName("check-box-header")}`}>
          <input
            type="checkbox"
            onClick={() => {}}
            {...getToggleAllRowsSelectedProps({ indeterminate: "false" })}
          />
        </div>
      ),
      Cell: ({ row }) => (
        <div>
          <input
            type="checkbox"
            checked={row.isSelected}
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

  const rowIdsToSelect = data.map((row) => row.id);

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        globalFilter,
        selectedRowIds: { [rowIdsToSelect]: true },
      }, // Set initial global filter state
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect // Add the useRowSelect hook for row selection
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
  } = tableInstance;

  const selectedRowIds = useMemo(
    () => state.selectedRowIds,
    [state.selectedRowIds]
  );

  useEffect(() => {
    const selectedRowIdsArray = Object.keys(selectedRowIds)
      .filter((item) => !isNaN(parseInt(item)))
      .map((item) => parseInt(item));

    getSelectedIds(selectedRowIdsArray);
  }, [selectedRowIds, getSelectedIds]);

  return (
    <div className={getClassName("table")}>
      <div className="">
        {headerGroups.map((headerGroup) => (
          <div
            className={`${getClassName("header-row")}`}
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <div
                className={`${getClassName("header")}`}
                style={{ width: column.width }}
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <i className=" fas fa-sort-down"></i>
                    ) : (
                      <i className="fas fa-sort-up"></i>
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
                    {...cell.getCellProps({
                      style: {
                        width: cell.column.width,
                      },
                    })}
                  >
                    <span className="w-full">{cell.render("Cell")}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

Table.Headers = ({ className, ...props }) => (
  <div className={cn(className)} {...props} />
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

<div className="p-3">
  <label htmlFor="input-group-search" className="sr-only">
    Search
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
    <input
      type="text"
      id="input-group-search"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search user"
    />
  </div>
</div>;

export default Table;
