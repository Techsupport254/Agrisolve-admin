import React from "react";
import "./OrderDetails.css";

const OrderDetails = ({ order, getCustomer, getProduct }) => {
	console.log("order", order);
	return (
		<div className="OrderDetails">
			<div className="Header">
				<h3>Details</h3>
			</div>
			<div className="OrderProduct">
				{order?.products?.map(
					(product) => (
						console.log("product", product),
						(
							<div className="OrderItem">
								<div className="ProductImage">
									<img
										src={getProduct(product.productId)?.images[0]}
										alt={getProduct(product.productId)?.productName}
									/>
								</div>
								<div className="ProductDetail">
									<div className="ProductInfo">
										<span>{getProduct(product.productId)?.productName}</span>
										<p>{getProduct(product.productId)?.brandName}</p>
									</div>
									<div className="ProductPrice">
										<span>
											<i className="fa fa-times"></i>&nbsp;
											{product.quantity}
										</span>
										<span>
											{"KES" +
												" " +
												(
													getProduct(product.productId)?.price *
													product.quantity
												)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
										</span>
									</div>
								</div>
							</div>
						)
					)
				)}
			</div>
		</div>
	);
};

export default OrderDetails;
