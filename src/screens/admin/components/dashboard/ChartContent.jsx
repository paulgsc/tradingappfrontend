import React from "react";

function ChartContent({ id }) {
  return (
    <div
      id={`metric-chart_${id}`}
      className={`z-50 pointer-events-none opacity-0
      absolute -bottom-96 -left-[100%] right-0 w-96 h-96 bg-red-600`}
    >
      <div>foo</div>
    </div>
  );
}

export default ChartContent;
