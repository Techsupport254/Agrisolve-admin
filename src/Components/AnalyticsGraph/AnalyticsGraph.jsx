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

const AnalyticsGraph = ({ earnings }) => {
	const data = {
		labels: earnings?.map((e) => abbreviateMonth(e.month)),
		datasets: [
			{
				label: "Income",
				data: earnings?.map((e) => e.income),
				backgroundColor: "#8884d8",
				tension: 0.1,
				borderWidth: 2,
				pointRadius: 2,
			},
			{
				label: "Revenue",
				data: earnings?.map((e) => e.sales),
				backgroundColor: "#82ca9d",
				tension: 0.1,
				borderWidth: 2,
				pointRadius: 2,
			},
			{
				label: "Expenses",
				data: earnings?.map((e) => e.expense),
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
