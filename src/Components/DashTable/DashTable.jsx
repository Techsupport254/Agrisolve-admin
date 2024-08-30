import React, { useState } from "react";
import {
	Button,
	Snackbar,
	Alert,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import "./DashTable.css";

const DashTable = ({ orders, getTimeLabel, getProduct, user }) => {
	const [orderRows, setOrderRows] = useState(orders);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const admin_email = __ADMIN__;

	const formattedAmount = (amount) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "KES",
		}).format(amount);
	};

	const handleConfirm = async (orderId) => {
		try {
			await axios.put(
				`http://localhost:8000/order/${orderId}/status`,
				{ status: "Confirmed" },
				{
					headers: {
						"x-auth-token": user.token,
					},
				}
			);

			setOrderRows((prevOrders) =>
				prevOrders.map((order) =>
					order.orderId === orderId ? { ...order, status: "Confirmed" } : order
				)
			);

			setSnackbarMessage("Order confirmed successfully!");
			setSnackbarSeverity("success");
		} catch (error) {
			console.error("Failed to confirm order:", error);
			setSnackbarMessage("Failed to confirm order.");
			setSnackbarSeverity("error");
		} finally {
			setSnackbarOpen(true);
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	const pendingOrders = orderRows.filter((order) => {
		const recentTimeline = order.timeline[order.timeline.length - 1];
		return recentTimeline.type === "Pending";
	});

	if (pendingOrders.length === 0) {
		return (
			<div className="NoProducts">
				<i className="fa fa-boxes"></i>
				<h2>No Orders yet!</h2>
				<p>
					You have not received any orders yet. Once you receive an order, the
					pending orders will appear here.
				</p>
			</div>
		);
	}

	const columns = [
		{ title: "Order ID", field: "id" },
		{ title: "Ordered", field: "ordered" },
		{
			title: "Status",
			field: "status",
			render: (value) => {
				if (value === "Pending") {
					return <span style={{ color: "orange" }}>{value}</span>;
				}
				return <span>{value}</span>;
			},
		},
		{
			title: "Amount",
			field: "amount",
			render: (value) => formattedAmount(value),
			cellStyle: (value) => ({
				color: value > 5000 ? "red" : "black",
			}),
		},
		{
			title: "Action",
			field: "action",
			render: (rowData) => (
				<Button
					variant="contained"
					color="primary"
					size="small"
					onClick={() => handleConfirm(rowData.id)}
					disabled={user?.email !== admin_email}
				>
					Confirm
				</Button>
			),
		},
	];

	const data = pendingOrders.map((order) => ({
		id: order.orderId,
		ordered: getTimeLabel(order.date),
		status: order.timeline[order.timeline.length - 1].type,
		amount: order.amounts.totalAmount,
	}));

	return (
		<div className="DashTable">
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.field}>{column.title}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<TableRow key={row.id}>
								<TableCell>{row.id}</TableCell>
								<TableCell>{row.ordered}</TableCell>
								<TableCell>{columns[2].render(row.status)}</TableCell>
								<TableCell style={columns[3].cellStyle(row.amount)}>
									{columns[3].render(row.amount)}
								</TableCell>
								<TableCell>{columns[4].render(row)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default DashTable;

// validation of props
DashTable.propTypes = {
	orders: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
	getProduct: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};
