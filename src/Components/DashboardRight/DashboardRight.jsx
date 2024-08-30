import React, { useState, useEffect } from "react";
import "./DashboardRight.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Avatar } from "@mui/material";
import clsx from "clsx";
import PropTypes from "prop-types";

const DashboardRight = ({ users, orders }) => {
	const orderStatusCounts = {
		Pending: 0,
		Confirmed: 0,
		"Out for Delivery": 0,
		Delivered: 0,
		Cancelled: 0,
	};

	if (orders.length > 0) {
		orders.forEach((order) => {
			const latestStatus = order.timeline[order.timeline.length - 1].type;
			if (orderStatusCounts.hasOwnProperty(latestStatus)) {
				orderStatusCounts[latestStatus]++;
			}
		});
	}

	const orderSummaryData = {
		labels: [
			"Pending",
			"Confirmed",
			"Out for Delivery",
			"Delivered",
			"Cancelled",
		],
		datasets: [
			{
				label: "Order Summary",
				data: [
					orderStatusCounts["Pending"],
					orderStatusCounts["Confirmed"],
					orderStatusCounts["Out for Delivery"],
					orderStatusCounts["Delivered"],
					orderStatusCounts["Cancelled"],
				],
				backgroundColor: [
					"#FFCE56",
					"#36A2EB",
					"#6c757d",
					"#198754",
					"#FF6384",
				],
				borderColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
				borderWidth: 2,
			},
		],
	};

	const options = {
		circumference: 180,
		rotation: 270,
		responsive: true,
		plugins: {
			legend: {
				position: "top",
				labels: {
					usePointStyle: true,
					boxWidth: 5,
					padding: 10,
				},
			},
			title: {
				display: true,
				text: "Order Summary",
			},
		},
	};

	return (
		<div className="DashboardRight">
			<div className="DashboardsTop">
				{orders.length === 0 ? (
					<div className="NoDataMessage">No order data available</div>
				) : (
					<div className="ChartContainer">
						<Pie data={orderSummaryData} options={options} />
					</div>
				)}
			</div>
			<div className="DashboardsBottom">
				<div className="Header">
					<h2
						style={{
							color: "var(--p-color)",
							fontSize: "10px",
						}}
					>
						Top Performers
					</h2>
				</div>
				{users.length === 0 ? (
					<div className="NoDataMessage">No user data available</div>
				) : (
					<div className="TopPerformers">
						{users.slice(0, 5).map((performer, index) => (
							<div className="TopPerformer" key={index}>
								<span>{index + 1}</span>
								<Avatar
									className="AvatarProfile"
									src={performer.profilePicture}
								/>
								<div className="TopPerformerName">
									<span>{performer.name}</span>
									<small>{performer.userType}</small>
								</div>
								<div className="TopPerformerMore">
									<div className="PerformanceValue">
										{performer.performanceValue >= 0 ? (
											<i className="fas fa-caret-up"></i>
										) : (
											<i className="fas fa-caret-down"></i>
										)}
										<p>{performer.performanceValue}</p>
									</div>
									<small className="Individual">Individual</small>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default DashboardRight;

// props validation
DashboardRight.propTypes = {
	users: PropTypes.array.isRequired,
	orders: PropTypes.array.isRequired,
};
