import { useParams } from "react-router";
import SkeletonLoading from "../../../../../components/loading/SkeletonLoading";
import Table from "../../../../../components/tables/Table";

function HistoryTable({ data, columns, isLoading, isFetching, query }) {
  const { model } = useParams();

  const getClassName = (componentType) => {
    switch (componentType) {
      case "table":
        return "h-full border-l rounded-t-lg ";
      case "header-row":
        return "flex xl:flex-1 w-full bg-stone-50 shadow-inner rounded-t-sm p-2";
      case "header":
        return "flex flex-1 text-sm xl:text-base leading-6 font-semibold capitalize";
      case "tbody":
        return " w-full h-full outline outline-gray-50";
      case "row":
        return "flex xl:flex-1 w-full  space-x-2 p-2 border-b border-neutral-300";
      case "cell":
        return "flex-1 flex items-center  h-8 text-sm font-normal hover:underline hover:text-emerald-500";
      default:
        return "";
    }
  };

  return (
    <div className="h-full mb-6">
      {isLoading || isFetching ? (
        <div className="w-4/5">
          <SkeletonLoading size={6} />
        </div>
      ) : (
        <main className="h-fit">
          <Table
            history={data}
            columnData={columns}
            tbodyId={"orders-table-container"}
            getClassName={getClassName}
            globalFilter={query}
          />
          {!Array.isArray(data) ||
            (Array.isArray(data) && !data.length && (
              <div className="flex flex-col items-center justify-center border shadow-sm w-full h-32 xl:h-40 bg-gray-50">
                <span className="text-sm xl:text-base leading-4 text-gray-600">
                  There are no <strong>{model}&apos;s</strong> data records.
                </span>
                <span className="text-xs lg:text-sm leading-4 text-gray-600">
                  Once created they will appear here
                </span>
              </div>
            ))}
        </main>
      )}
    </div>
  );
}

export default HistoryTable;
