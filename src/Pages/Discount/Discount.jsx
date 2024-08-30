import React, { useEffect, useState, useRef } from "react";
import "./Discount.css";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import {
	TextField,
	Button,
	InputAdornment,
	Snackbar,
	Alert,
	styled,
} from "@mui/material";
import PropTypes from "prop-types";
import select from "../../assets/select.png";

const CustomTextField = ({
	id,
	label,
	value,
	onChange,
	helperText,
	multiline,
	rows,
	disabled,
	type,
	inputProps,
	InputLabelProps,
	startAdornment,
	endAdornment,
}) => (
	<TextField
		id={id}
		label={label}
		fullWidth
		margin="normal"
		variant="outlined"
		required
		color="success"
		size="small"
		value={value || ""}
		onChange={onChange}
		helperText={helperText}
		multiline={multiline || false}
		rows={multiline ? rows : 1}
		disabled={disabled || false}
		type={type || "text"}
		inputProps={inputProps}
		InputLabelProps={InputLabelProps}
		InputProps={{
			startAdornment: startAdornment,
			endAdornment: endAdornment,
		}}
	/>
);

const Discount = () => {
	const { id } = useParams();
	const location = useLocation();
	const [product, setProduct] = useState(null);
	const [discountName, setDiscountName] = useState("");
	const [discountCode, setDiscountCode] = useState(generateCode(6));
	const [discountPercentage, setDiscountPercentage] = useState("");
	const [discountAmount, setDiscountAmount] = useState("");
	const [discountExpiry, setDiscountExpiry] = useState("");
	const [discountDescription, setDiscountDescription] = useState("");
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");

	const discountCodeRef = useRef(generateCode(6)); // useRef to store the initial discount code

	// Function to parse query parameters
	const getQueryParams = (queryString) => {
		return new URLSearchParams(queryString);
	};

	// Get the user ID from the query parameters
	const queryParams = getQueryParams(location.search);
	const userId = queryParams.get("user");

	// Fetch the product
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/products/${id}`,
					{
						params: {
							user: userId,
						},
					}
				);
				setProduct(response.data);
			} catch (error) {
				console.error("Error fetching product:", error);
			}
		};

		fetchProduct();
	}, [id, userId]);

	// 6 digit random code generator
	function generateCode(length = 6) {
		return Math.random().toString(36).substring(2, 8).toUpperCase();
	}

	// Function to handle form submission
	const handleSubmit = async () => {
		try {
			const discountData = {
				productId: id,
				userId,
				discountName,
				discountCode,
				discountPercentage: Number(discountPercentage),
				discountAmount: Number(discountAmount),
				discountExpiry: new Date(discountExpiry),
				discountDescription,
			};

			const response = await axios.put(
				`http://localhost:8000/products/${product?._id}/discount`,
				discountData
			);
			setSnackbarMessage("Discount added successfully");
			setSnackbarSeverity("success");
			setSnackbarOpen(true);
			setTimeout(() => {
				window.location.href = `/products`;
			}, 2000);
		} catch (error) {
			setSnackbarMessage("Error adding discount");
			setSnackbarSeverity("error");
			setSnackbarOpen(true);
			console.error("Error adding discount:", error);
		}
	};

	// Calculate discount amount based on percentage
	const handlePercentageChange = (e) => {
		const percentage = e.target.value;
		setDiscountPercentage(percentage);
		if (product && product.price) {
			const amount = (product.price * percentage) / 100;
			setDiscountAmount(amount.toFixed(2));
		}
	};

	// Calculate discount percentage based on amount
	const handleAmountChange = (e) => {
		const amount = e.target.value;
		setDiscountAmount(amount);
		if (product && product.price) {
			const percentage = (amount / product.price) * 100;
			setDiscountPercentage(percentage.toFixed(2));
		}
	};

	// Function to handle snackbar close
	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbarOpen(false);
	};

	return (
		<div className="Discount">
			<div className="Header">
				<i className="fa fa-percent"></i>
				<h2>Discounts</h2>
			</div>
			<div className="ProductDiscount">
				<ul key={product?.productName}>
					<li>Discount</li>
					<li>{product?.productName}</li>
					<li>Add</li>
				</ul>
			</div>
			<div className="DiscountContainer">
				<div className="NewItem">
					<div className="NewItemLeft">
						<div className="Header">Discount Details</div>
						<p>Discount details and description</p>
						<p>
							Original price: Kes.{" "}
							<span>
								{product?.price?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
							</span>
						</p>
					</div>
					<div className="NewItemRight">
						<div className="ProductRow">
							<CustomTextField
								id="discountName"
								label="Discount Name"
								value={discountName}
								onChange={(e) => setDiscountName(e.target.value)}
								helperText={"Name of the discount"}
							/>
							<CustomTextField
								id="discountCode"
								label="Discount Code"
								value={discountCodeRef.current}
								helperText={"You can use the suggested one"}
								disabled
							/>
						</div>
						<div className="ProductRow">
							<CustomTextField
								id="discountPercentage"
								label="Discount Percentage"
								value={discountPercentage}
								onChange={handlePercentageChange}
								endAdornment={<InputAdornment position="end">%</InputAdornment>}
								InputLabelProps={{ shrink: true }}
							/>
							<CustomTextField
								id="discountAmount"
								label="Discount Amount"
								value={discountAmount}
								onChange={handleAmountChange}
								startAdornment={
									<InputAdornment position="start">Kes.</InputAdornment>
								}
								InputLabelProps={{ shrink: true }}
							/>

							<CustomTextField
								id="discountExpiry"
								label="Discount Expiry"
								value={discountExpiry}
								onChange={(e) => setDiscountExpiry(e.target.value)}
								type="date"
								inputProps={{ min: new Date().toISOString().split("T")[0] }}
								InputLabelProps={{ shrink: true }}
							/>
						</div>
						<CustomTextField
							id="discountDescription"
							label="Discount Description"
							value={discountDescription}
							onChange={(e) => setDiscountDescription(e.target.value)}
							multiline
							rows={4}
						/>
						<Button
							variant="outlined"
							onClick={handleSubmit}
							style={{
								marginTop: "1rem",
								border: "1px solid var(--bg-color)",
								color: "var(--bg-color)",
								fontWeight: "bold",
							}}
						>
							Add Discount
						</Button>
					</div>
				</div>
			</div>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
					sx={{ width: "100%" }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Discount;

// props validation
CustomTextField.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func,
	helperText: PropTypes.string,
	multiline: PropTypes.bool,
	rows: PropTypes.number,
	disabled: PropTypes.bool,
	type: PropTypes.string,
	inputProps: PropTypes.object,
	InputLabelProps: PropTypes.object,
	startAdornment: PropTypes.node,
	endAdornment: PropTypes.node,
};
