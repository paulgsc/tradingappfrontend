import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function ModalFooter() {
  const location = useLocation();
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const redirect = location.pathname;
  return (
    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
      <Link to={token ? "/personal/banking" : `/login/?redirect=${redirect}`}>
        <button
          data-modal-hide="defaultModal"
          type="button"
          className="text-sm xl:text-base text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {token ? " Transfer Funds" : "Login"}
        </button>
      </Link>
    </div>
  );
}

export default ModalFooter;
