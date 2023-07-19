import React from "react";

function PropertyActivity() {
  return (
    <div className="w-full h-full block">
      <h2>Activity Breakdown</h2>
      <div>
        <h3>Funds Raised</h3>
        <span>66465</span>
      </div>
      <div className="grid grid-cols-4">
        {[].map((item, i) => (
          <div key={i}>
            <span>{item?.title}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyActivity;
