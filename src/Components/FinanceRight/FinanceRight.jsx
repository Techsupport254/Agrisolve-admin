import React from "react";
import "./FinanceRight.css";
import { Avatar, Button, InputAdornment, TextField } from "@mui/material";

const FinanceRight = ({
	user,
	getTimelabel,
	earnings,
	balance,
	totalIncome,
	totalExpense,
}) => {
	return (
		<div className="FinanceRight">
			<div className="UserProfile">
				<section className="user">
					<Avatar
						src={user?.profilePicture ? user.profilePicture : null}
						alt="User Avatar"
					/>
					<div className="userInfo">
						<p>Welcome back,</p>
						<span>{user?.name}</span>
					</div>
					<Button
						variant="contained"
						color="primary"
						onClick={() => window.location.reload(false)}
                        className="UpgradeBttn"
					>
						Upgrade
					</Button>
				</section>
				<div className="MoneyCards">
					<div className="IncomeCard ">
						<div className="CardIcon Income">
							<i className="fa-solid fa-arrow-down"></i>
						</div>
						<div className="IncomeValue">
							<p>Income</p>
							<span>KES. {totalIncome ? totalIncome : 0}</span>
						</div>
						<i className="fas fa-ellipsis"></i>
					</div>
					<div className="ExpenseCard">
						<div className="CardIcon Expense">
							<i className="fa-solid fa-arrow-up"></i>
						</div>

						<div className="ExpenseValue">
							<p>Expenses</p>
							<span>KES. {totalExpense ? totalExpense : 0}</span>
						</div>
						<i className="fas fa-ellipsis"></i>
					</div>
				</div>
			</div>
			<div className="Advert">
				{/* Render advertisement */}
				<div className="AdvertContainer">
					<img
						src="https://minimals.cc/assets/illustrations/characters/character_7.png"
						alt=""
					/>
					<div className="Invite">
						<h3>Invite your friends</h3>
						<p>
							Invite your friends to join the platform and get 10% of their
							first transaction
						</p>
						<TextField
							id="outlined-basic"
							label="Email"
							variant="outlined"
							className="Email"
							size="small"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<button>Invite</button>
									</InputAdornment>
								),
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FinanceRight;
