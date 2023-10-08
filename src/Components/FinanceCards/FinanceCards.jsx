import React from "react";
import "./FinanceCards.css";
import FinanceCard from "../FinanceCard/FinanceCard";

const FinanceCards = ({ user, getTimeLabel }) => {
	const data = [
		{
			title: "Total Income",
			value: "KES 1,00,000",
			percentage: "10%",
			color: "var(--success-darker)",
			background: "var(--success-lighter)",
			width: "30%",
			// receipt
			icon: <i className="fas fa-newspaper"></i>,
		},
		{
			title: "Income",
			value: "KES 50,000",
			percentage: "5%",
			color: "var(--warning-darker)",
			background: "var(--warning-lighter)",
			width: "30%",
			icon: <i className="fas fa-dollar-sign"></i>,
		},
		{
			title: "Expense",
			value: "KES 50,000",
			percentage: "5%",
			color: "var(--error-darker)",
			background: "var(--error-lighter)",
			width: "30%",
			icon: <i className="fas fa-dollar-sign"></i>,
		},
		{
			title: "Account Balance",
			value: "KES 50,000",
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
