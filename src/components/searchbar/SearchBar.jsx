import React, { useState } from "react";
import {
  propertyTradeDataRequestFailed,
  propertyTradeDataRequestSuccess,
  userRequestData,
} from "../../reducers/fetchDataReducers";
import API from "../../api/django";
import { useDispatch } from "react-redux";

function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const fetchData = (searchQuery) => async (dispatch) => {
    dispatch(userRequestData());
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await API.get(
        `data/property/search?query=${searchQuery}`,
        config
      );
      dispatch(propertyTradeDataRequestSuccess(response.data));
    } catch (error) {
      dispatch(propertyTradeDataRequestFailed(error.message));
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value;
    dispatch(fetchData(searchQuery));
  }
  const hanldleClick = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(fetchData(input));
  };

  return (
    <div id="center" className="flx-st-container ">
      <div id="search_area" className="">
        <form id="search-form" className="" onSubmit={handleSubmit}>
          <div id="container" className="" slot="search-input">
            <div
              id="search-input"
              className="search-border ht-40"
              slot="search-input"
            >
              <input
                id="search"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                type="text"
                spellCheck="false"
                placeholder="Search"
                aria-label="Search"
                role="combobox"
                className=" brd-shd-none zer-outl"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
          </div>
        </form>
      </div>
      <button
        id="search-icon-legacy"
        className="search-border-button"
        aria-label="Search"
        onClick={hanldleClick}
      >
        <i className="" />
      </button>
    </div>
  );
}

export default SearchBar;
