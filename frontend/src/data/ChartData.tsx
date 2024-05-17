import React, { useState, useEffect } from 'react';

interface DataPoint {
  [key: string]: string;
}

interface TimeSeriesData {
  [key: string]: DataPoint;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
  }[];
}

const Dataset: React.FC<{ symbolData: any }> = ({ symbolData }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const timeSeries: TimeSeriesData = symbolData["Time Series (5min)"];
      const labels: string[] = [];
      const openPrices: number[] = [];
      const closePrices: number[] = [];

      for (const timestamp in timeSeries) {
        if (timeSeries.hasOwnProperty(timestamp)) {
          const dataPoint: DataPoint = timeSeries[timestamp];
          const formattedTimestamp = new Date(timestamp).toLocaleTimeString();
          const { "1. open": open, "4. close": close } = dataPoint;
          labels.push(formattedTimestamp);
          openPrices.push(parseFloat(open));
          closePrices.push(parseFloat(close));
        }
      }

      const newChartData: ChartData = {
        labels: labels,
        datasets: [
          {
            label: "Open Price",
            data: openPrices,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "Close Price",
            data: closePrices,
            fill: false,
            borderColor: "rgb(192, 75, 192)",
            tension: 0.1,
          },
        ],
      };

      setChartData(newChartData);
    };

    fetchData();
  }, [symbolData]);

  useEffect(() => {
    if (chartData !== null) {
      console.log(chartData);
    }
  }, [chartData]);

  return null; // or render your chart here
};

export default Dataset;
