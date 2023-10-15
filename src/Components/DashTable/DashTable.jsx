import React from "react";
import "./DashTable.css";
import { DataGrid } from "@mui/x-data-grid";

const DashTable = ({ orders, getTimeLabel, getCustomer, getProduct, user }) => {
	if (!orders?.products) {
		return (
			<div className="NoProducts">
				<i className="fa fa-boxes"></i>
				<h2>No Orders yet!</h2>
				<p>
					You have not received any orders yet. Once you receive an order, the
					recent orders will appear here.
				</p>
			</div>
		);
	}

	console.log("orders", orders);

	// total for each order
	const getTotal = (order) => {
		let total = 0;
		order?.products.forEach((product) => {
			console.log("product", product);
			if (product.ownerId === user?._id) {
				// get the price and quantity of each product in an order
				const price = getProduct(product.productId)?.price;
				const quantity = product.quantity;
				// calculate total for each product in an order
				total += price * quantity;
			}
		});
		return total;
	};

	// get the quantity of each product in an order
	const getQuantity = (order, productId, userId) => {
		let quantity = 0;
		order?.products.forEach((product) => {
			console.log("product", product);
			// get the quantity of each product in an order
			if (product.ownerId === user?._id) {
				quantity = product.quantity;
				console.log("quantity", quantity);
			}
		});
		return quantity;
	};

	const columns = [
		{ field: "id", headerName: "Order ID", width: 130, sortable: true },
		{
			field: "orderedBy",
			headerName: "Customer",
			width: 250,
			renderCell: (params) => {
				return (
					<div className="flex flex-col">
						<div className="text-black">{params.value}</div>
						<div className="text-gray-500">{params.row.phone}</div>
					</div>
				);
			},
		},
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
		{ field: "amount", headerName: "Amount (KES)", width: 160, sortable: true },
	];

	const rows = orders
		.filter((order) => {
			const date = new Date();
			const date7DaysAgo = date.setDate(date.getDate() - 7);
			return new Date(order.date) > date7DaysAgo;
		})
		.map((order) => ({
			id: order.orderId,
			orderedBy: getCustomer(order?.userId)?.name,
			phone: getCustomer(order?.userId)?.phone,
			quantity: getQuantity(order, order?.productId, user?._id),
			ordered: getTimeLabel(order.date),
			status: order.date ? "Delivered" : "Ordered", // Calculate status for each order
			delivery: order.date ? getTimeLabel(order.date) : null,
			amount: getTotal(order)
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
		}));

	return (
		<div className="DashTable" style={{ height: 500, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				checkboxSelection
				disableSelectionOnClick
				sortingOrder={["asc", "desc", null]}
				className="DashTableGrid"
			/>
		</div>
	);
};

export default DashTable;
