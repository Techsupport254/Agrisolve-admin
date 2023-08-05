import React from "react";
import "./UserCard.css";
import CircularBar from "../CircularBar/CircularBar";
import { Badge } from "@mui/material";

const UserCard = ({ all, users, category }) => {
	const currentDate = new Date();
	const lastMonthDate = new Date();
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	const filteredMonth = users.filter(
		(user) =>
			new Date(user.created_at) >= lastMonthDate &&
			new Date(user.created_at) <= currentDate
	);

	let barValue;
	if (category === "All") {
		barValue = filteredMonth.length;
	} else {
		barValue = users.length;
	}

	let value = all.length;

	const verifiedUsers = users.filter(
		(user) => user.verificationStatus === "verified"
	);
	const activeUsers = users.filter((user) => user.loginStatus === "loggedIn");
	const paidUsers = users.filter((user) => user.paymentStatus === "paid");

	return (
		<div className="UserCardContainer">
			<div className="UserCardLeft">
				<CircularBar barValue={barValue} value={value} />
			</div>
			<div className="UserCardRight">
				<div className="UsersRow">
					<Badge color="warning" variant="dot" />
					<span>New Users</span>
					<p>
						{filteredMonth.length}/{users.length}
					</p>
				</div>
				<div className="UsersRow">
					<Badge color="secondary" variant="dot" />
					<span>Verified Users</span>
					<p>
						{verifiedUsers.length}/{users.length}
					</p>
				</div>
				<div className="UsersRow">
					<Badge color="primary" variant="dot" />
					<span>Active Users</span>
					<p>
						{activeUsers.length}/{users.length}
					</p>
				</div>
				<div className="UsersRow">
					<Badge color="success" variant="dot" />
					<span>Paid Users</span>
					<p>
						{paidUsers.length}/{users.length}
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
