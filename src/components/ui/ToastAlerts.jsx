import React from "react";
import { CloseSvg } from "../../constants/svgs/Svg";

function ToastAlerts({ ...props }) {
  return <div {...props} />;
}

export default ToastAlerts;

ToastAlerts.Success = ({ removeToast, msg }) => (
  <div className="flex h-10 w-72 justify-between items-center">
    <div className="ml-3 text-sm font-normal">{msg}</div>
    <button
      type="button"
      onClick={removeToast}
      className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 "
      data-dismiss-target="#toast-success"
      aria-label="Close"
    >
      <span className="sr-only">Close</span>
      <CloseSvg />
    </button>
  </div>
);
