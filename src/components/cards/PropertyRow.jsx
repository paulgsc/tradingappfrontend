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
                thumbnail={item.thumbnail}
                street={item.street}
                title={item.title}
                shares={item.shares}
                income={item.income}
                expense={item.expense}
                date={item.date}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default PropertyRow;
