import React from "react";
import Property from "./Property";

function PropertyRow({ payload, maxCol }) {
  const numRows = Math.ceil(payload.length / maxCol);
  return (
    <div className="">
      {[...Array(numRows)].map((_, rowIndex) => (
        <div className="flex-row-container" key={rowIndex}>
          {payload
            .slice(rowIndex * maxCol, rowIndex * maxCol + maxCol)
            .map((item, index) => (
              <Property
                key={`${rowIndex}-${index}`}
                thumbnail={item.url}
                street={item.property_address}
                title={item.property_name}
                shares={item.total_shares_remaining}
                income={item.income}
                expense={item.expenses}
                propertyValue={item.current_property_value}
                classId={item.id}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default PropertyRow;
