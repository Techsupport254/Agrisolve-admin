import { useEffect, useState } from "react";
import "./Order.css";
import { useParams } from "react-router-dom"; // Corrected import
import axios from "axios";
import { Button, TextField } from "@mui/material";
import OrderDetails from "../../Components/OrderDetails/OrderDetails";
import OrderHistory from "../../Components/OrderHistory/OrderHistory";
import OrderRight from "../../Components/OrderRight/OrderRight";
import PropTypes from "prop-types";

const Order = ({ users, user, products, getTimeLabel }) => {
	const { id } = useParams();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(""); // Added state to handle errors

	// Fetch orders
	const fetchOrders = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/order/owner/${user?._id}` // Fixed string interpolation
			);
			setOrders(response.data);
		} catch (error) {
			console.error("Failed to fetch orders:", error);
			setError("Failed to load orders.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user?._id) {
			fetchOrders();
		}
	}, [user?._id]);
	console.log("orders", orders);

	// Filter id to get order
	const order = orders?.find((order) => order?._id === id);

	// Function to get user by userId
	const getCustomer = (userId) => {
		if (!users) return null;
		return users.find((user) => user._id === userId);
	};

	// Sort orders by date
	orders.sort((a, b) => {
		return new Date(b.date) - new Date(a.date);
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

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
					<OrderDetails order={order} getCustomer={getCustomer} />
					<OrderHistory
						order={order}
						getCustomer={getCustomer}
						getTimeLabel={getTimeLabel}
					/>
				</div>
				<div className="OrderRight">
					<OrderRight order={order} getCustomer={getCustomer} />
				</div>
			</div>
		</div>
	);
};

export default Order;

// prop validation

Order.propTypes = {
	user: PropTypes.object.isRequired,
	users: PropTypes.array.isRequired,
	products: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
	orders: PropTypes.array.isRequired,
};
