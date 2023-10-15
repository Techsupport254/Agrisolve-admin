import React from "react";
import "./Transaction.css";

const Transaction = ({ transaction, admin, userId, users }) => {
	// filter the user
	const user = users?.filter((user) => user._id === userId);
	return (
		<div className="Transaction">
			<div className="TransactionTitle">
				<h3>{transaction?.reason}</h3>
				<p>
					{new Date(transaction.date).toLocaleDateString("en-US", {
						day: "numeric",
						month: "short",
						year: "numeric",
						hour: "numeric",
						minute: "numeric",
					})}
				</p>
			</div>
			<div className="TransactionDescription">
				<span>Kes. {transaction.amount}</span>
				<div className="TBottom">
					<p>{admin ? user?.[0]?.email : null}</p>
					<small>{transaction.transactionType}</small>
				</div>
			</div>
		</div>
	);
};

export default Transaction;
