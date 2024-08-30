import React, { useState } from "react";
import PropTypes from "prop-types";
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
	Button,
	Popover,
	LinearProgress,
} from "@mui/material";
import ProductPopover from "../ProductPopover/ProductPopover";

const ProductsTable = ({ products, users, user, getTimeLabel }) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleRowClick = (product, event) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
		setSelectedProduct(product);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
		setSelectedProduct(null);
	};

	// GET user from users using refId from product
	const getUser = (refId) => {
		return users.find((user) => user._id === refId);
	};
	// formatted price
	const formatPrice = (price) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "KES",
		}).format(price);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<div className="ProductsTable">
			<div className="ProductsTableContainer">
				<Paper className="ProductsPaper">
					<TableContainer className="TableContainer">
						<Table stickyHeader aria-label="sticky table">
							<TableHead className="ProductsTableHeader">
								<TableRow className="ProductsTableHeader">
									<TableCell>Product</TableCell>
									<TableCell>Category</TableCell>
									<TableCell>Stock</TableCell>
									<TableCell>Status</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>Created/Updated</TableCell>
									{user?.email === __ADMIN__ && <TableCell>Owned By</TableCell>}
									<TableCell>Action</TableCell>
								</TableRow>
							</TableHead>
							{products?.length === 0 && (
								<TableBody>
									<TableRow>
										<TableCell colSpan={7} style={{ textAlign: "center" }}>
											No products available
										</TableCell>
									</TableRow>
								</TableBody>
							)}
							<TableBody>
								{products
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((product) => (
										<TableRow key={product._id} style={{ cursor: "pointer" }}>
											<TableCell>
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
															Ksh. {product.price}{" "}
															<small
																style={{
																	textDecoration:
																		product.wholesale === true
																			? "line-through"
																			: "none",
																	color: "var(--error-dark)",
																}}
															>
																Ksh. {product.wholesalePrice}
															</small>
														</h3>
													</div>
												</div>
											</TableCell>
											<TableCell>
												<div className="ProductCategory">
													<span
														style={{
															textTransform: "capitalize",
														}}
													>
														{product.productCategory}
													</span>
													<small>{product.subCategory}</small>
												</div>
											</TableCell>
											<TableCell>
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
													<LinearProgress
														variant="determinate"
														value={product.stock}
														sx={{
															height: ".3rem",
															borderRadius: "5px",
															"& .MuiLinearProgress-bar": {
																backgroundColor:
																	product.stock <= 10
																		? "var(--error-dark)"
																		: product.stock <= 20
																		? "var(--warning-dark)"
																		: "var(--success-dark)",
															},
															backgroundColor:
																product.stock <= 10
																	? "var(--error-lighter)"
																	: product.stock <= 20
																	? "var(--warning-lighter)"
																	: "var(--success-lighter)",
														}}
													/>
												</span>
											</TableCell>
											<TableCell>
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
											</TableCell>
											<TableCell>{formatPrice(product.price)}</TableCell>
											<TableCell>
												{getTimeLabel(product.createdAt || product.updatedAt)}
											</TableCell>
											{user?.email === __ADMIN__ && (
												<TableCell>
													{getUser(product.refId)?.username}
												</TableCell>
											)}
											<TableCell>
												<Button
													size="small"
													variant="outlined"
													onClick={(e) => handleRowClick(product, e)}
													style={{
														padding: ".3rem",
														border: "1px solid var(--bg-color)",
														color: "var(--bg-color)",
														fontSize: ".8rem",
													}}
												>
													<i className="fa-solid fa-ellipsis-vertical"></i>
												</Button>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 100]}
						component="div"
						count={products?.length || 0}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={(event, newPage) => setPage(newPage)}
						onRowsPerPageChange={(event) => {
							setRowsPerPage(parseInt(event.target.value, 10));
							setPage(0);
						}}
					/>
				</Paper>
			</div>
			{selectedProduct && (
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handlePopoverClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "left",
					}}
				>
					<ProductPopover
						product={selectedProduct}
						handleClose={handlePopoverClose}
						user={user}
					/>
				</Popover>
			)}
		</div>
	);
};

ProductsTable.propTypes = {
	products: PropTypes.array.isRequired,
	users: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
};

export default ProductsTable;
