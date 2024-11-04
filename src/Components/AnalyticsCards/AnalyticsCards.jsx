import React from "react";
import "./AnalyticsCards.css";
import AnalyticsCard from "../AnalyticsCard/AnalyticsCard";

const AnalyticsCards = ({ analyticsData }) => {
	return (
		<div className="AnalyticsCardsContainer">
			{analyticsData.map((data) => (
				<AnalyticsCard key={data.id} data={data} />
			))}
		</div>
	);
};

export default AnalyticsCards;
