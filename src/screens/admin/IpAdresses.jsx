import React from "react";
import Table from "../../components/tables/Table";
import { ColumnFilter } from "./TableModels";
import Dropdown from "../../components/ui/Dropdown";

function IpAdresses() {
  const columns = [
    {
      Header: "Device",
      accessor: "device_name",
      Filter: ColumnFilter,
      width: "100%",
    },
    {
      Header: "Address",
      accessor: "ip_address",
      Filter: ColumnFilter,
      width: "100%",
    },
    {
      Header: "Create date",
      accessor: "created_at",
      Filter: ColumnFilter,
      width: "100%",
    },
    {
      Header: "",
      accessor: "action_menu",
      width: "140px",
    },
  ];

  const updatedColumns = columns.map((column) => {
    if (column.accessor === "action_menu") {
      return {
        ...column,
        Cell: () => (
          <>
            <Dropdown
              getClassname={getClassName}
              icon={
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
              }
              menu={<ActionMenu />}
            />
          </>
        ),
      };
    }

    return {
      ...column,
      Cell: ({ row }) => (
        <div
          className=" cursor-pointer hover:text-emerald-500"
          onClick={(e) => {}}
        >
          {row.original[column.accessor] || ""}
        </div>
      ),
    };
  });

  const getClassName = (componentType) => {
    switch (componentType) {
      case "table":
        return "rounded-md";
      case "header-row":
        return "flex justify-center w-full bg-[#79aec8] shadow-md";
      case "header":
        return " flex w-full px-2 text-start text-base xl:text-lg text-white ";
      case "row":
        return "flex justify-center w-full border shadow-xs";
      case "cell":
        return " w-full px-2 flex items-center h-8 text-sm text-base font-bold text-[#447e9b] hover:underline";
      case "check-box-header":
        return " text-start";
      case "menu-container":
        return "absolute bg-white right-0 shadow-md border";
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

const ActionMenu = () => (
  <ul className="py-1">
    <li>
      <a
        href="#"
        className="block px-4 py-2 text-red-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        Delete
      </a>
    </li>
  </ul>
);
export default IpAdresses;
