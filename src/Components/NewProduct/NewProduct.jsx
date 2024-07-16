import React, { useState } from "react";
import "./NewProduct.css";
import { Button, MenuItem, TextField } from "@mui/material";
import Switch from "@mui/material/Switch";
import select from "../../assets/select.png";
import axios from "axios";

const NewProduct = ({ user }) => {
	const [productName, setProductName] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [images, setProductImages] = useState([]);
	const [brandName, setBrandName] = useState("");
	const [productWeight, setProductWeight] = useState("");
	const [packagingType, setPackagingType] = useState("");
	const [labels, setLabels] = useState([]);
	const [tags, setTags] = useState([]);
	const [instructions, setInstructions] = useState("");
	const [price, setPrice] = useState("");
	const [wholesalePrice, setWholesalePrice] = useState("");
	const [wholesaleRate, setWholesaleRate] = useState("");
	const [wholesale, setWholesale] = useState(false);
	const [stock, setStock] = useState("");
	const [productStatus, setProductStatus] = useState("Draft");
	const [uploading, setUploading] = useState(false);
	const [uploaded, setUploaded] = useState(false);
	const [uploadingProduct, setUploadingProduct] = useState(false);
	const [uploadedProduct, setUploadedProduct] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [verificationStatus, setVerificationStatus] = useState(
		user?.verificationStatus === "verified"
	);
	const [published, setPublished] = useState(false);
	const [draft, setDraft] = useState(false);

	const capitalize = (str) => {
		if (typeof str !== "string") return "";
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const handleBrowseClick = () => {
		// Trigger the hidden input element's click event
		const fileInput = document.getElementById("file-input");
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleRemoveImage = (index) => {
		const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
		setSelectedFiles(newSelectedFiles);
	};

	const handleFileInputChange = (event) => {
		const newSelectedFiles = Array.from(event.target.files);
		setSelectedFiles(newSelectedFiles);
	};

	const handleUploadImages = async () => {
		setUploading(true);

		const CLOUD_NAME = __CLOUD_NAME__;
		const PRESET_NAME = __UPLOAD_PRESET__;
		const imageUrls = [];

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
					imageUrls.push(response.data.secure_url);
				} else {
					console.error("Error uploading image:", response.data);
				}
			}

			if (imageUrls.length > 0) {
				// Upload product after images are successfully uploaded
				setUploadingProduct(true);
				const refId = user?._id;

				const productData = {
					productName,
					productCategory,
					subCategory,
					productDescription,
					images: imageUrls,
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

				const productResponse = await axios.post(
					"http://localhost:8000/products/new",
					productData
				);

				if (productResponse.status === 200) {
					// Product successfully uploaded
					setUploadingProduct(false);
					setTimeout(() => {
						setUploadedProduct(true);
						window.location.href = "/products";
					}, 2000);
				} else {
					console.error("Error uploading product:", productResponse.data);
				}
			} else {
				console.error("No images uploaded.");
			}

			// Set uploaded to true after all images are uploaded
			setTimeout(() => {
				setUploaded(true);
			}, 2000);
		} catch (error) {
			console.error("Error uploading images:", error);
		} finally {
			setUploading(false);
		}

		return {
			status: imageUrls.length > 0 ? 200 : 500,
			data: imageUrls,
			message:
				imageUrls.length > 0
					? "Images uploaded successfully"
					: "Error uploading images",
		};
	};

	const categories = [
		{ name: "livestock", value: "livestock" },
		{ name: "crops", value: "crops" },
		{ name: "poultry", value: "poultry" },
		{ name: "general", value: "general" },
	];

	const handleWholesaleToggle = () => {
		setWholesale(!wholesale);
	};

	return (
		<div className="NewProduct">
			<div className="Header">
				<i className="fa fa-boxes"></i>
				<h2>New Product</h2>
			</div>
			<div className="NewItem">
				<div className="NewItemLeft">
					<div className="Header">Product Details</div>
					<p>Product name, description, and images</p>
				</div>
				<div className="NewItemRight">
					<TextField
						id="productName"
						label="Product Name"
						fullWidth
						margin="normal"
						variant="outlined"
						required
						color="success"
						size="small"
						value={productName}
						onChange={(e) => setProductName(capitalize(e.target.value))}
					/>
					<div className="ProductRow">
						<TextField
							id="productCategory"
							label="Product Category"
							fullWidth
							margin="normal"
							variant="outlined"
							required
							helperText="Please enter a valid category"
							select
							defaultValue={categories[0].value}
							size="small"
							color="success"
							value={productCategory}
							onChange={(e) => setProductCategory(e.target.value)}
						>
							{categories.map((category) => (
								<MenuItem key={category.value} value={category.value}>
									{category.name}
								</MenuItem>
							))}
						</TextField>
						<TextField
							id="productSubCategory"
							label="Sub Category"
							fullWidth
							margin="normal"
							variant="outlined"
							required
							color="success"
							helperText="Please enter a valid category"
							size="small"
							value={subCategory}
							onChange={(e) => setSubCategory(e.target.value)}
						/>
					</div>
					<TextField
						id="productDescription"
						label="Product Description"
						fullWidth
						margin="normal"
						variant="outlined"
						required
						color="success"
						multiline
						rows={4}
						size="small"
						value={productDescription}
						onChange={(e) => setProductDescription(e.target.value)}
					/>
					<div className="ImageInput">
						<span>Images</span>
						{selectedFiles?.length > 0 ? (
							<>
								<div className="SelectedImages">
									{selectedFiles.map((file, index) => (
										<div className="SelectedImage" key={index}>
											<div className="FileName">
												<p>
													{file.name
														.split(".")
														.slice(0, -1)
														.join(".")
														.substring(0, 15)}
												</p>
												<div className="Overlay">
													<i
														className="fa fa-times"
														onClick={() => handleRemoveImage(index)}
													></i>
												</div>
											</div>
											<img src={URL.createObjectURL(file)} alt="product" />
										</div>
									))}
								</div>
							</>
						) : (
							<div className="InputField" onClick={handleBrowseClick}>
								<img src={select} alt="select" />
								<p>
									Drag and drop images here or click to{" "}
									<span className="BrowseButton" onClick={handleBrowseClick}>
										Browse
									</span>
									<input
										type="file"
										id="file-input"
										hidden
										onChange={handleFileInputChange}
										multiple
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
					<span
						style={{
							fontSize: "1rem",
							fontWeight: "bold",
						}}
					>
						Specifications
					</span>

					<div className="ProductRow">
						<TextField
							id="brand"
							label="Product Brand"
							fullWidth
							margin="normal"
							outlined
							required
							size="small"
							color="success"
							value={brandName}
							onChange={(e) => setBrandName(e.target.value)}
						/>
						<TextField
							id="weight"
							label="Product Weight"
							fullWidth
							margin="normal"
							outlined
							required
							size="small"
							color="success"
							value={productWeight}
							onChange={(e) => setProductWeight(e.target.value)}
						/>
					</div>
					<div className="ProductRow">
						<TextField
							id="packaging"
							label="Packaging"
							fullWidth
							margin="normal"
							outlined
							required
							helperText="Eg bag, container, etc"
							size="small"
							color="success"
							value={packagingType}
							onChange={(e) => setPackagingType(e.target.value)}
						/>
						<TextField
							id="LabelsCertifications"
							label="Labels & Certifications"
							fullWidth
							margin="normal"
							outlined
							required
							helperText="Eg bag, organic, non-GMO, etc"
							size="small"
							color="success"
							value={labels}
							onChange={(e) => setLabels(e.target.value)}
						/>
					</div>
					<div className="ProductRow">
						<TextField
							id="tags"
							label="Product Tags"
							fullWidth
							margin="normal"
							outlined
							required
							size="small"
							color="success"
							multiline
							rows={2}
							helperText="Eg. organic, non-GMO,injectiles etc (separated by coma)"
							value={tags}
							onChange={(e) => setTags(e.target.value)}
						/>
					</div>
					<TextField
						id="usage"
						label="Usage Instructions"
						fullWidth
						margin="normal"
						outlined
						required
						color="success"
						multiline
						rows={4}
						helperText="Instructions on how to use the product"
						size="small"
						value={instructions}
						onChange={(e) => setInstructions(e.target.value)}
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
						<TextField
							id="price"
							label="price"
							fullWidth
							margin="normal"
							outlined
							required
							helperText="Normal price of the product"
							size="small"
							color="success"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
						<TextField
							id="wholesalePrice"
							label="Wholesale Price"
							fullWidth
							margin="normal"
							outlined
							required
							helperText="Wholesale price of the product"
							size="small"
							color="success"
							value={wholesalePrice}
							onChange={(e) => setWholesalePrice(e.target.value)}
						/>
					</div>
					<div className="ProductRow">
						<TextField
							id="wholesaleRate"
							label="Wholesale Rate"
							halfWidth
							margin="normal"
							outlined
							required
							helperText="Min. quantity for wholesale price"
							size="small"
							color="success"
							value={wholesaleRate}
							onChange={(e) => setWholesaleRate(e.target.value)}
						/>
						<div className="TogleSwitch">
							<p>Apply wholesale</p>
							<Switch
								name="checkedA"
								inputProps={{ "aria-label": "secondary checkbox" }}
								color="success"
								checked={wholesale}
								onChange={handleWholesaleToggle}
							/>
						</div>
					</div>
					<div className="ProductRow">
						<TextField
							id="stock"
							label="Stock"
							halfWidth
							margin="normal"
							outlined
							required
							helperText="Available quantity"
							size="small"
							color="success"
							value={stock}
							onChange={(e) => setStock(e.target.value)}
						/>
						<TextField
							id="status"
							label="Product Status"
							halfWidth
							margin="normal"
							outlined
							required
							helperText="Select to publish or keep as draft"
							size="small"
							color="success"
							value={productStatus}
							select
							onChange={(e) => setProductStatus(e.target.value)}
						>
							<MenuItem value="Published">Publish</MenuItem>
							<MenuItem value="Draft">Draft</MenuItem>
						</TextField>
					</div>
				</div>
			</div>

			<div className="NewItemBtn">
				<div className=" NewBtns">
					{uploading ? (
						<>
							<button disabled>Cancel</button>
							<button>
								<i className="fa fa-spinner fa-spin"></i> Uploading
							</button>
						</>
					) : uploadingProduct ? (
						<>
							<button disabled>Cancel</button>
							<button>
								<i className="fa fa-spinner fa-spin"></i> Uploading
							</button>
						</>
					) : uploadedProduct ? (
						<>
							<i className="fa fa-check"></i>
							<p>Uploaded Successfully</p>
						</>
					) : (
						<>
							<button>Cancel</button>
							<button
								onClick={() => {
									handleUploadImages();
								}}
							>
								Upload Product
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default NewProduct;
