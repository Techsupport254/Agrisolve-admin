import React, { useState, useEffect } from "react";
import "./Balance.css";
import { Avatar, Button } from "@mui/material";

const Balance = ({ user, earnings, balance, earning }) => {
	const profilePicture = user?.profilePicture || "default_profile_picture.png";
	const userName = user?.name || "Unnamed User";
	const userPhone = user?.phone || "No Phone";

	// Initialize state for toggling balance visibility
	const [toggled, setToggled] = useState(false);
	const handleClick = () => setToggled(!toggled);

	// Prepare the balance for display
	const hiddenBalance = "x".repeat(balance?.toString().length);

	// Function to format number with commas
	const formatNumber = (number) => new Intl.NumberFormat().format(number);

	return (
		<div className="UserCard">
			<div className="Header">
				<h3>{earning?.month}</h3>
			</div>
			<div className="TopCard">
				<div className="UserCardInfo">
					<Avatar
						className="cardLogo"
						src={profilePicture}
						alt={`${userName}'s profile`}
					/>
					<div className="cardDetails">
						<span>{userName}</span>
						<p>{userPhone}</p>
						<small>Expiry: 03/24</small>
					</div>
				</div>
				<div className="Request">
					<div className="Balance">
						<div className="Header">
							<h2>Balance</h2>
						</div>
						<div className="BalanceAmount">
							<p>KES</p>
							<span>{toggled ? formatNumber(balance) : hiddenBalance}</span>
							<button onClick={handleClick} className="ToggleBalance">
								{toggled ? (
									<i className="fa-solid fa-eye"></i>
								) : (
									<i className="fa-solid fa-eye-slash"></i>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="BottomCard">
				<div className="Difference Expenses">
					<i className="fa-solid fa-arrow-up"></i>
					<span>KES. {formatNumber(earning?.expense)}</span>
				</div>
				<div className="Difference Incomes">
					<i className="fa-solid fa-arrow-down"></i>
					<span>KES. {formatNumber(earning?.income)}</span>
				</div>
				<Button variant="outlined" size="small" className="RequestButton">
					Request
				</Button>
			</div>
		</div>
	);
};

export default Balance;
