import React from "react";
import "./Discounts.css";
import DiscountsTable from "../../Components/DiscountsTable/DiscountsTable";
import { Button } from "@mui/material";
import { useHistory } from "react-router-use-history";
import PropTypes from "prop-types";

const Discounts = ({
	user,
	users,
	getTimeLabel,
	products,
	allDiscounts,
	userDiscounts,
}) => {
	const history = useHistory();

	return (
		<div className="Discounts">
			<div className="Header">
				<i className="fa fa-percent"></i>
				<h2>Discounts</h2>
			</div>
			<div className="ProductDiscount">
				<ul>
					<li>Dashboard</li>
					<li>Discounts</li>
					<li>List</li>
				</ul>
				<div className="DiscountAdd">
					<Button
						variant="contained"
						color="primary"
						onClick={() => history.push("/discounts/add")}
					>
						Add Discount
					</Button>
				</div>
			</div>
			<div className="DiscountsContainer">
				<DiscountsTable
					user={user}
					users={users}
					getTimeLabel={getTimeLabel}
					products={products}
					allDiscounts={allDiscounts}
					userDiscounts={userDiscounts}
				/>
			</div>
		</div>
	);
};

export default Discounts;

// props validation
Discounts.propTypes = {
	user: PropTypes.object,
	users: PropTypes.array,
	getTimeLabel: PropTypes.func,
	products: PropTypes.array,
	allDiscounts: PropTypes.array,
	userDiscounts: PropTypes.array,
};
