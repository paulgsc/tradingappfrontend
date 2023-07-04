import React from "react";
import { Link } from "react-router-dom";
import Table from "../../components/tables/Table";
import { ColumnFilter } from "./TableModels";

function ModelSideBar() {
  const models = [
    {
      id: 1,
      title: "Properties",
    },
    {
      id: 2,
      title: "PropertyImages",
    },
    {
      id: 3,
      title: "Trade",
    },
  ];

  const columns = [
    {
      Header: "App Models",
      accessor: "title",
      Cell: ({ cell }) => (
        <Link to={`/admin/site/models/${cell.value.toLowerCase()}`}>
          {cell.value}
        </Link>
      ),
      Filter: ColumnFilter,
    },
  ];
  const getClassName = (componentType) => {
    switch (componentType) {
      case "header-row":
        return " flex justify-center w-full bg-[#79aec8] shadow-md pointer-events-none";
      case "header":
        return "flex flex-col flex-col-reverse justify-center text-start w-11/12 text-base xl:text-lg text-white pointer-events-none";
      case "row":
        return "flex justify-center w-full";
      case "cell":
        return "flex items-center w-11/12 h-8 text-sm text-base font-bold text-[#447e9b] hover:underline";
      default:
        return "";
    }
  };

  return (
    <aside className="z-50 bg-white md:block sticky left-0 h-screen w-56 xl:w-72 border-r shadow-md">
      <Table
        history={models}
        columnData={columns}
        ColumnFilter={ColumnFilter}
        getClassName={getClassName}
      />
    </aside>
  );
}

export default ModelSideBar;
