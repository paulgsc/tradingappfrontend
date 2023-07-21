import React from "react";
import Table from "../../components/tables/Table";
import { ColumnFilter } from "./TableModels";
import { fetchSiteSettings } from "../../hooks/react-query";
import { useSelector } from "react-redux";

function IpAdresses() {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const {
    settings: { allowed_ip_addresses = "" } = {},
    isLoading,
    isError,
  } = fetchSiteSettings(token);

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
        Cell: () => <ActionMenu />,
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
        return "flex justify-center w-full h-14 bg-stone-100 shadow-md";
      case "header":
        return " flex items-center w-full px-2 text-center text-base xl:text-lg text-black font-semibold";
      case "row":
        return "flex items-center justify-center w-full h-14 border shadow-xs";
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

  const data = [...new Set(allowed_ip_addresses.split(","))].map((ip) => ({
    ip_address: ip.trim(),
  }));

  return (
    <div className="w-full mt-6 bg-white md:block  border-r shadow-md">
      <div className="h-20  w-full border border-neutral-200 shadow-sm rounded-sm bg-white">
        <h3 className="xl:text-xl font-bold p-4">Allowed Admin IP Adresses</h3>
      </div>
      <Table
        history={data}
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
  <div className="relative group">
    <div tabIndex={-1} className=" cursor-pointer">
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
    </div>
    <div className="hidden absolute right-8 -top-1 h-12 w-16 bg-white shadow-lg rounded-md group-focus-within:flex items-center justify-center z-50 scale-95 text-black hover:ring-1 hover:ring-red-400 hover:scale-100 hover:bg-gradient-to-br hover:from-pink-200 hover:to-red-400 hover:text-white cursor-pointer transition-all duration-200 ease-in-out">
      <button className="font-semibold">Delete</button>
    </div>
  </div>
);
export default IpAdresses;
