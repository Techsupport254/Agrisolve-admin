import React, { useState, useEffect } from "react";
import "./Transactions.css";
import Transaction from "../Transaction/Transaction";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Transactions = ({ earnings, user, users, totalExpense, totalIncome }) => {
	const [admin, setAdmin] = useState(false);
	const admin_email = __ADMIN__;

	// Check if user is admin
	useEffect(() => {
		if (user?.email === admin_email) {
			setAdmin(true);
		}
	}, [user?.email, admin_email]);

	const userEarnings = earnings?.filter(
		(earning) => earning?.userId === user?.id || admin
	);

	// Flatten data to match the desired transactionsData format
	const flattenData = (data) => {
		let transactions = [];

		data.forEach((earningData, index) => {
			// Extract earnings transactions
			earningData.earnings.forEach((earning, earningIndex) => {
				transactions.push({
					id: transactions.length + 1,
					date: new Date(earning.date).toISOString().split("T")[0], // Format date to YYYY-MM-DD
					description: earning.reason,
					amount: earning.netAmount,
					category: "Income",
				});
			});

			// Extract payment history transactions
			earningData.paymentHistory.forEach((payment, paymentIndex) => {
				transactions.push({
					id: transactions.length + 1,
					date: new Date(payment.date).toISOString().split("T")[0], // Format date to YYYY-MM-DD
					description: payment.notes,
					amount: payment.amount,
					category: payment.amount > 0 ? "Income" : "Expense",
				});

				// Handle payment timeline if needed (e.g., reversals)
				payment.timeline.forEach((timelineEntry) => {
					transactions.push({
						id: transactions.length + 1,
						date: new Date(timelineEntry.date).toISOString().split("T")[0], // Format date to YYYY-MM-DD
						description: timelineEntry.notes,
						amount: timelineEntry.amount,
						category: timelineEntry.amount > 0 ? "Income" : "Expense",
					});
				});
			});
		});

		return transactions;
	};

	// Flattened transactions data
	const transactionsData = flattenData(userEarnings || []);

	// Prepare data for pie chart
	const pieChartData = {
		labels: ["Total Income", "Total Expenses"],
		datasets: [
			{
				label: "Income vs Expenses",
				data: [totalIncome, totalExpense],
				backgroundColor: ["#82ca9d", "#ffc658", "#8884d8"],
				borderColor: ["#fff", "#fff", "#fff"],
				borderWidth: 2,
			},
		],
	};

	// Get the latest requested payment that has not been paid
	const requestedPayment = userEarnings
		?.flatMap((earning) => earning.paymentHistory)
		?.filter((payment) => payment.paymentStatus !== "Paid")
		?.reduce((latest, current) => {
			const currentDate = new Date(current.date);
			const latestDate = latest ? new Date(latest.date) : new Date(0);
			return currentDate > latestDate ? current : latest;
		}, null);

	// Format the expected payment date
	const expectedPaymentDate = (requestDate) => {
		const date = new Date(requestDate);
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();

		if (day >= 14 && day <= 18) {
			date.setDate(18);
		} else {
			const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
			if (day >= lastDayOfMonth - 1 || day <= 3) {
				if (day <= 3) {
					date.setDate(
						5
					);
				} else {
					date.setDate(lastDayOfMonth + 5);
				}
			}
		}
		return date.toDateString();
	};

	const formatNumber = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "KES",
	}).format;

	return (
		<div className="TransactionsContainer">
			<div className="TransactionsLeft">
				{transactionsData?.map((transaction) => (
					<Transaction key={transaction.id} transaction={transaction} />
				))}
			</div>
			<div className="TransactionsRight">
				<div className="RequestedAmount">
					<div className="Header">
						<h3>Requested Payment</h3>
					</div>
					{requestedPayment ? (
						<>
							<span>{formatNumber(requestedPayment.amount)}</span>
							<small>
								Expected: {expectedPaymentDate(requestedPayment.date)}
							</small>
						</>
					) : (
						<small>No pending payment requests</small>
					)}
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
