import React from "react";
import "./OrderRight.css";

const OrderRight = ({ order, getCustomer, getProductgetProduct }) => {
	const delivery = [
		{
			label: "Ship By",
			value: "FedEx",
		},
		{
			label: "Type",
			value: "Express",
		},
		{
			label: "Tracking ID",
			value: "1234567890",
		},
		{
			label: "Expected Delivery",
			value: "12/10/2021",
		},
	];

	const shipping = [
		{
			label: "Address",
			value: "123, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum",
		},
		{
			label: "City",
			value: "Nairobi",
		},
		{
			label: "State",
			value: "Nairobi",
		},
		{
			label: "Zip Code",
			value: "123456",
		},
	];

	const payment = [
		{
			label: "Method",
			value: "Credit Card",
		},
		{
			label: "Card Number",
			value: "1234 5678 9101 1121",
		},
		{
			label: "Card Holder",
			value: "John Doe",
		},
		{
			label: "Expiry Date",
			value: "12/10/2021",
		},
	];
	return (
		<div className="OrderRightCont">
			<div className="Header">
				<h3>Customer Info</h3>
			</div>
			<div className="CustomerHeader">
				<div className="Avatar">
					<img src={getCustomer(order?.userId)?.profilePicture} alt="" />
				</div>
				<div className="CustomerDetails">
					<span>{getCustomer(order?.userId)?.name}</span>
					<p>{getCustomer(order?.userId)?.email}</p>
					<small>{getCustomer(order?.userId)?.phone}</small>
				</div>
			</div>
			<div className="Delivery">
				<div className="Header">
					<h3>Delivery </h3>
				</div>
				<div className="DeliveryInfo">
					{delivery.map((item, index) => (
						<div className="DeliveryItem" key={index}>
							<span>{item.label}</span>
							<p>{item.value}</p>
						</div>
					))}
				</div>
			</div>
			<div className="Shipping">
				<div className="Header">
					<h3>Shipping </h3>
				</div>
				<div className="ShippingInfo">
					{shipping.map((item, index) => (
						<div className="ShippingItem" key={index}>
							<span>{item.label}</span>
							<p>{item.value}</p>
						</div>
					))}
				</div>
			</div>
			<div className="OrderPayment">
				<div className="Header">
					<h3>Payment </h3>
				</div>
				<div className="PaymentInfo">
					{payment.map((item, index) => (
						<div className="PaymentItem" key={index}>
							<span>{item.label}</span>
							<p>{item.value}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default OrderRight;
