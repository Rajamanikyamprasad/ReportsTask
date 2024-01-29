import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DailySalesChart = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:44347/api/Orders/daily-amounts');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateChart = () => {
    // Filter data based on the selected date range
    const filteredData = data.filter(item => {
      const itemDate = new Date(item.year, item.month - 1, item.day);
      return itemDate >= startDate && itemDate <= endDate;
    });

    // Create an array for the x-axis labels (dates)
    const labels = Array.from({ length: endDate.getDate() - startDate.getDate() + 1 }, (_, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + index);
      return currentDate.toLocaleDateString();
    });

    // Create an array for the y-axis data (dailyAmount)
    const dailyAmounts = Array.from({ length: labels.length }, (_, index) => {
      const matchingData = filteredData.find(item => {
        const itemDate = new Date(item.year, item.month - 1, item.day);
        return itemDate.toLocaleDateString() === labels[index];
      });

      return matchingData ? matchingData.dailyAmount : 0;
    });

    // Update the chart data
    setChartOptions({
      ...chartOptions,
      labels,
      datasets: [
        {
          label: 'Daily Amount',
          data: dailyAmounts,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    });
  };

  const [chartOptions, setChartOptions] = useState({
    labels: [],
    datasets: [
      {
        label: 'Daily Amount',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  return (
    <div>

      <Line data={chartOptions} />
      <div>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
        <button onClick={updateChart}>Update Chart</button>
      </div>
    </div>
  );
};
export default DailySalesChart;
