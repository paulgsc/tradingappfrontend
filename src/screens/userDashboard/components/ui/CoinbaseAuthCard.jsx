import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WiggleLoader from "../../../../components/loading/WiggleLoader";
import useCoinbaseGetAccessToken from "../../hooks/useCoinBaseGetAccessToken";

function CoinbaseAuthCard({ timer }) {
  const { error, loading, accessTokenCreated } = useSelector(
    (state) => state.coinbaseActions
  );
  useCoinbaseGetAccessToken();

  return (
    <div className="fixed inset-0 min-h-screen bg-gradient-to-tr from-blue-500 to-indigo-100 flex justify-center items-center py-20">
      {loading ? (
        <WiggleLoader />
      ) : (
        <div className=" mx-auto p-5 border w-full max-w-lg h-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            {accessTokenCreated && (
              <h3 className="text-xl tracking-wide leading-6 font-semibold text-blue-600">
                Successfull
              </h3>
            )}
            {error && (
              <h3 className="text-xl tracking-wide leading-6 font-semibold text-amber-700">
                Error!
              </h3>
            )}
            <div className="mt-2 px-7 py-3">
              <p className="text-md text-gray-500">
                Login authentication{" "}
                <span className=" font-bold">
                  {error ? "failed" : "successful"}
                </span>
                .
              </p>
            </div>
            {accessTokenCreated && (
              <>
                <div className="items-center px-4 py-3">
                  <Link
                    to={"/"}
                    className="px-4 py-2 bg-blue-600 text-white
                      text-base font-medium rounded-md w-full
                      shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Go to Coinbase Acct.
                  </Link>
                </div>
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                  <span className="countdown font-thin text-sm">
                    <span>{`Auto redirecting in ${timer} seconds`}</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CoinbaseAuthCard;
