import React from "react";
import "./AnalyticsCard.css";

const AnalyticsCard = ({ data }) => {
	return (
		<div className="AnalyticsCardContainer">
			<div
				className="Icon"
				style={{
					color: data.color,
					backgroundColor: data.bg,
				}}
			>
				{data.icon}
			</div>
			<div className="AnalyticDetails">
				<p>{data.title}</p>
				<span
					style={{
						color: data.color,
					}}
				>
					{data.value}
				</span>
			</div>
		</div>
	);
};

export default AnalyticsCard;
