import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "../../../../../components/searchbar/SearchBar";

function HistorySearchbar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const showResults = () => {};

  const handleInput = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    showResults();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showResults();
  };

  const handleQuerySelect = (e, queryId) => {
    e.preventDefault();
    setSelectedQuery(queryId);

    const queryDropdown = document.getElementById("query-dropdown");
    if (queryDropdown) {
      queryDropdown.classList.toggle("group");
    }
  };

  return (
    <div className="flex justify-center xl:mt-16">
      <div className="w-2/5 scale-75 xl:-translate-y-12 focus-within:w-3/5 focus-within:scale-90 xl:focus-within:scale-100 focus-within:translate-y-8 xl:focus-within:translate-y-20 focus-within:translate-x-12 transition-all duration-300 ease-in-out">
        <SearchBar
          results={results}
          handleSubmit={handleSubmit}
          handleInput={handleInput}
          input={query}
          selectedQuery={selectedQuery}
          handleSelect={handleQuerySelect}
          getClassName={getClassName}
        />
      </div>
    </div>
  );
}

const getClassName = (name) => {
  switch (name) {
    case "dropdown-container":
      return "group-focus-within:h-72 scale-50 opacity-5 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all duration-300 ease-in-out";
    default:
      return "";
  }
};

export default HistorySearchbar;
