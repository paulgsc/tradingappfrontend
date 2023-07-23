import React from "react";
import { fetchUserBalance } from "../../hooks/react-query";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NoFunds() {
  const { userInfo: { token = "" } = {} } = useSelector(
    (state) => state.userAuth
  );
  const { balance = {}, isLoading, isError } = fetchUserBalance(token);

  return (
    <>
      {!balance?.transfer_remaining && (
        <div className="sticky top-14 grid lg:grid-cols-3 xl:grid-cols-7 gap-4 mb-4 w-full">
          <div className=" lg:col-span-2 xl:col-span-4 invisible">
            <div className="flex items-center justify-center rounded bg-gray-50 h-4/5 dark:bg-gray-800">
              <p className="text-sm text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div>

          <div className="lg:col-span-1 xl:col-span-2 w-full">
            <div className="flex items-center justify-center rounded bg-gray-50 w-full h-min dark:bg-gray-800">
              <div className="w-full rounded-full m-0 px-1 py-0 bg-blue-100 border-t border-b border-blue-500 text-blue-700 flex items-center justify-center">
                <div className="">
                  <svg
                    className=" fill-current h-4 w-4 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div className="flex justify-center items-center">
                  <p className="font-semibold text-xs xl:text-base">
                    Transfer Funds To Trade
                  </p>
                  <Link
                    className="p-0  m-0 text-sm xl:text-base mx-2 bg-gray-100 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded py-0 xl:py-2 px-4 mt-2 md:mt-0"
                    to="/personal/banking"
                  >
                    <span className="">Transfer</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NoFunds;
