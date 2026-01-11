import React from "react";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js/auto";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function BarChart({
  labels,
  values,
  label = "Data",
  backgroundColors = [],
  borderRadius = 8,
  barThickness = 40
}) {

  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        backgroundColor:
          backgroundColors.length ? backgroundColors : "rgba(54,162,235,0.6)",
        borderWidth: 1,
        borderRadius,
        barThickness,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      // legend: { display: false },
    },
  };

  return <Bar data={data} options={options} />;
};

export default React.memo(BarChart);