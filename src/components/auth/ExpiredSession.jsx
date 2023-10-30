import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { broadcastLogout } from "../../contexts/redux/actions/userActions";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

function ExpiredSession() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleExit = () => {
    dispatch(broadcastLogout());
    queryClient.clear();
    window.location.href = "/";
  };

  const handlRefresh = () => {
    dispatch(broadcastLogout());
    queryClient.clear();
    navigate(`/login?redirect=${location.pathname}`);
  };

  useEffect(() => {
    setShowModal(true);
  }, []);
  return (
    <div className="min-h-screen fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-20">
      <div
        className={`transition-all duration-500 ease-in-out ${
          showModal ? "translate-y-0" : "opacity-0 translate-y-[-100px]"
        } shadow-lg rounded-lg z-[1055] w-96 h-60 bg-white flex flex-col justify-evenly items-center p-2`}
      >
        <div
          className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <span className="font-medium">Session Expired!</span> Login again to
          launch new session.
        </div>
        <div className="w-1/2 flex items-center gap-6 justify-center">
          <button
            onClick={() => {
              handlRefresh();
            }}
            className="text-base bg-blue-500 hover:bg-blue-600 ring-1 shadow-md rounded-lg text-white p-2"
          >
            Login
          </button>
          <button
            onClick={handleExit}
            className="text-base text-black font-semibold hover:text-white hover:bg-gray-800 hover:shadow-md rounded-lg p-2"
          >
            exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpiredSession;
