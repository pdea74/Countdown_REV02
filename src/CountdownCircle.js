import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import React from "react";

ChartJS.register(ArcElement, Tooltip);

export default function CountdownCircle({ percentage }) {
  const safePercentage = Math.min(Math.max(percentage, 0.1), 99.9);

  const data = {
    datasets: [
      {
        data: [safePercentage, 100 - safePercentage],
        backgroundColor: [
          "#00eaff", // parte completata
          "#444444", // parte non completata (visibile)
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%",
    animation: {
      animateRotate: true,
      duration: 800,
    },
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="chart-wrapper">
      {/* Cerchio principale */}
      <div className="chart-base">
        <Doughnut data={data} options={options} />
        <div className="chart-center-text">{percentage.toFixed(1)}%</div>
      </div>

      {/* 🔥 EFFETTO SCANNER ROTANTE */}
      <div className="scanner-ring"></div>
    </div>
  );
}
