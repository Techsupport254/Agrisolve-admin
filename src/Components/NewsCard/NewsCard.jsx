import React from "react";
import "./NewsCard.css";

const NewsCard = ({ data, getTimeLabel }) => {
	return (
		<div className="NewsCardContainer">
			<div className="ImageContainer">
				<img src={data.images?.[1]} alt={data.title} />
			</div>
			<div className="ContentContainer">
				<h1>{data.title}</h1>
				<p>
					{data.description}Impedit in
					qui debitis quos labore sit molestias iure quasi, assumenda dolores.
				</p>
			</div>
			<div className="Time">
				<p>{getTimeLabel(data.created)}</p>
			</div>
		</div>
	);
};

export default NewsCard;
