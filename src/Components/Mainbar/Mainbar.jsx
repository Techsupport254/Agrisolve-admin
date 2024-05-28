import React from "react";
import PropTypes from "prop-types";
import "./Mainbar.css";
import SidebarPages from "../../SidebarPages";

const Mainbar = ({
	user,
	users,
	products,
	getTimeLabel,
	requests,
	chats,
	messages,
	orders,
	getCustomer,
	getProduct,
	loading,
	earnings,
}) => {
	return (
		<React.Fragment>
			<div className="MainbarContainer">
				<div className="MainBottom">
					<SidebarPages
						user={user}
						users={users}
						products={products}
						getTimeLabel={getTimeLabel}
						requests={requests}
						chats={chats}
						messages={messages}
						orders={orders}
						getCustomer={getCustomer}
						getProduct={getProduct}
						loading={loading}
						earnings={earnings}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

Mainbar.propTypes = {
	user: PropTypes.object.isRequired,
	users: PropTypes.array.isRequired,
	products: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
	requests: PropTypes.array.isRequired,
	chats: PropTypes.array.isRequired,
	messages: PropTypes.array.isRequired,
	orders: PropTypes.array.isRequired,
	getCustomer: PropTypes.func.isRequired,
	getProduct: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	earnings: PropTypes.number.isRequired,
};

export default Mainbar;
