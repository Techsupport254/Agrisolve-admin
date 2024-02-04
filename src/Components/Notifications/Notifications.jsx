import React from "react";
import "./Notifications.css";
import { Avatar, Badge } from "@mui/material";

const Notifications = ({ notifications }) => {
	// Function to render notifications
	const renderNotifications = () => {
		return notifications.map((notification, index) => (
			<div className="Notification" key={index}>
				<Badge
					badgeContent="1"
					color="primary"
					overlap="circular"
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
				>
					<Avatar />
				</Badge>
				<div className="MessageBox">
					<h3>{notification.sender}</h3>
					<p>{notification.message}</p>
					<small>{notification.timestamp}</small>
				</div>
			</div>
		));
	};

	return (
		<div className="Notifications">
			<div className="NotificationHeader FlexDisplay">
				<h3>Notifications</h3>
				<i className="fa-solid fa-gear"></i>
			</div>
			<div className="NotificationsBody FlexDisplay">
				{renderNotifications()}
			</div>
		</div>
	);
};

export default Notifications;
