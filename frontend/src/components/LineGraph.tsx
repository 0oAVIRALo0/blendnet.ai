import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineGraphProps {
  chartData: {
    labels: string[],
    datasets: {
      label: string,
      data: number[],
      fill: boolean,
      borderColor: string,
      tension: number,
    }[],
  };
}

const LineGraph: React.FC<LineGraphProps> = ({ chartData }) => {
  const options = {
    responsive: true,
    height: 150,
    width: 400,
  };

  return <Line options={options} data={chartData} />;
};

export default LineGraph;
