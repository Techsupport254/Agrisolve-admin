import React from "react";
import "./Cards.css";
import { carddata } from "../../Data";
import Card from "../Card/Card";

const Cards = ({ user, products, earnings }) => {
	// filter the earnings whose userId === user._id
	const userEarnings = earnings?.filter(
		(earning) => earning?.userId === user?._id
	);
	const totalSales = userEarnings?.reduce((a, b) => a + b?.total, 0);
	console.log(totalSales);
	// get the earnings array
	const earningsArray = userEarnings?.[0]?.earnings?.map(
		(earning) => earning?.amount
	);
	// get the total sales
	const totalEarnings = earningsArray?.reduce((a, b) => a + b, 0);
	// get the total income
	const totalIncome = earningsArray
		?.filter((earning) => earning > 0)
		?.reduce((a, b) => a + b, 0);
	// get the total expense
	const totalExpense = earningsArray
		?.filter((earning) => earning < 0)
		?.reduce((a, b) => a + b, 0);

	return (
		<div className="Cards">
			{carddata.map((item, index) => (
				<Card
					key={index}
					title={item.title}
					value={item.value}
					barValue={item.barValue}
					icon={item.icon}
					color={item.color}
					series={item.series}
				/>
			))}
		</div>
	);
};

export default Cards;
