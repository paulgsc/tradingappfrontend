import React from "react";
import Property from "./Property";
import { useState } from "react";
import { useEffect } from "react";

function PropertyRow({ payload, maxCol }) {
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
    <div className="">
      {[...Array(numRows)].map((_, rowIndex) => (
        <div className="flex-row-container" key={rowIndex}>
          {payload
            .slice(rowIndex * columns, rowIndex * columns + columns)
            .map((item, index) => (
              <Property
                key={`${rowIndex}-${index}`}
                thumbnail={item.url}
                street={item.property_address}
                title={item.property_name}
                availableshares={item.total_shares_remaining}
                income={item.income}
                expense={item.expenses}
                propertyValue={item.current_property_value}
                classId={item.id}
                propertyId={item.id}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default PropertyRow;
