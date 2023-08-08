import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Use the "auto" build for Chart.js

const UserActivity = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartData = {
      labels: [
        "Today",
        "This Week",
        "This Month",
        "This Quarter",
        "This Year",
        "All Time",
      ],
      datasets: [
        {
          data: [
            data.user_count_today,
            data.user_count_this_week,
            data.user_count_this_month,
            data.user_count_this_quarter,
            data.user_count_this_year,
            data.user_count_all_time,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 75,
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
  }, [data]);

  return <canvas ref={chartRef} width="400" height="400"></canvas>;
};

export default UserActivity;
