import React from "react";
import "./Reports.css";
import { analyticsData, historyData } from "../../Data";
import AnalyticsCards from "../../Components/AnalyticsCards/AnalyticsCards";
import News from "../../Components/News/News";
import History from "../../Components/History/History";
import axios from "axios";

const Reports = ({ getTimeLabel }) => {
	const [newsData, setNewsData] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		setLoading(true);
		axios
			.get("https://agrisolve.vercel.app/news")
			.then((res) => {
				setNewsData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false); // Make sure to set loading to false on error.
			});
	}, []);

	console.log(newsData);

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
					<News news={newsData} getTimeLabel={getTimeLabel} loading={loading} />
				</div>
				<div className="Timeline">
					<div className="Header">
						<i className="fa fa-history"></i>
						<h1>Timeline</h1>
					</div>
					<History
						data={newsData}
						getTimeLabel={getTimeLabel}
						loading={loading}
					/>
				</div>
			</div>
		</div>
	);
};

export default Reports;
