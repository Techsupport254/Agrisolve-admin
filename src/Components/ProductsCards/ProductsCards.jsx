import React from "react";
import "./ProductsCards.css";
import ProductsCard from "../ProductsCard/ProductsCard";

const ProductsCards = ({ user, products, orders, earnings }) => {
	console.log(products);
	console.log(orders);
	const categories = [
		{ name: "applaud", value: "applaud" },
		{ name: "stats", value: "stats" },
		{ name: "earnings", value: "earnings" },
	];
	return (
		<div className="PCardsContainer">
			{categories.map((category) => (
				<ProductsCard
					key={category.value}
					category={category}
					user={user}
					products={products}
					orders={orders}
					earnings={earnings}
				/>
			))}
		</div>
	);
};

export default ProductsCards;
