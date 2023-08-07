import React from "react";
import "./BillingPlan.css";

const BillingPlan = ({ user }) => {
	const plans = [
		{
			name: "Basic",
			price: 0,
			icon: <i class="fa-solid fa-layer-group"></i>,
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
			icon: <i class="fa-solid fa-layer-group"></i>,
			current: true,
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
			icon: <i class="fa-solid fa-layer-group"></i>,
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
			<div className="PlanCards">
				{plans.map((plan, index) => (
					<div className="BillingPlanCard" key={index}>
						<div className="CurrentPlan">
							{plan.current && (
								<div className="Plan">
									<i className="fas fa-star"></i>
									<p>Current</p>
								</div>
							)}
						</div>

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
			<div className="BillingBottom">
				<div className="BillingRow">
					<p>Current Plan</p>
					<span>{plans.find((plan) => plan.current).name}</span>
				</div>
				<div className="BillingRow">
					<p>Billing Name</p>
					<span>{user?.name}</span>
				</div>
				<div className="BillingRow">
					<p>Billing Email</p>
					<span>{user?.email}</span>
				</div>
				<div className="BillingRow">
					<p>Billing Phone</p>
					<span>{user?.phone}</span>
				</div>
			</div>
			<div className="BillingBtns">
				<button className="BillingBtn Danger-Btn">Cancel Plan</button>
				<button className="BillingBtn SuccessBtn">Change Plan</button>
			</div>
		</div>
	);
};

export default BillingPlan;
