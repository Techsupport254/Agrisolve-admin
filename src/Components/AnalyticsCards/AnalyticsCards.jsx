import React from "react";
import "./AnalyticsCards.css";
import AnalyticsCard from "../AnalyticsCard/AnalyticsCard";

const AnalyticsCards = ({ analyticsData }) => {
	return (
		<div className="AnalyticsCardsContainer">
			{analyticsData.map((data, index) => {
				return (
					<div
						className="AnalyticsCard"
						key={index}
						style={{
							background: data.backGround,
							boxShadow: data.boxShadow,
						}}
					>
						<AnalyticsCard data={data} />
					</div>
				);
			})}
		</div>
	);
};

export default AnalyticsCards;
