import React from "react";
import { useLocation } from "react-router";
import Table from "../../../../components/tables/Table";
import { useSelector } from "react-redux";
import { ColumnFilter } from "../../../admin/TableModels";
import { fetchUserOrders } from "../../../../contexts/redux/actions/userActions";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoading from "../../../../components/loading/SkeletonLoading";

function Orders() {
  const location = useLocation();
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const queryKey = ["user-orders"];
  const {
    data: { orders = [] } = {},
    isLoading,
    isError,
    refetch,
  } = useQuery(queryKey, async () => {
    return await fetchUserOrders(token);
  });

  const columns = [
    {
      Header: "Property",
      accessor: (row) => row?.property?.property_name,
    },
    {
      Header: "Address",
      accessor: (row) => row?.property?.property_address,
    },
    {
      Header: "Order Type",
      accessor: "order_type",
    },
    {
      Header: "Shares",
      accessor: "order_shares_total",
    },
    {
      Header: "Amount",
      accessor: "order_amount",
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
          return (
            <div
              className="cursor-pointer hover:text-emerald-500"
              onClick={(e) =>
                handleRecordClick(e, row.original.id, "properties")
              }
            >
              {formattedDate}
            </div>
          );
        },
      };
    }

    return {
      ...column,
    };
  });

  const getClassName = (componentType) => {
    switch (componentType) {
      case "header-row":
        return "flex justify-center w-full bg-stone-100 shadow-inner rounded-t-sm p-2";
      case "header":
        return "font-semibold";
      case "row":
        return "flex justify-center w-full p-2 even:bg-stone-100 border-b border-neutral-300";
      case "cell":
        return "flex items-center w-11/12 h-8 text-sm text-base font-normal hover:underline";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-1 justify-center">
      <div className="w-4/5 flex justify-center">
        {isLoading ? (
          <div className="w-4/5">
            <SkeletonLoading size={6} />
          </div>
        ) : (
          <Table
            history={orders}
            columnData={updatedColumns}
            ColumnFilter={ColumnFilter}
            getClassName={getClassName}
            showCheckboxColumn={false}
          />
        )}
      </div>
    </div>
  );
}
export default Orders;
