import React from "react";
import "./Reports.css";
import { analyticsData, newsData } from "../../Data";
import AnalyticsCards from "../../Components/AnalyticsCards/AnalyticsCards";
import News from "../../Components/News/News";

const Reports = ({ getTimeLabel }) => {
	return (
		<div className="Reports">
			<div className="Header">
				<i className="fa fa-chart-line"></i>
				<h1>Analytics</h1>
			</div>
			<div className="AnalyticsCards">
				<AnalyticsCards analyticsData={analyticsData} />
			</div>
			<div className="News">
				<div className="Header">
					<i className="fa fa-newspaper"></i>
					<h1>News</h1>
				</div>
				<News news={newsData} getTimeLabel={getTimeLabel} />
			</div>
		</div>
	);
};

export default Reports;
