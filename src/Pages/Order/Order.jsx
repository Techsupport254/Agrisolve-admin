import { useEffect, useState } from "react";
import "./Order.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, TextField, MenuItem, Snackbar, Alert } from "@mui/material";
import OrderDetails from "../../Components/OrderDetails/OrderDetails";
import OrderHistory from "../../Components/OrderHistory/OrderHistory";
import OrderRight from "../../Components/OrderRight/OrderRight";
import PropTypes from "prop-types";

const Order = ({ users, user, products, getTimeLabel }) => {
	const { id } = useParams();

	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState("");
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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

	const handleEditMode = () => {
		setEditMode(!editMode);
	};

	const handleStatusChange = (event) => {
		setSelectedStatus(event.target.value);
	};

	const currentTimeline = order?.timeline[order?.timeline?.length - 1];

	// Update the order status
	const updateOrderStatus = async (status) => {
		try {
			await axios.put(`http://localhost:8000/order/${order?.orderId}/status`, {
				status,
			});
			fetchOrders();
			setSnackbarMessage("Order status updated successfully!");
			setSnackbarSeverity("success");
		} catch (error) {
			console.error("Failed to update order status:", error);
			setError("Failed to update order status.");
			setSnackbarMessage("Failed to update order status.");
			setSnackbarSeverity("error");
		} finally {
			setSnackbarOpen(true);
		}
	};

	const handleSaveStatus = () => {
		if (selectedStatus && selectedStatus !== currentTimeline?.type) {
			updateOrderStatus(selectedStatus);
		}
		setEditMode(false);
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	// disabled mode for status change

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
						<small
							style={{
								backgroundColor: `${
									currentTimeline?.type === "Pending"
										? "var(--warning)"
										: currentTimeline?.type === "Confirmed"
										? "var(--info)"
										: currentTimeline?.type === "Out for Delivery"
										? "var(--success)"
										: currentTimeline?.type === "Delivered"
										? "var(--success)"
										: "var(--error)"
								}`,
							}}
						>
							{currentTimeline?.type}
						</small>
					</span>
					<p>{getTimeLabel(order?.date)}</p>
				</div>
				<div className="OrderButtons">
					<TextField
						id="outlined-select-currency-native"
						select
						label="Status"
						value={selectedStatus || currentTimeline?.type}
						onChange={handleStatusChange}
						SelectProps={{
							native: false,
						}}
						size="small"
						variant="outlined"
						sx={{ width: 200 }}
						color="success"
						disabled={
							!editMode ||
							(currentTimeline?.type === "Delivered" && !user.isAdmin)
						}
					>
						<MenuItem value="Pending" disabled>
							Pending
						</MenuItem>
						<MenuItem
							value="Confirmed"
							disabled={
								currentTimeline?.type === "Confirmed" ||
								currentTimeline?.type === "Out for Delivery" ||
								currentTimeline?.type === "Delivered"
							}
						>
							Confirmed
						</MenuItem>
						<MenuItem
							value="Out for Delivery"
							disabled={
								currentTimeline?.type === "Out for Delivery" ||
								currentTimeline?.type === "Delivered"
							}
						>
							Out for Delivery
						</MenuItem>
						<MenuItem
							value="Delivered"
							disabled={currentTimeline?.type === "Delivered"}
						>
							Delivered
						</MenuItem>
					</TextField>
					<Button
						variant="contained"
						sx={{ marginLeft: "1rem" }}
						color="success"
						style={{
							backgroundColor: "var(--bg-color)",
							color: "var(--white)",
							fontWeight: "bold",
						}}
						onClick={editMode ? handleSaveStatus : handleEditMode}
					>
						{editMode ? (
							<>
								<i className="fa fa-save"></i> &nbsp; Save
							</>
						) : (
							<>
								<i className="fa fa-edit"></i> &nbsp; Edit
							</>
						)}
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
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
					sx={{ width: "100%" }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Order;

// Prop validation
Order.propTypes = {
	user: PropTypes.object.isRequired,
	users: PropTypes.array.isRequired,
	products: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
};
