import React, { useState } from "react";
import "./Table.css";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const Table = ({ products }) => {
	const [selectedItem, setSelectedItem] = useState(null);

	if (products === null) {
		return (
			<div className="SpinnerLoading">
				<i className="fa fa-spinner fa-spin" />
			</div>
		);
	}

	const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
		height: 5,
		width: 100,
		borderRadius: 4,
		[`&.${linearProgressClasses.colorPrimary}`]: {
			backgroundColor:
				value > 75
					? "var(--success-lighter)"
					: value > 50
					? "var(--primary-lighter)"
					: value > 25
					? "var(--warning-lighter)"
					: "var(--error-lighter)",
		},
		[`& .${linearProgressClasses.bar}`]: {
			borderRadius: 4,
			backgroundColor:
				value > 75
					? "var(--success-light)"
					: value > 50
					? "var(--primary-light)"
					: value > 25
					? "var(--warning-light)"
					: "var(--error-light)",
		},
	}));

	const columns = [
		{
			field: "product",
			headerName: "Product",
			width: 250,
			sortable: true,
			renderCell: (params) => {
				return (
					<div className="Product">
						<div className="ProductImage">
							<img src={params.row.image} alt={params.row.title} />
						</div>
						<div className="ProductDetails">
							<span>{params.row.title}</span>
							<p>{params.row.category}</p>
						</div>
					</div>
				);
			},
		},
		{
			field: "price",
			headerName: "Price",
			width: 130,
			sortable: false,
			renderCell: (params) => {
				return (
					<div className="Price">
						<span>KSh. {params.row.price}</span>
					</div>
				);
			},
		},
		{
			field: "quantity",
			headerName: "Stock",
			width: 130,
			sortable: false,
			renderCell: (params) => {
				const value = 80;
				return (
					<div className="Stock">
						<BorderLinearProgress
							variant="determinate"
							value={(value / 100) * 100}
						/>
						<span>{value} in stock</span>
					</div>
				);
			},
		},
		{
			field: "date",
			headerName: "Created/Updated",
			width: 180,
			sortable: false,
		},
		{
			field: "status",
			headerName: "Status",
			width: 130,
			sortable: true,
			renderCell: (params) => {
				return (
					<div
						className="PublishStatus"
						style={{
							backgroundColor:
								params.row.status === "published"
									? "var(--success-lighter)"
									: "var(--warning-lighter)",
							color:
								params.row.status === "published"
									? "var(--success-dark)"
									: "var(--warning-dark)",
						}}
					>
						{params.row.status === "published" ? (
							<span className="Available">Published</span>
						) : (
							<span className="Unavailable">Draft</span>
						)}
					</div>
				);
			},
		},
	];

	const rows = products.map((product) => ({
		id: product.id,
		title: product.title,
		category: product.category.name,
		quantity: product.quantity,
		image: product.images[0],

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
		<div style={{ width: "100%" }}>
			{selectedItem ? (
				<div className="SelectedActions">
					<button
						onClick={() => console.log("Edit selected item", selectedItem.id)}
					>
						Edit
					</button>
					<button
						onClick={() => console.log("Delete selected item", selectedItem.id)}
					>
						Delete
					</button>
				</div>
			) : (
				<DataGrid
					rows={rows}
					columns={columns}
					rowHeight={80}
					checkboxSelection
					onRowSelected={(e) => setSelectedItem(e.isSelected ? e.data : null)}
					disableSelectionOnClick
					sortingOrder={["asc", "desc", null]}
				/>
			)}
		</div>
	);
};

export default Table;
