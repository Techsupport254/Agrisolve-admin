import React, { useEffect, useState } from "react";
import "./Order.css";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-use-history";
import axios from "axios";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import OrderDetails from "../../Components/OrderDetails/OrderDetails";
import OrderHistory from "../../Components/OrderHistory/OrderHistory";
import OrderRight from "../../Components/OrderRight/OrderRight";

const Order = ({ users, user, products, getTimeLabel }) => {
	const { id } = useParams();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const history = useHistory();

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

	console.log(orders);

	// filter id to get order
	const order = orders?.find((order) => order?._id === id);
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
		<div className="OrderParent">
			<div className="Header">
				<i className="fa fa-shopping-cart"></i>
				<h3>Order</h3>
			</div>
			<div className="OrderTop">
				<div className="OrderInfo">
					<span>
						{order?.orderId}
						<small>{order?.status}</small>
					</span>
					<p>{getTimeLabel(order?.date)}</p>
				</div>
				<div className="OrderButtons">
					{/* display statuses that can be selected */}
					<TextField
						id="outlined-select-currency-native"
						select
						label="Status"
						value={order?.status}
						SelectProps={{
							native: true,
						}}
						size="small"
						variant="outlined"
						sx={{ width: 200 }}
						color="success"
					>
						<option value="Pending">Pending</option>
						<option value="In Transit">In Transit</option>
						<option value="Delivered">Delivered</option>
					</TextField>

					<Button
						variant="contained"
						sx={{ marginLeft: "1rem" }}
						style={{
							backgroundColor: "transparent",
							color: "var(--bg-color)",
							fontWeight: "bold",
						}}
					>
						<i className="fa fa-print"></i>&nbsp; Print
					</Button>
					<Button
						variant="contained"
						sx={{ marginLeft: "1rem" }}
						color="success"
						style={{
							backgroundColor: "var(--bg-color)",
							color: "var(--white)",
							fontWeight: "bold",
						}}
					>
						<i className="fas fa-pen"></i>&nbsp; Edit
					</Button>
				</div>
			</div>
			<div className="OrderContainer">
				<div className="OrderLeft">
					<OrderDetails
						order={order}
						getCustomer={getCustomer}
						getProduct={getProduct}
					/>
					<OrderHistory
						order={order}
						getCustomer={getCustomer}
						getProduct={getProduct}
                        getTimeLabel={getTimeLabel}
					/>
				</div>
				<div className="OrderRight">
					<OrderRight
						order={order}
						getCustomer={getCustomer}
						getProduct={getProduct}
					/>
				</div>
			</div>
		</div>
	);
};

export default Order;
