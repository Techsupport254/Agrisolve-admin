import React from "react";
import "./ProductsCard.css";
import congrats from "../../assets/congrats.svg";
import CircularBar from "../CircularBar/CircularBar";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";

const ProductsCard = ({ category, user, products, orders, earnings }) => {
	// get earnings where user id is equal to the user id
	const userEarnings = earnings?.filter(
		(earning) => earning?.user_id === user?.id
	);
	// get the earnings array
	const earningsArray = userEarnings?.[0]?.earnings?.map(
		(earning) => earning?.amount
	);
	// get the total income
	const totalIncome = earningsArray
		?.reduce((a, b) => a + b, 0)
		?.toFixed(2)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return (
		<div className="ProductsCard">
			{category?.name === "applaud" ? (
				<div className="Applaud">
					<div className="ApplaudLeft">
						<div className="Congrats">
							<p>Congratulations!</p>
							<span>{user?.name}</span>
						</div>
						<p>
							Your store is now live! You can now add products and start selling
							to your customers. You'll be notified when you receive an order.
						</p>
						<Link to="new">
							<button>Add Products</button>
						</Link>
					</div>
					<div className="ApplaudRight">
						<img src={congrats} alt="congrats" />
					</div>
				</div>
			) : category?.name === "earnings" ? (
				<div className="ProductsEarnings">
					<div className="EarningsTop">
						<div className="EarningsLeft">
							<div className="Header">
								<h3>Earnings</h3>
							</div>
							<span className="EarningsAmount">KES {totalIncome}</span>
						</div>
					</div>
					<div className="EarningsBottom">
						<p>Today</p>
						<div className="BottomRow">
							<p>
								You have <span>0 new orders</span>
							</p>
						</div>
						<div className="BottomRow">
							<p>
								<span>0 orders</span> were delivered today
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className="ProductsStats">
					<div className="StatsTop">
						<div className="ProductsStatsLeft">
							<CircularBar value={100} barValue={20} />
						</div>
						<div className="ProductsStatsRight">
							<div className="StatsRow">
								<Badge color="success" variant="dot" />
								<p>Products</p>
								<span>{products?.length}</span>
							</div>
							<div className="StatsRow">
								<Badge color="success" variant="dot" />
								<p>Sales</p>
								<span>
									{
										orders?.filter((order) => order?.status === "delivered")
											?.length
									}
								</span>
							</div>
						</div>
					</div>
					<div className="StatsBottom">
						<div className="BottomRow">
							<p>
								Last updated on <span>12/10/2021</span>
							</p>
						</div>
						<div className="BottomRow">
							<p>
								3 products are out of stock. <span>View Products</span>
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductsCard;
