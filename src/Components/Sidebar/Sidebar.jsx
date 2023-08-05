import React from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebardata } from "../../Data";

const Sidebar = ({ user }) => {
	const location = useLocation();

	return (
		<div className="SidebarContainer">
			<div className="SidebarTop">
				{/* Profile section */}
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

				{/* Sidebar items */}
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
			<div className="Version">
				<span>Version 1.0.0</span>
			</div>
		</div>
	);
};

export default Sidebar;
