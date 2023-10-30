import { useSelector } from "react-redux";
import Table from "../../../../components/tables/Table";
import { fetchUserHolding } from "../../hooks/reactQuery";
import HoldingItemCard from "../ui/HoldingItemCard";

function PortfolioData({ globalFilter, setGlobalFilter, getClassName }) {
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);
  const { data: { properties } = {} } = fetchUserHolding(token);
  const columns = [
    {
      Header: "property",
      accessor: "property_address",
    },
    {
      Header: "amount",
      accessor: "total_purchased_amount",
    },
    {
      Header: "earned",
      accessor: "dividend",
    },
  ];

  const updatedColumns = columns.map((column) => {
    return {
      ...column,
      Cell: ({ row }) => {
        const cellValue = row.original[column.accessor];

        return (
          <div className="w-full h-full cursor-pointer" onClick={() => {}}>
            <HoldingItemCard
              accessor={column.accessor}
              value={cellValue}
              row={row}
            />
          </div>
        );
      },
    };
  });

  if (!Array.isArray(properties) || properties.length < 1) {
    return (
      <div className="group flex items-center justify-start gap-12 px-4 pt-2 border-t transition-all duration-150 ease-in-out">
        <button
          className="px-6
         py-10 rounded-md bg-green-50 group-hover:bg-green-100 scale-90 group-hover:scale-95"
        >
          <svg
            className="h-4 w-4 2xl:h-6 2xl:w-6 text-gray-500 group-hover:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
        <p className="font-medium capitalize text-gray-500 group-hover:text-gray-700">
          add new holding
        </p>
      </div>
    );
  }

  return (
    <Table
      columnData={updatedColumns}
      history={properties || []}
      getClassName={getClassName}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      tbodyId={"orders-table-container"}
    />
  );
}

export default PortfolioData;
