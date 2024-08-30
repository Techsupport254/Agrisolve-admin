import React, { useState, useEffect } from "react";
import {
	TextField,
	Button,
	MenuItem,
	Switch,
	Snackbar,
	Alert,
	styled,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductEdit.css";
import select from "../../assets/select.png";

// Custom styled switch component
const IOSSwitch = styled((props) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	"& .MuiSwitch-switchBase": {
		padding: 0,
		margin: 2,
		transitionDuration: "300ms",
		"&.Mui-checked": {
			transform: "translateX(16px)",
			color: "#fff",
			"& + .MuiSwitch-track": {
				backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
				opacity: 1,
				border: 0,
			},
			"&.Mui-disabled + .MuiSwitch-track": {
				opacity: 0.5,
			},
		},
		"&.Mui-focusVisible .MuiSwitch-thumb": {
			color: "#33cf4d",
			border: "6px solid #fff",
		},
		"&.Mui-disabled .MuiSwitch-thumb": {
			color:
				theme.palette.mode === "light"
					? theme.palette.grey[100]
					: theme.palette.grey[600],
		},
		"&.Mui-disabled + .MuiSwitch-track": {
			opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
		},
	},
	"& .MuiSwitch-thumb": {
		boxSizing: "border-box",
		width: 22,
		height: 22,
	},
	"& .MuiSwitch-track": {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
		opacity: 1,
		transition: theme.transitions.create(["background-color"], {
			duration: 500,
		}),
	},
}));

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

