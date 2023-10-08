import React, { useState, useEffect } from "react";
import "./DashTable.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const DashTable = ({ user, users, products, getTimeLabel }) => {
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
	if (products === null) {
		return (
			<div className="SpinnerLoading">
				<i className="fa fa-spinner fa-spin" />
			</div>
		);
	}

	// display orders for the past 7 days
	const ordersLast7Days = orders.filter((order) => {
		const date = new Date();
		const date7DaysAgo = date.setDate(date.getDate() - 7);
		return new Date(order.date) > date7DaysAgo;
	});

	const columns = [
		{ field: "id", headerName: "Order ID", width: 130, sortable: true },
		{ field: "orderedBy", headerName: "Customer", width: 200 },
		{ field: "ordered", headerName: "Ordered", width: 130 },
		{
			field: "status",
			headerName: "Status",
			width: 130,
			cellClassName: (params) => {
				return params.value === "Delivered" ? "delivered" : "ordered";
			},
		},
		{ field: "delivery", headerName: "Delivery", width: 130 },
		{ field: "amount", headerName: "Amount ($)", width: 140, sortable: true },
		{ field: "more", headerName: "More", width: 130 },
	];

	const rows = ordersLast7Days.map((product) => ({
		id: product.orderId,
		orderedBy: getCustomer(product?.userId)?.name,
		quantity: product.quantity,
		ordered: getTimeLabel(product.creationAt),
		status: product.date ? (status = "Delivered") : (status = "Ordered"),
		delivery: product.date ? getTimeLabel(product.date) : null,
		amount: product.price,
		more: "Details",
	}));

	return (
		<div style={{ height: 600, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				checkboxSelection
				disableSelectionOnClick
				sortingOrder={["asc", "desc", null]}
			/>
		</div>
	);
};

export default DashTable;
