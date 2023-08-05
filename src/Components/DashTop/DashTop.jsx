import React from "react";
import "./DashTop.css";
import { Badge } from "@mui/material";

const DashTop = ({user}) => {
	return (
		<div
			className="DashTop
      "
		>
			<div className="DashLeft">
				<div className="MenuToggler">
					<i className="fa fa-bars"></i>
				</div>
				<p>
					Welcome back <span>{user?.name}</span>
				</p>
			</div>
			<div className="DashRight">
				<div className="UserProfile">
					<div className="UserImage">
						<img
							src={
								user?.profilePicture
									? user?.profilePicture
									: "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
							}
							alt="User"
						/>
					</div>
					<div className="UserName">
						<span>{user?.username}</span>
						<p>
							{user?.userType} &nbsp;
							<i className="fa fa-caret-down"></i>
						</p>
					</div>
				</div>
				<div className="Messages">
					<Badge
						badgeContent={4}
						color="success"
						overlap="circular"
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
					>
						<i className="fa fa-envelope"></i>
					</Badge>
				</div>
				<div className="Notifications">
					<Badge
						badgeContent={4}
						color="info"
						overlap="circular"
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
					>
						<i className="fa fa-bell"></i>
					</Badge>
				</div>
				<div className="Logout">
					<i className="fa fa-sign-out-alt"></i>
				</div>
			</div>
		</div>
	);
};

export default DashTop;
