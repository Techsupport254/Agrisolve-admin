import React, { useState, useEffect } from "react";
import "./Transactions.css";
import Transaction from "../Transaction/Transaction";

const Transactions = ({ earnings, user, users }) => {
	const [admin, setAdmin] = React.useState(false);
	const admin_email = __ADMIN__;

	// Check if user is admin
	useEffect(() => {
		if (user?.email === admin_email) {
			setAdmin(true);
		}
	}, [user?.email, admin_email]);

	const userEarnings = earnings?.filter(
		(earning) => earning?.userId === user?._id || admin
	);
	const userId = userEarnings?.[0]?.userId;
	const transactions = userEarnings?.[0]?.earnings;
	Array && transactions?.sort((a, b) => new Date(b.date) - new Date(a.date));

	return (
		<div className="TransactionsContainer">
			{Array &&
				transactions?.map((transaction) => (
					<Transaction
						key={transaction.id}
						transaction={transaction}
						admin={admin}
						userId={userId}
						users={users}
					/>
				))}
		</div>
	);
};

export default Transactions;
