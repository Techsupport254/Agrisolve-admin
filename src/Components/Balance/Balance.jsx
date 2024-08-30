import { useState } from "react";
import "./Balance.css";
import { Avatar, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";

const Balance = ({
	user,
	earnings,
	balance,
	totalEarnings,
	netEarnings,
	totalExpenses,
}) => {
	const profilePicture = user?.profilePicture || "default_profile_picture.png";
	const userName = user?.name || "Unnamed User";
	const userPhone = user?.phone || "No Phone";

	const token = localStorage.getItem("token");

	// Initialize state for toggling balance visibility
	const [toggled, setToggled] = useState(false);
	const handleClick = () => setToggled(!toggled);

	// Initialize state for Snackbar
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	// Prepare the balance for display
	const hiddenBalance = "x".repeat(balance?.toString().length || 0);

	// Function to format number with commas
	const formatNumber = (number) => new Intl.NumberFormat().format(number);

	// Get current date
	const currentDate = new Date();
	const currentDay = currentDate.getDate();

	// Disable request button if balance is <= 0 or if the current day isn't between the allowed ranges
	const isRequestPeriod = (start, end) =>
		currentDay >= start && currentDay <= end;
	const isDisabled =
		balance <= 0 || !(isRequestPeriod(1, 5) || isRequestPeriod(14, 18));

	const handleRequest = (balance) => {
		if (balance > 500 && token && user?.id) {
			axios
				.post(
					`http://localhost:8000/earnings/${user.id}/request`,
					{
						amount: balance,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((response) => {
					setSnackbar({
						open: true,
						message: "Request sent successfully",
						severity: "success",
					});
				})
				.catch((error) => {
					console.error("Error sending request:", error);
					setSnackbar({
						open: true,
						message: "An error occurred while sending the request",
						severity: "error",
					});
				});
		} else if (balance <= 500) {
			setSnackbar({
				open: true,
				message: "Balance must be greater than 500 to request a payout",
				severity: "warning",
			});
		} else if (!token) {
			setSnackbar({
				open: true,
				message: "Authorization token is missing. Please log in.",
				severity: "warning",
			});
		}
	};

	// Close the Snackbar
	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	return (
		<div className="UserCard">
			<div className="Header">
				<i className="fa fa-wallet"></i>
				<h3>Balance</h3>
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
						<small>
							{new Date().toLocaleString("default", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</small>
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
					<span>KES. {formatNumber(totalExpenses)}</span>
				</div>
				<div className="Difference Incomes">
					<i className="fa-solid fa-arrow-down"></i>
					<span>KES. {formatNumber(netEarnings)}</span>
				</div>
				<Button
					variant="outlined"
					size="small"
					className={isDisabled ? "RequestButton Disabled" : "RequestButton"}
					disabled={isDisabled}
					onClick={() => handleRequest(balance)}
				>
					Request
				</Button>
			</div>

			{/* Snackbar for displaying messages */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</div>
	);
};

// props validation
Balance.propTypes = {
	user: PropTypes.object,
	earnings: PropTypes.array,
	balance: PropTypes.number,
	totalEarnings: PropTypes.number,
	netEarnings: PropTypes.number,
	totalExpenses: PropTypes.number,
};

export default Balance;
