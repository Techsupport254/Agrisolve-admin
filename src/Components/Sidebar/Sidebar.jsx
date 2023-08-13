import React from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebardata } from "../../Data";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import logo from "../../assets/logo.png";
import { Badge } from "@mui/material";

const Sidebar = ({ user }) => {
	const location = useLocation();

	const normalData = sidebardata.filter((item) => item.management === false);

	const mananagementData = sidebardata.filter(
		(item) => item.management === true
	);
	return (
		<SkeletonTheme
			baseColor="rgba(255, 255, 255, 0.1)"
			highlightColor="rgba(255, 255, 255, 0.05)"
			animationSpeed={1}
		>
			<div className="SidebarContainer">
				{!user ? (
					<>
						<div className="SidebarTop">
							<div className="ProfilePic">
								<img src={logo} alt="logo" />
							</div>
							<div className="ProfileName">
								<span>Agrisolve</span>
								<small>Admin Panel</small>
								<p>
									<Skeleton width={100} />
								</p>
							</div>
						</div>
						<div className="SidebarBottom">
							<div className="Header">
								<h3>Overview</h3>
							</div>
							<div className="SidebarItems">
								{normalData.map((item) => {
									return (
										<Link
											key={item.id}
											to={item.path}
											className="SidebarItemLink"
										>
											<motion.div
												className="SidebarItem"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												<Skeleton width={160} height={20} />
											</motion.div>
										</Link>
									);
								})}
							</div>
							<div className="Management">
								<div className="Header">
									<h3>Management</h3>
								</div>
								{mananagementData?.map((item) => {
									return (
										<Link
											key={item.id}
											to={item.path}
											className="SidebarItemLink"
										>
											<Skeleton width={160} height={20} />
										</Link>
									);
								})}
							</div>
						</div>
					</>
				) : (
					<>
						<div className="SidebarTop">
							<div className="ProfilePic">
								<img src={logo} alt="logo" />
							</div>
							<div className="ProfileName">
								<span>Agrisolve</span>
								<small>Admin Panel</small>
								<p>{user?.userType}</p>
							</div>
						</div>
						<div className="SidebarBottom">
							<div className="SidebarItems">
								<div className="Header">
									<h3>Overview</h3>
								</div>
								{normalData.map((item) => {
									const isActive = location.pathname === item.path;
									return (
										<Link
											key={item.id}
											to={item.path}
											className={`SidebarItemLink ${isActive ? "Active" : ""}`}
										>
											<motion.div
												className="SidebarItem"
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
											>
												{item.item}
												<div className="Icon text-teal-300">{item.icon}</div>
												<span>{item.title}</span>
											</motion.div>
										</Link>
									);
								})}
							</div>
							<div className="Management">
								<div className="Header">
									<h3>Management</h3>
								</div>
								{mananagementData?.map((item) => {
									const isActive = location.pathname === item.path;
									return (
										<Link
											key={item.id}
											to={item.path}
											className={`SidebarItemLink ${isActive ? "Active" : ""}`}
										>
											{item.icon}
											<span>{item.title}</span>
											{item.construction && (
												<Badge
													badgeContent="Soon"
													color="info"
													className="ml-3"
													anchorOrigin={{
														vertical: "top",
														horizontal: "left",
													}}
													sx={{
														marginLeft: "2rem",
														fontSize: "0.5rem",
													}}
												/>
											)}
										</Link>
									);
								})}
							</div>
							<div className="Subscription">
								<div className="Upgrade">
									<div className="Picture">
										{user ? (
											<img
												src={user?.profilePicture ? user?.profilePicture : logo}
												alt="profile"
											/>
										) : (
											<Skeleton circle={true} height={40} width={40} />
										)}
									</div>
									<div className="UpgradeDetails">
										{user ? (
											<>
												<span>{user?.name}</span>
												<small>{user?.email}</small>
											</>
										) : (
											<>
												<Skeleton width={100} />
												<Skeleton width={100} />
											</>
										)}
										<div className="UpgradeBtn">
											<Link to="/profile">
												<button>Upgrade</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="Version">
								<span>Version 1.0.0</span>
							</div>
						</div>
					</>
				)}
			</div>
		</SkeletonTheme>
	);
};

export default Sidebar;
