import React, { useState } from "react";
import Table from "../../components/tables/Table";
import Forms from "./Forms";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router";
import { adminSelectedRecordId } from "../../reducers/adminFetchDataReducers";
import { Link } from "react-router-dom";
import { fetchPropertiesQuery } from "../../hooks/react-query";

function TableModels() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const { userInfo: { token = "", is_admin = false } = {}, error = null } =
    useSelector((state) => state.userAuth);
  const { recordId = null } = useSelector((state) => state.adminFetchData);
  const { properties, isLoading, isError } = fetchPropertiesQuery(token);

  const handleRecordClick = (e, propertyId) => {
    e.preventDefault();
    setSelectedPropertyId(propertyId);
    dispatch(adminSelectedRecordId(propertyId));
    localStorage.setItem("selectedPropertyId", propertyId);
    navigate(`/admin/site/models/${propertyId}/record/form-view`);
  };

  return (
    <div className="w-full flex mt-2">
      <TableModels.Models />
      {location.pathname === `/admin/site/models` && (
        <div className="flex flex-col mx-auto px-2 w-9/12">
          <TableModels.Header />
          <TableModels.Records
            propertyData={properties || []}
            handleRecordClick={handleRecordClick}
          />
        </div>
      )}
      {location.pathname ===
        `/admin/site/models/${recordId}/record/form-view` &&
        recordId && (
          <div className="w-full">
            <Forms recordId={recordId} />
          </div>
        )}
      {location.pathname === `/admin/site/models/${-1}/record/form-view` && (
        <div className="w-full">
          <Forms create={true} />
        </div>
      )}
    </div>
  );
}

TableModels.Header = () => (
  <div className="flex items-center justify-between w-full h-12 mx-4 border-b">
    <span className="p-2">Select property to change</span>
    <div className="flex gap-2">
      <button className="flex items-center text-center text-xs text-white gap-1 p-2 bg-blue-400 rounded-lg shadow-md">
        import
      </button>
      <button className="flex items-center text-center text-xs text-white gap-1 p-2 bg-blue-400 rounded-lg shadow-md">
        export
      </button>

      <button className="flex items-center text-center text-xs text-white gap-1 p-2 bg-blue-400 rounded-lg shadow-md">
        <Link to={`/admin/site/models/${-1}/record/form-view`}>
          <p>Add Property</p>
          <AddCircleOutlineIcon
            sx={{
              width: {
                xs: 16,
                sm: 20,
                md: 16,
                lg: 16,
              },
              height: {
                xs: 16,
                sm: 20,
                md: 16,
                lg: 16,
              },
            }}
          />
        </Link>
      </button>
    </div>
  </div>
);

TableModels.Models = () => {
  const models = [
    {
      id: 1,
      title: "Properties",
    },
    {
      id: 1,
      title: "Trade",
    },
  ];
  const columns = [
    {
      Header: "App Models",
      Cell: ({ row }) => (
        <Link to={"/admin/site/models"}>{row.original.title}</Link>
      ),
      Filter: ColumnFilter,
    },
  ];
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

  return (
    <aside className="md:block sticky left-0 h-screen w-56 xl:w-72 border-r shadow-md">
      <Table
        history={models}
        columnData={columns}
        ColumnFilter={ColumnFilter}
        getClassName={getClassName}
      />
    </aside>
  );
};

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      type="text"
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full px-2 py-1 text-sm rounded-md bg-gray-100 border-gray-300"
      placeholder={`Filter ${column.Header}`}
    />
  );
};

TableModels.Records = ({ propertyData, handleRecordClick }) => {
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
  const updatedColumns = columns.map((column) => ({
    ...column,
    Cell: ({ row }) => (
      <div
        className=" cursor-pointer hover:text-emerald-500"
        onClick={(e) => handleRecordClick(e, row.original.id)}
      >
        {row.original[column.accessor] || ""}
      </div>
    ),
  }));

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
  return (
    <div className="w-full mx-4">
      <Table
        history={propertyData}
        columnData={updatedColumns}
        ColumnFilter={ColumnFilter}
        getClassName={getClassName}
      />
    </div>
  );
};

export default TableModels;
