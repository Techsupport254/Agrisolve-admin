import React, { useState, useEffect } from "react";
import "./NewDiscount.css";
import axios from "axios";
import {
	TextField,
	Button,
	InputAdornment,
	Snackbar,
	Alert,
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

const generateSuggestedCode = () => {
	const randomCode = Math.random().toString(36).substr(2, 5).toUpperCase();
	return `AS-${randomCode}`;
};

const NewDiscount = ({ user }) => {
	const [discountName, setDiscountName] = useState("");
	const [discountCode, setDiscountCode] = useState(generateSuggestedCode());
	const [discountPercentage, setDiscountPercentage] = useState("");
	const [discountAmount, setDiscountAmount] = useState("");
	const [discountExpiry, setDiscountExpiry] = useState("");
	const [discountDescription, setDiscountDescription] = useState("");
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [uploadedProduct, setUploadedProduct] = useState(false);

	const handleBrowseClick = () => {
		const fileInput = document.getElementById("file-input");
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleRemoveImage = () => {
		setSelectedFile(null);
	};

	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	const handleUploadImage = async () => {
		setUploading(true);

		const CLOUD_NAME = __CLOUD_NAME__;
		const PRESET_NAME = __UPLOAD_PRESET__;
		let imageUrl = "";

		try {
			if (selectedFile) {
				const formData = new FormData();
				formData.append("file", selectedFile);
				formData.append("upload_preset", PRESET_NAME);

				const response = await axios.post(
					`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
					formData
				);

				if (response.status === 200) {
					imageUrl = response.data.secure_url;
				} else {
					console.error("Error uploading image:", response.data);
				}

				if (imageUrl) {
					const discountData = {
						discountName,
						discountCode: discountCode.startsWith("AS-")
							? discountCode
							: `AS-${discountCode}`,
						discountPercentage,
						discountExpiry,
						discountDescription,
						discountImage: imageUrl,
						refId: user?._id,
					};

					const discountResponse = await axios.post(
						"http://localhost:8000/discounts/add", // Adjust the URL as needed
						discountData
					);

					if (discountResponse.status === 201) {
						setSnackbarMessage("Discount added successfully!");
						setSnackbarSeverity("success");
						setUploadedProduct(true);
						setTimeout(() => {
							window.location.href = "/discounts"; // Adjust the URL as needed
						}, 2000);
					} else {
						console.error("Error uploading discount:", discountResponse.data);
						setSnackbarMessage("Error uploading discount.");
						setSnackbarSeverity("error");
					}
				} else {
					console.error("No image uploaded.");
					setSnackbarMessage("No image uploaded.");
					setSnackbarSeverity("error");
				}
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			setSnackbarMessage("Error uploading image.");
			setSnackbarSeverity("error");
		} finally {
			setUploading(false);
			setSnackbarOpen(true);
		}
	};

	return (
		<div className="NewDiscount">
			<div className="Header">
				<i className="fa fa-percent"></i>
				<h2>Discounts</h2>
			</div>
			<div className="ProductDiscount">
				<ul>
					<li>Dashboard</li>
					<li>Discount</li>
					<li>Add</li>
				</ul>
			</div>
			<div className="DiscountContainer">
				<div className="NewItem">
					<div className="NewItemLeft">
						<div className="Header">Discount Details</div>
						<p>Discount details and description</p>
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
								value={discountCode} // Bind discountCode state
								onChange={(e) => setDiscountCode(e.target.value)} // Handle change
								helperText={"You can use the suggested one"}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">AS-</InputAdornment>
									),
								}}
							/>
						</div>
						<div className="ProductRow">
							<CustomTextField
								id="discountPercentage"
								label="Discount Percentage"
								value={discountPercentage}
								onChange={(e) => setDiscountPercentage(e.target.value)}
								endAdornment={<InputAdornment position="end">%</InputAdornment>}
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
						<div className="ImageInput">
							<span>Image</span>
							{selectedFile ? (
								<div className="SelectedImage">
									<div className="FileName">
										<p>
											{selectedFile.name
												.split(".")
												.slice(0, -1)
												.join(".")
												.substring(0, 15)}
										</p>
										<div className="Overlay">
											<i
												className="fa fa-times"
												onClick={handleRemoveImage}
											></i>
										</div>
									</div>
									<img src={URL.createObjectURL(selectedFile)} alt="product" />
								</div>
							) : (
								<div className="InputField" onClick={handleBrowseClick}>
									<img src={select} alt="select" />
									<p>
										Drag and drop image here or click to{" "}
										<span className="BrowseButton" onClick={handleBrowseClick}>
											Browse
										</span>
										<input
											type="file"
											id="file-input"
											hidden
											onChange={handleFileInputChange}
										/>
									</p>
								</div>
							)}
						</div>
						<Button
							variant="outlined"
							onClick={handleUploadImage}
							style={{
								marginTop: "1rem",
								border: "1px solid var(--bg-color)",
								color: "var(--bg-color)",
								fontWeight: "bold",
							}}
							disabled={uploading}
						>
							{uploading ? "Uploading..." : "Add Discount"}
						</Button>
					</div>
				</div>
			</div>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={() => setSnackbarOpen(false)}
			>
				<Alert
					onClose={() => setSnackbarOpen(false)}
					severity={snackbarSeverity}
					sx={{ width: "100%" }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

NewDiscount.propTypes = {
	user: PropTypes.object.isRequired,
};

export default NewDiscount;
