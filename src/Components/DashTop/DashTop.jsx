import React from "react";
import "./DashTop.css";
import { Badge } from "@mui/material";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const DashTop = ({ user }) => {
	return (
		<SkeletonTheme
			baseColor="#c5cae9"
			highlightColor="#bbdefb"
			animationSpeed={1}
		>
			<div
				className="DashTop
      "
			>
				{!user ? (
					<>
						<div className="DashLeft">
							<div className="MenuToggler">
								<i className="fa fa-bars"></i>
							</div>
							<p>
								Welcome back{" "}
								<span>
									<Skeleton width={150} />
								</span>
							</p>
						</div>
						<div className="DashRight">
							<div
								className="UserProfile"
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<div
									className="UserImage"
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Skeleton circle={true} height={30} width={30} />
								</div>
								<div className="UserName">
									<span>
										<Skeleton width={100} />
									</span>
									<p>
										<Skeleton width={80} />
									</p>
								</div>
							</div>
							<div className="Messages">
								<Badge
									badgeContent={
										<Skeleton circle={true} width={20} height={20} />
									}
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
									badgeContent={
										<Skeleton circle={true} width={20} height={20} />
									}
									overlap="circular"
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
								>
									<i className="fa fa-bell"></i>
								</Badge>
							</div>
							<div className="DashSettings">
								<i className="fas fa-cog"></i>
							</div>
							<div className="Logout">
								<i className="fa fa-sign-out-alt"></i>
							</div>
						</div>
					</>
				) : (
					<>
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
					</>
				)}
			</div>
		</SkeletonTheme>
	);
};

export default DashTop;
