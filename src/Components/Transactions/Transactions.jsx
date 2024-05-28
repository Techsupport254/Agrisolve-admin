import React, { useState, useEffect } from "react";
import "./Transactions.css";
import Transaction from "../Transaction/Transaction";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Transactions = ({ earnings, user, users, totalExpense, totalIncome }) => {
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
	const userId = userEarnings?.[0]?.userId;
	const transactions = userEarnings?.[0]?.earnings;
	Array && transactions?.sort((a, b) => new Date(b.date) - new Date(a.date));

	const transactionsData = [
		{
			id: 1,
			reason: "Salary",
			date: "2024-01-01",
			description: "Salary Received",
			amount: 2500.0,
			category: "Income",
		},
		{
			id: 2,
			date: "2024-01-03",
			description: "Grocery Shopping",
			amount: 150.5,
			category: "Expense",
		},
		{
			id: 3,
			date: "2024-01-05",
			description: "Freelance Payment",
			amount: 800.0,
			category: "Income",
		},
		{
			id: 4,
			date: "2024-01-07",
			description: "Monthly Rent",
			amount: 1200.0,
			category: "Expense",
		},
		{
			id: 5,
			date: "2024-01-10",
			description: "Gym Membership",
			amount: 45.0,
			category: "Expense",
		},
		{
			id: 6,
			date: "2024-01-12",
			description: "Dividend Income",
			amount: 120.0,
			category: "Income",
		},
		{
			id: 7,
			date: "2024-01-15",
			description: "Dining Out",
			amount: 60.75,
			category: "Expense",
		},
		{
			id: 8,
			date: "2024-01-18",
			description: "Car Insurance",
			amount: 200.0,
			category: "Expense",
		},
		{
			id: 9,
			reason: "Purchases",
			date: "2024-01-20",
			description: "Book Purchase",
			amount: 15.99,
			category: "Expense",
		},
		{
			id: 10,
			date: "2024-01-23",
			description: "Online Course Subscription",
			amount: 30.0,
			category: "Expense",
		},
		{
			id: 11,
			date: "2024-01-25",
			description: "Interest Income",
			amount: 50.0,
			category: "Income",
		},
	];
	// Prepare data for pie chart
	const pieChartData = {
		labels: ["Total Income", "Total Expenses"],
		datasets: [
			{
				label: "Income vs Expenses",
				data: [totalIncome, -totalExpense],
				backgroundColor: ["#82ca9d", "#ffc658", "#8884d8"],
				borderColor: ["#fff", "#fff", "#fff"],
				borderWidth: 2,
			},
		],
	};
	return (
		<div className="TransactionsContainer">
			<div className="TransactionsLeft">
				{Array &&
					transactionsData?.map((transaction) => (
						<Transaction
							key={transaction.id}
							transaction={transaction}
							admin={admin}
							userId={userId}
							users={users}
						/>
					))}
			</div>
			<div className="TransactionsRight">
				<div className="RequestedAmount">
					<div className="Header">
						<h3>Requested</h3>
					</div>
					<span>KES. {totalIncome}</span>
					<small>Expected: {new Date().toLocaleDateString()}</small>
				</div>
				<div className="AnalysisChart">
					<div className="Header">
						<h3>Income vs. Expenses</h3>
					</div>
					<Pie className="PieChart" data={pieChartData} />
				</div>
			</div>
		</div>
	);
};

export default Transactions;
