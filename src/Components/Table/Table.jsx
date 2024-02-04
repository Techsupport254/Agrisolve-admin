import * as React from "react";
import "./Table.css";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	TextField,
	Select,
	MenuItem,
	IconButton,
	Button,
	LinearProgress,
	InputLabel,
	FormControl,
} from "@mui/material";
import { Avatar } from "antd";

// Define the columns for the product table as per your design
const columns = [
	{
		field: "product",
		headerName: "Product",
		sortable: true,
	},
	{
		field: "category",
		headerName: "Category",
		sortable: false,
	},
	{
		field: "stock",
		headerName: "Stock",
		sortable: false,
	},
	{
		field: "productStatus",
		headerName: "Status",
		sortable: true,
	},
	{
		field: "createdAt",
		headerName: "Created/Updated",
		sortable: false,
	},
	{
		field: "action",
		headerName: "Action",
		sortable: false,
	},
];

function StickyHeadTable({ getTimeLabel, products }) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	// Function to handle the addition of a new product (you will need to implement this)
	const handleAddProduct = () => {
		// Your logic to handle adding a new product
	};

	return (
		<Paper
			sx={{
				width: "100%",
				height: "100%",
				overflow: "hidden",
				fontSize: "10px",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "0 10px",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: ".5rem",
						width: "50%",
					}}
				>
					<TextField
						id="search"
						label="Search for..."
						variant="outlined"
						size="small"
					/>
					<div className="SelectButton">
						<FormControl fullWidth size="small">
							<InputLabel id="demo-simple-select-label">Category</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
							>
								{products?.map((product) => (
									<MenuItem key={product._id} value={product.productCategory}>
										{product.productCategory}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="SelectButton">
						<FormControl fullWidth size="small">
							<InputLabel id="demo-simple-select-label">Status</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
							>
								{products?.map((product) => (
									<MenuItem key={product._id} value={product.productStatus}>
										{product.productStatus}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
				</div>
				<Button
					variant="contained"
					onClick={handleAddProduct}
					style={{
						padding: ".3rem",
						background: "var(--bg-color)",
						color: "var(--white)",
						fontSize: ".8rem",
					}}
				>
					Add Product
				</Button>
			</div>

			<TableContainer
				sx={{
					width: "100%",
					height: "85%",
					overflow: "hidden",
				}}
			>
				<Table stickyHeader aria-label="sticky table">
					<TableHead style={{ padding: ".2rem" }}>
						<TableRow style={{ padding: ".2rem" }}>
							{columns.map((column) => (
								<TableCell
									key={column.field}
									align="left"
									style={{
										padding: ".2rem",
										background: "var(--bg-color)",
										color: "var(--white)",
										fontSize: ".7rem",
									}}
								>
									{column.headerName}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody
						style={{
							padding: ".2rem",
							fontSize: ".7rem",
						}}
					>
						{products
							?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((product) => (
								<TableRow
									key={product._id}
									style={{
										padding: ".2rem",
										color: "var(--white)",
										fontSize: ".7rem",
									}}
								>
									{columns.map((column) => (
										<TableCell
											key={column.field}
											align="left"
											style={{
												padding: ".2rem",
												fontSize: ".7rem",
											}}
										>
											{column.field === "product" && (
												<div className="Product">
													<div className="ProductImage">
														<img
															src={product.images[0]}
															alt={product.productName}
														/>
													</div>
													<div className="ProductDetails">
														<span>{product.productName}</span>
														<h3>
															Ksh. {product.price} || {product.wholesalePrice}
														</h3>
													</div>
												</div>
											)}
											{column.field === "action" && (
												<Button
													size="small"
													onClick={() => {
														console.log(product);
														console.log(product._id);
														console.log(product.productName);
													}}
												>
													<i className="fa-solid fa-ellipsis-vertical"></i>
												</Button>
											)}
											{column.field === "category" && (
												<div className="ProductCategory">
													<span>{product.productCategory}</span>
													<small>{product.subCategory}</small>
												</div>
											)}
											{column.field === "productStatus" && (
												<div className="ProductStatus">
													<span
														style={{
															color:
																product.productStatus === "Published"
																	? "var(--success-darker)"
																	: "var(--warning-darker)",
														}}
													>
														{product.productStatus}
													</span>
												</div>
											)}
											{column.field === "stock" && (
												<span
													style={{
														color:
															product.stock <= 10
																? "var(--error-darker)"
																: product.stock <= 20
																? "var(--warning-darker)"
																: "var(--success-darker)",
													}}
												>
													{product.stock}
												</span>
											)}
											{column.field === "createdAt" && (
												<span>
													{getTimeLabel(
														product.createdAt
															? product.createdAt
															: product.updatedAt
															? product.updatedAt
															: product.createdAt
													)}
												</span>
											)}
										</TableCell>
									))}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={products?.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				style={{
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					padding: "0",
					margin: "0",
					height: "3rem",
				}}
			/>
		</Paper>
	);
}

export default StickyHeadTable;
