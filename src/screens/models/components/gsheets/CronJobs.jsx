import Table from "../../../../components/tables/Table";
import Pagination from "../ui/Pagination";
import { getActionTrace } from "../../hooks/reactQuery";
import { formatTimestamp } from "../../../../lib/utils";
import SkeletonLoading from "../../../../components/loading/SkeletonLoading";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function CronJobs({ setGlobalFilter, globalFilter }) {
  const [queryParameters] = useSearchParams();
  const { model } = useParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const {
    data: { trace = [] } = {},
    isLoading,
    isFetching,
  } = getActionTrace(token, {
    job_id: queryParameters.get("jobId"),
    model_name: model,
  });

  const columns = [
    {
      Header: "Col1",
      accessor: "id",
      width: "96%",
      Cell: ({ row }) => {
        return (
          <div className="flex items-center justify-between mx-6">
            <div className="flex items-center justify-start space-x-12 p-4">
              <section className="flex flex-col w-fit items-start gap-1">
                <span className="text-sm">
                  {`triggered via cron ${formatTimestamp(
                    row.original.execution_time
                  )}`}
                </span>
                <span className="w-fit font-semibold">paulgsc 44766da </span>
              </section>

              <section className="flex flex-col w-fit items-start gap-1">
                <span className="text-sm w-fit">status</span>
                <span className="w-fit font-semibold">
                  {row.original.status}
                </span>
              </section>
              <section className="flex flex-col w-fit items-start gap-1">
                <span className="text-sm w-fit">total duration</span>

                <span className="w-fit font-semibold">
                  {row.original.total_duration || "0s"}
                </span>
              </section>
              <section className="flex flex-col w-fit items-start gap-1">
                <span className="text-sm w-fit">billable time</span>
                <span className="w-fit font-semibold">1m</span>
              </section>
            </div>

            <div>
              <section className="flex flex-col w-fit items-start gap-1">
                <h4 className="font-semibold">Result</h4>
                <div className="inline-flex items-center space-x-2 ml-6">
                  {row.original.exception ? (
                    <>
                      <div tabIndex={-1} className="relative group">
                        <p
                          tabIndex={-1}
                          className="peer items-center text-center  w-5 h-5 rounded-full text-semibold text-pink-200 bg-red-900 cursor-pointer hover:outline hover:scale-105"
                        >
                          &#x2718;
                        </p>
                        <div
                          tabIndex={-1}
                          className="hidden scale-75 peer-focus-within:scale-90 group-focus-within:block focus-within:scale-95 transition-all duration-500 ease-in-out w-96 min-h-fit max-h-48 absolute -left-96 top-0 rounded-lg p-6 break-words overflow-y-auto bg-stone-100"
                        >
                          {row.original.exception}
                        </div>
                      </div>
                      <p className="text-xs">
                        process completed with exit code 1.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className=" flex-1 text-end">&#x2714;</p>
                      <p className="text-xs">
                        process completed with exit code 201.
                      </p>
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>
        );
      },
    },
  ];

  const getClassName = (componentType) => {
    switch (componentType) {
      case "table":
        return "h-full border-l rounded-t-lg ";
      case "hidden header-row":
        return "flex xl:flex-1 w-full bg-stone-50 shadow-inner rounded-t-sm p-2";
      case "header":
        return "hidden flex flex-1 text-sm xl:text-base font-semibold uppercase";
      case "tbody":
        return "h-96 w-full overflow-y-auto scroll-m-0 outline outline-gray-50";
      case "row":
        return "flex flex-1 w-full space-x-2 p-2 border-b border-neutral-300";
      case "cell":
        return "";
      default:
        return "";
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="col-span-10 w-full">
        <SkeletonLoading size={6} />
      </div>
    );
  }

  return (
    <div className=" col-span-10 w-full">
      <main className="">
        <Table
          columnData={columns}
          history={trace}
          getClassName={getClassName}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          tbodyId={"orders-table-container"}
        />
        {!trace.length && (
          <div className="flex flex-col  gap-1 items-center justify-center border shadow-sm w-full h-32 xl:h-40 bg-gray-50">
            <span className="text-sm xl:text-base leading-4 text-gray-600">
              No jobs have run yet.
            </span>
            <span className="text-sm xl:text-base leading-4 text-gray-600">
              The last 25 job actions will be stored and will appear here.
            </span>
          </div>
        )}
      </main>
      <footer>
        <Pagination />
      </footer>
    </div>
  );
}

export default CronJobs;
