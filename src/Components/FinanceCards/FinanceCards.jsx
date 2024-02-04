import React from "react";
import "./FinanceCards.css";
import AnalyticsGraph from "../AnalyticsGraph/AnalyticsGraph";
import Balance from "../Balance/Balance";

const FinanceCards = ({ user, earnings, balance, earning }, { users }) => {
	return (
		<div className="FinanceCards">
			<Balance
				user={user}
				earnings={earnings}
				balance={balance}
				earning={earning}
			/>
			<AnalyticsGraph
				user={user}
				users={users}
				earnings={earnings}
				balance={balance}
				earning={earning}
			/>
		</div>
	);
};

export default FinanceCards;
