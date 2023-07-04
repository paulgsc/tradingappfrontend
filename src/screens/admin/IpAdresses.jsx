import React from "react";
import { Link } from "react-router-dom";
import Table from "../../components/tables/Table";
import { ColumnFilter } from "./TableModels";

function IpAdresses() {
  const columns = [
    {
      Header: "Device",
      accessor: "device_name",
      Filter: ColumnFilter,
    },
    {
      Header: "Address",
      accessor: "ip_address",
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
          const dateStr = row.original.created_at;
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
        return " flex justify-center w-full bg-[#79aec8] shadow-md pointer-events-none";
      case "header":
        return "flex flex-col flex-col-reverse justify-center text-start w-11/12 text-base xl:text-lg text-white pointer-events-none";
      case "row":
        return "flex justify-center w-full border-b shadow-sm";
      case "cell":
        return "flex items-center w-11/12 h-8 text-sm text-base font-bold text-[#447e9b] hover:underline";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-white md:block  border-r shadow-md">
      <Table
        history={propertyData}
        columnData={updatedColumns}
        ColumnFilter={ColumnFilter}
        getClassName={getClassName}
        showCheckboxColumn={true}
      />
    </div>
  );
}

const propertyData = [
  {
    id: 1,
    created_at: "01/01/23",
    device_name: "Windows desktop",
    ip_address: "12212121",
  },
  {
    id: 2,
    created_at: "01/01/23",
    device_name: "Windows desktop",
    ip_address: "12212121",
  },
  {
    id: 3,
    created_at: "01/01/23",
    device_name: "Windows desktop",
    ip_address: "12212121",
  },
  {
    id: 4,
    created_at: "01/01/23",
    device_name: "Mac desktop",
    ip_address: "12212121",
  },
];

export default IpAdresses;
