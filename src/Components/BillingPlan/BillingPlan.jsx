import React from "react";
import "./BillingPlan.css";

const BillingPlan = () => {
	const plans = [
		{
			name: "Basic",
			price: 0,
			icon: <i className="fa fa-user"></i>,
			features: [
				"1 Workspace",
				"Unlimited Traffic",
				"Unlimited Transfer",
				"10GB Storage",
				"Max 20GB Bandwidth",
				"Security Suite",
				"Personalized subdomain",
				"Max 20GB Bandwidth",
				"Max 20GB Bandwidth",
			],
		},
		{
			name: "Starter",
			price: 500,
			icon: <i className="fa fa-user"></i>,
			features: [
				"1 Workspace",
				"Unlimited Traffic",
				"Unlimited Transfer",
				"10GB Storage",
				"Max 20GB Bandwidth",
				"Security Suite",
				"Personalized subdomain",
				"Max 20GB Bandwidth",
				"Max 20GB Bandwidth",
			],
		},
		{
			name: "Premium",
			price: 1000,
			icon: <i className="fa fa-user"></i>,
			features: [
				"1 Workspace",
				"Unlimited Traffic",
				"Unlimited Transfer",
				"10GB Storage",
				"Max 20GB Bandwidth",
				"Security Suite",
				"Personalized subdomain",
				"Max 20GB Bandwidth",
				"Max 20GB Bandwidth",
			],
		},
	];

	return (
		<div className="BillingPlan">
			{plans.map((plan, index) => (
				<div className="BillingPlanCard" key={index}>
					<div className="Icon">{plan.icon}</div>
					<div className="Header">
						<h1>{plan.name}</h1>
					</div>
					<div className="BillingPrice">
						{plan.price === 0 ? (
							<p>Free</p>
						) : (
							<>
								<p>KSh. {plan.price}</p>&nbsp;
								<span>/month</span>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default BillingPlan;
