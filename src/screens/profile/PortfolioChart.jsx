import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const data = {
  labels: [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
  ],
  datasets: [
    {
      fill: false,
      lineTension: 0.01,
      backgroundColor: "#00ff1a",
      borderColor: "#00ff1a",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#00ff1a",
      pointBackgroundColor: "#00ff1a",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#00ff1a",
      pointHoverBorderColor: "#00ff1a",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [40, 45, 40, 50, 70, 72, 50, 50, 55, 70],
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

const PortfolioChart = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="chart-container flex items-center justify-center"
        style={{ width: "50vw", height: "100%" }}
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PortfolioChart;
