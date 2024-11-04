import React from "react";
import "./Transaction.css";

const Transaction = ({ transaction }) => {
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
								}}
							></i>
						) : (
							<i
								className="fa fa-arrow-circle-up"
								style={{
									color: `var(--error-dark)`,
								}}
							></i>
						)}
						<span
							style={{
								color:
									transaction?.category !== "Income"
										? "var(--error-darker)"
										: "var(--success-darker)",
							}}
						>
							{transaction?.amount.toLocaleString("en-US", {
								style: "currency",
								currency: "KES",
							})}
						</span>
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
