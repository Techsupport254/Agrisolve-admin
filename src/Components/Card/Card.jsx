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

	return (
		<div className="Card" style={cardStyle}>
			<div className="CardLeft">
				<div className="ProgressBar">
					<CircularBar barValue={barValue} value={value} series={series} />
				</div>
			</div>
			<div className="CardRight">
				<span>{title}</span>
				<div className="CardIcon">{icon}</div>
				<div className="CardValue">
					<p>
						{barValue}/{value}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
