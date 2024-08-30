import React from "react";
import "./Card.css";
import CircularBar from "../CircularBar/CircularBar";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Card = ({ title, value, barValue, icon, color, series }) => {
	const cardStyle = {
		background: color?.backGround || "white",
		boxShadow: color?.boxShadow || "none",
	};

	const hasData = value !== null && value !== undefined && value !== 0;

	return (
		<div className="Card" style={cardStyle}>
			<div className="CardLeft">
				{hasData ? (
					<div className="ProgressBar">
						<CircularBar barValue={barValue} value={value} series={series} />
					</div>
				) : (
					<Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
						<CircularProgress color="inherit" />
						<p>No data available</p>
					</Stack>
				)}
			</div>
			<div className="CardRight">
				<span>{title}</span>
				<div className="CardIcon">
					<i className={icon}></i>
				</div>
				<div className="CardValue">
					{hasData ? (
						<p>
							{barValue}/{value}
						</p>
					) : (
						<p>--/--</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
