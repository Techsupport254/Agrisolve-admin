import React from "react";
import "./BarGraph.css";
import { chartdata } from "../../Data";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarGraph = () => {
	const data = {
		labels: chartdata.map((item) => item.month),
		datasets: [
			{
				type: "bar",
				label: "Revenue",
				data: chartdata.map((item) => item.sales),
				backgroundColor: "#82ca9d",
			},
			{
				type: "bar",
				label: "Expenses",
				data: chartdata.map((item) => item.expenses),
				backgroundColor: "#ffc658",
			},
			{
				type: "bar",
				label: "Income",
				data: chartdata.map((item) => item.income),
				backgroundColor: "#8884d8",
				fill: false,
			},
		],
	};

	const options = {
		responsive: true,
		interaction: {
			mode: "index", // Enable shared tooltips for the same index
			intersect: false, // Show tooltips even without directly hovering over data
		},
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Monthly Financial Data",
			},
			tooltip: {
				callbacks: {
					label: (context) => {
						const label = context.dataset.label || "";
						const value = context.parsed.y;
						return `${label}: ${value}`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<div className="BarGraphContainer">
			<div className="BarCharts">
				<Line data={data} options={options} className="LineGraph" />
			</div>
		</div>
	);
};

export default BarGraph;
