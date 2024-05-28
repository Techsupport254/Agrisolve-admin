import { useState } from "react";
import "./DashTop.css";
import { Badge, Modal, Backdrop, Fade } from "@mui/material";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Notifications from "./../Notifications/Notifications";
import PropTypes from "prop-types";

const DashTop = ({ user }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedContent, setSelectedContent] = useState("notifications");

	const openModal = (contentType) => {
		setSelectedContent(contentType);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedContent("notifications"); // Reset to default content
		setIsModalOpen(false);
	};

	// Example data for notifications
	const sampleNotifications = [
		{
			sender: "Victor Quaint",
			message:
				"A part of notification dropdown for Earth Fund project which we're working on. Hope you guys like it.",
			timestamp: "1 hour ago",
			status: "read",
		},
	];

	return (
		<SkeletonTheme
			baseColor="#c5cae9"
			highlightColor="#bbdefb"
			animationSpeed={1}
		>
			<div className="DashTop">
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
							{/* Skeleton UI for loading user profile */}
							<div className="UserProfile">
								<div className="UserImage">
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
							{/* Notifications Icon */}
							<div
								className="Notifications"
								onClick={() => openModal("notifications")}
							>
								<Badge
									badgeContent={
										<Skeleton circle={true} width={20} height={20} />
									}
									overlap="circular"
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
									style={{ cursor: "pointer" }}
								>
									<i className="fa fa-bell"></i>
								</Badge>
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
							{/* User Profile */}
							<div className="UserProfile">
								<div className="UserImage">
									<img
										src={
											user?.profilePicture ||
											"https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
										}
										alt="User"
									/>
								</div>
								<div className="UserName">
									<span>{user?.username}</span>
									<p>
										{user?.userType} &nbsp;<i className="fa fa-caret-down"></i>
									</p>
								</div>
							</div>
							{/* Notifications Icon */}
							<div className="Notifications">
								<Badge
									badgeContent={4} // Example badge content
									color="info"
									overlap="circular"
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
									onClick={() => openModal("notifications")}
									style={{ cursor: "pointer" }}
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

			{/* Modal for Notifications */}
			<Modal
				open={isModalOpen}
				onClose={closeModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={isModalOpen}>
					<div className="NotificationModal">
						<Notifications
							content={selectedContent}
							notifications={sampleNotifications}
						/>
					</div>
				</Fade>
			</Modal>
		</SkeletonTheme>
	);
};

export default DashTop;

// props validation

DashTop.propTypes = {
	user: PropTypes.object,
};
