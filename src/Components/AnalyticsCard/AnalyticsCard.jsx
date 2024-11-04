import React from "react";
import "./AnalyticsCard.css";

const AnalyticsCard = ({ data }) => {
	return (
		<div className="AnalyticsCardContainer">
			<div className="CardLeft">
				<div className="CardHeader">
					<p>{data.title}</p>
				</div>
				<span className="Value">{data.value}</span>
				<div className="Statistic">{data.statistic}</div>
			</div>
			<div className="CardRight">
				<div className="Graph">{data.graph}</div>
			</div>
		</div>
	);
};

export default AnalyticsCard;
