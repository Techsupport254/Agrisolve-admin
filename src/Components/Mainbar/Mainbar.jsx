import React, { useCallback } from "react";
import "./Mainbar.css";
import SidebarPages from "../../SidebarPages";

const Mainbar = ({ user, users, products, getTimeLabel, requests, chats }) => {
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
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Mainbar;
