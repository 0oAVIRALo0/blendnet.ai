import React, { useState, useEffect } from 'react';
import api from '../api';
import LineGraph from './LineGraph';
import Card from './Card'; 

const Home: React.FC = () => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [chartData, setChartData] = useState<any>(null);
  const [chartDataLast, setChartDataLast] = useState<any>(null);
  const [lastData, setLastData] = useState<any>(null);

  useEffect(() => {
    getSymbols();
  }, []);

  useEffect(() => {
    if (chartData !== null) {
      console.log("chartData:", chartData);

      const lastDataPoint = chartDataLast.datasets.map(dataset => dataset.data[dataset.data.length - 1]);
      setLastData(lastDataPoint);
      console.log("Last data point:", lastDataPoint);
    }
  }, [chartData]);

  const getSymbols = async () => {
    try {
      const response = await api.get("/api/watchlist/symbols/");
      const data = response.data;
      setSymbols(data);
    } catch (error) {
      alert(error);
    }
  };

  const handleSymbolChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const symbol = event.target.value;
    setSelectedSymbol(symbol);
    try {
      const response = await api.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=BAN9XP8JBJLFQZXN`);
      const data = response.data;
      console.log("Fetched data:", data);
      dataset(data);
    } catch (error) {
      console.error("Error fetching symbol data:", error);
    }
  };

  const dataset = (symbolData: any) => {
    const timeSeries = symbolData['Time Series (5min)'];
    const labels = [];
    const openPrices = [];
    const closePrices = [];
    const highPrices = [];
    const lowPrices = [];

    for (const timestamp in timeSeries) {
      if (timeSeries.hasOwnProperty(timestamp)) {
        const dataPoint = timeSeries[timestamp];
        const formattedTimestamp = new Date(timestamp).toLocaleTimeString();
        const { '1. open': open, '2. high': high, '3. low': low, '4. close': close } = dataPoint;
        labels.push(formattedTimestamp);
        openPrices.push(parseFloat(open));
        closePrices.push(parseFloat(close));
        highPrices.push(parseFloat(high));
        lowPrices.push(parseFloat(low));
      }
    }

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Open Price",
          data: openPrices,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: "Close Price",
          data: closePrices,
          fill: false,
          borderColor: 'rgb(192, 75, 192)',
          tension: 0.1
        },
      ]
    };

    const chartDataLast = {
      labels: labels,
      datasets: [
        {
          label: "Open Price",
          data: openPrices,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: "High Price",
          data: highPrices,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: "Low Price",
          data: lowPrices,
          fill: false,
          borderColor: 'rgb(192, 75, 192)',
          tension: 0.1
        },
        {
          label: "Close Price",
          data: closePrices,
          fill: false,
          borderColor: 'rgb(192, 75, 192)',
          tension: 0.1
        },
      ]
    };

    setChartData(chartData);
    setChartDataLast(chartDataLast);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mt-2 mb-2">
        <div className="flex">
          <select onChange={handleSymbolChange} value={selectedSymbol}>
            <option value="">Select Symbol</option>
            {symbols.map((symbolObj, index) => (
              <option key={index} value={symbolObj.symbol}>
                {symbolObj.symbol}
              </option>
            ))}
          </select>
          <div className="w-4"></div>
          {lastData && (
            <>
              <Card title="Last Open" value={lastData[0]} />
              <div className="w-4"></div> 
              <Card title="Last High" value={lastData[1]} />
              <div className="w-4"></div>
              <Card title="Last Low" value={lastData[2]} />
              <div className="w-4"></div>
              <Card title="Last Close" value={lastData[3]} />
            </>
          )}
        </div>
      </div>
      {chartData && <LineGraph chartData={chartData} />}
    </>
  )
};

export default Home;