const ProductEdit = ({ user }) => {
	const { id: productId } = useParams();
	const [productName, setProductName] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [images, setImages] = useState([]);
	const [brandName, setBrandName] = useState("");
	const [productWeight, setProductWeight] = useState("");
	const [packagingType, setPackagingType] = useState("");
	const [labels, setLabels] = useState("");
	const [tags, setTags] = useState("");
	const [instructions, setInstructions] = useState("");
	const [price, setPrice] = useState("");
	const [wholesalePrice, setWholesalePrice] = useState("");
	const [wholesaleRate, setWholesaleRate] = useState("");
	const [wholesale, setWholesale] = useState(false);
	const [stock, setStock] = useState("");
	const [productStatus, setProductStatus] = useState("Draft");
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploadedProduct, setUploadedProduct] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");

	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/products/${productId}`
				);
				const product = response.data;
				setProductName(product.productName);
				setProductCategory(product.productCategory);
				setSubCategory(product.subCategory);
				setProductDescription(product.productDescription);
				setImages(product.images);
				setBrandName(product.brandName);
				setProductWeight(product.productWeight);
				setPackagingType(product.packagingType);
				setLabels(product.labels);
				setTags(product.tags);
				setInstructions(product.instructions);
				setPrice(product.price);
				setWholesalePrice(product.wholesalePrice);
				setWholesaleRate(product.wholesaleRate);
				setWholesale(product.wholesale);
				setStock(product.stock);
				setProductStatus(product.productStatus);
			} catch (error) {
				console.error("Error fetching product:", error);
			}
		};
		fetchProduct();
	}, [productId]);

	const handleFileInputChange = (event) => {
		const newSelectedFiles = Array.from(event.target.files);
		setSelectedFiles(newSelectedFiles);
		const newImageUrls = newSelectedFiles.map((file) =>
			URL.createObjectURL(file)
		);
		setImages((prevImages) => [...prevImages, ...newImageUrls]);
	};

	const handleUploadImages = async () => {
		setUploading(true);
		const CLOUD_NAME = __CLOUD_NAME__;
		const PRESET_NAME = __UPLOAD_PRESET__;
		const uploadedImageUrls = [];

		try {
			for (const file of selectedFiles) {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("upload_preset", PRESET_NAME);
				const response = await axios.post(
					`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
					formData
				);
				if (response.status === 200) {
					uploadedImageUrls.push(response.data.secure_url);
				} else {
					console.error("Error uploading image:", response.data);
				}
			}

			const updatedImages = [
				...images.filter((url) => !url.startsWith("blob:")),
				...uploadedImageUrls,
			];

			const refId = user?._id;
			const productDataWithImages = {
				productName,
				productCategory,
				subCategory,
				productDescription,
				images: updatedImages,
				brandName,
				productWeight,
				packagingType,
				labels,
				tags,
				instructions,
				price,
				wholesalePrice,
				wholesaleRate,
				wholesale,
				stock,
				productStatus,
				refId,
			};
			const productResponse = await axios.patch(
				`http://localhost:8000/products/${productId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
				productDataWithImages
			);

			if (productResponse.status === 200) {
				setSnackbarMessage("Product updated successfully!");
				setSnackbarSeverity("success");
				setTimeout(() => {
					window.location.href = "/products";
				}, 2000);
			} else {
				throw new Error("Error updating product");
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

	const categories = [
		{ name: "livestock", value: "livestock" },
		{ name: "crops", value: "crops" },
		{ name: "poultry", value: "poultry" },
		{ name: "general", value: "general" },
	];

	return (
		<div className="ProductEdit">
			<div className="Header">
				<i className="fa fa-boxes"></i>
				<h2>{productId ? "Edit Product" : "Add New Product"}</h2>
			</div>
			<div className="NewItem">
				<div className="NewItemLeft">
					<div className="Header">Product Details</div>
					<p>Product name, description, and images</p>
				</div>
				<div className="NewItemRight">
					<CustomTextField
						id="productName"
						label="Product Name"
						name="productName"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						helperText="Please enter a valid product name"
						disabled={!editMode}
					/>
					<div className="ProductRow">
						<TextField
							id="productCategory"
							label="Product Category"
							name="productCategory"
							fullWidth
							margin="normal"
							variant="outlined"
							required
							helperText="Please enter a valid category"
							select
							size="small"
							color="success"
							value={productCategory}
							onChange={(e) => setProductCategory(e.target.value)}
							disabled={!editMode}
						>
							{categories.map((category) => (
								<MenuItem key={category.value} value={category.value}>
									{category.name}
								</MenuItem>
							))}
						</TextField>
						<CustomTextField
							id="subCategory"
							label="Sub Category"
							name="subCategory"
							value={subCategory}
							onChange={(e) => setSubCategory(e.target.value)}
							helperText="Please enter a valid category"
							disabled={!editMode}
						/>
					</div>
					<CustomTextField
						id="productDescription"
						label="Product Description"
						name="productDescription"
						value={productDescription}
						onChange={(e) => setProductDescription(e.target.value)}
						multiline
						rows={4}
						disabled={!editMode}
					/>
					<div className="ImageInput">
						<span>Images</span>
						{images?.length > 0 ? (
							<>
								<div className="SelectedImages">
									{images.map((url, index) => (
										<div className="SelectedImage" key={index}>
											<div className="FileName">
												<p>{`Image ${index + 1}`}</p>
												<div className="Overlay">
													<i
														className="fa fa-times"
														onClick={() => {
															const newImages = images.filter(
																(_, i) => i !== index
															);
															setImages(newImages);
														}}
													></i>
												</div>
											</div>
											<img src={url} alt={`product-${index}`} />
										</div>
									))}
									<div className="SelectedImage">
										<img src={select} alt="select" />
										<p
											onClick={() =>
												document.getElementById("file-input").click()
											}
										>
											Drag and drop images here or click to{" "}
											<span className="BrowseButton">Browse</span>
											<input
												type="file"
												id="file-input"
												hidden
												onChange={handleFileInputChange}
												multiple
												disabled={!editMode}
											/>
										</p>
									</div>
								</div>
							</>
						) : (
							<div
								className="InputField"
								onClick={() => document.getElementById("file-input").click()}
							>
								<img src={select} alt="select" />
								<p>
									Drag and drop images here or click to{" "}
									<span className="BrowseButton">Browse</span>
									<input
										type="file"
										id="file-input"
										hidden
										onChange={handleFileInputChange}
										multiple
										disabled={!editMode}
									/>
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="NewItem">
				<div className="NewItemLeft">
					<div className="Header">Product Properties</div>
					<p>Additional features and specifications</p>
				</div>
				<div className="NewItemRight">
					<span className="SectionHeader">Specifications</span>
					<div className="ProductRow">
						<CustomTextField
							id="brandName"
							label="Product Brand"
							name="brandName"
							value={brandName}
							onChange={(e) => setBrandName(e.target.value)}
							disabled={!editMode}
						/>
						<CustomTextField
							id="productWeight"
							label="Product Weight"
							name="productWeight"
							value={productWeight}
							onChange={(e) => setProductWeight(e.target.value)}
							disabled={!editMode}
						/>
					</div>
					<div className="ProductRow">
						<CustomTextField
							id="packagingType"
							label="Packaging"
							name="packagingType"
							value={packagingType}
							onChange={(e) => setPackagingType(e.target.value)}
							helperText="Eg bag, container, etc"
							disabled={!editMode}
						/>
						<CustomTextField
							id="labels"
							label="Labels & Certifications"
							name="labels"
							value={labels}
							onChange={(e) => setLabels(e.target.value)}
							helperText="Eg organic, non-GMO, etc"
							disabled={!editMode}
						/>
					</div>
					<CustomTextField
						id="tags"
						label="Product Tags"
						name="tags"
						value={tags}
						onChange={(e) => setTags(e.target.value)}
						multiline
						rows={2}
						helperText="Eg. organic, non-GMO, injectables, etc (separated by comma)"
						disabled={!editMode}
					/>
					<CustomTextField
						id="instructions"
						label="Usage Instructions"
						name="instructions"
						value={instructions}
						onChange={(e) => setInstructions(e.target.value)}
						multiline
						rows={4}
						helperText="Instructions on how to use the product"
						disabled={!editMode}
					/>
				</div>
			</div>
			<div className="NewItem">
				<div className="NewItemLeft">
					<div className="Header">Product Pricing</div>
					<p>Price, discounts, and shipping</p>
				</div>
				<div className="NewItemRight">
					<div className="ProductRow">
						<CustomTextField
							id="price"
							label="Price"
							name="price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							helperText="Normal price of the product"
							disabled={!editMode}
						/>
						<CustomTextField
							id="wholesalePrice"
							label="Wholesale Price"
							name="wholesalePrice"
							value={wholesalePrice}
							onChange={(e) => setWholesalePrice(e.target.value)}
							helperText="Wholesale price of the product"
							disabled={!editMode}
						/>
					</div>
					<div className="ProductRow">
						<CustomTextField
							id="wholesaleRate"
							label="Wholesale Rate"
							name="wholesaleRate"
							value={wholesaleRate}
							onChange={(e) => setWholesaleRate(e.target.value)}
							helperText="Min. quantity for wholesale price"
							disabled={!editMode}
						/>
						<div className="ToggleSwitch">
							<p>Apply wholesale</p>
							<IOSSwitch
								name="wholesale"
								inputProps={{ "aria-label": "secondary checkbox" }}
								checked={wholesale}
								onChange={() => setWholesale(!wholesale)}
								disabled={!editMode}
								className="Switch"
							/>
						</div>
					</div>
					<div className="ProductRow">
						<CustomTextField
							id="stock"
							label="Stock"
							name="stock"
							value={stock}
							onChange={(e) => setStock(e.target.value)}
							helperText="Available quantity"
							disabled={!editMode}
						/>
						<TextField
							id="productStatus"
							label="Product Status"
							name="productStatus"
							fullWidth
							margin="normal"
							variant="outlined"
							required
							helperText="Select to publish or
 keep as draft"
							select
							size="small"
							color="success"
							value={productStatus}
							onChange={(e) => setProductStatus(e.target.value)}
							disabled={!editMode}
						>
							<MenuItem value="Published">Publish</MenuItem>
							<MenuItem value="Draft">Draft</MenuItem>
						</TextField>
					</div>
				</div>
			</div>
			<div className="NewItemBtn">
				<div className="NewBtns">
					{uploading ? (
						<>
							<Button variant="contained" disabled>
								Cancel
							</Button>
							<Button variant="contained" disabled>
								<i className="fa fa-spinner fa-spin"></i> Uploading
							</Button>
						</>
					) : uploadedProduct ? (
						<>
							<i className="fa fa-check"></i>
							<p>Uploaded Successfully</p>
						</>
					) : editMode ? (
						<>
							<Button variant="contained" onClick={() => setEditMode(false)}>
								Cancel
							</Button>
							<Button
								variant="contained"
								onClick={handleUploadImages}
								style={{
									background: "var(--success)",
									color: "var(--white)",
								}}
							>
								Save Changes
							</Button>
						</>
					) : (
						<Button
							variant="contained"
							onClick={() => setEditMode(true)}
							style={{
								background: "var(--success)",
								color: "var(--white)",
							}}
						>
							Edit Product
						</Button>
					)}
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

export default ProductEdit;
