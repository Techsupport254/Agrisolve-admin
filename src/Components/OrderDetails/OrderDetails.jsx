import React from "react";
import "./OrderDetails.css";

const OrderDetails = ({ order, getCustomer }) => {

	return (
		<div className="OrderDetails">
			<div className="Header">
				<h3>Details</h3>
			</div>
			<div className="OrderProduct">
				{order?.products && order.products.length > 0 ? (
					order.products.map((product) => {
						const productDetails = product?.productId;
						if (!productDetails) {
							console.log(
								"Product details not found for product ID:",
								product.productId
							);
							return <p key={product._id}>Product details not available.</p>;
						}

						return (
							<div key={product._id} className="OrderItem">
								<div className="ProductImage">
									<img
										src={productDetails.images[0]}
										alt={productDetails.productName || "Product"}
									/>
								</div>
								<div className="ProductDetail">
									<div className="ProductInfo">
										<span>{productDetails.productName}</span>
										<p>{productDetails.brandName}</p>
									</div>
									<div className="ProductPrice">
										<span>
											<i className="fa fa-times"></i>&nbsp;
											{product.quantity}
										</span>
										<span>
											{"KES " +
												(
													productDetails.price * product.quantity
												).toLocaleString()}
										</span>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<p>No products in this order.</p>
				)}
			</div>
		</div>
	);
};

export default OrderDetails;
