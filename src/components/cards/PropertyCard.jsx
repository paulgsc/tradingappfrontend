import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

function PropertyCard({ item, handleSelect }) {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { envVariables: { VITE_APP_BACKEND_URL = "" } = {} } = useSelector(
    (state) => state.env
  );

  const { image = "" } = (item?.images || [])[0] || {};

  const imageUrl = import.meta.env.DEV
    ? `${import.meta.env.VITE_APP_DEVELOPMENT_URL}${image}`
    : `${VITE_APP_BACKEND_URL}${image}`;
  return (
    <div className=" max-w-md xl:max-w-2xl min-w-max flex-1 max-h-[600px] xl:max-h-[800px] min-h-max overflow-y-auto bg-inherit px-6 pt-6 pb-2 rounded-md shadow-sm border border-neutral-300 bo transform hover:scale-105 transition duration-500">
      <h3 className="mb-3 text-xl font-bold text-indigo-600">
        {item?.property_name}
      </h3>
      <div className="relative">
        <img
          className="w-full rounded-xl object-cover overflow-clip h-48 xl:h-[400px]"
          src={imageUrl}
          alt="Colors"
        />
        <p
          className={`${
            item?.is_active ? "bg-lime-300" : "bg-yellow-100"
          } absolute top-0 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg`}
        >
          {item?.is_active ? "Active" : "Archived"}
        </p>
      </div>
      <h1 className="mt-4 text-gray-800 text-base xl:text-lg font-bold cursor-pointer">
        {item?.property_address}
      </h1>
      <span className="capitalize font-thin text-sm xl:text-base">{`${item?.city}, ${item?.state} ${item?.zip_code}`}</span>
      <div className="my-2">
        <button
          onClick={() => {
            handleSelect(item?.id);
            navigate(redirect);
          }}
          className="mt-4 text-base xl:text-lg w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg"
        >
          Select Property
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;
