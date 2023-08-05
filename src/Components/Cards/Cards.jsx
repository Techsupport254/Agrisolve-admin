import React from "react";
import "./Cards.css";
import { carddata } from "../../Data";
import Card from "../Card/Card";

const Cards = () => {
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
