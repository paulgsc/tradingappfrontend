import React from "react";
import Table from "../../components/tables/Table";
import TableModels, { ColumnFilter } from "./TableModels";
import Forms from "./Forms";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

function PropertiesModel({ propertyData, handleRecordClick }) {
  const location = useLocation();
  const { recordId = null } = useSelector((state) => state.adminFetchData);
  const columns = [
    {
      Header: "Name",
      accessor: "property_name",
      Filter: ColumnFilter,
    },
    {
      Header: "Address",
      accessor: "property_address",
      Filter: ColumnFilter,
    },
    {
      Header: "Price per share",
      accessor: "price_per_share",
      Filter: ColumnFilter,
    },
    {
      Header: "Shares",
      accessor: "total_property_shares",
      Filter: ColumnFilter,
    },
    {
      Header: "Create date",
      accessor: "created_at",
      Filter: ColumnFilter,
    },
  ];

  const updatedColumns = columns.map((column) => {
    if (column.accessor === "created_at") {
      return {
        ...column,
        Cell: ({ row }) => {
          const dateStr = row.original.id;
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
      Cell: ({ row }) => (
        <div
          className="cursor-pointer hover:text-emerald-500"
          onClick={(e) => handleRecordClick(e, row.original.id, "properties")}
        >
          {row.original[column.accessor] || ""}
        </div>
      ),
    };
  });

  const getClassName = (componentType) => {
    switch (componentType) {
      case "header-row":
        return "flex justify-center w-full bg-[#79aec8] shadow-md";
      case "header":
        return "flex flex-col flex-col-reverse justify-center text-start w-11/12 text-base xl:text-lg text-white ";
      case "row":
        return "flex justify-center w-full";
      case "cell":
        return "flex items-center w-11/12 h-8 text-sm text-base font-bold text-[#447e9b] hover:underline";
      default:
        return "";
    }
  };
  console.log(location.pathname);
  return (
    <>
      {location.pathname ===
      `/admin/site/models/properties/${recordId}/record/form-view` ? (
        <div className="w-full">
          <Forms recordId={recordId} />
        </div>
      ) : location.pathname ===
        `/admin/site/models/properties/${-1}/record/form-view` ? (
        <div className="w-full">
          <Forms create={true} />
        </div>
      ) : (
        <div className="flex flex-col mx-auto px-2 w-9/12">
          <TableModels.Header />
          <div className="w-full mx-4">
            <Table
              history={propertyData}
              columnData={updatedColumns}
              ColumnFilter={ColumnFilter}
              getClassName={getClassName}
              showCheckboxColumn={true}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PropertiesModel;
