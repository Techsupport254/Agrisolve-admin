import { useState, useEffect } from "react";
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
import { useHistory } from "react-router-use-history";
import PropTypes from "prop-types";

const Orders = ({ user, users, getTimeLabel }) => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const history = useHistory();

	// Fetch orders by ownerId
	const fetchOrders = async () => {
		setLoading(true); // Set loading before the operation
		try {
			const response = await axios.get(
				`http://localhost:8000/order/owner/${user._id}`
			);
			if (response.data && Array.isArray(response.data)) {
				// Sort and filter operations inside the async function to ensure they're applied to updated data
				const sortedFilteredOrders = response.data
					.sort((a, b) => new Date(b.date) - new Date(a.date))
					.map((order) => ({
						...order,
						products: order.products.filter(
							(product) => product.productId.refId === user._id
						),
					}))
					.filter((order) => order.products.length > 0); // Filter out orders with no products after filtering

				setOrders(sortedFilteredOrders);
			}
		} catch (error) {
			console.error("Failed to fetch orders:", error);
		} finally {
			setLoading(false); // Ensure loading is set to false both on success and failure
		}
	};

	useEffect(() => {
		if (user && user._id) {
			fetchOrders();
		} else {
			console.log("User or user ID is undefined.");
		}
	}, [user?._id]); // Dependency on user._id to refetch when it changes

	// sort orders by date
	orders?.sort((a, b) => {
		return new Date(b.date) - new Date(a.date);
	});

	// Get customer by userId with fallback
	const getCustomer = (userId) => {
		const customer = users.find((user) => user._id === userId);
		return customer || { name: "Unknown", email: "No email provided" };
	};
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
			</div>
			<div className="OrdersContainer">
				{!orders || orders.length === 0 ? (
					<div className="NoOrder">
						<img src={nochat} alt="" />
						<h3>No orders yet</h3>
					</div>
				) : (
					<TableContainer>
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
									<TableCell>Qty</TableCell>
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
									orders.flatMap((order) =>
										order.products.map((product, index) => (
											<TableRow
												key={`${order._id}-${index}`}
												onClick={() => history.push(`/orders/${order._id}`)}
											>
												<TableCell>{order?.orderId}</TableCell>
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
																src={product?.productId.images[0]}
																alt={product?.productId.productName}
															/>
														</div>
														<div className="CustomerDetails">
															<span>{product?.productId.productName}</span>
															<h3>{product?.productId.productCategory}</h3>
															<p>{product?.productId.brandName}</p>
														</div>
													</div>
												</TableCell>
												<TableCell>{product.quantity}</TableCell>
												<TableCell>
													{product?.productId.price
														? `KES ${product.productId.price
																.toString()
																.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
														: "No price available"}
												</TableCell>

												<TableCell>
													{"KES" +
														" " +
														(product.quantity * product?.productId.price)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
												</TableCell>
												<TableCell>
													<p
														style={{
															color:
																order.payment.status === "Pending"
																	? "var(--warning-dark)"
																	: order.payment.status === "Paid"
																	? "var(--success-dark)"
																	: "var(--error-dark)",
														}}
													>
														{order.payment.status}
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
																	: order.status === "Delivered"
																	? "var(--success-darker)"
																	: "var(--error-darker)",

															backgroundColor:
																order.status === "Pending"
																	? "var(--warning-lighter)"
																	: order.status === "Approved"
																	? "var(--primary-lighter)"
																	: order.status === "Delivered"
																	? "var(--success-lighter)"
																	: "var(--error-lighter)",
														}}
													>
														{order.timeline[order.timeline.length - 1].type}
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

// validate props

Orders.propTypes = {
	orders: PropTypes.array.isRequired,
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	getOrders: PropTypes.func.isRequired,
	getUsers: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	product: PropTypes.object.isRequired,
	products: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
};
