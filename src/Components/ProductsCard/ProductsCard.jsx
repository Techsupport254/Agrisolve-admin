import React from "react";
import "./ProductsCard.css";
import congrats from "../../assets/congrats.svg";
import CircularBar from "../CircularBar/CircularBar";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";

const ProductsCard = ({ category, user }) => {
	return (
		<div className="ProductsCard">
			{category?.name === "applaud" ? (
				<div className="Applaud">
					<div className="ApplaudBottom">
						<div className="ApplaudLeft">
							<p>Congratulations!</p>
							<span>{user?.name}</span>
						</div>
						<div className="ApplaudCenter">
							<img src={congrats} alt="congrats" />
						</div>

						<div className="ApplaudRight">
							<p>
								Your store is now live! You can now add products and start
								selling to your customers. You'll be notified when you receive
								an order.
							</p>
							<Link to="new">
								<button>Add Products</button>
							</Link>
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
								<span>100</span>
							</div>
							<div className="StatsRow">
								<Badge color="success" variant="dot" />
								<p>Sales</p>
								<span>20</span>
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
						<div className="BottomRow">
							<p>
								You have <span>2 new orders</span>
							</p>
						</div>
						<div className="BottomRow">
							<p>
								<span>3 orders</span> were delivered today
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductsCard;
