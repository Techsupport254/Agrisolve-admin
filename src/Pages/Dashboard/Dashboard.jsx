import React from "react";
import "./Dashboard.css";
import Cards from "../../Components/Cards/Cards";
import Stats from "../../Components/Stats/Stats";
import DashTop from "../../Components/DashTop/DashTop";
import DashTable from "../../Components/DashTable/DashTable";

const Dashboard = ({ user, users, products, getTimeLabel }) => {
	return (
		<div className="Dashboard">
			<DashTop user={user} />
			<div className="DashBottom">
				<div className="DashCards">
					<Cards />
				</div>
				<div className="Stats">
					<Stats />
				</div>
				<div className="Table">
					<DashTable
						products={products}
						getTimeLabel={getTimeLabel}
						user={user}
						users={users}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
