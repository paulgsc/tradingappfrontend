import React, { useEffect } from "react";
import ImagesAction from "./ImagesAction";
import Caraousel from "../../components/animation/Caraousel";
import ImageDescription from "./ImageDescription";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchbar/SearchBar";
import { useLocation } from "react-router";
import ImagePropertyCard from "./ImagePropertyCard";
import { useFetchPropertyWithImages } from "../../hooks/react-query";
import { useState } from "react";
import { adminSetImagePropertyQuery } from "../../reducers/adminFetchDataReducers";
import { Toaster } from "react-hot-toast";

function ImagesPortal() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { imageUpload = [] } = useSelector((state) => state.adminFetchData);
  const urls = imageUpload.map((image) => image.imageUrl);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);

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

  return (
    <div
      className={`flex flex-col items-start min-h-screen mx-auto w-full bg-white `}
    >
      <div className="flex h-16 xl:h-24 w-5/12 grid-rows-1 items-center justify-center shadow-sm mx-auto">
        <SearchBar
          results={results}
          handleSubmit={handleSubmit}
          handleInput={handleInput}
          input={query}
          selectedQuery={selectedQuery}
          handleSelect={handleQuerySelect}
        />
      </div>
      <div className="grid items-start grid-cols-9 xl:grid-cols-7 w-full h-full mx-auto shadow-md gap-1">
        <div className="invisible flex items-center justify-center h-full w-full col-span-1 shadow-sm border rounded-sm">
          +
        </div>
        <div className="flex items-start justify-center h-full w-full col-span-4 xl:col-span-3 shadow-sm ">
          {(
            <PropertyImagesCard
              images={urls}
              propertyWithImages={propertyWithImages || []}
              selectedQuery={selectedQuery}
            />
          ) || "+"}
        </div>
        <div className="flex items-start justify-center h-full  w-full col-span-3 xl:col-span-2 shadow-md rounded-sm border">
          {<ImagesAction /> || "+"}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

const PropertyImagesCard = ({ images, propertyWithImages, selectedQuery }) => {
  const { envVariables: { VITE_APP_BACKEND_URL = "" } = {} } = useSelector(
    (state) => state.env
  );
  const selectedProperty =
    propertyWithImages.find((property) => property?.id === selectedQuery) || [];

  const publishedImages =
    (selectedProperty?.images &&
      selectedProperty?.images.map((item) =>
        import.meta.env.DEV
          ? `${import.meta.env.VITE_APP_DEVELOPMENT_URL}${item.image}`
          : `${VITE_APP_BACKEND_URL}${item.image}`
      )) ||
    [];

  const getClassname = (name) => {
    switch (name) {
      case "image-container":
        return "relative overflow-hidden rounded-lg  h-[440px] md:h-[360px] xl:h-[524px]";
      case "full-screen":
        return "fixed top-0 left-0 w-full h-full z-50";
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-col w-full h-full gap-2 ">
      <div className="flex justify-center items-center row-span-1 xl:row-span-1 h-full">
        {[
          "/admin/site/models/propertyimages/uploads",
          "/admin/site/models/propertyimages/published",
        ].includes(location.pathname) ? (
          <>
            {location.pathname.includes("published") ? (
              <Caraousel
                key={`${publishedImages.length}`}
                imageUrls={publishedImages}
                getClassname={getClassname}
              />
            ) : (
              <Caraousel imageUrls={images} getClassname={getClassname} />
            )}
          </>
        ) : (
          <>
            <ImagePropertyCard />
          </>
        )}
      </div>
      <div className="flex justify-center items-center row-span-2 xl:row-span-1 h-full shadow-sm border-t-2">
        <ImageDescription
          publishedImages={selectedProperty?.images && selectedProperty.images}
        />
      </div>
    </div>
  );
};

export default ImagesPortal;
