import { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Use the "auto" build for Chart.js

const UserActivity = ({ title, data }) => {
  console.log(data);
  const chartRef = useRef(null);

  useEffect(() => {
    const chartData = {
      labels: [
        "Hourly",
        "Daily",
        "This Week",
        "This Month",
        "This Quarter",
        "This Year",
        "All Time",
      ],
      datasets: [
        {
          data: [
            data?.hourly,
            data?.daily,
            data?.weekly,
            data?.monthly,
            data?.quarterly,
            data?.yearly,
            data?.all_time,
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 75,
      plugins: {
        title: {
          display: true,
          text: title, // Set your desired title here
          font: {
            size: 28,
          }, // Adjust the font size if needed
          color: "white",
        },
        legend: {
          display: true,
          position: "right", // Place the legend to the right
          labels: {
            color: "white", // Set the font color of labels
          },
        },
      },
    };

    if (chartRef.current) {
      // Create the chart
      const chart = new Chart(chartRef.current, {
        type: "doughnut",
        data: chartData,
        options: options,
      });

      // Return a cleanup function to destroy the chart instance
      return () => {
        chart.destroy();
      };
    }
  }, [data, title]);

  return <canvas ref={chartRef} width="400" height="400"></canvas>;
};

export default UserActivity;
