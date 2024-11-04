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
	Filler,
	Legend,
} from "chart.js";
import axios from "axios";

const token = localStorage.getItem("token");

// fetch orders data from the server
const fetchOrdersData = async () => {
	const response = await axios.get("http://localhost:5000/order", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

const SalesChart = () => {
	const data = {
		labels: [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		datasets: [
			{
				label: "Income",
				data: [50, 45, 60, 55, 85, 65, 95, 100, 70, 60, 55, 50],
				fill: true,
				backgroundColor: "rgba(40, 167, 69, 0.2)", // Success light color
				borderColor: "rgba(40, 167, 69, 1)", // Success dark color
				tension: 0.4,
				pointBackgroundColor: "rgba(40, 167, 69, 1)", // Success dark color
			},
			{
				label: "Expenses",
				data: [50, 40, 55, 45, 75, 50, 85, 80, 65, 50, 45, 40],
				fill: true,
				backgroundColor: "rgba(255, 193, 7, 0.2)", // Warning light color
				borderColor: "rgba(255, 193, 7, 1)", // Warning dark color
				tension: 0.4,
				pointBackgroundColor: "rgba(255, 193, 7, 1)", // Warning dark color
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false, // Hide legend
			},
			tooltip: {
				enabled: true,
				mode: "index", // Display tooltip for all datasets
				intersect: false, // Display tooltip when hovering over any point
				callbacks: {
					label: function (tooltipItem) {
						return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
					},
				},
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					color: "rgba(200, 200, 200, 0.1)",
				},
				beginAtZero: true,
				min: 0,
				max: 250,
			},
		},
	};

	return (
		<div style={{ height: "75%", width: "100%" }}>
			<Line data={data} options={options} />
		</div>
	);
};

export default SalesChart;
