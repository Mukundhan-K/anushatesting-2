import React, {useMemo} from "react";
import { pickOneFromEachPalette, applyGradients} from "../charts/theme"

import {
   Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

import { Line } from "react-chartjs-2";

function LineChart({
  labels = [],
  values = [],
  label = "Trend",
  borderColor = "rgba(255, 99, 132, 1)",
  backgroundColor = "rgba(255, 99, 132, 0.2)",
  pointColor = "#ffffff"
}) {

  const pointColors = useMemo(
    () => pickOneFromEachPalette(values.length),
    [values.length]
  );

  // First color becomes the main line color
  const mainLineColor = pointColors[0];

  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        // borderColor,
        // pointBackgroundColor: pointColor,
        // pointBorderColor: borderColor,
        // backgroundColor,
        tension: 0.4,
        fill: true,
        pointRadius: 5,

        borderColor: mainLineColor,
        backgroundColor: mainLineColor + "55", // replaced by gradient later
        pointBackgroundColor: pointColors,
        pointBorderColor: "#020617",
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      // legend: { display: false },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        cornerRadius: 8,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, precision: 0 },
        grid: { color: "#e5e7eb" }
      },
    }
  };

  return <Line data={data}  options={options} />;
};

export default React.memo(LineChart);