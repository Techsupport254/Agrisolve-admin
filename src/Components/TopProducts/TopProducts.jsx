import React from "react";
import "./TopProducts.css";
import { Avatar } from "@mui/material";

const TopProducts = ({ users, products, getTimeLabel }) => {
	console.log(products);
	const containerClassName = "TopProductsContainer";
	return (
		<div className="TopProducts">
			<div className="Header">
				<i className="fa-brands fa-product-hunt"></i>
				<h2>Top</h2>
			</div>
			<div className={containerClassName}>
				<table>
					<thead>
						<tr>
							<th>Product</th>
							<th>Added</th>
							<th>Price</th>
							<th>Total Earnings</th>
							<th>Returning Customers</th>
							<th>New Customers</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product) => (
							<tr key={product._id}>
								<td>
									<div className="TopProduct">
										<Avatar
											sx={{ width: 26, height: 26, bgcolor: "#f50057" }}
											src={product?.images[0]}
											alt={product?.productName}
										/>
										<div className="ProductName">
											<span>
												{product.productName.length > 15
													? product.productName.substring(0, 15) + "..."
													: product.productName}
											</span>
											<p>{product.brandName}</p>
										</div>
									</div>
								</td>
								<td className="DateAdded">
									<p>{getTimeLabel(product.createdAt)}</p>
								</td>
								<td className="ProductPrice">
									<p>KES. {product.price}</p>
								</td>
								<td className="TotalEarnings">
									<p>KES. {product.price}</p>
								</td>
								<td className="ReturningCustomers">
									<p>{product.price}</p>
								</td>
								<td className="NewCustomers">
									<p>{product.price}</p>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TopProducts;
