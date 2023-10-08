import React from "react";
import "./Transaction.css";

const Transaction = ({ transaction }) => {
	return (
		<div className="Transaction">
			<div className="TransactionTitle">
				<h3>{transaction.title}</h3>
				<p>
					{new Date(transaction.timestamp).toLocaleDateString("en-US", {
						day: "numeric",
						month: "short",
					})}
				</p>
			</div>
			<div className="TransactionDescription">
				<p>{transaction.description}</p>
				<span>Kes. {transaction.amount}</span>
				<small>{transaction.type}</small>
			</div>
		</div>
	);
};

export default Transaction;
