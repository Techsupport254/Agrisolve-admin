import React from "react";
import "./NewProduct.css";
import { Button, MenuItem, TextField } from "@mui/material";
import Switch from "@mui/material/Switch";
import select from "../../assets/select.png";

const NewProduct = () => {
	const handleBrowseClick = () => {
		// Trigger the hidden input element's click event
		const fileInput = document.getElementById("file-input");
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleFileInputChange = (event) => {
		const selectedFiles = event.target.files;
		// Handle the selected files here
		console.log(selectedFiles);
	};

	const categories = [
		{ name: "livestock", value: "livestock" },
		{ name: "crops", value: "crops" },
		{ name: "poultry", value: "poultry" },
	];
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
					/>
					<div className="ImageInput">
						<span>Images</span>
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
								/>
							</p>
						</div>
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
						/>
						<div className="TogleSwitch">
							<p>Apply wholesale</p>
							<Switch
								name="checkedA"
								inputProps={{ "aria-label": "secondary checkbox" }}
								color="success"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="NewItemBtn">
				<div className="Sitch">
					<p>Publish</p>
					<Switch
						name="checkedA"
						inputProps={{ "aria-label": "secondary checkbox" }}
						color="success"
					/>
				</div>
				<div className=" NewBtns">
					<button>Cancel</button>
					<button>Upload Product</button>
				</div>
			</div>
		</div>
	);
};

export default NewProduct;
