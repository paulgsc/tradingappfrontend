import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { adminSelectedRecordId } from "../../reducers/adminFetchDataReducers";
import { Link } from "react-router-dom";
import { fetchPropertiesQuery } from "../../hooks/react-query";
import PropertiesModel from "./PropertiesModel";
import ModelSideBar from "./ModelSideBar";
import TradeLayout from "./trade/TradeLayout";

function TableModels() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const { userInfo: { token = "", is_admin = false } = {}, error = null } =
    useSelector((state) => state.userAuth);
  const { properties, isLoading, isError } = fetchPropertiesQuery(token);

  const handleRecordClick = (e, propertyId, model) => {
    e.preventDefault();
    setSelectedPropertyId(propertyId);
    dispatch(adminSelectedRecordId(propertyId));
    localStorage.setItem("selectedPropertyId", propertyId);
    navigate(`/admin/site/models/${model}/${propertyId}/record/form-view`);
  };

  return (
    <div className="w-full flex mt-2">
      {location.pathname === `/admin/site/models` && <ModelSideBar />}
      {location.pathname.includes(`/admin/site/models/properties`) && (
        <>
          <aside className="hidden lg:block">
            <ModelSideBar />
          </aside>
          <PropertiesModel
            propertyData={properties || []}
            handleRecordClick={handleRecordClick}
          />
        </>
      )}

      {location.pathname.includes(`/admin/site/models/trade`) && (
        <TradeLayout />
      )}
    </div>
  );
}

TableModels.Header = () => (
  <div className="flex items-center justify-between w-full h-12 mx-4 border-b">
    <span className="text-neutral-600 font-medium text-base p-2">
      Select property to change
    </span>
    <div className="flex items-end gap-2">
      <button
        disabled
        className="w-20 h-8 flex justify-center items-center text-center text-xs text-white font-bold gap-1 p-2 my-1 enabled:bg-blue-600 disabled:bg-sky-300 hover:enabled:bg-stone-800 enabled:cursor-pointer rounded-lg shadow-md"
      >
        import
      </button>
      <button
        disabled
        className="w-20 h-8 flex justify-center items-center text-center text-xs text-white font-bold gap-1 my-1 p-2 enabled:bg-blue-600 disabled:bg-sky-300 hover:enabled:bg-stone-800 enabled:cursor-pointer rounded-lg shadow-md"
      >
        export
      </button>

      <button className="w-32 h-8 justify-center flex items-center text-center text-xs text-white font-semibold gap-1 p-2 my-1 enabled:bg-stone-800 enabled:hover:bg-blue-600 rounded-lg shadow-md">
        <Link
          className="flex items-center gap-2"
          to={`/admin/site/models/properties/${-1}/record/form-view`}
        >
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

export const ColumnFilter = ({ column }) => {
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

export default TableModels;
