
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);
  const [currentYear, setCurrentYear] = useState(2000);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    // Filter data based on the current year
    const filteredData = data.filter((item) => item.year === currentYear);

    // Initialize dataset with default values of 0
    const dataset = Array(12).fill(0);

    // Update dataset with provided data
    filteredData.forEach((item) => {
      const monthIndex = item.month - 1; // Adjust index to start from 0
      dataset[monthIndex] = item.monthlyAmount;
    });

    // Destroy previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartData = {
      labels: Array.from({ length: 12 }, (_, i) => i + 1),
      datasets: [
        {
          label: 'Monthly Amount',
          data: dataset,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: {
            display: true,
            text: `Year ${currentYear}`,
          },
          ticks: {
            stepSize: 1, // Ensure integer values on the x-axis
            max: 12, // Limit the maximum value to 12
          },
        },
        y: {
          title: {
            display: true,
            text: 'Monthly Amount',
          },
        },
      },
    };

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });
  }, [data, currentYear]);

  const handlePrevYear = () => {
    setCurrentYear((prevYear) => Math.max(prevYear - 1, 2000));
  };

  const handleNextYear = () => {
    setCurrentYear((prevYear) => prevYear + 1);
  };

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
      <div>
        <button onClick={handlePrevYear} disabled={currentYear === 2000}>
          Prev
        </button>
        <button onClick={handleNextYear}>Next</button>
      </div>
    </div>
  );
};

export default BarChart;
