import { useNavigate, useParams } from "react-router";
import SkeletonLoading from "../../../../components/loading/SkeletonLoading";
import Table from "../../../../components/tables/Table";
import DateRange from "./DateRange";
import FileImportExport from "./FileImportExport";
import Pagination from "./Pagination";
import ThreeDots from "./ThreeDots";
import { getModelData } from "../../hooks/reactQuery";
import { useSelector } from "react-redux";
import SetFields from "../actions/SetFields";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function PaginatedResults({ globalFilter, setGlobalFilter }) {
  const navigate = useNavigate();
  const { model } = useParams();
  const [queryParameters] = useSearchParams();
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { envVariables: { VITE_APP_BACKEND_URL = "" } = {} } = useSelector(
    (state) => state.env
  );

  const {
    data: {
      next,
      previous,
      results: { data, fields = [], import_enabled, form_view_path } = {},
    },
    error,
    isLoading,
    isFetching,
    refetch,
  } = getModelData(token, model.toLowerCase(), {
    page: queryParameters.get("page") || 1,
    model_name: model,
  });

  const columns = [
    ...fields.slice(0, 6).map((field) => ({
      Header: field,
      accessor: field,
    })),
    {
      Header: " ", // Header title for the column (it's empty in this case)
      Cell: () => {
        // Destructure the "row" prop
        return (
          <button>
            <ThreeDots />
          </button>
        );
      },
    },
  ];

  const updatedColumns = columns.map((column) => {
    return {
      ...column,
      Cell: ({ row }) => {
        const cellValue = row.original[column.accessor];

        // Check if the cell value is a URL with a jpg, jpeg, or png extension
        const isImage = /property_images\/.*\.(jpg|jpeg|png)$/i.test(cellValue);

        if (isImage) {
          // If it's an image URL, render the image
          return (
            <div
              className="cursor-pointer hover:text-emerald-500"
              onClick={() => {
                form_view_path
                  ? navigate(
                      `/models/${model}/${form_view_path}?recordId=${row.original?.id}`
                    )
                  : navigate(
                      `/models/${model}/form-view?recordId=${row.original?.id}`
                    );
              }}
            >
              <img
                className=" bg-cover h-12 w-12 rounded-full"
                src={
                  import.meta.env.DEV
                    ? `${import.meta.env.VITE_APP_DEVELOPMENT_URL}${cellValue}`
                    : `${VITE_APP_BACKEND_URL}${cellValue}`
                }
                alt="Image"
              />
            </div>
          );
        } else {
          // If it's not an image URL, render the text
          return (
            <div
              className="cursor-pointer hover:text-emerald-500"
              onClick={() => {
                form_view_path
                  ? navigate(
                      `/models/${model}/${form_view_path}?recordId=${row.original?.id}`
                    )
                  : navigate(
                      `/models/${model}/form-view?recordId=${row.original?.id}`
                    );
              }}
            >
              {cellValue || ""}
            </div>
          );
        }
      },
    };
  });

  const getClassName = (componentType) => {
    switch (componentType) {
      case "table":
        return "h-full border-l rounded-t-lg ";
      case "header-row":
        return "flex xl:flex-1 w-full bg-stone-50 shadow-inner rounded-t-sm p-2";
      case "header":
        return "flex flex-1 text-sm xl:text-base font-semibold capitalize";
      case "tbody":
        return "h-96 w-full overflow-y-auto scroll-m-0 outline outline-gray-50";
      case "row":
        return "flex xl:flex-1 w-full  space-x-2 p-2 border-b border-neutral-300";
      case "cell":
        return "flex-1 flex items-center  h-8 text-sm xl:text-base font-normal hover:underline hover:text-emerald-500";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (data === undefined && error === null) {
      refetch();
    }
  }, [data, error, refetch]);

  return (
    <div className="flex flex-col flex-1 justify-center px-6 xl:px-12 py-6 h-full bg-white">
      <div className="w-full flex justify-center">
        {isLoading || isFetching ? (
          <div className="w-4/5">
            <SkeletonLoading size={6} />
          </div>
        ) : (
          <div className="flex flex-col flex-1 h-full space-y-4">
            <header className="flex items-center justify-between">
              <section className="inline-flex items-center space-x-12">
                <DateRange />
                <SetFields />
              </section>
              {!!import_enabled && <FileImportExport />}
            </header>
            <main className="">
              <Table
                columnData={updatedColumns}
                history={data || []}
                getClassName={getClassName}
                showCheckboxColumn={true}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                tbodyId={"orders-table-container"}
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
          </div>
        )}
      </div>
      <footer>
        <Pagination next={next} previous={previous} />
      </footer>
    </div>
  );
}

export default PaginatedResults;
