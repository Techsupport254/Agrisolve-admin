import React from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebardata } from "../../Data";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Sidebar = ({ user }) => {
	const location = useLocation();

	return (
		<SkeletonTheme
			baseColor="rgba(255, 255, 255, 0.1)"
			highlightColor="rgba(255, 255, 255, 0.05)"
			animationSpeed={1}
		>
			<div className="SidebarContainer">
				{!user ? (
					<div className="SidebarTop">
						<div className="ProfilePic flex justify-center items-center">
							<Skeleton circle={true} height={130} width={130} />
						</div>
						<div className="ProfileName">
							<span>
								<Skeleton width={150} />
							</span>
							<small>
								<Skeleton width={100} height={10} />
							</small>
							<p>
								<Skeleton width={100} height={10} />
							</p>
						</div>

						<div className="SidebarItems">
							{sidebardata.map((item) => {
								return (
									<Skeleton
										className="SidebarItem"
										key={item.id}
										width={200}
										height={20}
										count={1}
									/>
								);
							})}
						</div>
					</div>
				) : (
					<div className="SidebarTop">
						<div className="ProfilePic flex justify-center items-center">
							<img
								src={
									user?.profilePicture ||
									"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
								}
								alt={user?.name}
							/>
						</div>
						<div className="ProfileName">
							<span>{user?.name}</span>
							<small>{user?.username}</small>
							<p>{user?.userType}</p>
						</div>
						<div className="SidebarItems">
							{sidebardata.map((item) => {
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
					</div>
				)}
				<div className="Version">
					<span>Version 1.0.0</span>
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default Sidebar;
