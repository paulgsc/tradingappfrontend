import { useEffect } from "react";
import { useRef } from "react";
import SearchOptions from "./SearchOptions";
import SearchResults from "./SearchResults";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function SearchBar() {
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [queryParameters] = useSearchParams();

  const handleFilterBy = () => {
    const currentSearchParams = new URLSearchParams(queryParameters);
    currentSearchParams.has("showSearchBy")
      ? currentSearchParams.set("showSearchBy", "yes")
      : currentSearchParams.append("showSearchBy", "yes");
    navigate(`${location.pathname}?${currentSearchParams.toString()}`);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      if (e.key === "/" && inputRef.current) {
        inputRef.current.focus();
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  useEffect(() => {
    const handleBlur = (e) => {
      const currentSearchParams = new URLSearchParams(queryParameters);
      const element = document.getElementById("filterby");
      if (!element.contains(e.target)) {
        currentSearchParams.delete("showSearchBy");
        navigate(`${location.pathname}?${currentSearchParams.toString()}`);
      }
    };
    window.addEventListener("mousedown", handleBlur);

    return () => {
      window.removeEventListener("mousedown", handleBlur);
    };
  }, [queryParameters, location, navigate]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      tabIndex={-1}
      className="group peer max-w-fit focus-within:flex focus-within:flex-1 focus-within:max-w-full transform transition-all ease-in-out duration-500"
    >
      <label htmlFor="topbar-search" className="sr-only">
        Search
      </label>
      <div className="relative max-w-full group-focus-within:w-full transition-all duration-500 ease-in-out">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="z-10 hidden group-focus-within:flex absolute inset-y-0 right-0 items-center  border-l rounded-lg bg-zinc-200 my-1 mr-1 hover:brightness-90 group-focus-within:brightness-90">
          <div
            id="filterby"
            tabIndex={-1}
            onClick={handleFilterBy}
            className="relative inline-flex items-center space-x-1 px-2 "
          >
            <span className="capitalize text-neutral-400">
              {queryParameters.get("searchBy") || "filter by"}
            </span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z"
              />
            </svg>
            {queryParameters.get("showSearchBy") && <SearchOptions />}
          </div>
        </div>

        <input
          type="text"
          name="search"
          id="topbar-search"
          ref={inputRef}
          className="w-0 group-focus-within:w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block pl-10 p-2"
          placeholder="Search"
        />
        <SearchResults />
      </div>
    </form>
  );
}

export default SearchBar;
