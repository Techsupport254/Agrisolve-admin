import React from "react";
import "./Profile.css";
import { profileData } from "../../Data";
import PropTypes from "prop-types";

const Profile = ({ user, getTimeLabel }) => {
	const initialActiveIndex = 0;
	const [active, setActive] = React.useState(initialActiveIndex);

	return (
		<div className="Profile">
			<div className="Header">
				<i className="fa fa-percent"></i>
				<h2>Discounts</h2>
			</div>
			<div className="ProductDiscount">
				<ul>
					<li>Dashboard</li>
					<li>Profile</li>
					<li>{user?.username}</li>
				</ul>
			</div>
			<div className="ProfileNav">
				{profileData.map((item, index) => (
					<div
						className={`ProfileNavItem ${index === active ? "NavActive" : ""}`}
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

// props validation
Profile.propTypes = {
	user: PropTypes.object,
	getTimeLabel: PropTypes.func,
};
