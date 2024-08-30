import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ProductPopover.css";
import { Switch, Snackbar, Alert, styled, Button } from "@mui/material";
import { useHistory } from "react-router-use-history";

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

const ProductPopover = ({ product, user, handleClose }) => {
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [status, setStatus] = useState(product.productStatus.toLowerCase());
	const history = useHistory();

	// Function to handle status change
	const handleStatusChange = async () => {
		const newStatus = status === "published" ? "draft" : "published";
		try {
			const response = await fetch(`/api/products/${product._id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ status: newStatus }),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Failed to update status");
			}
			setStatus(newStatus);
			setSnackbarMessage(data.message || "Status updated successfully");
			setSnackbarSeverity("success");
		} catch (error) {
			setSnackbarMessage(error.message);
			setSnackbarSeverity("error");
		} finally {
			setOpenSnackbar(true);
		}
	};

	// Function to handle snackbar close
	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};

	const handleEditClick = () => {
		history.push(`/product/edit/${product?._id}?user=${user?.id}`);
		handleClose();
	};

	const handleDiscountClick = () => {
		history.push(`/discount/${product._id}?user=${user.id}`);
		handleClose();
	};
	return (
		<div className="ProductPopover">
			<div className="ActionTitle">
				<span>
					{product.productName}
					<i className="fa fa-close" onClick={handleClose}></i>
				</span>
			</div>
			<div className="ActionsSupport">
				<p>
					You can edit, apply discounts, or delete this product. Additionally,
					you can change the product status by toggling the switch, which will
					be reflected on the website. To apply a discount, please visit the
					discount page by clicking the button below. For further information,
					refer to the <a href="">documentation</a>.
				</p>
			</div>
			<div className="ActionButtons">
				<Button variant="text" onClick={handleEditClick}>
					<i className="fa fa-edit"></i> Edit
				</Button>
				<Button variant="text" onClick={handleDiscountClick}>
					<i className="fa fa-percent"></i> Discount
				</Button>
			</div>
			<div className="ActionFooter">
				<div className="StatusSwitch">
					<IOSSwitch
						checked={status === "published"}
						onChange={handleStatusChange}
						name="statusSwitch"
						color="primary"
					/>
					<label htmlFor="statusSwitch">
						<span>{status === "published" ? "Published" : "Draft"}</span>
					</label>
				</div>
				<Button
					onClick={handleClose}
					variant="outlined"
					style={{
						color: "var(--danger)",
						borderColor: "var(--danger)",
					}}
				>
					<i className="fa fa-trash"></i> Delete
				</Button>
			</div>
			<Snackbar
				open={openSnackbar}
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

ProductPopover.propTypes = {
	product: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		productName: PropTypes.string.isRequired,
		productStatus: PropTypes.string.isRequired,
	}).isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
	}).isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default ProductPopover;
