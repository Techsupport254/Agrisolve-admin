import React from "react";
import "./Transaction.css";

const Transaction = ({ transaction, admin, userId, users }) => {
	// filter the user
	const user = users?.filter((user) => user._id === userId);
	return (
		<div className="Transaction">
			<div className="TransactionDescription">
				<div className="TransactionDescriptionLeft">
					<h3>{transaction?.reason}</h3>
					<span>
						{transaction?.category != "Expense" ? (
							<i
								className="fa fa-arrow-circle-down"
								style={{
									color: `var(--success-darker)`,
									background: `var(--success-lighter)`,
								}}
							></i>
						) : (
							<i
								className="fa fa-arrow-circle-up"
								style={{
									color: `var(--error-darker)`,
									background: `var(--error-lighter)`,
								}}
							></i>
						)}
						Kes. {transaction?.amount}
					</span>
					<p>{transaction?.description}</p>
				</div>
				<div className="TBottom">
					<div className="TransactionTitle">
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
					<>
						<p>{admin ? user?.[0]?.email : null}</p>
						<small
							style={{
								color:
									transaction?.category !== "Income"
										? "var(--error-darker)"
										: "var(--success-darker)",
								background:
									transaction?.category !== "Income"
										? "var(--error-lighter)"
										: "var(--success-lighter)",
							}}
						>
							{transaction?.category}
						</small>
					</>
				</div>
			</div>
		</div>
	);
};

export default Transaction;
