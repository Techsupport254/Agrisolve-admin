import React from "react";
import "./DashTable.css";
import { DataGrid } from "@mui/x-data-grid";

const DashTable = ({ products, getTimeLabel }) => {
	if (products === null) {
		return (
			<div className="SpinnerLoading">
				<i className="fa fa-spinner fa-spin" />
			</div>
		);
	}

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

	const rows = products.map((product) => ({
		id: product._id,
		orderedBy: "product.orderedBy.name",
		quantity: product.quantity,
		ordered: getTimeLabel(product.creationAt),
		status: product.updatedAt ? (status = "Delivered") : (status = "Ordered"),
		delivery: product.updatedAt ? getTimeLabel(product.updatedAt) : null,
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
