import React from "react";
import "./RevenueWeek.css";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

// Sample data
const data = [
	{ month: "June", revenue: 4000 },
	{ month: "July", revenue: 3000 },
	{ month: "August", revenue: 5000 },
	{ month: "September", revenue: 6000 },
	{ month: "October", revenue: 8792 },
];

const RevenueWeek = () => {
	return (
		<div className="RevenueContainer">
			<div className="Header">
				<i className="fa fa-line-chart" aria-hidden="true"></i>
				<h1>Revenue This Week</h1>
			</div>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={data}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Line
						type="monotone"
						dataKey="revenue"
						stroke="#8884d8"
						activeDot={{ r: 8 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default RevenueWeek;
