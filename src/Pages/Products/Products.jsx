import React from "react";
import "./Products.css";
import Table from "../../Components/Table/Table";
import ProductsCards from "../../Components/ProductsCards/ProductsCards";

const Products = ({ products, user, getTimeLabel, orders, earnings }) => {
	console.log(products);
	console.log(orders);
	return (
		<div className="Products">
			<div className="ProductsTop">
				<div className="Header">
					<i className="fa fa-boxes"></i>
					<h2>Products</h2>
				</div>
			</div>
			<div className="ProductsCards">
				<ProductsCards
					user={user}
					products={products}
					orders={orders}
					earnings={earnings}
				/>
			</div>
			<Table products={products} getTimeLabel={getTimeLabel} />
		</div>
	);
};

export default Products;
