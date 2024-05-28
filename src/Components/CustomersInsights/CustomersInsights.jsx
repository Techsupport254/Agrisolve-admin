import React from "react";
import "./CustomersInsights.css";
import {
	PieChart as RechartPieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]; // Colors for "Returning" and "New"

const CustomersInsights = () => {
	// Random values for returning and new customers
	const returningCustomers = Math.floor(Math.random() * 100); // Random number between 0 and 100
	const newCustomers = 100 - returningCustomers; // Remaining percentage for new customers

	// Data for the pie chart (excluding "All")
	const data = [
		{ name: "Returning", value: returningCustomers },
		{ name: "New", value: newCustomers },
	];

	// Data for the labels (including "All")
	const labelData = [
		{ name: "Returning", value: returningCustomers },
		{ name: "New", value: newCustomers },
		{ name: "All", value: returningCustomers + newCustomers }, // Include "All" label with total value
	];

	return (
		<div className="PieChartContainer">
			<div className="ChartContainer">
				<RechartPieChart width={200} height={200}>
					<Pie
						dataKey="value"
						data={data}
						cx="50%"
						cy="50%"
						outerRadius={70}
						fill="#8884d8"
						label
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]} // Use colors from the array
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend align="center" />
				</RechartPieChart>
			</div>
			<div className="PieLabelContainer">
				{labelData.map((entry, index) => (
					<div key={`label-${index}`} className="PieLabel">
						<div
							className="PieLabelColor"
							style={{ backgroundColor: COLORS[index % COLORS.length] }} // Use colors from the array
						/>
						<span className="PieLabelText">
							{entry.name} - {entry.value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default CustomersInsights;
