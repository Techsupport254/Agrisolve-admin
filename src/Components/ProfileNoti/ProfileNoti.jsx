import React from "react";
import "./ProfileNoti.css";
import { Switch } from "@mui/material";

const ProfileNoti = ({ user }) => {
	return (
		<div className="ProfileNoti">
			<div className="NotificationRow">
				<div className="NotificationLeft">
					<div className="Header">
						<i className="fas fa-bell"></i>
						<h1>Activity</h1>
					</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
					</p>
				</div>
				<div className="NotificationRight bg-gray-100">
					<div className="NotiRow">
						<p>Email me when there's an order of my products</p>
						<div className="NotiSwitch">
							<Switch
								defaultChecked
								color="success"
								inputProps={{ "aria-label": "checkbox with default color" }}
							/>
						</div>
					</div>
					<div className="NotiRow">
						<p>Email me when subscription is due</p>
						<div className="NotiSwitch">
							<Switch
								defaultChecked
								color="success"
								inputProps={{ "aria-label": "checkbox with default color" }}
							/>
						</div>
					</div>
					{user?.userType === "agriprofessional" && (
						<div className="NotiRow">
							<p>Email me when there're new requests</p>
							<div className="NotiSwitch">
								<Switch
									defaultChecked
									color="success"
									inputProps={{ "aria-label": "checkbox with default color" }}
								/>
							</div>
						</div>
					)}
					<div className="NotiRow">
						<p>Email me when there're scheduled maintenance</p>
						<div className="NotiSwitch">
							<Switch
								defaultChecked
								color="success"
								inputProps={{ "aria-label": "checkbox with default color" }}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="NotificationRow">
				<div className="NotificationLeft">
					<div className="Header">
						<i className="fas fa-bell"></i>
						<h1>Application</h1>
					</div>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
					</p>
				</div>
				<div className="NotificationRight bg-gray-100">
					<div className="NotiRow">
						<p>News and Announcements</p>
						<div className="NotiSwitch">
							<Switch
								defaultChecked
								color="success"
								inputProps={{ "aria-label": "checkbox with default color" }}
							/>
						</div>
					</div>
					<div className="NotiRow">
						<p>Weekly updates</p>
						<div className="NotiSwitch">
							<Switch
								defaultChecked
								color="success"
								inputProps={{ "aria-label": "checkbox with default color" }}
							/>
						</div>
					</div>
					<div className="NotiRow">
						<p>News and Announcements</p>
						<div className="NotiSwitch">
							<Switch
								defaultChecked
								color="success"
								inputProps={{ "aria-label": "checkbox with default color" }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileNoti;
