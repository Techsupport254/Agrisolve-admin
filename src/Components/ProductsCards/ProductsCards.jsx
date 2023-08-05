import React from "react";
import "./ProductsCards.css";
import ProductsCard from "../ProductsCard/ProductsCard";

const ProductsCards = ({ user }) => {
	const categories = [
		{ name: "applaud", value: "applaud" },
		{ name: "stats", value: "stats" },
	];
	return (
		<div className="PCardsContainer">
			{categories.map((category) => (
				<ProductsCard key={category.value} category={category} user={user} />
			))}
		</div>
	);
};

export default ProductsCards;
