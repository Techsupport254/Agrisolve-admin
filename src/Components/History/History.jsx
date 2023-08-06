import React from "react";
import "./History.css";
import HistoryCard from "../HistoryCard/HistoryCard";
import { Stepper, Step, StepLabel, Badge } from "@mui/material";

const History = ({ data, getTimeLabel }) => {
	if (!Array.isArray(data)) {
		return null;
	}

	const dots = [
		"success",
		"primary",
		"secondary",
		"error",
		"warning",
		"info",
		"dark",
	];

	// Group data by date
	const groupedData = data.reduce((acc, item) => {
		const date = getTimeLabel(item.timestamp);
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(item);
		return acc;
	}, {});

	return (
		<div className="HistoryContainer">
			{Object.entries(groupedData).map(([date, items], groupIndex) => (
				<div className="HistoryGroup" key={date}>
					<div className="GroupDate">
						<h2>{date}</h2>
					</div>
					<div className="HistoryStepper">
						<Stepper orientation="vertical">
							{items.map((item, index) => (
								<Step key={index}>
									<StepLabel>
										<div className="BadgeTitleContainer">
											<div className="BadgeContainer">
											</div>
											<div className="TitleContainer">
												<span>{item.title}</span>
											</div>
										</div>
										<div className="TimestampContainer">
											{getTimeLabel(item.timestamp)}
										</div>
									</StepLabel>
								</Step>
							))}
						</Stepper>
					</div>
				</div>
			))}
		</div>
	);
};

export default History;
