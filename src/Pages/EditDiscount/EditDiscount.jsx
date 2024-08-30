import React, { useState, useEffect } from "react";
import "./EditDiscount.css";
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
import { useLocation } from "react-router-dom";

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

const EditDiscount = () => {
	const location = useLocation();
	const [id, setId] = useState(null);
	const [productRefId, setProductRefId] = useState(null);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		setId(params.get("id"));
		setProductRefId(params.get("refId"));
	}, [location]);

	const [discountName, setDiscountName] = useState("");
	const [discountCode, setDiscountCode] = useState("");
	const [discountPercentage, setDiscountPercentage] = useState("");
	const [discountExpiry, setDiscountExpiry] = useState("");
	const [discountDescription, setDiscountDescription] = useState("");
	const [discountImage, setDiscountImage] = useState("");
	const [refId, setRefId] = useState(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [disabledMode, setDisabledMode] = useState(false);

	useEffect(() => {
		const fetchDiscount = async () => {
			try {
				const { data } = await axios.get(
					`http://localhost:8000/discounts/${id}`
				);
				setDiscountName(data.discountName);
				setDiscountCode(data.discountCode);
				setDiscountPercentage(data.discountPercentage);
				setDiscountExpiry(data.discountExpiry);
				setDiscountDescription(data.discountDescription);
				setDiscountImage(data.discountImage);
				setSelectedFile(data.discountImage);
				setRefId(data.refId);
			} catch (error) {
				console.error("Error fetching discount:", error);
			}
		};
		if (id) fetchDiscount();
	}, [id]);

	const handleBrowseClick = () => {
		const fileInput = document.getElementById("file-input");
		fileInput?.click();
	};

	const handleRemoveImage = () => {
		setSelectedFile(null);
		setDiscountImage("");
	};

	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
		setDiscountImage(URL.createObjectURL(file));
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
					throw new Error("Error uploading image");
				}
			}

			const discountData = {
				discountName,
				discountPercentage,
				discountExpiry,
				discountDescription,
				discountImage: imageUrl || discountImage,
			};

			console.log("Sending data:", discountData);

			const discountResponse = await axios.patch(
				`http://localhost:8000/discounts/${id}`,
				discountData
			);

			if (discountResponse.status === 200) {
				setSnackbarMessage("Discount updated successfully!");
				setSnackbarSeverity("success");
				setTimeout(() => {
					window.location.href = "/discounts";
				}, 2000);
			} else {
				throw new Error("Error updating discount");
			}
		} catch (error) {
			console.error("Error:", error);
			setSnackbarMessage(error.message);
			setSnackbarSeverity("error");
		} finally {
			setUploading(false);
			setSnackbarOpen(true);
		}
	};

	useEffect(() => {
		if (productRefId && refId) {
			if (productRefId !== refId) {
				setDisabledMode(true);
			} else {
				setDisabledMode(false);
			}
		}
	}, [productRefId, refId]);

	return (
		<div className="EditDiscount">
			<div className="Header">
				<i className="fa fa-percent"></i>
				<h2>Discounts</h2>
			</div>
			<div className="ProductDiscount">
				<ul>
					<li>Discount</li>
					<li>{discountCode}</li>
					<li>Edit</li>
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
								disabled={disabledMode}
							/>
							<CustomTextField
								id="discountCode"
								label="Discount Code"
								value={discountCode}
								helperText={"Cannot be edited"}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">AS-</InputAdornment>
									),
								}}
								disabled={true}
							/>
						</div>
						<div className="ProductRow">
							<CustomTextField
								id="discountPercentage"
								label="Discount Percentage"
								value={discountPercentage}
								onChange={(e) => setDiscountPercentage(e.target.value)}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">%</InputAdornment>
									),
								}}
								InputLabelProps={{ shrink: true }}
								disabled={disabledMode}
							/>
							<CustomTextField
								id="discountExpiry"
								label="Discount Expiry"
								value={
									discountExpiry
										? new Date(discountExpiry).toISOString().split("T")[0]
										: ""
								}
								onChange={(e) => setDiscountExpiry(e.target.value)}
								type="date"
								inputProps={{ min: new Date().toISOString().split("T")[0] }}
								InputLabelProps={{ shrink: true }}
								disabled={disabledMode}
							/>
						</div>
						<CustomTextField
							id="discountDescription"
							label="Discount Description"
							value={discountDescription}
							onChange={(e) => setDiscountDescription(e.target.value)}
							multiline
							rows={4}
							disabled={disabledMode}
						/>
						<div className="ImageInput">
							<span>Image</span>
							{selectedFile ? (
								<div className="SelectedImage">
									<div className="FileName">
										<p>{selectedFile?.name}</p>
										<div className="Overlay">
											<i
												className="fa fa-times"
												onClick={handleRemoveImage}
											></i>
										</div>
									</div>
									<img src={discountImage} alt="product" />
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
											disabled={disabledMode}
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
							disabled={uploading || disabledMode}
						>
							{uploading ? "Uploading..." : "Update Discount"}
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

export default EditDiscount;
