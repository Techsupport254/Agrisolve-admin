import React from "react";
import "./Transactions.css";
import Transaction from "../Transaction/Transaction";

const Transactions = () => {
	const transactions = [
		{
			id: 1,
			title: "Sales",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
			timestamp: "2021-05-01T12:00:00.000Z",
			amount: 10000,
			type: "credit",
		},
		{
			id: 2,
			title: "Salary",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
			timestamp: "2021-05-01T12:00:00.000Z",
			amount: 10000,
			type: "credit",
		},
		{
			id: 3,
			title: "Salary",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
			timestamp: "2021-05-01T12:00:00.000Z",
			amount: 10000,
			type: "credit",
		},
		{
			id: 4,
			title: "Salary",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
			timestamp: "2021-05-01T12:00:00.000Z",
			amount: 10000,
			type: "credit",
		},
		{
			id: 5,
			title: "Salary",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
			timestamp: "2021-05-01T12:00:00.000Z",
			amount: 10000,
			type: "credit",
		},
	];
	return (
		<div className="TransactionsContainer">
			{transactions.map((transaction) => (
				<Transaction key={transaction.id} transaction={transaction} />
			))}
		</div>
	);
};

export default Transactions;
