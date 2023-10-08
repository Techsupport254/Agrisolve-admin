import React from "react";
import "./Finance.css";
import FinanceCards from "../../Components/FinanceCards/FinanceCards";
import Transactions from "../../Components/Transactions/Transactions";
import { InputAdornment, TextField } from "@mui/material";

const Finance = ({ user, getTimelabel }) => {
	return (
		<div className="Finance">
			<div className="Header">
				<i className="fa fa-chart-line"></i>
				<h3>Finance</h3>
			</div>
			<FinanceCards user={user} getTimelabel={getTimelabel} />
			<div className="FinanceContainer">
				<div className="Transactions">
					<div className="Header">
						<i className="fa fa-history"></i>
						<h3>Transactions</h3>
					</div>
					<Transactions />
				</div>
				<div className="Advert">
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
								// button
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
		</div>
	);
};

export default Finance;
