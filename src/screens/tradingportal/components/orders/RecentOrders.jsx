import React from "react";
import { useSelector } from "react-redux";
import { fetchUserOrders } from "../../../../contexts/redux/actions/userActions";
import SkeletonLoading from "../../../../components/loading/SkeletonLoading";
import Table from "../../../../components/tables/Table";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ColumnFilter } from "../../../admin/TableModels";
import currency from "currency.js";
import { useEffect } from "react";

function RecentOrders() {
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const queryKey = ["user-orders"];
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      queryKey,
      async ({ pageParam = 1 }) => {
        return await fetchUserOrders(token, pageParam);
      },
      {
        getNextPageParam: (lastPage) => {
          // Check if there's a "next" URL in the response, and return the page number
          // for the next page if it exists, otherwise return null to stop fetching.
          return lastPage.next ? lastPage.next.split("=")[1] : null;
        },
      }
    );
  let orders = [];

  try {
    const financialsData =
      data?.pages?.flatMap((page) => page?.paginated_orders?.results) || [];

    if (Array.isArray(financialsData) && !financialsData.includes(undefined)) {
      orders = financialsData;
    }
  } catch (error) {}

  const handleScroll = () => {
    const elements = document.getElementsByClassName("your-class-name");
    const container = elements.length > 0 ? elements[0] : null;

    // Check if the user has scrolled to the bottom of the container
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
      fetchNextPage();
    }
  };

  const columns = [
    {
      Header: "Property",
      accessor: (row) => row?.original?.property?.property_name,
      Cell: ({ row }) => {
        return (
          <div className="grid grid-cols-1 text-xs xl:text-sm">
            <span>{row?.original?.property?.property_name}</span>
            <span className=" text-center">
              {row?.original?.property?.property_address}
            </span>
          </div>
        );
      },
    },

    {
      Header: "Amount",
      accessor: "order_amount",
      Cell: ({ row }) => {
        return (
          <div className="grid grid-cols-1 p-2">
            <span className="font-normal xl:text-lg">{`${
              row?.original?.order_type === "BUY" ? "+" : "-"
            }${currency(row?.original?.order_amount).format()}`}</span>
            <span className="text-center font-thin">{`${row?.original?.order_shares_total} shares`}</span>
          </div>
        );
      },
    },
    {
      Header: "Order date",
      accessor: "purchase_date",
    },
  ];

  const updatedColumns = columns.map((column) => {
    if (column.accessor === "purchase_date") {
      return {
        ...column,
        Cell: ({ row }) => {
          const dateStr = row.original.purchase_date;
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
          const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            options
          )?.format(dateObj);
          return <div className="text-xs">{formattedDate}</div>;
        },
      };
    }

    return {
      ...column,
    };
  });

  const getClassName = (componentType) => {
    switch (componentType) {
      case "table":
        return "ml-1 w-96 xl:w-full border-l rounded-t-lg ";
      case "header-row":
        return "flex xl:flex-1 w-full bg-stone-100 shadow-inner rounded-t-sm p-2";
      case "header":
        return "flex flex-1 text-sm xl:text-base font-semibold";
      case "tbody":
        return "h-96 w-full overflow-y-auto scroll-m-0 outline outline-gray-50";
      case "row":
        return "flex xl:flex-1 w-full  space-x-2 p-2 even:bg-stone-100 border-b border-neutral-300";
      case "cell":
        return "flex-1 flex items-center  h-8 text-sm xl:text-base font-normal hover:underline hover:text-emerald-500";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-1 justify-center ">
      <div className="w-full flex justify-center">
        {isLoading && token ? (
          <div className="w-4/5">
            <SkeletonLoading size={6} />
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            <Table
              history={orders}
              columnData={updatedColumns}
              ColumnFilter={ColumnFilter}
              getClassName={getClassName}
              showCheckboxColumn={false}
              handleScroll={handleScroll}
              tbodyId={"orders-table-container"}
            />
            {!orders.length && (
              <div className="flex flex-col items-center justify-center border shadow-sm w-full h-32 xl:h-40 bg-gray-50">
                <span className="text-sm xl:text-base leading-4 text-gray-600">
                  You have no orders
                </span>
                <span className="text-sm xl:text-base leading-4 text-gray-600">
                  Your recent orders will appear here.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentOrders;
