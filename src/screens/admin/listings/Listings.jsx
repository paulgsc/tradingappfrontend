import React from "react";
import SearchNavbar from "../../../components/navbar/SearchNavbar";
import PropertyRow from "../../../components/cards/PropertyRow";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useFetchPropertyWithImages } from "../../../hooks/react-query";
import SearchBar from "../../../components/searchbar/SearchBar";
import { useState } from "react";
import { adminSetImagePropertyQuery } from "../../../reducers/adminFetchDataReducers";
import { stageNewActivePropertyId } from "../../../contexts/redux/actions/adminActions";

function Listings() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const dispatch = useDispatch();

  const {
    propertyWithImages = [],
    isLoading,
    isError,
    refetch,
  } = useFetchPropertyWithImages(query);

  const showResults = () => {
    if (propertyWithImages.length) {
      setResults((prevResults) => [
        ...propertyWithImages.map((property) => ({
          id: property.id,
          name: property.property_name,
          address: property.property_address,
        })),
      ]);
    } else {
      setResults([]);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    setSelectedQuery(null);
    showResults();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showResults();
  };

  const handleQuerySelect = (e, queryId) => {
    e.preventDefault();
    setSelectedQuery(queryId);
    const selectedProperty =
      propertyWithImages.find((property) => property?.id === queryId) || [];
    dispatch(adminSetImagePropertyQuery(selectedProperty));
    const queryDropdown = document.getElementById("query-dropdown");
    if (queryDropdown) {
      queryDropdown.classList.toggle("group");
    }
  };
  useEffect(() => {
    refetch();
  }, [query]);

  useEffect(() => {
    showResults();
  }, [propertyWithImages]);
  let selectedProperty = [];

  const handleSelect = (propertyId) => {
    dispatch(stageNewActivePropertyId(propertyId));
  };
  const memoizedPropertyRow = useMemo(() => {
    if (selectedQuery) {
      selectedProperty =
        [
          propertyWithImages.find((property) => property?.id === selectedQuery),
        ] || [];
      return (
        <PropertyRow
          payload={selectedProperty}
          maxCol={2}
          handleSelect={handleSelect}
        />
      );
    }
    return (
      <PropertyRow
        payload={propertyWithImages}
        maxCol={2}
        handleSelect={handleSelect}
      />
    );
  }, [propertyWithImages, selectedProperty]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-stone-100 via-white to-stone-200">
      <SearchNavbar className="">
        <div className="w-5/12">
          <SearchBar
            results={results}
            handleSubmit={handleSubmit}
            handleInput={handleInput}
            input={query}
            selectedQuery={selectedQuery}
            handleSelect={handleQuerySelect}
          />
        </div>
      </SearchNavbar>

      <hr className="invisible mt-16" />
      <div className="p-4">{memoizedPropertyRow}</div>
    </div>
  );
}

export default Listings;
