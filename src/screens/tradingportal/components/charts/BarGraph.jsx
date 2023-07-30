import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";

const BarGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Function to generate random color for each dataset
    const randomColor = () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16);

    if (data && chartRef.current) {
      const chartData = {
        labels: data.map((item) => item?.month),
        datasets: [
          {
            label: "Rental Income",
            data: data.map((item) => item?.rental_income),
            backgroundColor: randomColor(),
            stack: "stack1",
          },
          {
            label: "Maintanance Costs",
            data: data.map((item) => item?.maintanance_cost),
            backgroundColor: randomColor(),
            stack: "stack2",
          },
          {
            label: "Utility Expenses",
            data: data.map((item) => item?.utility_expenses),
            backgroundColor: randomColor(),
            stack: "stack2",
          },
          {
            label: "Insurance",
            data: data.map((item) => item?.insurance),
            backgroundColor: randomColor(),
            stack: "stack2",
          },
          {
            label: "Home Owner Expenses",
            data: data.map((item) => item?.home_owner_expenses),
            backgroundColor: randomColor(),
            stack: "stack2",
          },
          {
            label: "Other Expenses",
            data: data.map((item) => item?.other_expenses),
            backgroundColor: randomColor(),
            stack: "stack2",
          },
          {
            label: "Taxes",
            data: data.map((item) => item?.taxes),
            backgroundColor: randomColor(),
            stack: "stack2",
          },
          // Add more datasets for other financial metrics here...
          {
            label: "Net Income",
            data: data.map((item) => item?.net_income),
            backgroundColor: (ctx) => {
              const value = ctx.dataset.data[ctx.dataIndex];
              return value >= 0 ? "green" : "red";
            },
            stack: "stack3",
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "x", // Display bars vertically
        plugins: {
          legend: {
            position: "right",
          },
        },
        scales: {
          x: {
            stacked: true, // Stack the bars vertically
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            stacked: true, // Stack the bars vertically
            title: {
              display: true,
              text: "Amount ($)",
            },
          },
        },
        layout: {
          padding: {
            left: 100, // Adjust padding to accommodate horizontal bars
          },
        },
      };

      chartInstanceRef.current = chartData;

      try {
        // If the chart instance exists, update the data and options
        if (chartInstanceRef.current?.id) {
          chartInstanceRef.current.destroy();
        }
        if (data.length) {
          chartInstanceRef.current = new Chart(chartRef.current, {
            type: "bar",
            data: chartData,
            options: chartOptions,
          });
        }
      } catch (error) {}
      return () => {
        if (chartInstanceRef.current?.id) {
          chartInstanceRef.current.destroy();
        }
      };
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarGraph;
