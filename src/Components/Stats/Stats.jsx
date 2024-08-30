import React, { useEffect, useState } from "react";
import "./Stats.css";
import BarGraph from "../BarGraph/BarGraph";
import PieChart from "../PieChart/PieChart";
import axios from "axios";

const Stats = ({ orders, user }) => {
	const adminEmail = __ADMIN__;
	const isAdmin = user?.email === adminEmail;

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const url = isAdmin
					? "http://localhost:8000/analytics/average/admin"
					: `http://localhost:8000/analytics/average/user/${user?._id}`;

				const response = await axios.get(url);
				const { averages } = response.data;

				const totalIncome = parseFloat(averages?.overall?.averageIncome) || 0;
				const totalSales = parseFloat(averages?.overall?.averageSales) || 0;
				const totalExpenses =
					parseFloat(averages?.overall?.averageExpenses) || 0;

				const barIncome = parseFloat(averages?.currentMonth?.totalIncome) || 0;
				const barSales = parseFloat(averages?.currentMonth?.totalSales) || 0;
				const barExpenses =
					parseFloat(averages?.currentMonth?.totalExpenses) || 0;

				setData([
					{ title: "Total Income", value: totalIncome.toFixed(2) },
					{ title: "Total Sales", value: totalSales.toFixed(2) },
					{ title: "Total Expenses", value: totalExpenses.toFixed(2) },
					{ title: "Income", value: barIncome.toFixed(2) },
					{ title: "Sales", value: barSales.toFixed(2) },
					{ title: "Expenses", value: barExpenses.toFixed(2) },
				]);
			} catch (error) {
				console.error("Error fetching data:", error);
				setError("Unable to fetch data. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [isAdmin, user?._id]);

	return (
		<div className="StatsContainer">
			{loading && <div>Loading...</div>}
			{error && <div className="Error">{error}</div>}
			{!loading && !error && (
				<>
					<div className="StatsLeft">
						<BarGraph orders={orders} userData={data} />
					</div>
					<div className="StatsRight">
						<PieChart orders={orders} userData={data} />
					</div>
				</>
			)}
		</div>
	);
};

export default Stats;
