import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PropertyCard from "./PropertyCard";

function PropertyRow({ payload, maxCol, handleSelect }) {
  const [columns, setColumns] = useState(maxCol);
  const [screenWidth, setScreenWidth] = useState(null);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
    if (screenWidth >= 1200) {
      setColumns(maxCol);
      return;
    } else if (screenWidth > 960) {
      setColumns(3);
      return;
    } else if (screenWidth > 750) {
      setColumns(2);
      return;
    } else {
      setColumns(1);
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth, handleResize]);

  const numRows = Math.ceil(payload.length / columns);
  return (
    <div className="flex  space-y-2 items-center justify-center min-w-full">
      {[...Array(numRows)].map((_, rowIndex) => (
        <div
          className="flex justify-between items-center space-x-6 w-11/12"
          key={rowIndex}
        >
          {payload
            .slice(rowIndex * columns, rowIndex * columns + columns)
            .map((item, index) => (
              <PropertyCard
                key={item?.id || index}
                item={item}
                handleSelect={handleSelect}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default PropertyRow;
