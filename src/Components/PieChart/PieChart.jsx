import React from "react";
import "./PieChart.css";
import { PieChartdata } from "../../Data";
import {
	PieChart as RechartPieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const PieChart = () => {
	return (
		<div className="PieChartContainer">
			<RechartPieChart width={300} height={250}>
				<Pie
					dataKey="value"
					data={PieChartdata}
					cx="50%"
					cy="50%"
					outerRadius={80}
					fill="#8884d8"
					label
				>
					{PieChartdata.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend align="center" />
			</RechartPieChart>
		</div>
	);
};

export default PieChart;
