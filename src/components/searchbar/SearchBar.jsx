import React from "react";

function SearchBar() {
  return (
    <div id="center" className="flx-st-container lft-mg-25">
      <div id="search_area" className="">
        <form id="search-form" className="">
          <div id="container" className="not-ready" slot="search-input">
            <div
              id="search-input"
              className="search-border ht-40 not-ready"
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
                className="wd-50vw brd-shd-none not-ready zer-outl"
              />
            </div>
          </div>
        </form>
      </div>
      <button
        id="search-icon-legacy"
        className="search-border-button"
        aria-label="Search"
      >
        <i className="" />
      </button>
    </div>
  );
}

export default SearchBar;
