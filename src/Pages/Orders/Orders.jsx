import React, { useState, useEffect } from "react";
import "./Orders.css";
import {
	InputAdornment,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import axios from "axios";
import nochat from "../../assets/nochat.png";

const Orders = ({ user, users, products, getTimeLabel }) => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	// Fetch orders
	const fetchOrders = async () => {
		try {
			const response = await axios.get("https://agrisolve.vercel.app/order");
			setOrders(response.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, [user?._id]);

	// Function to get user by userId
	const getCustomer = (userId) => {
		if (!users) return null;
		return users.find((user) => user._id === userId);
	};

	// Function to get product by productId
	const getProduct = (productId) => {
		if (!products) return null;
		return products.find((product) => product._id === productId);
	};

	// sort orders by date
	orders.sort((a, b) => {
		return new Date(b.date) - new Date(a.date);
	});

	// filter products to display where ownerId === user._id
	orders.forEach((order) => {
		order.products = order.products.filter(
			(product) => product?.ownerId === user?._id
		);
	});
	return (
		<div className="Orders">
			<div className="Header">
				<i className="fa fa-shopping-cart"></i>
				<h3>Orders</h3>
			</div>
			<div className="Stepper">
				<div className="Lists">
					<li>Dashboard</li>
					<li>Orders</li>
					<li>Lists</li>
				</div>
			</div>
			<div className="OrdersContainer">
				{orders.length === 0 ? (
					<div className="NoOrder">
						<img src={nochat} alt="" />
						<h3>No orders yet</h3>
					</div>
				) : (
					<TableContainer>
						<div className="TableTop">
							<TextField
								size="small"
								placeholder="Search for order or customer"
								color="success"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<i
												className="fa fa-search"
												style={{
													color: "#000",
													fontSize: "1.2rem",
													cursor: "pointer",
												}}
											></i>
										</InputAdornment>
									),
								}}
							/>
							<div className="Filter">
								<i className="fa fa-filter"></i>
								<p>Filter</p>
							</div>
							<TextField
								size="small"
								color="success"
								select
								SelectProps={{
									native: true,
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<p className="Payment">Payment</p>
										</InputAdornment>
									),
								}}
							>
								<option value="All">All</option>
								<option value="Pending">Pending</option>
								<option value="Paid">Paid</option>
							</TextField>
							<TextField
								size="small"
								color="success"
								select
								SelectProps={{
									native: true,
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<p className="Payment">Status</p>
										</InputAdornment>
									),
								}}
							>
								<option value="All">All</option>
								<option value="Pending">Pending</option>
								<option value="Approved">Approved</option>
								<option value="OnWay">On the way</option>
								<option value="Delivered">Delivered</option>
							</TextField>
						</div>
						<Table>
							<TableHead
								sx={{
									backgroundColor: "#f5f5f5",
									color: "#000",
									fontWeight: "bold",
								}}
							>
								<TableRow>
									<TableCell>Order</TableCell>
									<TableCell>Customer</TableCell>
									<TableCell>Product</TableCell>
									<TableCell>Quantity</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>Total</TableCell>
									<TableCell>Payment</TableCell>
									<TableCell>Status</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{loading ? (
									<TableRow>
										<TableCell colSpan={8}>
											<div className="Loading">
												<i className="fa fa-spinner fa-spin" />
											</div>
										</TableCell>
									</TableRow>
								) : (
									orders.map((order) =>
										order.products.map((product) => (
											<TableRow key={order._id}>
												<TableCell>{order.orderId}</TableCell>
												<TableCell>
													<div className="Customer">
														<div className="Avatar">
															<img
																src={getCustomer(order.userId)?.profilePicture}
																alt=""
															/>
														</div>
														<div className="CustomerDetails">
															<span>{getCustomer(order.userId)?.name}</span>
															<p>{getCustomer(order.userId)?.email}</p>
															<h3>{getTimeLabel(order?.date)}</h3>
														</div>
													</div>
												</TableCell>
												<TableCell>
													<div className="Customer">
														<div className="ProductImage">
															<img
																src={getProduct(product.productId)?.images[0]}
																alt={getProduct(product.productId)?.productName}
															/>
														</div>
														<div className="CustomerDetails">
															<span>
																{getProduct(product.productId)?.productName}
															</span>
															<h3>
																{getProduct(product.productId)?.productCategory}
															</h3>
															<p>{getProduct(product.productId)?.brandName}</p>
														</div>
													</div>
												</TableCell>
												<TableCell>{product.quantity}</TableCell>
												<TableCell>
													{"KES" +
														" " +
														getProduct(product.productId)
															?.price.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
												</TableCell>
												<TableCell>
													{"KES" +
														" " +
														(
															product.quantity *
															getProduct(product.productId)?.price
														)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
												</TableCell>
												<TableCell>
													<p
														style={{
															color:
																order.payment === "Pending"
																	? "var(--warning-dark)"
																	: order.payment === "Paid"
																	? "var(--success-dark)"
																	: "var(--error-dark)",
														}}
													>
														{order.payment}
													</p>
												</TableCell>
												<TableCell>
													<p
														style={{
															color:
																order.status === "Pending"
																	? "var(--warning-darker)"
																	: order.status === "Approved"
																	? "var(--primary-darker)"
																	: order.status === "delivered"
																	? "var(--success-darker)"
																	: "var(--error-darker)",

															backgroundColor:
																order.status === "Pending"
																	? "var(--warning-lighter)"
																	: order.status === "Approved"
																	? "var(--primary-lighter)"
																	: order.status === "delivered"
																	? "var(--success-lighter)"
																	: "var(--error-lighter)",
														}}
													>
														{order.status}
													</p>
												</TableCell>
												<TableCell>
													<i className="fa fa-ellipsis-v"></i>
												</TableCell>
											</TableRow>
										))
									)
								)}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</div>
		</div>
	);
};

export default Orders;
