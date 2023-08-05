import React from "react";
import "./BarGraph.css";
import { chartdata } from "../../Data";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const BarGraph = () => {
	return (
		<div className="BarGraphContainer">
			<h3>MonthlyFinancial Data</h3>
			<div style={{ width: "100%", height: "100%" }}>
				<BarChart
					width={600}
					height={280}
					data={chartdata}
					margin={{ top: 0, right: 0, left: -15, bottom: 0 }}
				>
					<CartesianGrid strokeDasharray="1 1" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="income" name="Income" fill="#8884d8" />
					<Bar dataKey="sales" name="Sales" fill="#82ca9d" />
					<Bar dataKey="expenses" name="Expenses" fill="#ffc658" />
				</BarChart>
			</div>
		</div>
	);
};

export default BarGraph;
