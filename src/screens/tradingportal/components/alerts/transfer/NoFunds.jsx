import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SkeletonLoading from "../../../../../components/loading/SkeletonLoading";
import { fetchUserBalance } from "../../../../../contexts/redux/actions/userActions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function NoFunds() {
  const location = useLocation();
  const redirect = location.pathname;
  const { userInfo: { token = null } = {} } = useSelector(
    (state) => state.userAuth
  );
  const queryKey = ["user-balance"];
  const {
    data: { transfer_remaining = 0 } = {},
    isLoading,
    isError,
    refetch,
  } = useQuery(
    queryKey,
    async () => {
      return await fetchUserBalance(token);
    },
    {
      enabled: !!token,
    }
  );
  const queryClient = useQueryClient();

  const clearCache = () => {
    queryClient.invalidateQueries("user-balance");
    queryClient.clear();
  };

  useEffect(() => {
    clearCache();

    refetch();
  }, [token]);

  if (isLoading && token) {
    return (
      <div className="w-full scale-75 blur-sm">
        <SkeletonLoading size={0} />
      </div>
    );
  }

  return (
    <>
      {transfer_remaining <= 0 && (
        <div className="flex flex-1 w-full">
          <div className="flex items-center justify-center rounded bg-gray-50 w-full h-min ">
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
                <p className="font-semibold text-xs xl:text-sm">
                  {token ? "Transfer Funds To Trade" : "Login to Trade"}
                </p>
                <Link
                  className="p-0  m-0 text-sm  mx-2 bg-gray-100 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded py-0 xl:py-2 px-4 mt-2 md:mt-0"
                  to={
                    token ? "/personal/banking" : `/login?redirect=${redirect}`
                  }
                >
                  <span className="">{token ? "Transfer" : "Login"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NoFunds;
