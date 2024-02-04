import React from "react";
import "./Finance.css";
import FinanceCards from "../../Components/FinanceCards/FinanceCards";
import Transactions from "../../Components/Transactions/Transactions";
import FinanceRight from "../../Components/FinanceRight/FinanceRight";

const Finance = ({ user, getTimelabel, earnings, users }) => {
	// Utility function to format numbers with commas
	const formatNumberWithCommas = (number) => {
		return number.toLocaleString();
	};

	// get the current month
	const todayMonth = new Date().getMonth() + 1;
	const earning = earnings[todayMonth - 1];

	// Ensure income and expense are numbers and compute balance
	const income = Number(earning?.income) || 0; // Coerce to number, default to 0 if undefined
	const expense = Number(earning?.expense) || 0; // Coerce to number, default to 0 if undefined
	const balance = income - expense;

	// Calculate total income and expenses
	const totalIncome = earnings?.reduce(
		(acc, curr) => acc + Number(curr.income || 0),
		0
	);
	const totalExpense = earnings?.reduce(
		(acc, curr) => acc + Number(curr.expense || 0),
		0
	);

	return (
		<div className="Finance">
			<div className="Header">
				<i className="fa fa-chart-line"></i>
				<h3>Finance</h3>
			</div>
			<div className="FinanceContainer">
				<div className="FinanceLeft">
					<FinanceCards
						user={user}
						getTimelabel={getTimelabel}
						earnings={earnings}
						users={users}
						earning={earning}
						balance={balance}
					/>
					<div className="Transactions">
						<div className="Header">
							<i className="fa fa-history"></i>
							<h3>Transactions</h3>
						</div>
						<Transactions
							user={user}
							users={users}
							getTimelabel={getTimelabel}
							earnings={earnings}
							totalExpense={totalExpense}
							totalIncome={totalIncome}
						/>
					</div>
				</div>
				<FinanceRight
					user={user}
					getTimelabel={getTimelabel}
					earnings={earnings}
					balance={formatNumberWithCommas(balance)}
					totalExpense={formatNumberWithCommas(totalExpense)}
					totalIncome={formatNumberWithCommas(totalIncome)}
				/>
			</div>
		</div>
	);
};

export default Finance;
