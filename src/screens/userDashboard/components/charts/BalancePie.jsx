import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const BalancePie = ({ title, labels, data, formated_data }) => {
  const chartRef = useRef(null);
  const [legend, setLegend] = useState(null);

  useEffect(() => {
    let chart;
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ["#43E893", "#B6DAE1"],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 75,
      plugins: {
        title: {
          display: false,
          text: title,
          font: {
            size: 28,
          },
          color: "white",
        },
        legend: {
          display: false,
        },
      },
    };

    if (chartRef.current) {
      chart = new Chart(chartRef.current, {
        type: "doughnut",
        data: chartData,
        options: options,
      });

      const customLegend = React.createElement(
        "div",
        {
          className: "custom-legend",
        },
        chart?.legend?.legendItems?.map((item, index) => {
          const color = item.fillStyle;
          const text = item.text;
          const value = formated_data[item?.index]; // Add this new property

          return (
            <div
              className="legend-item flex items-center justify-between space-y-1 w-28 2xl:w-48"
              key={index}
            >
              <div className="inline-flex items-center justify-start space-x-2">
                <span
                  className="legend-color w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                >
                  &nbsp;
                </span>
                <div className="w-full inline-flex items-center space-x-6">
                  <span className="legend-text text-base max-2xl:text-lg  ">
                    {text}
                  </span>
                  <span className="legend-value text-base max-2xl:text-lg">
                    {value}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      );
      setLegend(customLegend);
    }

    return () => {
      chart && chart.destroy();
    };
  }, [data, title, labels, chartRef]);
  return (
    <div className=" w-full flex items-center justify-around">
      <div className="w-36 h-36">
        <canvas ref={chartRef} width="90" height="90" className=""></canvas>
      </div>
      {legend}
    </div>
  );
};

export default BalancePie;
