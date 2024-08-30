import React, { useEffect, useState } from "react";
import "./Cards.css";
import Card from "../Card/Card";
import PropTypes from "prop-types";
import axios from "axios";

const Cards = ({ user }) => {
	const admin_email = __ADMIN__;

	const [isAdmin, setAdmin] = useState(false);
	const [cardData, setCardData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setAdmin(user?.email === admin_email);
	}, [user?.email, admin_email]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				const url = isAdmin
					? "http://localhost:8000/analytics/average/admin"
					: `http://localhost:8000/analytics/average/user/${user?._id}`;

				const response = await axios.get(url);
				const data = response.data;

				const { averages } = data;
				console.log(averages);

				const overallIncome = averages?.overall?.averageIncome || 0;
				const overallSales = averages?.overall?.averageSales || 0;
				const overallExpenses = averages?.overall?.averageExpenses || 0;

				const currentMonthIncome = averages?.currentMonth?.averageIncome || 0;
				const currentMonthSales = averages?.currentMonth?.averageSales || 0;
				const currentMonthExpenses =
					averages?.currentMonth?.averageExpenses || 0;

				// Debugging: Log the exact values being used
				console.log({
					overallIncome,
					overallSales,
					overallExpenses,
					currentMonthIncome,
					currentMonthSales,
					currentMonthExpenses,
				});

				const preparedCardData = [
					{
						id: 1,
						title: "Average Income",
						icon: "fas fa-dollar-sign",
						value: overallIncome.toFixed(2), // fixed here
						barValue: currentMonthIncome.toFixed(2), // fixed here
						color: {
							backGround: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
							boxShadow: "0px 10px 20px 0px #F9D59B",
						},
						series: [
							{
								name: "Income",
								data: [overallIncome, currentMonthIncome],
							},
						],
					},
					{
						id: 2,
						title: "Average Sales",
						icon: "fas fa-shopping-cart",
						value: overallSales.toFixed(2), // fixed here
						barValue: currentMonthSales.toFixed(2), // fixed here
						color: {
							backGround: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
							boxShadow: "0px 10px 20px 0px #FDC0C7",
						},
						series: [
							{
								name: "Sales",
								data: [overallSales, currentMonthSales],
							},
						],
					},
					{
						id: 3,
						title: "Average Expenses",
						icon: "fas fa-money-bill-wave",
						value: overallExpenses.toFixed(2), // fixed here
						barValue: currentMonthExpenses.toFixed(2), // fixed here
						color: {
							backGround: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
							boxShadow: "0px 10px 20px 0px #e0c6f5",
						},
						series: [
							{
								name: "Expenses",
								data: [overallExpenses, currentMonthExpenses],
							},
						],
					},
				];

				setCardData(preparedCardData);
			} catch (error) {
				console.error("Error fetching data:", error);
				setError("Unable to fetch data. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [isAdmin, user?._id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div className="Error">{error}</div>;
	}

	if (cardData.length === 0) {
		return <div>No data available</div>;
	}

	return (
		<div className="Cards">
			{cardData.map((card) => (
				<Card
					key={card.id}
					title={card.title}
					value={card.value}
					barValue={card.barValue}
					icon={card.icon}
					color={card.color}
					series={card.series}
				/>
			))}
		</div>
	);
};

export default Cards;

// props validation
Cards.propTypes = {
	user: PropTypes.shape({
		email: PropTypes.string.isRequired,
		_id: PropTypes.string.isRequired,
	}).isRequired,
};
