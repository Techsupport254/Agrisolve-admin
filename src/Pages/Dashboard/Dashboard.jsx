import "./Dashboard.css";
import Cards from "../../Components/Cards/Cards";
import Stats from "../../Components/Stats/Stats";
import DashTop from "../../Components/DashTop/DashTop";
import DashTable from "../../Components/DashTable/DashTable";
import DashboardRight from "../../Components/DashboardRight/DashboardRight";

import PropTypes from "prop-types";

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
	return (
		<div className="Dashboard">
			<DashTop user={user} />
			<div className="DashBottom">
				<div className="DashboardLeft">
					<div className="DashCards">
						<Cards
							user={user}
							products={products}
							earnings={earnings}
							orders={orders}
						/>
					</div>
					<div className="Stats">
						<Stats
							user={user}
							products={products}
							earnings={earnings}
							orders={orders}
						/>
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
				<DashboardRight user={user} users={users} orders={orders} />
			</div>
		</div>
	);
};

export default Dashboard;

// props validation

Dashboard.propTypes = {
	user: PropTypes.object.isRequired,
	users: PropTypes.array.isRequired,
	products: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
	orders: PropTypes.array.isRequired,
	getCustomer: PropTypes.func.isRequired,
	getProduct: PropTypes.func.isRequired,
	earnings: PropTypes.array.isRequired,
};
