import "./Products.css";
import Table from "../../Components/Table/Table";
import PropTypes from "prop-types";
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";

const Products = ({ products, user, getTimeLabel, orders, earnings }) => {
	// Function to handle the addition of a new product (you will need to implement this)
	const handleAddProduct = () => {
		// redirect to the product new page
		window.location.href = "/products/new";
	};
	return (
		<div className="Products">
			<div className="ProductsTop">
				<div className="Header">
					<i className="fa fa-boxes"></i>
					<h2>Products</h2>
				</div>

				<div className="TopProductBtns">
					<div className="TopProductBtnsLeft">
						<TextField
							id="search"
							label="Search for..."
							variant="outlined"
							size="small"
						/>
						<div className="SelectButton">
							<FormControl fullWidth size="small">
								<InputLabel id="demo-simple-select-label">Category</InputLabel>
								<Select>
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
								<Select>
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
			</div>
			<Table
				products={products}
				getTimeLabel={getTimeLabel}
				orders={orders}
				earnings={earnings}
				user={user}
			/>
		</div>
	);
};

export default Products;

// props validation

Products.propTypes = {
	products: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	getTimeLabel: PropTypes.func.isRequired,
	orders: PropTypes.array.isRequired,
	earnings: PropTypes.object.isRequired,
};
