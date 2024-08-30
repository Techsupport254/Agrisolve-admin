import React from "react";
import "./AnalyticsGraph.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const abbreviateMonth = (month) => {
	const monthAbbreviations = {
		January: "Jan",
		February: "Feb",
		March: "Mar",
		April: "Apr",
		May: "May",
		June: "Jun",
		July: "Jul",
		August: "Aug",
		September: "Sep",
		October: "Oct",
		November: "Nov",
		December: "Dec",
	};
	return monthAbbreviations[month] || month;
};

const getAllMonths = () => {
	return [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
};

const AnalyticsGraph = ({ earnings }) => {
	// Process earnings data to ensure all months are represented
	const processEarningsData = (earnings) => {
		const allMonths = getAllMonths();
		const monthlyData = {};

		// Initialize all months with 0 values
		allMonths.forEach((month) => {
			monthlyData[month] = {
				month,
				income: 0,
				sales: 0,
				expense: 0,
			};
		});

		// Accumulate earnings data into the respective months
		earnings?.forEach((earning) => {
			earning.earnings.forEach((transaction) => {
				const month = new Date(transaction.date).toLocaleString("default", {
					month: "long",
				});

				monthlyData[month].income += transaction.grossAmount;
				monthlyData[month].sales += transaction.netAmount;
			});
		});

		return Object.values(monthlyData);
	};

	// Transform the earnings data
	const processedData = processEarningsData(earnings);

	// Create chart data
	const data = {
		labels: processedData.map((e) => abbreviateMonth(e.month)),
		datasets: [
			{
				label: "Income",
				data: processedData.map((e) => e.income),
				backgroundColor: "#8884d8",
				tension: 0.1,
				borderWidth: 2,
				pointRadius: 2,
			},
			{
				label: "Revenue",
				data: processedData.map((e) => e.sales),
				backgroundColor: "#82ca9d",
				tension: 0.1,
				borderWidth: 2,
				pointRadius: 2,
			},
			{
				label: "Expenses",
				data: processedData.map((e) => e.expense),
				backgroundColor: "#ffc658",
				tension: 0.1,
				borderWidth: 2,
				pointRadius: 2,
			},
		],
	};

	return (
		<div className="LineGraph">
			<Line data={data} />
		</div>
	);
};

export default AnalyticsGraph;
