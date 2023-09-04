import Pagination from "../ui/Pagination";
import Table from "../../../../components/tables/Table";
import ThreeDots from "../ui/ThreeDots";
import WorkFlowsNav from "../ui/WorkFlowsNav";
import { Link, useParams } from "react-router-dom";
import { getScheduledCronActions } from "../../hooks/reactQuery";
import SkeletonLoading from "../../../../components/loading/SkeletonLoading";
import { useSelector } from "react-redux";

function WorkFlows({ globalFilter, setGlobalFilter }) {
  const { model } = useParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const {
    data = [],
    isLoading,
    isFetching,
  } = getScheduledCronActions(token, {
    model_name: model,
  });

  const columns = [
    {
      Header: "col1",
      accessor: "id",
      width: "80%",
      Cell: ({ row }) => {
        return (
          <div className="flex flex-col flex-1 w-full p-2">
            <div className="flex items-center gap-2">
              {row.original.last_run_status === "success" ? (
                <p className=" text-end">&#x2714;</p>
              ) : (
                <p className="items-center text-center  w-5 h-5 rounded-full text-semibold text-pink-200 bg-red-900 ">
                  &#x2718;
                </p>
              )}
              <Link
                to={`/models/${model}/uploads/gsheets/cron/?jobId=${row.original.id}`}
              >
                <h3 className="text-base xl:text-lg font-semibold hover:underline hover:text-blue-600/80">
                  {`Upload ${row.original.model_name}`}
                </h3>
              </Link>
              <a
                href={row.original.sheet_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 italic text-sm xl:text-base font-semibold underline text-blue-600"
              >
                <span>{row.original.data_range}</span>
                <i className="fa fa-external-link fa-xs" aria-hidden="true"></i>
              </a>
            </div>
            <div className="inline-flex items-center space-x-4 ml-12">
              <span>{`last run #${row.original.last_run_id}: ${row.original.last_run_status}`}</span>
              <span
                className={`relative capitalize after:absolute after:top-[.65rem] after:ml-2 after:content-[''] after:h-2 after:w-2 after:rounded-full ${
                  !row.original.paused
                    ? "after:bg-lime-600"
                    : "after:bg-gray-400"
                }`}
              >
                {!row.original.paused ? "Active" : "Archived"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      width: "15%",
      Header: " ",
      accessor: "cron_schedule",
      Cell: ({ row }) => {
        return (
          <div className="inline-flex items-center h-full w-full space-x-2 text-sm text-center">
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"
              />
            </svg>{" "}
            <span>{`every ${row.original.cron_schedule}`}</span>
          </div>
        );
      },
    },
    {
      Header: " ",
      width: "5%",
      Cell: () => {
        // Destructure the "row" prop
        return (
          <button className="flex items-center w-full justify-center h-full text-center">
            <ThreeDots />
          </button>
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
      <WorkFlowsNav />
      <main className="">
        <Table
          columnData={columns}
          history={data}
          getClassName={getClassName}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          tbodyId={"orders-table-container"}
        />
        {!data.length && (
          <div className="flex flex-col items-center justify-center border shadow-sm w-full h-32 xl:h-40 bg-gray-50">
            <span className="text-sm xl:text-base leading-4 text-gray-600">
              There are no scheduled cron actions for this model
            </span>
            <span className="text-sm xl:text-base leading-4 text-gray-600">
              All actions will appear here.
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

export default WorkFlows;
