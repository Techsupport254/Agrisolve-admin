import React from "react";
import "./OrderHistory.css";
import {
	Badge,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";

const OrderHistory = ({ order, getTimeLabel }) => {
	const steps = [
		{
			label: "Order Placed",
			date: order?.datePlaced,
		},
		{
			label: "Order Confirmed",
			date: order?.dateConfirmed,
		},
		{
			label: "Order Shipped",
			date: order?.dateShipped,
		},
		{
			label: "Order Delivered",
			date: order?.dateDelivered,
		},
	];

	const timeHistory = [
		{
			label: "Order Placed",
			date: order?.date,
		},
		{
			label: "Order Confirmed",
			date: order?.dateConfirmed,
		},
		{
			label: "Order Shipped",
			date: order?.dateShipped,
		},
		{
			label: "Order Delivered",
			date: order?.dateDelivered,
		},
	];

	const getStatusStep = () => {
		switch (order?.status) {
			case "Pending":
				return 0;
			case "Approved":
				return 1;
			case "OnWay":
				return 2;
			case "Delivered":
				return 3;
			default:
				return 0;
		}
	};

	const currentStep = getStatusStep();

	return (
		<div className="OrderHistory">
			<div className="Header">
				<h3>Order History</h3>
			</div>
			<div className="HistoryCont">
				<div className="HistoryRight">
					<Stepper orientation="vertical" activeStep={currentStep}>
						{steps.map((step, index) => (
							<Step
								key={index}
								connector={<StepConnector />}
								completed={index < currentStep}
								disabled={index > currentStep}
							>
								<StepLabel
									className="StepLabel"
									icon={
										<Badge
											variant="dot"
											color={index === currentStep ? "success" : "secondary"}
											className="Badge"
											style={{ backgroundColor: "var(--bg-color)" }}
										/>
									}
								>
									{step.label}
								</StepLabel>
								<StepContent>
									<Typography
										className={`Typography ${
											index <= currentStep ? "show" : "hide"
										}`}
									>
										{order?.date
											? new Date(order.date)
													.toLocaleString("en-US", {
														year: "numeric",
														month: "short",
														day: "numeric",
														hour: "numeric",
														minute: "numeric",
														hour12: true,
													})
													.replace(/,/g, "")
											: "Not Available"}
									</Typography>
								</StepContent>
							</Step>
						))}
					</Stepper>
				</div>
				<div className="HistoryLeft">
					<div className="TimeLine">
						{timeHistory.map((step, index) => (
							<div
								key={index}
								className={`TimeLineItem ${
									index <= currentStep ? "show" : "hide"
								}`}
							>
								<span>{step.label}</span>
								<p>{getTimeLabel(step.date)}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const StepConnector = () => <div className="connector-line"></div>;

export default OrderHistory;
