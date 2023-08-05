import React from "react";
import "./Table.css";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ products }) => {
	if (products === null) {
		return (
			<div className="SpinnerLoading">
				<i className="fa fa-spinner fa-spin" />
			</div>
		);
	}

	const columns = [
		{ field: "id", headerName: "ID", width: 100, sortable: true },
		{ field: "title", headerName: "Title", width: 200, sortable: true },
		{ field: "category", headerName: "Category", width: 150, sortable: true },
		{ field: "description", headerName: "Description", width: 200 },
		{ field: "price", headerName: "Price ($)", width: 130, sortable: true },
		{ field: "quantity", headerName: "Stock", width: 130, sortable: true },
		{
			field: "date",
			headerName: "Created/Updated",
			sortable: true,
			width: 180,
		},
		{
			field: "action",
			headerName: "Action",
			width: 130,
			sortable: false,
			renderCell: (params) => {
				return (
					<div className="action">
						<i className="fas fa-edit"></i>&nbsp;&nbsp;&nbsp;&nbsp;
						<i className="fas fa-trash-alt"></i>
					</div>
				);
			},
		},
	];

	const rows = products.map((product) => ({
		id: product.id,
		title: product.title,
		category: product.category.name,
		description: product.description,
		quantity: product.quantity,
		date: product.updatedAt
			? new Date(product.updatedAt).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
			  })
			: new Date(product.creationAt).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
			  }),

		price: product.price,
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

export default Table;
