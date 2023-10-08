import React from "react";
import PropTypes from "prop-types";
import "./News.css";
import NewsCard from "../NewsCard/NewsCard";

const News = ({ news, getTimeLabel, loading }) => {
	return (
		<>
			{loading ? (
				<i
					className="fas fa-spinner fa-spin"
					style={{
						fontSize: "1.5rem",
						color: "var(--green)",
						margin: "auto",
						display: "block",
					}}
				></i>
			) : (
				<div className="NewsContainer">
					{Array.isArray(news) && news.length > 0 ? (
						news.map((data, index) => (
							<div className="NewsCard" key={index}>
								<NewsCard data={data} getTimeLabel={getTimeLabel} />
							</div>
						))
					) : (
						<p>No news data available.</p>
					)}
				</div>
			)}
		</>
	);
};

News.propTypes = {
	news: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default News;
