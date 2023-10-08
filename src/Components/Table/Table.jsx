import React, { useState } from "react";
import "./Table.css";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const Table = ({ products, getTimeLabel }) => {
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
							<h3>Ksh. {params.row.price}</h3>
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
						{params.row.wholesale ? (
							<>
								<span className="Wholesale">
									Ksh. {params.row.wholesalePrice}
								</span>
								
							</>
						) : (
							<span className="Retail">Ksh. {params.row.price}</span>
						)}
					</div>
				);
			},
		},
		{
			field: "stock",
			headerName: "Stock",
			width: 130,
			sortable: false,
			renderCell: (params) => {
				const value = params.row.stock;
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
			field: "wholesale",
			headerName: "Wholesale",
			width: 150,
			sortable: true,
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
								params.row.status === "Published"
									? "var(--success-lighter)"
									: "var(--warning-lighter)",
							color:
								params.row.status === "Published"
									? "var(--success-dark)"
									: "var(--warning-dark)",
						}}
					>
						{params.row.status === "Published" ? (
							<span className="Available">Published</span>
						) : (
							<span className="Unavailable">Draft</span>
						)}
					</div>
				);
			},
		},
		{
			field: "date",
			headerName: "Created/Updated",
			width: 180,
			sortable: false,
			renderCell: (params) => {
				return (
					<div className="Date">
						<span>{getTimeLabel(params.row.date)}</span>
					</div>
				);
			},
		},
	];

	const rows = products.map((product) => ({
		id: product._id,
		title: product.productName,
		category: product.productCategory,
		stock: product.stock,
		image: product.images[0],
		status: product.productStatus,
		date: product.updatedAt ? product.updatedAt : product.createdAt,
		wholesale: product.wholesale,
		price: product.price,
		wholesale: product.wholesale,
		wholesalePrice: product.wholesalePrice,
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
