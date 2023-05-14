import React, { useState } from "react";
import {
  propertyTradeDataRequestFailed,
  propertyTradeDataRequestSuccess,
  userRequestData,
} from "../../reducers/fetchDataReducers";
import API from "../../api/django";
import { useDispatch } from "react-redux";
import "./searchbar.css";

function SearchBar({ classname }) {
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
    dispatch(fetchData(input));
  };

  return (
    <div id="center" className="searchbar__container">
      <div id="search_area" className="">
        <form id="search-form" className="" onSubmit={handleSubmit}>
          <div className="" slot="search-input">
            <div className="searchbar__input-container" slot="search-input">
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
                className={`zer-outl ${classname}`}
                onChange={(e) => {
                  console.log(!e.target.value);
                  if (!e.target.value) {
                    console.log(e.target.value);
                    const element = document.getElementById(
                      "trade_searchResultList"
                    );
                    element.style.display = "none";
                  } else {
                    const element = document.getElementById(
                      "trade_searchResultList"
                    );
                    element.style.display = "block";
                  }
                  setInput(e.target.value);
                }}
              />
            </div>
          </div>
        </form>
      </div>
      <button
        id="search-icon-legacy"
        className="trade-widget__search-btn"
        aria-label="Search"
        onClick={hanldleClick}
      >
        <i className="" />
      </button>
    </div>
  );
}

export default SearchBar;
