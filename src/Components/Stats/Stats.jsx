import React from "react";
import "./Stats.css";
import BarGraph from "../BarGraph/BarGraph";
import PieChart from "../PieChart/PieChart";



const Stats = () => {
	return (
		<div className="StatsContainer">
			<div className="StatsLeft">
				<BarGraph />
			</div>
			<div className="StatsRight">
				<PieChart />
			</div>
		</div>
	);
};

export default Stats;
