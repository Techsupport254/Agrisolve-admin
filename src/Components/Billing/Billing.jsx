import React from "react";
import "./Billing.css";
import BillingPlan from "../BillingPlan/BillingPlan";

const Billing = ({ user }) => {
	return (
		<div className="Billing">
			<div className="BillingLeft">
				<div className="Header">
					<h1>Plan</h1>
				</div>
				<BillingPlan />
			</div>
			<div className="BillingRight"></div>
		</div>
	);
};

export default Billing;
