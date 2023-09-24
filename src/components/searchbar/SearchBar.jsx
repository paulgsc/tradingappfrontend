import { useRef } from "react";
import { SearchIcon } from "../../constants/svgs/Svg";
import { useEffect } from "react";

function SearchBar({
  getClassName = () => {},
  results,
  input,
  handleInput,
  handleSubmit,
  handleSelect,
  selectedQuery,
}) {
  const inputRef = useRef(null);

  const handleMouseDown = () => {
    const queryDropdown = document.getElementById("query-dropdown");
    if (queryDropdown) {
      queryDropdown.classList.add("group");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "/" && inputRef.current) {
        event.preventDefault();
        inputRef.current.focus();
        return;
      }
      return;
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputRef]);

  return (
    <form onSubmit={handleSubmit} className="flex-1 mt-2 xl:mt-0">
      <div className="flex flex-1">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        ></label>

        <div className="flex justify-between items-center w-full">
          <div id="query-dropdown" className="relative flex-1 group">
            <input
              type="search"
              className="  block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg  rounded-l-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search"
              required
              onChange={handleInput}
              onMouseDown={handleMouseDown}
              value={input}
              ref={inputRef}
            />
            <div
              className={`${getClassName(
                "dropdown-container"
              )} hidden group-focus-within:block bg-white absolute w-full max-h-72 xl:h-96 xl:max-h-96 overflow-y-auto border shadow-lg rounded-lg z-10 `}
            >
              <ul className="mt-2">
                {results &&
                  results.map((result, i) => (
                    <li
                      key={i}
                      className={`${
                        result?.id === selectedQuery
                          ? " bg-gradient-to-tr from-slate-100 to-green-200 ring-1 ring-green-100"
                          : ""
                      } cursor-pointer flex flex-1 p-1 justify-start items-center gap-3 px-4 xl:px-6 hover:bg-gray-100`}
                    >
                      <button
                        onClick={(e) => {
                          handleSelect(e, result?.id);
                        }}
                        className="flex flex-1 items-center gap-3"
                      >
                        <span>
                          <SearchIcon className={"w-4 h-4"} />
                        </span>
                        <span>{`${result?.name}, ${result?.address}`}</span>
                        {result?.id === selectedQuery && (
                          <span className="flex flex-1 justify-end text-green-600">
                            &#x2713;
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <button
            type="submit"
            className=" p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <SearchIcon className={"w-4 h-4"} />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
