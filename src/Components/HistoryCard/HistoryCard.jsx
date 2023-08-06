import React from "react";
import "./HistoryCard.css";

const HistoryCard = ({ data, getTimeLabel }) => {
	return (
		<div className="HistoryCardContainer">
			<div className="LeftPart"></div>
			<div className="RightPart">
				<div className="HistoryTitle">
					<p>{getTimeLabel(data.timestamp)}</p>
				</div>
			</div>
		</div>
	);
};

export default HistoryCard;
