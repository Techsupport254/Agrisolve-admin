import React from "react";
import "./Dashboard.css";
import Cards from "../../Components/Cards/Cards";
import Stats from "../../Components/Stats/Stats";
import DashTop from "../../Components/DashTop/DashTop";
import DashTable from "../../Components/DashTable/DashTable";
import DashboardRight from "../../Components/DashboardRight/DashboardRight";

const Dashboard = ({
	user,
	users,
	products,
	getTimeLabel,
	orders,
	getCustomer,
	getProduct,
	earnings,
}) => {
	console.log(users);
	return (
		<div className="Dashboard">
			<DashTop user={user} />
			<div className="DashBottom">
				<div className="DashboardLeft">
					<div className="DashCards">
						<Cards user={user} products={products} earnings={earnings} />
					</div>
					<div className="Stats">
						<Stats user={user} products={products} earnings={earnings} />
					</div>

					<div className="Table">
						<DashTable
							products={products}
							getTimeLabel={getTimeLabel}
							user={user}
							users={users}
							orders={orders}
							getCustomer={getCustomer}
							getProduct={getProduct}
						/>
					</div>
				</div>
				<DashboardRight user={user} users={users} />
			</div>
		</div>
	);
};

export default Dashboard;
