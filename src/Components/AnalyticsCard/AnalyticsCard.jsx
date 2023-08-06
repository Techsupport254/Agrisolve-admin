import React from "react";
import "./AnalyticsCard.css";

const AnalyticsCard = ({ data }) => {
	return (
		<div className="AnalyticsCardContainer">
			<div
				className="Icon"
				style={{
					color: data.color2,
					fontSize: "2rem",
				}}
			>
				{data.icon}
			</div>
			<p
				style={{
					color: data.color3,
				}}
			>
				{data.value}
			</p>
			<span
				style={{
					color: data.color,
				}}
			>
				{data.title}
			</span>
		</div>
	);
};

export default AnalyticsCard;
