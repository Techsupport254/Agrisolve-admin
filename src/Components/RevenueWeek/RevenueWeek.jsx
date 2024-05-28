import React from "react";
import {
	AreaChart,
	Area,
	XAxis,
	Tooltip,
	ResponsiveContainer,
	ReferenceLine,
	ReferenceDot,
} from "recharts";
import "./RevenueWeek.css";

const generateRandomRevenueForAllMonths = () => {
	const currentDate = new Date();
	const currentMonthIndex = currentDate.getMonth();
	const months = [
		"Jan",
		"Feb",
		"March",
		"April",
		"May",
		"June",
		"July",
		"Aug",
		"Sept",
		"Oct",
		"Nov",
		"Dec",
	];
	const monthsUpToCurrent = months.slice(0, currentMonthIndex + 1);
	const randomData = monthsUpToCurrent.map((month) => {
		const randomRevenue = Math.floor(Math.random() * 10000); // Generating random revenue value up to 10000
		return { name: month, revenue: randomRevenue };
	});
	return randomData;
};

const RevenueWeek = () => {
	const randomDataForAllMonths = generateRandomRevenueForAllMonths();

	// Find the current month's revenue data
	const currentDate = new Date();
	const currentMonthIndex = currentDate.getMonth();
	const currentMonthRevenue = randomDataForAllMonths[currentMonthIndex];

	return (
		<div className="revenue-week">
			<ResponsiveContainer
				width="100%"
				height={250}
				className="ResponsiveContainer"
			>
				<AreaChart
					data={randomDataForAllMonths}
					margin={{
						top: 5,
						right: 7,
						left: 5,
						bottom: -9,
					}}
				>
					<XAxis
						dataKey="name"
						axisLine={true}
						tickLine={false}
						tick={{ fill: "#8884d8" }}
					/>
					<Tooltip />
					<Area
						type="monotone"
						dataKey="revenue"
						stroke="#8884d8"
						fillOpacity={1}
						fill="url(#colorUv)"
					/>
					<ReferenceLine
						x={currentMonthRevenue.name}
						stroke="#8884d8"
						strokeDasharray="3 3"
					/>
					<ReferenceDot
						x={currentMonthRevenue.name}
						y={currentMonthRevenue.revenue}
						r={6}
						fill="#8884d8"
						stroke="none"
					/>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
					</defs>
				</AreaChart>
			</ResponsiveContainer>
			<div className="revenue-info">
				<p className="revenue-amount">Revenue this month</p>
				<p className="revenue-value">${currentMonthRevenue.revenue}</p>
			</div>
		</div>
	);
};

export default RevenueWeek;
