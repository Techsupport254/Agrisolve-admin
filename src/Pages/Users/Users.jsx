import React from "react";
import "./Users.css";
import UserCards from "../../Components/UserCards/UserCards";
import UsersTable from "../../Components/UsersTable/UsersTable";

const Users = ({ users, getTimeLabel }) => {
	const newUser = (created_at) => {
		const currentDate = new Date();
		const userDate = new Date(created_at);
		const diffInDays = Math.floor(
			(currentDate - userDate) / (1000 * 60 * 60 * 24)
		);
		return diffInDays <= 30;
	};

	// Updating the users array with the newUser property
	const usersWithNewUserFlag = users.map((user) => ({
		...user,
		newUser: newUser(user.created_at),
	}));

	return (
		<div className="Users">
			<div className="Header">
				<i className="fa fa-users"></i>
				<h2>Users</h2>
			</div>
			{/* <div className="UserCards">
				<UserCards users={usersWithNewUserFlag} />
			</div> */}
			<div className="UsersTable">
				<UsersTable users={usersWithNewUserFlag} getTimeLabel={getTimeLabel} />
			</div>
		</div>
	);
};

export default Users;
