import React from "react";
import "./History.css";
import HistoryCard from "../HistoryCard/HistoryCard";
import { Stepper, Step, StepLabel, Badge } from "@mui/material";
import StepIcon from "@mui/material/StepIcon";

const History = ({ data, getTimeLabel, loading }) => {
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

	// Group data by date (without minutes)
	const groupedData = data.reduce((acc, item) => {
		const label = new Date(item.created)
			.toISOString()
			.split("T")[0]
			.split("-")
			.reverse()
			.join("-");
		if (!acc[label]) {
			acc[label] = [];
		}
		acc[label].push(item);
		// sort by date
		acc[label].sort((a, b) => new Date(b.created) - new Date(a.created));

		return acc;
	}, {});

	return (
		<div className="HistoryContainer">
			{loading ? (
				<i
					className="fas fa-spinner fa-spin"
					style={{
						fontSize: "1.5rem",
						color: "var(--green)",
						margin: "auto",
						display: "block",
					}}
				></i>
			) : (
				<>
					{Object.entries(groupedData).map(([label, items], groupIndex) => (
						<div className="HistoryGroup" key={label}>
							<div className="GroupDate">
								<h2>{label}</h2>
							</div>
							<div className="HistoryStepper">
								<Stepper orientation="vertical" className="Stepper">
									{items.map((item, index) => (
										<Step
											key={index}
											active={true}
											completed={true}
											className="Step"
										>
											<StepLabel
												className="StepLabel"
												StepIconComponent={() => (
													<Badge
														badgeContent=""
														color={dots[index % dots.length]} // Use index to cycle through colors
														size="small"
														variant="dot"
														sx={{
															marginTop: "0.5rem",
														}}
													>
														<StepIcon
															icon={<span className="MuiStepIcon-root" />}
														/>
													</Badge>
												)}
											>
												<div className="BadgeTitleContainer">
													<div className="TitleContainer">
														<span>{item.title}</span>
													</div>
												</div>
												<div className="TimestampContainer">
													{getTimeLabel(item.created)}
												</div>
											</StepLabel>
										</Step>
									))}
								</Stepper>
							</div>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default History;
