import React from "react";
import "./Users.css";
import UsersTable from "../../Components/UsersTable/UsersTable";
import PropTypes from "prop-types";

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
	const usersWithNewUserFlag = users?.map((user) => ({
		...user,
		newUser: newUser(user.created_at),
	}));

	// Sorting users in ascending order based on their creation date (from the most recent)
	const sortedUsers = usersWithNewUserFlag.sort(
		(a, b) => new Date(b.created_at) - new Date(a.created_at)
	);

	// Extracting unique user types as categories
	const categories = [...new Set(users.map((user) => user.userType))];

	const [searchQuery, setSearchQuery] = React.useState("");
	const [selectedCategory, setSelectedCategory] = React.useState("");

	const handleClearFilters = () => {
		setSearchQuery("");
		setSelectedCategory("");
	};

	const handleAddUser = () => {
		window.location.href = "/users/new";
	};

	// Filtering users based on search query and selected category
	const filteredUsers = sortedUsers.filter((user) => {
		const matchesSearch = user.username
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesCategory =
			!selectedCategory || user.userType === selectedCategory;

		return matchesSearch && matchesCategory;
	});

	return (
		<div className="Users">
			<div className="UsersTop">
				<div className="Header">
					<i className="fa fa-users"></i>
					<h2>Users</h2>
				</div>
				<div className="TopUsersBtns">
					<div className="TopUsersBtnsLeft">
						<input
							type="text"
							placeholder="Search for..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							style={{
								width: "180px",
								padding: "6px",
								fontSize: "1rem",
								border: "1px solid #ccc",
								borderRadius: "4px",
								marginRight: "10px",
							}}
						/>
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							style={{
								padding: "6px",
								fontSize: "1rem",
								border: "1px solid #ccc",
								borderRadius: "4px",
								minWidth: "140px",
							}}
						>
							<option value="">
								<em>All</em>
							</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</option>
							))}
						</select>
					</div>
					<div className="TopUsersRight">
						<button
							style={{
								color: "var(--warning-dark)",
								fontSize: "1rem",
								padding: "4px 8px",
								background: "none",
								cursor: "pointer",
							}}
							onClick={handleClearFilters}
						>
							Clear <i className="fa fa-filter"></i>
						</button>
						<button
							onClick={handleAddUser}
							style={{
								color: "var(--success-dark)",
								border: "1px solid var(--success-dark)",
								fontSize: "1rem",
								padding: "2px 5px",
								background: "none",
								cursor: "pointer",
								borderRadius: "4px",
							}}
						>
							<i className="fa fa-plus"></i>&nbsp; Add User
						</button>
					</div>
				</div>
			</div>
			<div className="UsersTable">
				<UsersTable users={filteredUsers} getTimeLabel={getTimeLabel} />
			</div>
		</div>
	);
};

export default Users;

// props validation
Users.propTypes = {
	users: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
};
