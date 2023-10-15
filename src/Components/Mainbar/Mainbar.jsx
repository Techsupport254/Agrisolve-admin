import React, { useCallback } from "react";
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

export default Mainbar;
