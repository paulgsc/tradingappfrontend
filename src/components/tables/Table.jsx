import React, { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, useFilters, useRowSelect } from "react-table";
import { cn } from "../../lib/utils";

function Table({
  columnData,
  history,
  getClassName,
  handleScroll = () => {},
  showCheckboxColumn = false,
  getSelectedIds = () => {},
}) {
  const [selected, setSelected] = useState(false);
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
      width: "12%",
      Header: ({ getToggleAllRowsSelectedProps }) => (
        <div className={`${getClassName("check-box-header")}`}>
          <input
            type="checkbox"
            onClick={() => {
              setSelected(true);
            }}
            {...getToggleAllRowsSelectedProps({ indeterminate: "false" })}
          />
        </div>
      ),
      Cell: ({ row }) => (
        <div>
          <input
            type="checkbox"
            onClick={() => {
              setSelected(true);
            }}
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = tableInstance;

  useEffect(() => {
    if (selected) {
      setSelected(false);
      const selectedIds = selectedFlatRows.map((row) => row.original.id);
      getSelectedIds(selectedIds);
    }

    // Dispatch the selected row IDs to Redux using the action creator
  }, [selectedFlatRows]);
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

export default Table;
