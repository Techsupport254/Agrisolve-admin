import React from "react";
import "./FinanceCards.css";
import AnalyticsGraph from "../AnalyticsGraph/AnalyticsGraph";
import Balance from "../Balance/Balance";

const FinanceCards = ({
	user,
	users,
	earnings,
	balance,
	totalEarnings,
	netEarnings,
	totalExpenses,
}) => {
	return (
		<div className="FinanceCards">
			<Balance
				user={user}
				earnings={earnings}
				balance={balance}
				totalEarnings={totalEarnings}
				netEarnings={netEarnings}
				totalExpenses={totalExpenses}
			/>
			<AnalyticsGraph
				user={user}
				users={users}
				earnings={earnings}
				balance={balance}
				totalEarnings={totalEarnings}
				netEarnings={netEarnings}
				totalExpenses={totalExpenses}
			/>
		</div>
	);
};

export default FinanceCards;
