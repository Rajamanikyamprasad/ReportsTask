import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const YearBarChart = ({ data }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    // Filter data based on the current page
    const startYear = 2000 + currentPage * 10;
    const endYear = startYear + 9;

    const filteredData = data.filter((item) => item.year >= startYear && item.year <= endYear);

    // Initialize dataset with default values of 0
    const dataset = Array(10).fill(0);

    // Update dataset with provided data
    filteredData.forEach((item) => {
      const yearIndex = item.year % 10; // Adjust index to start from 0
      dataset[yearIndex] = item.yearlyAmount;
    });

    // Destroy previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartData = {
      labels: Array.from({ length: 10 }, (_, i) => startYear + i),
      datasets: [
        {
          label: 'Yearly Amount',
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
            text: 'Year',
          },
          ticks: {
            stepSize: 1, // Ensure integer values on the x-axis
          },
        },
        y: {
          title: {
            display: true,
            text: 'Yearly Amount',
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
  }, [data, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <canvas ref={chartRef} width="500" height="200"></canvas>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Prev
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default YearBarChart;
