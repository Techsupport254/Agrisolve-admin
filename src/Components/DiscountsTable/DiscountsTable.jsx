import React from "react";
import PropTypes from "prop-types";
import "./DiscountsTable.css";
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
	Typography,
} from "@mui/material";
import { useHistory } from "react-router-use-history";
import axios from "axios";

const DiscountsTable = ({
	user,
	users,
	getTimeLabel,
	products,
	allDiscounts,
	userDiscounts,
}) => {
	const history = useHistory();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [popoverContent, setPopoverContent] = React.useState(null);

	const handleRowClick = (event, discount) => {
		setAnchorEl(event.currentTarget);
		setPopoverContent(discount);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
		setPopoverContent(null);
	};

	const handleDeleteDiscount = async (discountId) => {
		try {
			await axios.delete(`http://localhost:8000/discounts/${discountId}`);
			setPopoverContent(null);
			setAnchorEl(null);
			window.location.reload();
		} catch (error) {
			console.error("Error deleting discount:", error);
		}
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	return (
		<div className="DiscountsTable">
			<div className="DiscountsTableContainer">
				<Paper>
					<TableContainer className="TableContainer">
						<Table
							stickyHeader
							aria-label="sticky table"
							className="DiscountsTable"
						>
							<TableHead className="DiscountsTableHeader">
								<TableRow className="DiscountsTableHeader">
									<TableCell>Discount</TableCell>
									<TableCell>Code</TableCell>
									<TableCell>Percentage off</TableCell>
									<TableCell>Created</TableCell>
									<TableCell>Expiry</TableCell>
									<TableCell>Type</TableCell>
									<TableCell>Users</TableCell>
									<TableCell>Status</TableCell>
									<TableCell>Action</TableCell>
								</TableRow>
							</TableHead>
							{allDiscounts?.length === 0 && (
								<TableBody>
									<TableRow>
										<TableCell colSpan={8} style={{ textAlign: "center" }}>
											No discounts available
										</TableCell>
									</TableRow>
								</TableBody>
							)}
							<TableBody>
								{allDiscounts?.map((discount) => (
									<TableRow key={discount?._id}>
										<TableCell>
											<div className="DiscountDetails">
												<img src={discount?.discountImage} alt="product" />
												<div
													className="
												d-flex flex-column justify-content-center align-items-start ml-2
												"
												>
													<span>{discount?.discountName}</span>
													{discount?.type === "Specific" && (
														<p>{discount?.products[0]?.productName}</p>
													)}
												</div>
											</div>
										</TableCell>
										<TableCell>{discount?.discountCode}</TableCell>
										<TableCell>{discount?.discountPercentage} % </TableCell>
										<TableCell>{getTimeLabel(discount?.createdAt)}</TableCell>
										<TableCell>
											{new Date(discount?.discountExpiry).toLocaleString(
												"en-GB",
												{
													weekday: "short",
													year: "numeric",
													month: "short",
													day: "numeric",
													hour: "2-digit",
													minute: "2-digit",
												}
											)}
										</TableCell>
										<TableCell
											style={{
												textTransform: "capitalize",
												color:
													discount?.type === "General"
														? "var(--success-dark)"
														: "var(--warning-dark)",
											}}
										>
											{discount?.type}
										</TableCell>
										<TableCell>{discount?.usedByTotal}</TableCell>
										<TableCell>
											{new Date(discount?.discountExpiry) > new Date() ? (
												<span className="Active">Active</span>
											) : (
												<span className="Expired">Expired</span>
											)}
										</TableCell>
										<TableCell>
											<Button
												variant="outlined"
												onClick={(event) => handleRowClick(event, discount)}
												style={{
													border: "1px solid var(--bg-color)",
													color: "var(--bg-color)",
												}}
											>
												<i className="fas fa-ellipsis-vertical"></i>
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
						count={allDiscounts?.length || 0}
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
				<Typography sx={{ p: 2 }} className="DiscountPopover">
					<div>
						<span>Discount:</span>
						<p>{popoverContent?.discountName}</p>
					</div>
					<div>
						<span>Code:</span>
						<p>{popoverContent?.discountCode}</p>
					</div>
					<div>
						<span>Percentage off: </span>
						{popoverContent?.discountPercentage}%
					</div>
					<div>
						<span>Created: </span>
						<p>{getTimeLabel(popoverContent?.createdAt)}</p>
					</div>
					<div>
						<span>Expiry:</span>
						<p>
							{new Date(popoverContent?.discountExpiry).toLocaleString(
								"en-GB",
								{
									weekday: "short",
									year: "numeric",
									month: "short",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								}
							)}
						</p>
					</div>
					<div>
						<span>Status:</span>
						<p
							className={
								new Date(popoverContent?.discountExpiry) > new Date()
									? "Active"
									: "Expired"
							}
						>
							{new Date(popoverContent?.discountExpiry) > new Date()
								? "Active"
								: "Expired"}
						</p>
					</div>
					<div className="DiscountFooter">
						<Button
							variant="outlined"
							onClick={() =>
								history.push(
									`/discount/edit?id=${popoverContent?._id}&refId=${user?._id}`
								)
							}
							style={{
								border: "1px solid var(--bg-color)",
								color: "var(--bg-color)",
							}}
						>
							<i className="fa fa-edit"></i> &nbsp; Discount
						</Button>
						<Button
							variant="contained"
							style={{
								background: "var(--danger)",
								color: "var(--white)",
							}}
							onClick={() => handleDeleteDiscount(popoverContent?._id)}
						>
							<i className="fa fa-trash"></i> &nbsp; Discount
						</Button>
					</div>
				</Typography>
			</Popover>
		</div>
	);
};

DiscountsTable.propTypes = {
	user: PropTypes.object.isRequired,
	users: PropTypes.array.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired,
	allDiscounts: PropTypes.array.isRequired,
	userDiscounts: PropTypes.array.isRequired,
};

export default DiscountsTable;
