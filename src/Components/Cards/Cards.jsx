import React from "react";
import "./Cards.css";
import { carddata } from "../../Data";
import Card from "../Card/Card";

const Cards = () => {
	console.log(carddata);
	return (
		<div className="Cards">
			{carddata?.map((card) => (
				<Card
					title={card.title}
					value={card.value}
					barValue={card.barValue}
					icon={card.icon}
					color={card.color}
					series={card.series}
				/>
			))}
		</div>
	);
};

export default Cards;
