import { useState } from "react";
import SearchBar from "../../../../components/searchbar/SearchBar";
import { useFetchPropertyWithImages } from "../../hooks/reactQuery";
import { adminSetImagePropertyQuery } from "../../../../reducers/adminFetchDataReducers";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

function SearchImages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { model } = useParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const { propertyWithImages } = useFetchPropertyWithImages(query);

  const showResults = () => {
    if (Array.isArray(propertyWithImages)) {
      setResults(() => [
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
    navigate(`/models/${model}/images/uploads?propertyId=${queryId}`);
  };
  return (
    <SearchBar
      results={results}
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      input={query}
      selectedQuery={selectedQuery}
      handleSelect={handleQuerySelect}
    />
  );
}

export default SearchImages;
