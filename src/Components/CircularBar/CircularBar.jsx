import React from "react";
import { CircularProgress, Typography } from "@mui/material";

const CircularBar = ({ barValue, value }) => {
	const percentage = (barValue / value) * 100;

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<CircularProgress
				variant="determinate"
				value={percentage}
				size={80}
				thickness={4}
				color="primary"
				sx={{
					"& circle": {
						strokeLinecap: "round",
						strokeLinejoin: "round",
						stroke: "rgba(0, 0, 0, 0.3)",
					},
					"& path": {
						stroke: "rgba(0, 0, 0, 0.7)",
					},
				}}
			/>
			<Typography
				variant="h6"
				component="div"
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				{`${percentage.toFixed(0)}%`}
			</Typography>
		</div>
	);
};

export default CircularBar;
