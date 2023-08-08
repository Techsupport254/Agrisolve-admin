import React from "react";
import "./Profile.css";
import { profileData } from "../../Data";

const Profile = ({ user, getTimeLabel }) => {
	const initialActiveIndex = 0;
	const [active, setActive] = React.useState(initialActiveIndex);

	return (
		<div className="Profile">
			<div className="Header">
				<i className="fa fa-user"></i>
				<h1>
					Profile <span>Overview</span>&nbsp;&nbsp;
					<i className="fa fa-chevron-right"></i>&nbsp;&nbsp;
					{user?.name}
				</h1>
			</div>
			<div className="ProfileNav">
				{profileData.map((item, index) => (
					<div
						className={`ProfileNavItem ${index === active ? "Active" : ""}`}
						key={index}
						onClick={() => setActive(index)}
					>
						{item.icon}
						<h1>{item.name}</h1>
					</div>
				))}
			</div>
			<div className="ProfileContent">
				{React.cloneElement(profileData[active].component, {
					user,
					getTimeLabel,
				})}
			</div>
		</div>
	);
};

export default Profile;
