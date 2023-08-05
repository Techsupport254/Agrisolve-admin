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
			<h3
				style={{ textAlign: "center", fontWeight: "bolder", fontSize: ".8rem" }}
			>
				Total Financial Data (Pie Chart)
			</h3>
			<div style={{ width: "100%", height: "250px" }}>
				<RechartPieChart width={300} height={270}>
					<Pie
						dataKey="value"
						data={PieChartdata}
						cx="50%"
						cy="50%"
						outerRadius={90}
						fill="#8884d8"
						label
					>
						{PieChartdata.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend align="center" />
				</RechartPieChart>
			</div>
		</div>
	);
};

export default PieChart;
