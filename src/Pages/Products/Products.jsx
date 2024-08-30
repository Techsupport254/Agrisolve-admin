import React, { useState, useEffect } from "react";
import "./Products.css";
import Table from "../../Components/Table/Table";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const Products = ({
	products,
	user,
	users,
	getTimeLabel,
	orders,
	earnings,
}) => {
	const [displayedProducts, setDisplayedProducts] = useState(products);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("");
	const [categories, setCategories] = useState([]);
	const [statuses, setStatuses] = useState([]);

	useEffect(() => {
		// Set categories and statuses when products change
		setCategories([
			...new Set(products?.map((product) => product.productCategory)),
		]);
		setStatuses([
			...new Set(products?.map((product) => product.productStatus)),
		]);
	}, [products]);

	// Filtering products based on search query, category, and status
	useEffect(() => {
		let filteredProducts = products;

		if (searchQuery) {
			filteredProducts = filteredProducts.filter((product) =>
				product.productName.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		if (selectedCategory) {
			filteredProducts = filteredProducts.filter(
				(product) => product.productCategory === selectedCategory
			);
		}

		if (selectedStatus) {
			filteredProducts = filteredProducts.filter(
				(product) => product.productStatus === selectedStatus
			);
		}

		setDisplayedProducts(filteredProducts);
	}, [searchQuery, selectedCategory, selectedStatus, products]);

	// Function to clear filters
	const handleClearFilters = () => {
		setSearchQuery("");
		setSelectedCategory("");
		setSelectedStatus("");
	};

	return (
		<div className="Products">
			<div className="ProductsTop">
				<div className="Header">
					<i className="fa fa-boxes"></i>
					<h2>Products</h2>
				</div>

				<div className="TopProductBtns">
					<div className="TopProductBtnsLeft">
						<input
							type="text"
							placeholder="Search for..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							style={{
								width: "180px",
								padding: "6px",
								fontSize: "1rem",
								border: "1px solid #ccc",
								borderRadius: "4px",
								marginRight: "10px",
							}}
						/>
						<select
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
							style={{
								padding: "6px",
								fontSize: "1rem",
								border: "1px solid #ccc",
								borderRadius: "4px",
								minWidth: "140px",
							}}
						>
							<option value="">
								<em>All Categories</em>
							</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
							style={{
								padding: "6px",
								fontSize: "1rem",
								border: "1px solid #ccc",
								borderRadius: "4px",
								minWidth: "140px",
								marginLeft: "10px",
							}}
						>
							<option value="">
								<em>All</em>
							</option>
							{statuses.map((status) => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</select>
					</div>
					<div className="TopProductBtnsRight">
						<button
							style={{
								color: "var(--warning-dark)",
								fontSize: "1rem",
								padding: "4px 8px",
								background: "none",
								cursor: "pointer",
							}}
							onClick={handleClearFilters}
						>
							Clear &nbsp;
							<i className="fa fa-filter"></i>
						</button>
						<Button
							variant="contained"
							onClick={() => (window.location.href = "/products/new")}
							style={{
								background: "var(--bg-color)",
								color: "var(--white)",
								fontSize: ".8rem",
							}}
						>
							<i className="fa fa-plus"></i>&nbsp; Product
						</Button>
					</div>
				</div>
			</div>
			<Table
				products={displayedProducts}
				getTimeLabel={getTimeLabel}
				orders={orders}
				earnings={earnings}
				user={user}
				users={users}
			/>
		</div>
	);
};

export default Products;

// props validation
Products.propTypes = {
	products: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
	orders: PropTypes.array.isRequired,
	earnings: PropTypes.object.isRequired,
};
