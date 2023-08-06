import React from "react";
import "./Reports.css";
import { analyticsData, newsData, historyData } from "../../Data";
import AnalyticsCards from "../../Components/AnalyticsCards/AnalyticsCards";
import News from "../../Components/News/News";
import History from "../../Components/History/History";

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
			<div className="ReportsBottom">
				<div className="News">
					<div className="Header">
						<i className="fa fa-newspaper"></i>
						<h1>News</h1>
					</div>
					<News news={newsData} getTimeLabel={getTimeLabel} />
				</div>
				<div className="Timeline">
					<div className="Header">
						<i className="fa fa-history"></i>
						<h1>Timeline</h1>
					</div>
					<History data={historyData} getTimeLabel={getTimeLabel} />
				</div>
			</div>
		</div>
	);
};

export default Reports;
