import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useSortBy, useFilters } from "react-table";
import Dropdown from "../ui/Dropdown";
import { simulateTransferEvent } from "../../contexts/redux/actions/plaidActions";
import Spinner from "../loading/Spinner";
import { useState } from "react";

function TransfersTable() {
  const [chosenRow, setChosenRow] = useState(null);
  const dispatch = useDispatch();
  const { history = [] } = useSelector((state) => state.fetchData);
  const { loading, loadingRequest = false } = useSelector(
    (state) => state.plaid
  );

  const data = useMemo(() => history, [history]);

  const handleSimulate = (transferId, transferStatus) => {
    setChosenRow(transferId);
    const eventData = {
      transfer: transferId,
      event: states[transferStatus],
      failure_reason: "",
    };
    console.log(eventData);
    dispatch(simulateTransferEvent(eventData));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Status",
        accessor: (row) =>
          row.recordType === "Transfer" ? row.status : row.transaction_type,
        Filter: ColumnFilter,
      },
      {
        Header: "Amount",
        accessor: (row) => {
          if (row.recordType === "Transfer") {
            const amount = parseFloat(row.amount);
            return row.type === "debit" ? "+" + amount : "-" + amount;
          } else {
            return row.order_amount;
          }
        },
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
      {
        Header: "Simulate",
        accessor: (row) => (
          <div className="w-full">
            {loadingRequest && row.id === chosenRow ? (
              <Spinner.Button />
            ) : (
              <TransfersTable.SimulateWidget
                transferId={row.id}
                handleSimulate={handleSimulate}
                transferStatus={row.status}
              />
            )}
          </div>
        ),
      },
    ],
    []
  );

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useSortBy
  );

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
                className="flex justify-start items-center w-1/3 font-bold text-base"
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
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {history.length ? (
        <div className="flex flex-col w-full " {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div
                className="flex justify-between w-full"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <div
                    className="flex items-center justify-start lg:h-10 w-full border-b border-gray-300 text-sm"
                    {...cell.getCellProps()}
                  >
                    <span className="w-full">{cell.render("Cell")}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <TransfersTable.EmptyBody />
      )}
    </div>
  );
}

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

TransfersTable.EmptyBody = () => (
  <div className="flex flex-col items-center justify-center border shadow-sm w-full h-32 xl:h-40 bg-gray-50">
    <span className="text-sm xl:text-base leading-4 text-gray-600">
      You have no transfers
    </span>
    <span className="text-sm xl:text-base leading-4 text-gray-600">
      Link an account and add transfers
    </span>
  </div>
);

TransfersTable.SimulateWidget = ({
  handleSimulate,
  transferId,
  transferStatus,
}) => (
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

export default TransfersTable;
