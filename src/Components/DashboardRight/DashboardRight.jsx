import React, { useState, useEffect } from "react";
import "./DashboardRight.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Avatar } from "@mui/material";

const DashboardRight = ({ users }) => {
	const orderSummaryData = {
		labels: ["Delivered", "Pending", "Cancelled"],
		datasets: [
			{
				label: "Order Summary",
				data: [200, 120, 50],
				backgroundColor: [
					"#82ca9d",
					"#ffc658",
					"#8884d8",
				],
				borderColor: ["#fff", "#fff", "#fff"],
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
				position: "bottom",
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

	const [topPerformers, setTopPerformers] = useState([]);

	// Shuffle array function with random performance values
	const shuffleArray = (array) => {
		return array
			.map((user) => ({
				...user,
				performanceValue: Math.floor(Math.random() * 601) - 300,
			}))
			.sort(() => Math.random() - 0.5);
	};

	// Shuffle top performers every 2 minutes
	useEffect(() => {
		const shuffleTopPerformers = () => {
			if (Array.isArray(users)) {
				const shuffledUsers = shuffleArray([...users]);
				setTopPerformers(shuffledUsers.slice(0, 5));
			}
		};

		shuffleTopPerformers();
		const intervalId = setInterval(shuffleTopPerformers, 120000); // 2 minutes

		return () => clearInterval(intervalId);
	}, [users]);

	// Function to render the correct icon based on performance value
	const renderPerformanceIcon = (value) => {
		return value >= 0 ? (
			<i className="fas fa-caret-up"></i>
		) : (
			<i className="fas fa-caret-down"></i>
		);
	};

	return (
		<div className="DashboardRight">
			<div className="DashboardsTop">
				<div className="ChartContainer">
					<Pie data={orderSummaryData} options={options} />
				</div>
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
				<div className="TopPerformers">
					{topPerformers.map((performer, index) => (
						<div className="TopPerformer" key={index}>
							<span>{index+1}</span>
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
									{renderPerformanceIcon(performer.performanceValue)}
									<p>{performer.performanceValue}</p>
								</div>
								<small className="Individual">Individual</small>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default DashboardRight;
