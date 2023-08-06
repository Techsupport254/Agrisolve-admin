import React from "react";
import "./News.css";
import NewsCard from "../NewsCard/NewsCard";

const News = ({ news, getTimeLabel }) => {
	return (
		<div className="NewsContainer">
			{news.map((data, index) => {
				return (
					<div className="NewsCard" key={index}>
						<NewsCard data={data} getTimeLabel={getTimeLabel} />
					</div>
				);
			})}
		</div>
	);
};

export default News;
