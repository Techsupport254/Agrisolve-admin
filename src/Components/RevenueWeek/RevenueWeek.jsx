import React, { useState } from "react";
import YearDropdown from "./YearDropdown";
import TotalsDisplay from "./TotalsDisplay";
import SalesChart from "./SalesChart";
import "./RevenueWeek.css";

// Simulate data generation for two years: 2022 and 2023
const generateDataForYear = (year) => {
	const months = [
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
	];
	const data = months.map((month) => {
		return {
			name: month,
			income: Math.floor(Math.random() * 100),
			expenses: Math.floor(Math.random() * 100),
		};
	});
	return data;
};

const YearlySales = ({ earnings }) => {
	console.log(earnings);
	const [selectedYear, setSelectedYear] = useState("2023");

	// Data for 2022 and 2023
	const data2022 = generateDataForYear(2022);
	const data2023 = generateDataForYear(2023);

	// Select data based on the year
	const data = selectedYear === "2023" ? data2023 : data2022;

	// Calculate total income and expenses for the selected year
	const totalIncome = data.reduce((sum, month) => sum + month.income, 0);
	const totalExpenses = data.reduce((sum, month) => sum + month.expenses, 0);

	return (
		<div className="yearly-sales-container">
			<div className="yearly-sales-header">
				<div>
					<h2>Yearly sales</h2>
				</div>
				<YearDropdown
					selectedYear={selectedYear}
					setSelectedYear={setSelectedYear}
				/>
			</div>
			<TotalsDisplay totalIncome={totalIncome} totalExpenses={totalExpenses} />
			<SalesChart data={data} />
		</div>
	);
};

export default YearlySales;
