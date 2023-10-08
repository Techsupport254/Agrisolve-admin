import React from "react";
import "./FinanceCard.css";
import mpesa from "../../assets/mpesa.svg";

const FinanceCard = ({ data, user, getTimeLabel }) => {
	// Get the current date
	const currentDate = new Date();

	// Get the current month name
	const currentMonthName = new Intl.DateTimeFormat("en-US", {
		month: "long",
	}).format(currentDate);

	return (
		<div
			className="FinanceCard"
			style={{
				backgroundColor: data.background,
				color: data.color,
				width: data.width,
			}}
		>
			<div className="Title">
				<div className="Icon">{data.icon}</div>
				<h3>
					{data.title === "Income" || data.title === "Expense"
						? `${currentMonthName}` + " " + `${data.title}`
						: data.title}
				</h3>
				{data.title === "Account Balance" && (
				<div className="Date">
				<p>
					{currentDate.getDate() +
						" " +
						currentMonthName +
						" " +
						currentDate.getFullYear()}
				</p>
			</div>
				)}
			</div>
			<div className="Value">
				<h1>{data.value}</h1>
			</div>
			<div className="Account">
				{data.account && (
					<>
						<div className="Mpesa">
							<img
								src={user?.profilePicture ? user.profilePicture : mpesa}
								alt="Mpesa"
							/>
						</div>
						<div className="AccountDetails">
							<span>{user?.username}</span>
							<p>{user?.phone}</p>
						</div>
						<div className="Withdraw">
							<button>Withdraw </button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default FinanceCard;
