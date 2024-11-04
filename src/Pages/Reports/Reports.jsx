import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reports.css";
import AnalyticsCards from "../../Components/AnalyticsCards/AnalyticsCards";
import News from "../../Components/News/News";
import History from "../../Components/History/History";
import RevenueWeek from "../../Components/RevenueWeek/RevenueWeek";
import TopProducts from "../../Components/TopProducts/TopProducts";
import CustomersInsights from "../../Components/CustomersInsights/CustomersInsights";

const Reports = ({ getTimeLabel, users, products, earnings, orders }) => {
	const [newsData, setNewsData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [analyticsData, setAnalyticsData] = useState([]);

	useEffect(() => {
		setLoading(true);

		// Fetch news data
		axios
			.get("http://localhost:8000/news")
			.then((res) => {
				setNewsData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});

		// Fetch orders and generate analytics data
		const fetchOrdersAndGenerateAnalytics = async () => {
			try {
				const token = "Bearer " + localStorage.getItem("token");
				const response = await axios.get("http://localhost:8000/order", {
					headers: { Authorization: token },
				});

				const orders = response.data;

				// Calculate total products sold
				const totalProductsSold = orders.reduce(
					(sum, order) =>
						sum +
						order.products.reduce(
							(productSum, product) => productSum + product.quantity,
							0
						),
					0
				);

				// Calculate total revenue
				const totalRevenue = orders.reduce(
					(sum, order) => sum + order.amounts.totalAmount,
					0
				);

				// Calculate total profits
				const totalProfits = totalRevenue * 0.1;

				// Calculate total customers served
				const totalCustomersServed = orders.length;

				// Calculate percentage changes
				const previousWeekProductsSold = Math.floor(totalProductsSold * 0.97); // Example: last week sales were 3% less
				const productsSoldChange =
					((totalProductsSold - previousWeekProductsSold) /
						previousWeekProductsSold) *
					100;

				const previousMonthRevenue = Math.floor(totalRevenue * 1.04); // Example: last month revenue was 4% higher
				const revenueChange =
					((totalRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;

				const previousQuarterProfits = Math.floor(totalProfits * 1.02); // Example: last quarter profits were 2% higher
				const profitsChange =
					((totalProfits - previousQuarterProfits) / previousQuarterProfits) *
					100;

				const previousYearCustomersServed = Math.floor(
					totalCustomersServed * 0.95
				); // Example: last year customers served were 5% less
				const customersServedChange =
					((totalCustomersServed - previousYearCustomersServed) /
						previousYearCustomersServed) *
					100;

				// Generate smooth path data for the graph using cubic Bézier curves
				const generateSmoothPath = (points) => {
					let d = `M ${points[0].x},${points[0].y}`;
					for (let i = 1; i < points.length; i++) {
						const p0 = points[i - 1];
						const p1 = points[i];
						const controlPointX = (p0.x + p1.x) / 2;
						d += ` C ${controlPointX},${p0.y} ${controlPointX},${p1.y} ${p1.x},${p1.y}`;
					}
					return d;
				};

				const generateGraphPoints = (numPoints) => {
					const points = [];
					for (let i = 0; i < numPoints; i++) {
						const x = (i / (numPoints - 1)) * 80;
						const y = Math.random() * 50;
						points.push({ x, y });
					}
					return generateSmoothPath(points);
				};

				// format amount currency
				const formatter = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "kes",
				}).format;

				// Set analytics data
				setAnalyticsData([
					{
						id: 1,
						title: "Product sold",
						value: totalProductsSold.toString(),
						statistic: (
							<div style={{ display: "flex", alignItems: "center" }}>
								<div
									style={{
										backgroundColor: "var(--success-lighter)",
										borderRadius: "50%",
										width: "1.5rem",
										height: "1.5rem",
										padding: "0.2rem",
										alignItems: "center",
										justifyContent: "center",
										marginRight: "5px",
									}}
								>
									<svg
										viewBox="-1.6 -1.6 19.20 19.20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										stroke="#10b981"
										strokeWidth="0.00016"
										transform="rotate(0)"
									>
										<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
										<g
											id="SVGRepo_tracerCarrier"
											strokeLinecap="round"
											strokeLinejoin="round"
											stroke="#CCCCCC"
											strokeWidth="0.128"
										></g>
										<g id="SVGRepo_iconCarrier">
											<path
												d="M10 3L9.00001 4L11.2929 6.29289L8.50001 9.08579L5.50001 6.08579L0.292908 11.2929L1.70712 12.7071L5.50001 8.91421L8.50001 11.9142L12.7071 7.70711L15 10L16 9L16 3H10Z"
												fill="var(--success-dark)"
											></path>
										</g>
									</svg>
								</div>
								<span>{productsSoldChange.toFixed(1)}% last week</span>
							</div>
						),
						graph: (
							<svg width="80" height="50" xmlns="http://www.w3.org/2000/svg">
								<path
									fill="none"
									stroke="#10b981"
									strokeWidth="1.5"
									d={generateGraphPoints(5)}
								/>
							</svg>
						),
					},
					{
						id: 2,
						title: "Total Revenue",
						value: `${formatter(totalRevenue)}`,
						statistic: (
							<div style={{ display: "flex", alignItems: "center" }}>
								<div
									style={{
										backgroundColor: "#fee2e2",
										borderRadius: "50%",
										width: "1.5rem",
										height: "1.5rem",
										padding: "0.2rem",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										marginRight: "5px",
									}}
								>
									<svg
										viewBox="-1.6 -1.6 19.20 19.20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										stroke="#ef4444"
										strokeWidth="0.00016"
										transform="rotate(60)"
									>
										<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
										<g
											id="SVGRepo_tracerCarrier"
											strokeLinecap="round"
											strokeLinejoin="round"
											stroke="#CCCCCC"
											strokeWidth="0.128"
										></g>
										<g id="SVGRepo_iconCarrier">
											<path
												d="M10 3L9.00001 4L11.2929 6.29289L8.50001 9.08579L5.50001 6.08579L0.292908 11.2929L1.70712 12.7071L5.50001 8.91421L8.50001 11.9142L12.7071 7.70711L15 10L16 9L16 3H10Z"
												fill="#ef4444"
											></path>
										</g>
									</svg>
								</div>
								<span>{revenueChange.toFixed(1)}% last month</span>
							</div>
						),
						graph: (
							<svg width="80" height="50" xmlns="http://www.w3.org/2000/svg">
								<path
									fill="none"
									stroke="#1d4ed8"
									strokeWidth="1.5"
									d={generateGraphPoints(5)}
								/>
							</svg>
						),
					},
					{
						id: 3,
						title: "Total Profits",
						value: `${formatter(totalProfits)}`,
						statistic: (
							<div style={{ display: "flex", alignItems: "center" }}>
								<div
									style={{
										backgroundColor: "#fee2e2",
										borderRadius: "50%",
										width: "1.5rem",
										height: "1.5rem",
										padding: "0.2rem",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										marginRight: "5px",
									}}
								>
									<svg
										viewBox="-1.6 -1.6 19.20 19.20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										stroke="#ef4444"
										strokeWidth="0.00016"
										transform="rotate(60)"
									>
										<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
										<g
											id="SVGRepo_tracerCarrier"
											strokeLinecap="round"
											strokeLinejoin="round"
											stroke="#CCCCCC"
											strokeWidth="0.128"
										></g>
										<g id="SVGRepo_iconCarrier">
											<path
												d="M10 3L9.00001 4L11.2929 6.29289L8.50001 9.08579L5.50001 6.08579L0.292908 11.2929L1.70712 12.7071L5.50001 8.91421L8.50001 11.9142L12.7071 7.70711L15 10L16 9L16 3H10Z"
												fill="#ef4444"
											></path>
										</g>
									</svg>
								</div>
								<span>{profitsChange.toFixed(1)}% this quarter</span>
							</div>
						),
						graph: (
							<svg width="80" height="50" xmlns="http://www.w3.org/2000/svg">
								<path
									fill="none"
									stroke="#ef4444"
									strokeWidth="1.5"
									d={generateGraphPoints(5)}
								/>
							</svg>
						),
					},
				]);
			} catch (err) {
				console.error("Error fetching orders:", err);
			}
		};

		fetchOrdersAndGenerateAnalytics();
	}, []);

	console.log(earnings);

	return (
		<div className="Reports">
			<div className="Header">
				<i className="fa fa-chart-line"></i>
				<h1>Analytics</h1>
			</div>
			<div className="AnalyticsTop">
				<AnalyticsCards analyticsData={analyticsData} />
			</div>
			<div className="ReportsBottom">
				<div className="ReportsBottomLeft">
					<div className="RevenueWeek">
						<RevenueWeek earnings={earnings} getTimeLabel={getTimeLabel} />
					</div>
					<TopProducts
						products={products}
						users={users}
						getTimeLabel={getTimeLabel}
					/>
				</div>
				<div className="ReportsBottomRight">
					<div className="News">
						<div className="Header">
							<i className="fa fa-newspaper"></i>
							<h1>News</h1>
						</div>
						<News
							news={newsData}
							getTimeLabel={getTimeLabel}
							loading={loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Reports;
