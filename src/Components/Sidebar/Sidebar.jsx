import React from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebardata } from "../../Data";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Sidebar = ({ user, sidebarToggle }) => {
	const [toggle, setToggle] = React.useState(false);
	const location = useLocation();

	const handleSidebarItemClick = () => {
		setToggle(!toggle);
	};

	React.useEffect(() => {
		if (sidebarToggle) {
			setToggle(true);
		} else {
			setToggle(false);
		}
	}, [sidebarToggle]);

	return (
		<div className="SidebarContainer">
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
								onClick={handleSidebarItemClick}
							>
								<motion.div
									className={`SidebarItem ${isActive ? "Active" : ""}`}
									animate={{ scale: isActive ? 1.05 : 1 }}
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
