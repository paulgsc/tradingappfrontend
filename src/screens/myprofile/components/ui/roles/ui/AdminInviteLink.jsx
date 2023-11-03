import { Link } from "react-router-dom";
import Spinner from "../../../../../../components/loading/Spinner";
import { useState } from "react";
import { requestNewInviteLink } from "../../../hooks/userActions";
import { useSelector } from "react-redux";

function AdminInviteLink({ adminInviteLink }) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const { userInfo: { token } = {} } = useSelector((state) => state.userAuth);

  const handleRequest = async () => {
    const res = await requestNewInviteLink(setLoading, token);
    setResponse(res);
  };
  console.log(response, !!response);
  return (
    <li className="hidden w-4/5 lg:flex items-center justify-between px-6 border-b pb-2 border-slate-200">
      <span
        role="text"
        tabIndex={-1}
        className="relative group inline-flex items-center gap-4 font-normal text-blue-600"
      >
        <p className="leading-10"> Create Admin</p>
        <svg
          className=" scale-90 flex-shrink-0 inline w-4 h4 text-blue-600/80 brightness-75 cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div className="hidden absolute -top-1/4 right-0 translate-x-full w-96 max-w-xs rounded-md shadow-sm group-focus-within:block border border-neutral-200 p-4 space-y-4 bg-zinc-50 brightness-95">
          <p className="w-full font-normal">
            This is link to update account to have admin priviliges. To request
            new link reach out to the website administrator.
          </p>
          <div className="grid grid-cols-2 w-full text-xs font-thin text-amber-600">
            <span role="text" className="text-center">
              expires
            </span>
            <span role="text" className="text-center">
              some date
            </span>
            <span className="text-center">for</span>
            <span className="text-center">some role</span>
            <span className="text-center">link sent by</span>
            <span className="text-center">some sender</span>
            <span className="text-center">intended for</span>
            <span className="text-center">some recipient</span>
          </div>
        </div>
      </span>
      {!adminInviteLink && (
        <div>
          <span className="inline-flex items-center text-center font-thin text-base text-amber-600">
            link expired{" "}
            <span aria-hidden className="text-sm">
              &#x26A0;
            </span>{" "}
          </span>
        </div>
      )}
      {adminInviteLink ? (
        <Link
          to={adminInviteLink}
          className="-translate-x-full flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Admin invite <span aria-hidden="true">&r</span>
        </Link>
      ) : (
        <div>
          {loading ? (
            <Spinner.Button messge={"sending"} />
          ) : (
            <>
              <button
                disabled
                aria-disabled
                className="2xl:-translate-x-full flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 disabled:bg-gray-600 disabled:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:blur-sm disabled:pointer-events-none"
              >
                Admin invite <span aria-hidden="true">&rarr;</span>
              </button>
              <button
                disabled={!!response}
                onClick={handleRequest}
                className="hidden lg:inline-flex items-center gap-1 rounded-full bg-sky-600 disabled:bg-emerald-500 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 scale-90 hover:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:pointer-events-none"
              >
                {response ? (
                  <span className="text-sm text-center">
                    Emal sent to admin
                  </span>
                ) : (
                  <>
                    <span> Request new</span>
                    <span aria-hidden="true">
                      <svg
                        className="w-3 h-3 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1.248 15C.22 11.77 2.275 4.232 9.466 4.232V2.079a1.025 1.025 0 0 1 1.644-.862l5.479 4.307a1.108 1.108 0 0 1 0 1.723l-5.48 4.307a1.026 1.026 0 0 1-1.643-.861V8.539C2.275 9.616 1.248 15 1.248 15Z"
                        />
                      </svg>
                    </span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      )}
    </li>
  );
}

export default AdminInviteLink;
