import React from "react";
import { useDispatch } from "react-redux";
import { showSummaryPortal } from "../../../../reducers/tradingReducers";

function Goback() {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(
      showSummaryPortal({
        showSummaryPortal: false,
      })
    );
  };
  return (
    <button
      type="button"
      className="absolute top-0 right-0 peer scale-90 hover:scale-105 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
      data-modal-hide="defaultModal"
      onClick={handleCloseModal}
    >
      <svg
        aria-hidden="true"
        className="w-5 h-5 scale-90 peer-hover:scale-105"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Close modal</span>
    </button>
  );
}

export default Goback;
