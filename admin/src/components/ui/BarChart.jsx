import React, {useMemo} from "react";
import { pickOneFromEachPalette, applyGradients} from "../charts/theme"

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function BarChart({
  labels = [],
  values = [],
  label = "Data",
  backgroundColors = [],
  borderRadius = 8,
  barThickness = 40
}) {

  const colors = useMemo(
    () => pickOneFromEachPalette(values.length),
    [values.length]
  );
  console.log("col : ", colors);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors, // temporary, replaced by gradients
        borderRadius: 12,
        barThickness: 44,
        label,
      // backgroundColor:
      //   backgroundColors.length ? backgroundColors : "rgba(54,162,235,0.6)",
      // borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      // legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, precision: 0 },
      },
    },
    onResize: (chart) => {
      applyGradients(chart, colors);
    },
  };

  return <Bar data={data} options={options} />;
};

export default React.memo(BarChart);