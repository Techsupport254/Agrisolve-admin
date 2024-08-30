import React from "react";
import "./OrderHistory.css";
import {
	Badge,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
	StepConnector,
} from "@mui/material";

const OrderHistory = ({ order, getTimeLabel }) => {
	// Function to get badge color based on status
	const getBadgeColor = (status) => {
		switch (status) {
			case "Confirmed":
				return "primary";
			case "Out for Delivery":
				return "secondary";
			case "Delivered":
				return "success";
			default:
				return "warning";
		}
	};

	// Define the steps explicitly
	const steps = [
		{
			label: "Order Placed",
			date:
				order?.timeline?.find((t) => t.type === "Pending")?.date ||
				order?.createdAt,
			color: "warning",
		},
		{
			label: "Confirmed",
			date: order?.timeline?.find((t) => t.type === "Confirmed")?.date,
			color: getBadgeColor("Confirmed"),
		},
		{
			label: "Out for Delivery",
			date: order?.timeline?.find((t) => t.type === "Out for Delivery")?.date,
			color: getBadgeColor("Out for Delivery"),
		},
		{
			label: "Delivered",
			date: order?.timeline?.find((t) => t.type === "Delivered")?.date,
			color: getBadgeColor("Delivered"),
		},
	];

	const getCurrentStep = () => {
		const statuses = [
			"Order Placed",
			"Confirmed",
			"Out for Delivery",
			"Delivered",
		];
		const currentStatus =
			order?.timeline?.length > 0
				? order.timeline[order.timeline.length - 1].type
				: "Order Placed";
		return statuses.indexOf(currentStatus);
	};

	const currentStep = getCurrentStep();

	return (
		<div className="OrderHistory">
			<div className="Header">
				<h3>Order History</h3>
			</div>
			<div className="HistoryCont">
				<div className="HistoryRight">
					<Stepper orientation="vertical" activeStep={currentStep}>
						{steps.map((step, index) => (
							<Step key={index}>
								<StepLabel
									className="StepLabel"
									icon={
										<Badge variant="dot" color={step.color} className="Badge" />
									}
								>
									{step.label}
								</StepLabel>
								<StepContent>
									<Typography className="Typography">
										{step?.date
											? getTimeLabel(step.date)
											: "Order has not reached this step"}
									</Typography>
								</StepContent>
							</Step>
						))}
					</Stepper>
				</div>
				<div className="HistoryLeft">
					<div className="TimeLine">
						<div className="Header">
							<h3>Customer Note</h3>
						</div>
						<p>{order?.notes}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderHistory;
