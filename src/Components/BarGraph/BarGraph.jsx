import React, { useRef, useState } from "react";
import "./BarGraph.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarGraph = ({ orders, userData, user }) => {
	const graphRef = useRef(null);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const adminEmail = __ADMIN__;
	const isAdmin = user?.email === adminEmail;

	const monthlyData = {
		Jan: { sales: 0, expenses: 0, income: 0 },
		Feb: { sales: 0, expenses: 0, income: 0 },
		Mar: { sales: 0, expenses: 0, income: 0 },
		Apr: { sales: 0, expenses: 0, income: 0 },
		May: { sales: 0, expenses: 0, income: 0 },
		Jun: { sales: 0, expenses: 0, income: 0 },
		Jul: { sales: 0, expenses: 0, income: 0 },
		Aug: { sales: 0, expenses: 0, income: 0 },
		Sep: { sales: 0, expenses: 0, income: 0 },
		Oct: { sales: 0, expenses: 0, income: 0 },
		Nov: { sales: 0, expenses: 0, income: 0 },
		Dec: { sales: 0, expenses: 0, income: 0 },
	};

	const uniqueYears =
		orders.length > 0
			? [...new Set(orders.map((order) => new Date(order.date).getFullYear()))]
			: [];

	const [selectedYear, setSelectedYear] = useState(
		uniqueYears.length > 0 ? uniqueYears[0] : new Date().getFullYear()
	);

	// Process orders to calculate monthly sales, expenses, and income
	orders.forEach((order) => {
		const orderYear = new Date(order.date).getFullYear();
		if (orderYear === selectedYear) {
			const month = new Date(order.date).toLocaleString("default", {
				month: "short",
			});

			if (isAdmin) {
				// Admin logic
				monthlyData[month].sales += order.amounts.totalAmount;
				monthlyData[month].expenses += order.amounts.deliveryFee;
				monthlyData[month].income +=
					order.amounts.totalAmount - order.amounts.deliveryFee;
			} else {
				// User logic
				let orderSales = 0;
				let orderExpenses = 0;

				order.products.forEach((product) => {
					// Calculate sales
					const productSales = product.price * product.quantity;
					orderSales += productSales;

					// Calculate discounts (expenses)
					if (product.productId?.discounts?.length > 0) {
						product.productId.discounts.forEach((discount) => {
							const discountAmount =
								discount.discountAmount ||
								(product.price * discount.discountPercentage) / 100;
							orderExpenses += discountAmount * product.quantity;
						});
					}
				});

				// Calculate income (sales - expenses)
				const orderIncome = orderSales - orderExpenses;

				// Update monthly data
				monthlyData[month].sales += orderSales;
				monthlyData[month].expenses += orderExpenses;
				monthlyData[month].income += orderIncome;
			}
		}
	});

	const chartData = Object.keys(monthlyData).map((month) => ({
		month,
		...monthlyData[month],
	}));

	const data = {
		labels: chartData.map((item) => item.month),
		datasets: [
			{
				type: "bar",
				label: "Revenue",
				data: chartData.map((item) => item.sales),
				backgroundColor: "#82ca9d",
			},
			{
				type: "bar",
				label: "Expenses",
				data: chartData.map((item) => item.expenses),
				backgroundColor: "#ffc658",
			},
			{
				type: "bar",
				label: "Income",
				data: chartData.map((item) => item.income),
				backgroundColor: "#8884d8",
				fill: false,
			},
		],
	};

	const options = {
		responsive: true,
		interaction: {
			mode: "index",
			intersect: false,
		},
		plugins: {
			legend: {
				position: "top",
			},
			tooltip: {
				callbacks: {
					label: (context) => {
						const label = context.dataset.label || "";
						const value = context.parsed.y;
						return `${label}: ${value}`;
					},
				},
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			graphRef.current
				.requestFullscreen()
				.then(() => {
					setIsFullScreen(true);
				})
				.catch((err) => {
					console.error(
						`Error attempting to enable full-screen mode: ${err.message} (${err.name})`
					);
				});
		} else {
			document.exitFullscreen().then(() => {
				setIsFullScreen(false);
			});
		}
	};

	const handleYearChange = (event) => {
		setSelectedYear(event.target.value);
	};

	return (
		<div className={`BarGraphContainer ${isFullScreen ? "fullscreen" : ""}`}>
			<div className="BarGraphHeader">
				<h2>Monthly Financial Data</h2>
				<select
					value={selectedYear}
					onChange={handleYearChange}
					className="YearSelect"
				>
					{uniqueYears.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
				<i className="fas fa-expand-arrows-alt" onClick={toggleFullScreen}></i>
			</div>
			<div className="BarCharts" ref={graphRef}>
				<Line data={data} options={options} className="LineGraph" />
			</div>
		</div>
	);
};

export default BarGraph;
