import React, { useState, useEffect } from "react";
import "./FinanceCards.css";
import FinanceCard from "../FinanceCard/FinanceCard";

const FinanceCards = ({ user, getTimeLabel, earnings }) => {
	const [admin, setAdmin] = React.useState(false);
	const admin_email = __ADMIN__;

	// Check if user is admin
	useEffect(() => {
		if (user?.email === admin_email) {
			setAdmin(true);
		}
	}, [user?.email, admin_email]);

	const userEarnings = earnings?.filter(
		(earning) => earning?.userId === user?._id || admin
	);
	const earningsArray = userEarnings?.[0]?.earnings?.map(
		(earning) => earning?.amount
	);
	const totalIncome = earningsArray
		?.reduce((a, b) => a + b, 0)
		?.toFixed(2)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	const currentMonth = new Date().getMonth();
	console.log(currentMonth);
	const currentYear = new Date().getFullYear();
	console.log(currentYear);
	const currentMonthEarnings = earningsArray
		?.filter((earning) => {
			const date = new Date(earning?.date);
			return (
				date.getMonth() === currentMonth &&
				date.getFullYear() === currentYear &&
				earning?.transactionType === "credit"
			);
		})
		?.reduce((a, b) => a + b, 0)
		?.toFixed(2)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	// get the expense for the current month
	const currentMonthExpense = earningsArray
		?.filter((earning) => {
			const date = new Date(earning?.date);
			return (
				date.getMonth() === currentMonth &&
				date.getFullYear() === currentYear &&
				earning?.transactionType === "debit"
			);
		})
		?.reduce((a, b) => a + b, 0)
		?.toFixed(2)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	// balance
	const balance = earningsArray
		?.reduce((a, b) => a + b, 0)
		?.toFixed(2)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	const data = [
		{
			title: "Total Income",
			value: `KES ${totalIncome}`,
			percentage: "10%",
			color: "var(--success-darker)",
			background: "var(--success-lighter)",
			width: "30%",
			icon: <i className="fas fa-newspaper"></i>,
		},
		{
			title: "Income",
			value: `KES ${currentMonthEarnings}`,
			percentage: "5%",
			color: "var(--warning-darker)",
			background: "var(--warning-lighter)",
			width: "30%",
			icon: <i className="fas fa-dollar-sign"></i>,
		},
		{
			title: "Expense",
			value: `KES ${currentMonthExpense}`,
			percentage: "5%",
			color: "var(--error-darker)",
			background: "var(--error-lighter)",
			width: "30%",
			icon: <i className="fas fa-dollar-sign"></i>,
		},
		{
			title: "Account Balance",
			value: `KES ${balance}`,
			percentage: "5%",
			color: "var(--white)",
			background: "var(--bg-color)",
			width: "40%",
			icon: <i className="fas fa-dollar-sign"></i>,
			account: {
				number: "1234567890",
				name: "John Doe",
			},
		},
	];
	return (
		<div className="FinanceCards">
			{data.map((data, index) => {
				return (
					<FinanceCard
						key={index}
						data={data}
						user={user}
						getTimeLabel={getTimeLabel}
					/>
				);
			})}
		</div>
	);
};

export default FinanceCards;
