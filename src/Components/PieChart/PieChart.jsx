import React, { useEffect, useState } from "react";
import "./PieChart.css";
import {
	PieChart as RechartPieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const PieChart = ({ orders, user, userData }) => {
	const adminEmail = "__ADMIN__";
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		setIsAdmin(user?.email === adminEmail);
	}, [user?.email, adminEmail]);

	let totalIncome = 0;
	let totalSales = 0;
	let totalExpenses = 0;

	// Use userData if available
	if (userData.length > 0) {
		const incomeData = userData.find((item) => item.title === "Income");
		const salesData = userData.find((item) => item.title === "Sales");
		const expensesData = userData.find((item) => item.title === "Expenses");

		totalIncome = parseFloat(incomeData?.value) || 0;
		totalSales = parseFloat(salesData?.value) || 0;
		totalExpenses = parseFloat(expensesData?.value) || 0;
	}

	const PieChartData = [
		{ name: "Income", value: totalIncome, color: COLORS[0] },
		{ name: "Sales", value: totalSales, color: COLORS[1] },
		{ name: "Expenses", value: totalExpenses, color: COLORS[2] },
	];

	return (
		<div className="PieChartContainer">
			{orders.length === 0 ? (
				<div className="NoDataMessage">No data available</div>
			) : (
				<RechartPieChart width={300} height={250}>
					<Pie
						dataKey="value"
						data={PieChartData}
						cx="50%"
						cy="50%"
						outerRadius={80}
						fill="#8884d8"
						label
					>
						{PieChartData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend align="center" />
				</RechartPieChart>
			)}
		</div>
	);
};

export default PieChart;
