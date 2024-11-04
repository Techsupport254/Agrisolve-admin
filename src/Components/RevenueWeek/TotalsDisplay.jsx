import { Badge } from "@mui/material";
import React from "react";

const TotalsDisplay = ({ totalIncome, totalExpenses }) => {
	return (
		<div className="totals-display">
			<div className="total-income">
				<p>Total income</p>
				<h3>{(totalIncome / 1000).toFixed(2)}k</h3>
			</div>
			<div className="total-expenses">
				<p>Total expenses</p>
				<h3>{(totalExpenses / 1000).toFixed(2)}k</h3>
			</div>
		</div>
	);
};

export default TotalsDisplay;
