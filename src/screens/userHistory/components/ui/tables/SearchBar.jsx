function SearchBar({ inputRef, setQuery }) {
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

        <input
          type="text"
          name="search"
          ref={inputRef}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="w-0 group-focus-within:w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block pl-10 p-2"
          placeholder="Search"
        />
      </div>
    </form>
  );
}

export default SearchBar;
