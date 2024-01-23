import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DailySalesChart = ({ data }) => {
  const chartRef = useRef();
  const chartInstance = useRef(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  useEffect(() => {
		if (!chartRef.current || !(selectedStartDate instanceof Date) || isNaN(selectedStartDate.getTime())) return;
		console.log('Selected Start Date:', selectedStartDate);

    const ctx = chartRef.current.getContext('2d');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Filter data based on the selected start date
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        selectedStartDate &&
        itemDate >= selectedStartDate &&
        itemDate < new Date(selectedStartDate.getTime() + 7 * 24 * 60 * 60 * 1000)
      );
    });

    // Initialize dataset with default values of 0
    const dataset = Array(7).fill(0);

    // Update dataset with provided data
    filteredData.forEach((item) => {
      const dayIndex = new Date(item.date).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
      dataset[dayIndex] = item.dailySales;
    });

    // Destroy previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartData = {
      labels: daysOfWeek,
      datasets: [
        {
          label: 'Daily Sales',
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
          title: {
            display: true,
            text: selectedStartDate ? `Week starting from ${selectedStartDate.toLocaleDateString()}` : '',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Daily Sales',
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
  }, [data, selectedStartDate]);

	const handleDatePickerChange = (date) => {
		console.log('Selected Date:', date);
		setSelectedStartDate(date);
	};
	

	const handlePrevWeek = () => {
		if (selectedStartDate instanceof Date && !isNaN(selectedStartDate.getTime())) {
			setSelectedStartDate(new Date(selectedStartDate.getTime() - 7 * 24 * 60 * 60 * 1000));
		}
	};
	
	const handleNextWeek = () => {
		if (selectedStartDate instanceof Date && !isNaN(selectedStartDate.getTime())) {
			setSelectedStartDate(new Date(selectedStartDate.getTime() + 7 * 24 * 60 * 60 * 1000));
		}
	};
	

  return (
    <div>
      <canvas ref={chartRef} width="400" height="200"></canvas>
      <div>
        <button onClick={handlePrevWeek}>Prev Week</button>
        <DatePicker
          selected={selectedStartDate}
          onChange={handleDatePickerChange}
          startDate={selectedStartDate}
          endDate={selectedStartDate && new Date(selectedStartDate.getTime() + 7 * 24 * 60 * 60 * 1000)}
          selectsRange v  
          inline
        />
        <button onClick={handleNextWeek}>Next Week</button>
      </div>
    </div>
  );
};

export default DailySalesChart;
